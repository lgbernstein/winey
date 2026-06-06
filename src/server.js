import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import { networkInterfaces } from "node:os";

function getLanIp() {
  for (const nets of Object.values(networkInterfaces())) {
    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}
import express from "express";
import multer from "multer";
import { EVENT_STATES, openWineDb, resolveDataPaths } from "./db.js";
import { scanBottleLabel } from "./label-scan.js";
import { generateCoachText } from "./coach.js";

const maxUploadBytes = 8 * 1024 * 1024;
const imageExtensions = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"]
]);
const appearances = ["Ruby", "Garnet", "Purple", "Contains Sediment"];
const noses = [
  "Red Fruits (Cherry/Raspberry)",
  "Black Fruits (Blackberry/Plum)",
  "Earth / Mineral",
  "Spice / Oak (Vanilla/Pepper)"
];
const palate = {
  Sweetness: ["Bone Dry", "Off-Dry", "Sweet"],
  Acidity: ["Low (Soft)", "Medium (Fresh)", "High (Tart)"],
  Tannins: ["Low (Smooth)", "Medium (Velvety)", "High (Grippy)"],
  Body: ["Light", "Medium", "Full-Bodied"]
};

function uploadFor(destination) {
  mkdirSync(destination, { recursive: true });
  return multer({
    storage: multer.diskStorage({
      destination,
      filename(_req, file, done) {
        const extension = imageExtensions.get(file.mimetype);
        done(null, `${Date.now()}-${randomUUID()}${extension}`);
      }
    }),
    limits: { fileSize: maxUploadBytes },
    fileFilter(_req, file, done) {
      done(null, imageExtensions.has(file.mimetype));
    }
  });
}

function stringField(value, label, { required = true, max = 180 } = {}) {
  const cleaned = String(value || "").trim();
  if (required && !cleaned) throw new Error(`${label} is required.`);
  if (cleaned.length > max) throw new Error(`${label} is too long.`);
  return cleaned;
}

function expertScore(value) {
  if (value === undefined || value === null || value === "") return null;
  const score = Number(value);
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    throw new Error("Expert score must be a whole number from 0 to 100.");
  }
  return score;
}

function safeEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseOptionalTasting(body) {
  const appearance = appearances.includes(body.appearance) ? body.appearance : "";
  const nose = Array.isArray(body.nose) ? body.nose.filter((item) => noses.includes(item)) : [];
  const palateSelections = Object.fromEntries(Object.entries(body.palate || {}).filter(([metric, selection]) => palate[metric]?.includes(selection)));
  return { appearance, nose, palate: palateSelections };
}

export function createServer({ dataDir, hostPin = process.env.HOST_PIN || "2468", labelScanner = scanBottleLabel, coachGenerator = generateCoachText } = {}) {
  let revealAllStep = 0;
  const paths = resolveDataPaths(dataDir);
  mkdirSync(paths.uploadRoot, { recursive: true });
  const db = openWineDb(paths);
  const app = express();
  const bottleUpload = uploadFor(paths.bottleUploads);
  const partyUpload = uploadFor(paths.partyUploads);
  const hostToken = createHash("sha256").update(`wine-party:${hostPin}`).digest("hex");

  app.use(express.json({ limit: "1mb" }));
  app.use("/uploads", express.static(paths.uploadRoot, { maxAge: "7d" }));
  app.use(express.static("public"));

  const requireHost = (req, res, next) => {
    const token = String(req.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!safeEqual(token, hostToken)) {
      res.status(401).json({ error: "Host PIN required." });
      return;
    }
    next();
  };
  const photoUrl = (folder, req) => req.file ? `/uploads/${folder}/${req.file.filename}` : "";
  const bottleInput = (body, req, requireCore = true) => ({
    bottleName: body.bottleName === undefined && !requireCore ? undefined : stringField(body.bottleName, "Bottle name", { required: requireCore }),
    grape: body.grape === undefined && !requireCore ? undefined : stringField(body.grape, "Grape", { required: requireCore }),
    producer: body.producer === undefined && !requireCore ? undefined : stringField(body.producer, "Producer", { required: false }),
    region: body.region === undefined && !requireCore ? undefined : stringField(body.region, "Region", { required: false }),
    vintage: body.vintage === undefined && !requireCore ? undefined : stringField(body.vintage, "Vintage", { required: false, max: 20 }),
    expertScore: body.expertScore === undefined && !requireCore ? undefined : expertScore(body.expertScore),
    expertCommentary: body.expertCommentary === undefined && !requireCore ? undefined : stringField(body.expertCommentary, "Expert commentary", { required: false, max: 1200 }),
    photoUrl: photoUrl("bottles", req) || undefined
  });

  const coachInFlight = new Map();
  app.get("/api/bottles/:bagNumber/coach", async (req, res) => {
    try {
      const bottle = db.getBottleByBagNumber(req.params.bagNumber);
      if (!bottle) {
        res.status(404).json({ error: "Sleeve not found." });
        return;
      }
      if (bottle.coachText && bottle.coachText.includes("**Look:**") && bottle.coachText.length >= 160) {
        res.json({ coach: bottle.coachText });
        return;
      }
      const hasRealData = bottle.bottleName && bottle.bottleName !== "Reading label" && bottle.bottleName !== "Review label scan" && bottle.grape && bottle.grape.toLowerCase() !== "unknown";
      if (!hasRealData) {
        res.json({ coach: "" });
        return;
      }
      let pending = coachInFlight.get(bottle.id);
      if (!pending) {
        pending = coachGenerator({ bottle })
          .then((text) => {
            if (text) db.setBottleCoachText(bottle.id, text);
            return text;
          })
          .finally(() => coachInFlight.delete(bottle.id));
        coachInFlight.set(bottle.id, pending);
      }
      const coach = await pending;
      res.json({ coach });
    } catch (error) {
      res.status(200).json({ coach: "", error: error.message });
    }
  });

  app.get("/api/bootstrap", (_req, res) => {
    res.json({
      eventName: "Winey",
      state: db.getState(),
      nowPouring: db.getNowPouring(),
      revealScene: db.getRevealScene(),
      revealAllStep,
      lanIp: getLanIp(),
      wifiPassword: process.env.WIFI_PASSWORD || "",
      grapes: db.listGuessGrapes(),
      guests: db.listGuests(),
      bottles: db.listBlindBottles(),
      tastingGrid: { appearances, noses, palate },
      leaderboard: db.leaderboard()
    });
  });
  app.post("/api/guests", (req, res) => {
    try {
      const displayName = stringField(req.body.displayName, "Name", { max: 60 });
      res.status(201).json(db.addGuest(displayName));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/host/guests/:id", requireHost, (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) { res.status(400).json({ error: "Invalid id." }); return; }
      const displayName = stringField(req.body.displayName, "Name", { max: 60 });
      res.json(db.updateGuest(id, displayName));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Which sleeves a single guest has already rated — used by the kiosk to warn
  // about repeats without broadcasting every guest's history in the bootstrap.
  app.get("/api/guests/:userId/rated-bags", (req, res) => {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
      res.status(400).json({ error: "Invalid guest id." });
      return;
    }
    res.json({ bags: db.ratedBagsFor(userId) });
  });
  app.post("/api/tastings", (req, res) => {
    try {
      if (db.getState() !== "LIVE_TASTING") {
        res.status(409).json({ error: "Ratings are closed while the event is not in live tasting." });
        return;
      }
      const userId = Number(req.body.userId);
      const bagNumber = Number(req.body.bagNumber);
      const rating = Number(req.body.rating);
      const grapeGuess = stringField(req.body.grapeGuess, "Grape guess", { max: 80 });
      if (!Number.isInteger(userId) || !Number.isInteger(bagNumber) || !Number.isInteger(rating) || rating < 0 || rating > 5) {
        res.status(400).json({ error: "Choose a guest, bottle number, and star rating from 0 to 5." });
        return;
      }
      const entry = db.upsertTasting({
        userId,
        bagNumber,
        rating,
        grapeGuess,
        isBookmarked: Boolean(req.body.isBookmarked),
        ...parseOptionalTasting(req.body)
      });
      if (!entry) {
        res.status(404).json({ error: "That blind bottle number has not been checked in yet." });
        return;
      }
      res.status(201).json({ entry, leaderboard: db.leaderboard() });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app.get("/api/leaderboard", (_req, res) => res.json(db.leaderboard()));
  app.get("/api/photos", (_req, res) => res.json(db.listPhotos()));
  app.delete("/api/photos/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) { res.status(400).json({ error: "Invalid id." }); return; }
    const deleted = db.deletePhoto(id);
    if (!deleted) { res.status(404).json({ error: "Photo not found." }); return; }
    // Best-effort file removal
    try {
      const { unlinkSync } = require("node:fs");
      unlinkSync("public" + deleted.storageUrl);
    } catch (_) {}
    res.json({ ok: true });
  });
  app.post("/api/photos", partyUpload.single("photo"), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Choose a photo to upload." });
      return;
    }
    const userId = Number(req.body.userId);
    res.status(201).json(db.addPhoto({ userId: Number.isInteger(userId) ? userId : null, storageUrl: photoUrl("photos", req) }));
  });
  app.get("/api/reveal", (_req, res) => {
    if (!["GRAND_REVEAL", "ARCHIVE"].includes(db.getState())) {
      res.status(403).json({ error: "Reveal has not started." });
      return;
    }
    res.json(db.reveal());
  });

  // Unprotected by design — TV view fetches this; state gate (403) prevents access before GRAND_REVEAL.
  app.get("/api/reveal-data", (_req, res) => {
    if (!["GRAND_REVEAL", "ARCHIVE"].includes(db.getState())) {
      res.status(403).json({ error: "Reveal has not started." });
      return;
    }
    res.json(db.revealData());
  });

  app.post("/api/host/session", (req, res) => {
    if (!safeEqual(String(req.body.pin || ""), String(hostPin))) {
      res.status(401).json({ error: "Incorrect host PIN." });
      return;
    }
    res.json({ token: hostToken });
  });
  app.get("/api/host/dashboard", requireHost, (_req, res) => {
    res.json({ state: db.getState(), bottles: db.listHostBottles(), photos: db.listPhotos(), leaderboard: db.leaderboard() });
  });
  app.post("/api/host/demo", requireHost, (_req, res) => {
    try {
      res.json(db.seedDemo());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/host/bottles/scan", requireHost, bottleUpload.single("photo"), async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Take a label photo to scan." });
      return;
    }
    const savedPhotoUrl = photoUrl("bottles", req);
    let scan = null;
    let scanError = null;
    try {
      scan = await labelScanner({ filePath: req.file.path, mediaType: req.file.mimetype, grapes: db.listGuessGrapes() });
    } catch (error) {
      scanError = error;
    }
    const bottle = db.createBottle({
      bottleName: scan?.bottleName || scan?.producer || "Review label scan",
      grape: scan?.grape || "Unknown",
      producer: scan?.producer,
      region: scan?.region,
      vintage: scan?.vintage,
      photoUrl: savedPhotoUrl
    });
    if (scan) {
      res.status(201).json({ bottle, scan });
    } else {
      res.status(201).json({
        bottle,
        scan: {
          confidence: "low",
          grapeSource: "unknown",
          notes: `Sleeve assigned. AI details need review: ${scanError?.message || "scan failed"}`
        }
      });
    }
  });
  app.post("/api/host/bottles", requireHost, bottleUpload.single("photo"), (req, res) => {
    try {
      res.status(201).json(db.createBottle(bottleInput(req.body, req)));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app.patch("/api/host/bottles/:id", requireHost, bottleUpload.single("photo"), (req, res) => {
    try {
      const bottle = db.updateBottle(Number(req.params.id), bottleInput(req.body, req, false));
      if (!bottle) {
        res.status(404).json({ error: "Bottle not found." });
        return;
      }
      res.json(bottle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app.patch("/api/host/state", requireHost, (req, res) => {
    if (!EVENT_STATES.includes(req.body.state)) {
      res.status(400).json({ error: "Unknown event state." });
      return;
    }
    res.json({ state: db.setState(req.body.state) });
  });
  app.post("/api/host/guests/bulk", requireHost, (req, res) => {
    const raw = Array.isArray(req.body.names) ? req.body.names : [];
    if (!raw.length) {
      res.status(400).json({ error: "Provide a names array." });
      return;
    }
    const seen = new Set();
    const added = [];
    const skipped = [];
    for (const entry of raw) {
      const trimmed = String(entry || "").replace(/\s+/g, " ").trim();
      if (!trimmed) continue;
      if (trimmed.length > 60) { skipped.push({ name: trimmed.slice(0, 60), reason: "Too long" }); continue; }
      const key = trimmed.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      try {
        added.push(db.addGuest(trimmed));
      } catch (error) {
        skipped.push({ name: trimmed, reason: error.message });
      }
    }
    res.json({ added, skipped, count: added.length });
  });
  app.patch("/api/host/now-pouring", requireHost, (req, res) => {
    const bagNumber = req.body.bagNumber;
    if (bagNumber !== null && bagNumber !== undefined) {
      const n = Number(bagNumber);
      if (!Number.isFinite(n) || n < 1) {
        res.status(400).json({ error: "bagNumber must be a positive number or null." });
        return;
      }
      if (!db.getBottleByBagNumber(n)) {
        res.status(404).json({ error: "No bottle in that sleeve." });
        return;
      }
    }
    res.json({ nowPouring: db.setNowPouring(bagNumber) });
  });

  app.patch("/api/host/reveal-scene", requireHost, (req, res) => {
    const { scene } = req.body;
    const allowed = ["sommelier", "podium", "reveal-all", "group-accuracy", "the-numbers", null];
    if (!allowed.includes(scene)) {
      res.status(400).json({ error: "Invalid reveal scene." });
      return;
    }
    const current = db.getState();
    if (current !== "GRAND_REVEAL" && current !== "ARCHIVE") {
      res.status(409).json({ error: "Reveal sequence only available in GRAND_REVEAL or ARCHIVE state." });
      return;
    }
    const revealScene = db.setRevealScene(scene);
    revealAllStep = 0;
    res.json({ revealScene });
  });

  app.patch("/api/host/reveal-all-step", requireHost, (req, res) => {
    const action = String(req.body.action || "next");
    if (action === "prev") revealAllStep = Math.max(0, revealAllStep - 1);
    else if (action === "reset") revealAllStep = 0;
    else revealAllStep++;
    res.json({ revealAllStep });
  });

  app.get("*splat", (_req, res) => res.sendFile("index.html", { root: "public" }));
  app.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError) {
      res.status(400).json({ error: `Upload failed: ${error.message}` });
      return;
    }
    res.status(500).json({ error: error.message || "Unexpected server error." });
  });

  return { app, db, paths };
}
