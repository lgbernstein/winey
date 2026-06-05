import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, test } from "node:test";
import { createServer } from "../src/server.js";

let server;
let baseUrl;
let db;
let dataDir;

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...options.headers },
    body: options.body instanceof FormData ? options.body : options.body && JSON.stringify(options.body)
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

beforeEach(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "wine-party-"));
  const appServer = createServer({
    dataDir,
    hostPin: "9191",
    labelScanner: async () => ({
      bottleName: "Scanned Syrah",
      producer: "Evening Cellars",
      grape: "Syrah",
      region: "Santa Barbara",
      vintage: "2022",
      confidence: "high",
      notes: "Clear front label."
    })
  });
  db = appServer.db;
  await new Promise((resolve) => {
    server = appServer.app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  await new Promise((resolve) => server.close(resolve));
  db.close();
  rmSync(dataDir, { recursive: true, force: true });
});

test("host PIN gates check-in and blind bootstrap hides reveal fields", async () => {
  const denied = await request("/api/host/dashboard");
  assert.equal(denied.response.status, 401);

  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const auth = session.body.token;
  assert.equal(session.response.status, 200);

  const bottleForm = new FormData();
  bottleForm.set("bottleName", "Red Orchard");
  bottleForm.set("grape", "Pinot Noir");
  bottleForm.set("expertScore", "93");
  bottleForm.set("expertCommentary", "Bright fruit and silky finish.");
  const bottle = await request("/api/host/bottles", {
    method: "POST",
    headers: { Authorization: `Bearer ${auth}` },
    body: bottleForm
  });
  assert.equal(bottle.response.status, 201);
  assert.equal(bottle.body.bagNumber, 1);

  const bootstrap = await request("/api/bootstrap");
  assert.equal(bootstrap.body.bottles[0].bagNumber, 1);
  assert.equal("bottleName" in bootstrap.body.bottles[0], false);
  const grapeNames = bootstrap.body.grapes.map((g) => g.name);
  assert.ok(grapeNames.includes("Cabernet Sauvignon"));
  assert.ok(grapeNames.includes("Sauvignon Blanc"));
  assert.ok(grapeNames.includes("Nebbiolo"));
  assert.ok(grapeNames.includes("Not sure"));
  const cab = bootstrap.body.grapes.find((g) => g.name === "Cabernet Sauvignon");
  assert.ok(cab.appellations.length > 0, "Cabernet Sauvignon should have appellation hints");
});

test("host demo seed populates 15 bottles and creates an active leaderboard", async () => {
  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  assert.equal(session.response.status, 200);

  const demo = await request("/api/host/demo", {
    method: "POST",
    headers: { Authorization: `Bearer ${session.body.token}` }
  });

  assert.equal(demo.response.status, 200);
  assert.equal(demo.body.bottles.length, 15);
  assert.equal(demo.body.leaderboard.length, 15);
  assert.equal(demo.body.state, "LIVE_TASTING");
  assert.ok(demo.body.leaderboard[0].averageRating >= demo.body.leaderboard[1].averageRating);
  assert.ok(demo.body.leaderboard.every((item, index, arr) => index === 0 || item.averageRating <= arr[index - 1].averageRating));

  const bootstrap = await request("/api/bootstrap");
  assert.equal(bootstrap.body.bottles.length, 15);

  const leaderboard = await request("/api/leaderboard");
  assert.equal(leaderboard.body.length, 15);
  assert.ok(leaderboard.body[0].averageRating >= leaderboard.body[1].averageRating);
});

test("guest rating updates leaderboard and reveal shows correct grape guess", async () => {
  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const auth = session.body.token;
  const bottleForm = new FormData();
  bottleForm.set("bottleName", "Red Orchard");
  bottleForm.set("grape", "Pinot Noir");
  bottleForm.set("expertScore", "93");
  bottleForm.set("expertCommentary", "Bright fruit and silky finish.");
  const bottle = await request("/api/host/bottles", {
    method: "POST",
    headers: { Authorization: `Bearer ${auth}` },
    body: bottleForm
  });
  assert.equal(bottle.response.status, 201);
  assert.equal(bottle.body.bagNumber, 1);

  const guest = await request("/api/guests", { method: "POST", body: { displayName: "Ari" } });
  assert.equal(guest.response.status, 201);

  const tasting = await request("/api/tastings", {
    method: "POST",
    body: {
      userId: guest.body.id,
      bagNumber: 1,
      rating: 5,
      grapeGuess: "Pinot Noir",
      appearance: "Ruby",
      nose: ["Red Fruits (Cherry/Raspberry)"],
      palate: { Body: "Light" }
    }
  });
  assert.equal(tasting.response.status, 201);
  assert.equal(tasting.body.leaderboard[0].averageRating, 5);
  assert.deepEqual(tasting.body.leaderboard[0].grapeGuesses, [{ label: "Pinot Noir", count: 1 }]);

  const lockedReveal = await request("/api/reveal");
  assert.equal(lockedReveal.response.status, 403);

  const revealSession = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const revealAuth = revealSession.body.token;
  await request("/api/host/state", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${revealAuth}` },
    body: { state: "GRAND_REVEAL" }
  });
  const reveal = await request("/api/reveal");
  assert.equal(reveal.response.status, 200);
  assert.deepEqual(reveal.body[0].correctGuests, ["Ari"]);
  assert.equal(reveal.body[0].grapeGuesses[0].count, 1);

  const closed = await request("/api/tastings", {
    method: "POST",
    body: { userId: guest.body.id, bagNumber: 1, rating: 4, grapeGuess: "Not sure" }
  });
  assert.equal(closed.response.status, 409);
});

test("label scan assigns the next sleeve and fills host bottle details", async () => {
  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const auth = session.body.token;
  await request("/api/host/state", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${auth}` },
    body: { state: "LIVE_TASTING" }
  });

  const form = new FormData();
  form.set("photo", new Blob(["label"], { type: "image/jpeg" }), "label.jpg");
  const scan = await request("/api/host/bottles/scan", {
    method: "POST",
    headers: { Authorization: `Bearer ${auth}` },
    body: form
  });
  assert.equal(scan.response.status, 201);
  assert.equal(scan.body.bottle.bagNumber, 1);
  assert.equal(scan.body.bottle.grape, "Syrah");
  assert.equal(scan.body.scan.confidence, "high");

  const bootstrap = await request("/api/bootstrap");
  const grapeNames = bootstrap.body.grapes.map((g) => g.name);
  assert.ok(grapeNames.includes("Syrah"), "scanned grape should appear in bootstrap grape list");
  assert.ok(grapeNames.includes("Cabernet Sauvignon"));
});

test("label scan still assigns a sleeve when AI details fail", async () => {
  const failingApp = createServer({
    dataDir: mkdtempSync(join(tmpdir(), "wine-party-failed-scan-")),
    hostPin: "4545",
    labelScanner: async () => {
      throw new Error("scanner offline");
    }
  });
  const failingServer = await new Promise((resolve) => {
    const listener = failingApp.app.listen(0, () => resolve(listener));
  });
  const failingBaseUrl = `http://127.0.0.1:${failingServer.address().port}`;
  const failingRequest = async (path, options = {}) => {
    const response = await fetch(`${failingBaseUrl}${path}`, {
      ...options,
      headers: { ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...options.headers },
      body: options.body instanceof FormData ? options.body : options.body && JSON.stringify(options.body)
    });
    return { response, body: await response.json() };
  };
  const session = await failingRequest("/api/host/session", { method: "POST", body: { pin: "4545" } });
  const form = new FormData();
  form.set("photo", new Blob(["label"], { type: "image/jpeg" }), "label.jpg");
  const scan = await failingRequest("/api/host/bottles/scan", {
    method: "POST",
    headers: { Authorization: `Bearer ${session.body.token}` },
    body: form
  });
  assert.equal(scan.response.status, 201);
  assert.equal(scan.body.bottle.bagNumber, 1);
  assert.equal(scan.body.scan.confidence, "low");
  assert.match(scan.body.scan.notes, /Sleeve assigned/);
  await new Promise((resolve) => failingServer.close(resolve));
  failingApp.db.close();
});

test("party photo persists in the shared album", async () => {
  const form = new FormData();
  form.set("photo", new Blob(["image"], { type: "image/png" }), "party.png");
  const upload = await request("/api/photos", { method: "POST", body: form });
  assert.equal(upload.response.status, 201);
  assert.match(upload.body.storageUrl, /^\/uploads\/photos\//);

  const gallery = await request("/api/photos");
  assert.equal(gallery.body.length, 1);
});

test("reveal-scene endpoint requires host auth and validates scene values", async () => {
  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const auth = session.body.token;

  // Unauthenticated
  const denied = await request("/api/host/reveal-scene", { method: "PATCH", body: { scene: "sommelier" } });
  assert.equal(denied.response.status, 401);

  // Invalid scene
  const bad = await request("/api/host/reveal-scene", {
    method: "PATCH",
    body: { scene: "invalid-scene" },
    headers: { Authorization: `Bearer ${auth}` }
  });
  assert.equal(bad.response.status, 400);

  // 409 when not in GRAND_REVEAL/ARCHIVE state
  const notReady = await request("/api/host/reveal-scene", {
    method: "PATCH",
    body: { scene: "sommelier" },
    headers: { Authorization: `Bearer ${auth}` }
  });
  assert.equal(notReady.response.status, 409);

  // Valid scene — requires GRAND_REVEAL state first
  await request("/api/host/state", { method: "PATCH", body: { state: "GRAND_REVEAL" }, headers: { Authorization: `Bearer ${auth}` } });
  const ok = await request("/api/host/reveal-scene", {
    method: "PATCH",
    body: { scene: "sommelier" },
    headers: { Authorization: `Bearer ${auth}` }
  });
  assert.equal(ok.response.status, 200);
  assert.equal(ok.body.revealScene, "sommelier");

  // Bootstrap includes revealScene
  const boot = await request("/api/bootstrap");
  assert.equal(boot.body.revealScene, "sommelier");

  // Clear scene
  const cleared = await request("/api/host/reveal-scene", {
    method: "PATCH",
    body: { scene: null },
    headers: { Authorization: `Bearer ${auth}` }
  });
  assert.equal(cleared.body.revealScene, null);
});

test("reveal-data endpoint returns all sequence data in GRAND_REVEAL state", async () => {
  const session = await request("/api/host/session", { method: "POST", body: { pin: "9191" } });
  const auth = session.body.token;

  // Add a bottle
  const bottleForm = new FormData();
  bottleForm.set("bottleName", "Test Merlot");
  bottleForm.set("grape", "Merlot");
  bottleForm.set("producer", "Test Winery");
  bottleForm.set("region", "Napa");
  bottleForm.set("vintage", "2021");
  const bottle = await request("/api/host/bottles", { method: "POST", body: bottleForm, headers: { Authorization: `Bearer ${auth}` } });
  assert.equal(bottle.response.status, 201);

  // Forbidden before GRAND_REVEAL
  const forbidden = await request("/api/reveal-data");
  assert.equal(forbidden.response.status, 403);

  await request("/api/host/state", { method: "PATCH", body: { state: "GRAND_REVEAL" }, headers: { Authorization: `Bearer ${auth}` } });

  const data = await request("/api/reveal-data");
  assert.equal(data.response.status, 200);
  assert.ok(Array.isArray(data.body.sommelier?.winners));
  assert.ok(typeof data.body.sommelier?.correctCount === "number");
  assert.ok(Array.isArray(data.body.podium));
  assert.ok(Array.isArray(data.body.revealAll));
  assert.ok(typeof data.body.groupAccuracy?.correct === "number");
  assert.ok(typeof data.body.theNumbers?.bottleCount === "number");
});
