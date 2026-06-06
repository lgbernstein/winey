import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

export const EVENT_STATES = ["REGISTRATION", "LIVE_TASTING", "GRAND_REVEAL", "ARCHIVE"];
export const GRAPES = [
  { name: "Cabernet Sauvignon", appellations: "Napa, Bordeaux blend" },
  { name: "Merlot", appellations: "Pomerol, Saint-Émilion" },
  { name: "Pinot Noir", appellations: "Burgundy, Sancerre Rouge" },
  { name: "Syrah / Shiraz", appellations: "Hermitage, Barossa" },
  { name: "Malbec", appellations: "Mendoza, Cahors" },
  { name: "Zinfandel", appellations: "California" },
  { name: "Chardonnay", appellations: "Burgundy, Chablis" },
  { name: "Sauvignon Blanc", appellations: "Sancerre, Marlborough" },
  { name: "Pinot Gris / Grigio", appellations: "Alsace, Veneto" },
  { name: "Red blend", appellations: "" },
  { name: "White blend", appellations: "" },
  { name: "Not sure", appellations: "" }
];

function uniqueGrapes(grapes) {
  const seen = new Set();
  return grapes.filter((grape) => {
    const key = grape.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const truthy = (value) => Boolean(Number(value));
const parseJson = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function bottleRow(row, includeReveal = false) {
  const base = {
    id: row.id,
    bagNumber: row.bag_number,
    voteCount: row.vote_count || 0
  };

  if (!includeReveal) {
    return base;
  }

  return {
    ...base,
    bottleName: row.bottle_name,
    grape: row.grape,
    producer: row.producer || "",
    region: row.region || "",
    vintage: row.vintage || "",
    photoUrl: row.photo_url || "",
    expertScore: row.professional_rating,
    expertCommentary: row.professional_commentary || "",
    isRevealed: truthy(row.is_revealed)
  };
}

function entryRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    displayName: row.display_name,
    bottleId: row.bottle_id,
    bagNumber: row.bag_number,
    rating: row.rating,
    grapeGuess: row.grape_guess,
    appearance: row.selected_appearance || "",
    nose: parseJson(row.selected_nose, []),
    palate: parseJson(row.palate_structure, {}),
    isBookmarked: truthy(row.is_bookmarked),
    timestamp: row.timestamp
  };
}

export function openWineDb({ dbFile }) {
  mkdirSync(dirname(dbFile), { recursive: true });
  const sqlite = new DatabaseSync(dbFile);
  sqlite.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      display_name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS wine_bottles (
      id INTEGER PRIMARY KEY,
      bag_number INTEGER NOT NULL UNIQUE,
      bottle_name TEXT NOT NULL,
      grape TEXT NOT NULL,
      producer TEXT,
      region TEXT,
      vintage TEXT,
      photo_url TEXT,
      professional_rating INTEGER,
      professional_commentary TEXT,
      coach_text TEXT,
      is_revealed BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tasting_entries (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      bottle_id INTEGER NOT NULL REFERENCES wine_bottles(id),
      rating INTEGER NOT NULL CHECK(rating BETWEEN 0 AND 5),
      grape_guess TEXT NOT NULL,
      selected_appearance TEXT,
      selected_nose TEXT,
      palate_structure TEXT,
      is_bookmarked BOOLEAN DEFAULT FALSE,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, bottle_id)
    );

    CREATE TABLE IF NOT EXISTS party_photos (
      id INTEGER PRIMARY KEY,
      uploaded_by_user_id INTEGER REFERENCES users(id),
      storage_url TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS event_state (
      id INTEGER PRIMARY KEY CHECK(id = 1),
      current_state TEXT NOT NULL,
      now_pouring_bag_number INTEGER,
      reveal_scene TEXT
    );

    INSERT OR IGNORE INTO event_state (id, current_state) VALUES (1, 'LIVE_TASTING');
  `);

  try { sqlite.exec("ALTER TABLE wine_bottles ADD COLUMN coach_text TEXT"); } catch { /* column exists */ }
  try { sqlite.exec("ALTER TABLE event_state ADD COLUMN now_pouring_bag_number INTEGER"); } catch { /* column exists */ }
  try { sqlite.exec("ALTER TABLE event_state ADD COLUMN reveal_scene TEXT"); } catch { /* column exists */ }

  const getStateStmt = sqlite.prepare("SELECT current_state FROM event_state WHERE id = 1");
  const guestRowsStmt = sqlite.prepare("SELECT id, display_name FROM users ORDER BY display_name COLLATE NOCASE");
  const addGuestStmt = sqlite.prepare("INSERT INTO users (display_name) VALUES (?)");
  const findGuestStmt = sqlite.prepare("SELECT id, display_name FROM users WHERE lower(display_name) = lower(?)");
  const bottleByBagStmt = sqlite.prepare("SELECT * FROM wine_bottles WHERE bag_number = ?");
  const bottleByIdStmt = sqlite.prepare("SELECT * FROM wine_bottles WHERE id = ?");
  const ratedBagsStmt = sqlite.prepare(`
    SELECT b.bag_number FROM tasting_entries t
    JOIN wine_bottles b ON b.id = t.bottle_id
    WHERE t.user_id = ?
  `);

  return {
    close: () => sqlite.close(),
    raw: sqlite,
    getState() {
      return getStateStmt.get().current_state;
    },
    setState(state) {
      sqlite.prepare("UPDATE event_state SET current_state = ? WHERE id = 1").run(state);
      sqlite.prepare("UPDATE wine_bottles SET is_revealed = ?").run(state === "GRAND_REVEAL" || state === "ARCHIVE" ? 1 : 0);
      if (state === "GRAND_REVEAL" || state === "ARCHIVE") {
        sqlite.prepare("UPDATE event_state SET now_pouring_bag_number = NULL, reveal_scene = NULL WHERE id = 1").run();
      }
      return this.getState();
    },
    getNowPouring() {
      const row = sqlite.prepare("SELECT now_pouring_bag_number FROM event_state WHERE id = 1").get();
      return row?.now_pouring_bag_number ?? null;
    },
    setNowPouring(bagNumber) {
      const value = bagNumber === null || bagNumber === undefined ? null : Number(bagNumber);
      sqlite.prepare("UPDATE event_state SET now_pouring_bag_number = ? WHERE id = 1").run(value);
      return value;
    },
    getRevealScene() {
      const row = sqlite.prepare("SELECT reveal_scene FROM event_state WHERE id = 1").get();
      return row?.reveal_scene ?? null;
    },
    setRevealScene(scene) {
      const allowed = ["sommelier", "podium", "reveal-all", "group-accuracy", "the-numbers", null];
      if (!allowed.includes(scene)) throw new Error("Invalid reveal scene.");
      sqlite.prepare("UPDATE event_state SET reveal_scene = ? WHERE id = 1").run(scene ?? null);
      return scene ?? null;
    },
    revealData() {
      sqlite.exec("BEGIN");
      try {
        // Sommelier: guest with most correct grape guesses
        const sommelierRows = sqlite.prepare(`
          SELECT u.display_name, COUNT(*) AS correct_count
          FROM tasting_entries t
          JOIN users u ON u.id = t.user_id
          JOIN wine_bottles b ON b.id = t.bottle_id
          WHERE lower(trim(t.grape_guess)) = lower(trim(b.grape))
          GROUP BY t.user_id
          ORDER BY correct_count DESC
        `).all();
        const topCount = sommelierRows[0]?.correct_count ?? 0;
        const sommelierWinners = sommelierRows.filter(r => r.correct_count === topCount).map(r => r.display_name);
        const totalBottles = sqlite.prepare("SELECT COUNT(*) AS n FROM wine_bottles").get().n;

        // Podium: top 3 by average rating
        const podium = sqlite.prepare(`
          SELECT b.id, b.bag_number, b.bottle_name, b.producer, b.region, b.grape, b.photo_url, b.vintage,
                 b.professional_rating, b.professional_commentary,
                 ROUND(COALESCE(AVG(t.rating), 0), 2) AS avg_rating, COUNT(t.id) AS vote_count
          FROM wine_bottles b
          LEFT JOIN tasting_entries t ON t.bottle_id = b.id
          GROUP BY b.id
          ORDER BY avg_rating DESC, vote_count DESC, b.bag_number ASC
        `).all().filter((row, _i, arr) => {
          // Include all wines that share the top-3 rating levels so ties
          // don't cut off equally-loved bottles. Cap at 6 for screen fit.
          const top3Ratings = [...new Set(arr.map(r => r.avg_rating))].slice(0, 3);
          return top3Ratings.includes(row.avg_rating);
        }).slice(0, 6).map((row, i) => ({
          rank: i + 1,
          bagNumber: row.bag_number,
          bottleName: row.bottle_name || "",
          producer: row.producer || "",
          region: row.region || "",
          grape: row.grape || "",
          photoUrl: row.photo_url || null,
          vintage: row.vintage || "",
          professionalRating: row.professional_rating || null,
          professionalCommentary: row.professional_commentary || "",
          averageRating: row.avg_rating,
          voteCount: row.vote_count
        }));

        // Reveal all: all bottles in bag number order with top nose aromas
        const allEntries = sqlite.prepare(`
          SELECT t.bottle_id, t.selected_nose
          FROM tasting_entries t
        `).all();
        const revealAll = sqlite.prepare(`
          SELECT b.id, b.bag_number, b.bottle_name, b.producer, b.grape, b.photo_url, b.vintage,
                 ROUND(COALESCE(AVG(t.rating), 0), 2) AS avg_rating, COUNT(t.id) AS vote_count
          FROM wine_bottles b
          LEFT JOIN tasting_entries t ON t.bottle_id = b.id
          GROUP BY b.id
          ORDER BY b.bag_number ASC
        `).all().map(row => {
          const entries = allEntries.filter(e => e.bottle_id === row.id);
          const noseCounts = {};
          entries.forEach(e => {
            let noseArr = [];
            try { noseArr = JSON.parse(e.selected_nose || "[]"); } catch { /* ignore */ }
            noseArr.forEach(n => { noseCounts[n] = (noseCounts[n] || 0) + 1; });
          });
          const topNose = Object.entries(noseCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label]) => label);
          return {
            bagNumber: row.bag_number,
            bottleName: row.bottle_name || "",
            producer: row.producer || "",
            grape: row.grape || "",
            photoUrl: row.photo_url || null,
            vintage: row.vintage || "",
            averageRating: row.avg_rating,
            voteCount: row.vote_count,
            topNose
          };
        });

        // Group accuracy
        const accRow = sqlite.prepare(`
          SELECT
            COUNT(CASE WHEN lower(trim(t.grape_guess)) = lower(trim(b.grape)) THEN 1 END) AS correct,
            COUNT(*) AS total
          FROM tasting_entries t
          JOIN wine_bottles b ON b.id = t.bottle_id
        `).get();

        // The Numbers
        const numbersRow = sqlite.prepare(`
          SELECT COUNT(DISTINCT b.id) AS bottle_count,
                 COUNT(t.id) AS entry_count,
                 ROUND(COALESCE(AVG(t.rating), 0), 2) AS avg_rating
          FROM wine_bottles b
          LEFT JOIN tasting_entries t ON t.bottle_id = b.id
        `).get();

        // Consensus: per wine, what share of the room landed on the same answer,
        // averaged across wines. No "correct" answer — pure agreement.
        const consensusRows = sqlite.prepare(`
          SELECT bottle_id, rating, selected_nose, palate_structure FROM tasting_entries
        `).all();
        const entriesByBottle = {};
        consensusRows.forEach((e) => {
          (entriesByBottle[e.bottle_id] = entriesByBottle[e.bottle_id] || []).push(e);
        });
        const palateValue = (entry, metric) => {
          try { return (JSON.parse(entry.palate_structure || "{}") || {})[metric] || null; }
          catch { return null; }
        };
        // Share of the most-common value among defined answers (needs ≥2 opinions).
        const modalShare = (values) => {
          const defined = values.filter((v) => v !== null && v !== undefined && v !== "");
          if (defined.length < 2) return null;
          const counts = {};
          defined.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
          return Math.max(...Object.values(counts)) / defined.length;
        };
        // Aromas are multi-select: share of respondents picking the top aroma.
        const aromaShare = (entries) => {
          const counts = {};
          let respondents = 0;
          entries.forEach((e) => {
            let arr = [];
            try { arr = JSON.parse(e.selected_nose || "[]"); } catch { arr = []; }
            if (arr.length) { respondents += 1; arr.forEach((a) => { counts[a] = (counts[a] || 0) + 1; }); }
          });
          if (respondents < 2) return null;
          return Math.max(...Object.values(counts)) / respondents;
        };
        const averageAcross = (perBottle) => {
          const shares = [];
          Object.values(entriesByBottle).forEach((entries) => {
            const s = perBottle(entries);
            if (s !== null) shares.push(s);
          });
          if (!shares.length) return 0;
          return Math.round((shares.reduce((a, b) => a + b, 0) / shares.length) * 100);
        };
        const consensus = {
          aromas: averageAcross((entries) => aromaShare(entries)),
          sweetness: averageAcross((entries) => modalShare(entries.map((e) => palateValue(e, "Sweetness")))),
          acidity: averageAcross((entries) => modalShare(entries.map((e) => palateValue(e, "Acidity")))),
          tannins: averageAcross((entries) => modalShare(entries.map((e) => palateValue(e, "Tannins")))),
          body: averageAcross((entries) => modalShare(entries.map((e) => palateValue(e, "Body")))),
          ratings: averageAcross((entries) => modalShare(entries.map((e) => e.rating)))
        };

        const result = {
          sommelier: { winners: sommelierWinners, correctCount: topCount, totalBottles },
          podium,
          revealAll,
          groupAccuracy: { correct: accRow.correct, total: accRow.total, consensus },
          theNumbers: {
            bottleCount: numbersRow.bottle_count,
            entryCount: numbersRow.entry_count,
            averageRating: numbersRow.avg_rating
          }
        };
        sqlite.exec("COMMIT");
        return result;
      } catch (e) {
        sqlite.exec("ROLLBACK");
        throw e;
      }
    },
    listGuests() {
      return guestRowsStmt.all().map((row) => ({ id: row.id, displayName: row.display_name }));
    },
    ratedBagsFor(userId) {
      return ratedBagsStmt.all(userId).map((r) => r.bag_number);
    },
    addGuest(displayName) {
      const name = displayName.trim().replace(/\s+/g, " ");
      const found = findGuestStmt.get(name);
      if (found) {
        return { id: found.id, displayName: found.display_name };
      }
      const result = addGuestStmt.run(name);
      return { id: Number(result.lastInsertRowid), displayName: name };
    },
    updateGuest(id, displayName) {
      const name = displayName.trim().replace(/\s+/g, " ");
      if (!name) throw new Error("Name cannot be empty.");
      sqlite.prepare("UPDATE users SET display_name = ? WHERE id = ?").run(name, id);
      const row = sqlite.prepare("SELECT id, display_name FROM users WHERE id = ?").get(id);
      if (!row) throw new Error("Guest not found.");
      return { id: row.id, displayName: row.display_name };
    },
    nextBagNumber() {
      return sqlite.prepare("SELECT COALESCE(MAX(bag_number), 0) + 1 AS next FROM wine_bottles").get().next;
    },
    listGuessGrapes() {
      const scanned = sqlite.prepare(`
        SELECT grape
        FROM wine_bottles
        WHERE trim(grape) <> '' AND lower(trim(grape)) <> 'unknown'
        ORDER BY grape COLLATE NOCASE
      `).all().map((row) => ({ name: row.grape.trim(), appellations: "" }));
      return uniqueGrapes([...GRAPES, ...scanned]);
    },
    createBottle(input) {
      const bagNumber = this.nextBagNumber();
      const result = sqlite.prepare(`
        INSERT INTO wine_bottles
        (bag_number, bottle_name, grape, producer, region, vintage, photo_url, professional_rating, professional_commentary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        bagNumber,
        input.bottleName,
        input.grape,
        input.producer || null,
        input.region || null,
        input.vintage || null,
        input.photoUrl || null,
        input.expertScore ?? null,
        input.expertCommentary || null
      );
      return bottleRow(bottleByIdStmt.get(Number(result.lastInsertRowid)), true);
    },
    seedDemo() {
      const sampleBottles = [
        { bottleName: "Sunset Pinot Noir", grape: "Pinot Noir", producer: "Cedar Hollow", region: "Willamette", vintage: "2021", expertScore: 92, expertCommentary: "Silky and bright." },
        { bottleName: "Cedar Ridge Cabernet", grape: "Cabernet Sauvignon", producer: "Red Arbor", region: "Napa", vintage: "2019", expertScore: 95, expertCommentary: "Dark fruit with polished tannins." },
        { bottleName: "Stone Creek Merlot", grape: "Merlot", producer: "Stone Creek", region: "Columbia Valley", vintage: "2022", expertScore: 89, expertCommentary: "Soft, easy-drinking finish." },
        { bottleName: "Raven Syrah", grape: "Syrah / Shiraz", producer: "Ravenwood", region: "Barossa", vintage: "2020", expertScore: 94, expertCommentary: "Spice and velvet in every sip." },
        { bottleName: "Velvet Malbec", grape: "Malbec", producer: "Alta Mesa", region: "Mendoza", vintage: "2021", expertScore: 91, expertCommentary: "Plush black fruit and cocoa." },
        { bottleName: "Crimson Sangiovese", grape: "Sangiovese", producer: "Terra Bella", region: "Tuscany", vintage: "2022", expertScore: 88, expertCommentary: "Cherry and earth with crunchy acidity." },
        { bottleName: "Twilight Grenache", grape: "Grenache", producer: "Mourne Valley", region: "Rhone", vintage: "2021", expertScore: 87, expertCommentary: "Juicy raspberry with a soft finish." },
        { bottleName: "Chateau Verde Tempranillo", grape: "Tempranillo", producer: "Chateau Verde", region: "Rioja", vintage: "2018", expertScore: 93, expertCommentary: "Leather, plum, and spice." },
        { bottleName: "Golden Riesling", grape: "Not sure", producer: "Lakeview", region: "Mosel", vintage: "2023", expertScore: 86, expertCommentary: "Bright, floral, and refreshing." },
        { bottleName: "Shadow Zinfandel", grape: "Zinfandel", producer: "Caldera", region: "Paso Robles", vintage: "2020", expertScore: 90, expertCommentary: "Bold berry with toasted oak." },
        { bottleName: "Bright Pinot Gris", grape: "Not sure", producer: "Meadow Lane", region: "Alsace", vintage: "2023", expertScore: 85, expertCommentary: "Crisp citrus and minerality." },
        { bottleName: "Velour Cabernet Franc", grape: "Not sure", producer: "Black Oak", region: "Loire", vintage: "2020", expertScore: 89, expertCommentary: "Red currant and savory herbs." },
        { bottleName: "Copper Mourvedre", grape: "Not sure", producer: "Iron Gate", region: "Languedoc", vintage: "2021", expertScore: 88, expertCommentary: "Spicy, earthy, and rich." },
        { bottleName: "Sugar Plum Rosé", grape: "Not sure", producer: "Rose Hill", region: "Provence", vintage: "2023", expertScore: 84, expertCommentary: "Fresh strawberry and summer flowers." }
      ];
      const sampleGuests = ["Ari", "Mia", "Noah", "Sam", "Jess", "Taylor", "Kai", "June", "Maria", "Hannah"];
      const sampleTastings = [
        { guest: "Ari", bagNumber: 1, grapeGuess: "Pinot Noir", appearance: "Ruby", nose: ["Red Fruits (Cherry/Raspberry)"], palate: { Body: "Light" } },
        { guest: "Mia", bagNumber: 2, grapeGuess: "Cabernet Sauvignon", appearance: "Garnet", nose: ["Black Fruits (Blackberry/Plum)"], palate: { Tannins: "Medium (Velvety)" } },
        { guest: "Noah", bagNumber: 3, grapeGuess: "Merlot", appearance: "Purple", nose: ["Earth / Mineral"], palate: { Acidity: "Medium (Fresh)" } },
        { guest: "Sam", bagNumber: 4, grapeGuess: "Syrah / Shiraz", appearance: "Purple", nose: ["Spice / Oak (Vanilla/Pepper)"], palate: { Tannins: "High (Grippy)" } },
        { guest: "Jess", bagNumber: 5, grapeGuess: "Malbec", appearance: "Garnet", nose: ["Black Fruits (Blackberry/Plum)"], palate: { Body: "Full-Bodied" } },
        { guest: "Taylor", bagNumber: 6, grapeGuess: "Sangiovese", appearance: "Ruby", nose: ["Earth / Mineral"], palate: { Acidity: "High (Tart)" } },
        { guest: "Kai", bagNumber: 7, grapeGuess: "Grenache", appearance: "Purple", nose: ["Red Fruits (Cherry/Raspberry)"], palate: { Sweetness: "Off-Dry" } },
        { guest: "June", bagNumber: 8, grapeGuess: "Tempranillo", appearance: "Garnet", nose: ["Spice / Oak (Vanilla/Pepper)"], palate: { Tannins: "Medium (Velvety)" } },
        { guest: "Maria", bagNumber: 9, grapeGuess: "Not sure", appearance: "Ruby", nose: ["Red Fruits (Cherry/Raspberry)"], palate: { Sweetness: "Bone Dry" } },
        { guest: "Hannah", bagNumber: 10, grapeGuess: "Zinfandel", appearance: "Garnet", nose: ["Black Fruits (Blackberry/Plum)"], palate: { Body: "Full-Bodied" } },
        { guest: "Ari", bagNumber: 11, grapeGuess: "Not sure", appearance: "Purple", nose: ["Earth / Mineral"], palate: { Acidity: "Medium (Fresh)" } },
        { guest: "Sam", bagNumber: 12, grapeGuess: "Not sure", appearance: "Garnet", nose: ["Spice / Oak (Vanilla/Pepper)"], palate: { Sweetness: "Off-Dry" } },
        { guest: "Jess", bagNumber: 13, grapeGuess: "Not sure", appearance: "Purple", nose: ["Earth / Mineral"], palate: { Tannins: "High (Grippy)" } },
        { guest: "Taylor", bagNumber: 14, grapeGuess: "Not sure", appearance: "Ruby", nose: ["Red Fruits (Cherry/Raspberry)"], palate: { Body: "Medium" } },
        { guest: "June", bagNumber: 2, grapeGuess: "Cabernet Sauvignon", appearance: "Garnet", nose: ["Black Fruits (Blackberry/Plum)"], palate: { Body: "Full-Bodied" } },
        { guest: "Ari", bagNumber: 4, grapeGuess: "Syrah / Shiraz", appearance: "Purple", nose: ["Spice / Oak (Vanilla/Pepper)"], palate: { Tannins: "High (Grippy)" } },
        { guest: "Mia", bagNumber: 5, grapeGuess: "Malbec", appearance: "Purple", nose: ["Black Fruits (Blackberry/Plum)"], palate: { Body: "Full-Bodied" } }
      ];
      const ratingValue = () => Math.floor(Math.random() * 6);

      sqlite.exec("BEGIN");
      try {
        sqlite.prepare("DELETE FROM tasting_entries").run();
        sqlite.prepare("DELETE FROM wine_bottles").run();
        sqlite.prepare("UPDATE event_state SET current_state = 'LIVE_TASTING', now_pouring_bag_number = NULL WHERE id = 1").run();
        sqlite.prepare("UPDATE wine_bottles SET is_revealed = 0").run();

        sampleGuests.forEach((name) => this.addGuest(name));
        sampleBottles.forEach((bottle) => this.createBottle(bottle));
        sampleTastings.forEach((entry) => {
          const guest = this.addGuest(entry.guest);
          this.upsertTasting({
            userId: guest.id,
            bagNumber: entry.bagNumber,
            rating: ratingValue(),
            grapeGuess: entry.grapeGuess,
            appearance: entry.appearance,
            nose: entry.nose,
            palate: entry.palate,
            isBookmarked: false
          });
        });

        sqlite.exec("COMMIT");
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }

      return {
        state: this.getState(),
        bottles: this.listBlindBottles(),
        leaderboard: this.leaderboard(),
        guests: this.listGuests()
      };
    },
    updateBottle(id, input) {
      const current = bottleByIdStmt.get(id);
      if (!current) return null;
      sqlite.prepare(`
        UPDATE wine_bottles
        SET bottle_name = ?, grape = ?, producer = ?, region = ?, vintage = ?, photo_url = ?,
            professional_rating = ?, professional_commentary = ?
        WHERE id = ?
      `).run(
        input.bottleName ?? current.bottle_name,
        input.grape ?? current.grape,
        input.producer ?? current.producer,
        input.region ?? current.region,
        input.vintage ?? current.vintage,
        input.photoUrl ?? current.photo_url,
        input.expertScore ?? current.professional_rating,
        input.expertCommentary ?? current.professional_commentary,
        id
      );
      return bottleRow(bottleByIdStmt.get(id), true);
    },
    getBottleByBagNumber(bagNumber) {
      const row = bottleByBagStmt.get(Number(bagNumber));
      return row ? { ...bottleRow(row, true), coachText: row.coach_text || "" } : null;
    },
    setBottleCoachText(bottleId, coachText) {
      sqlite.prepare("UPDATE wine_bottles SET coach_text = ? WHERE id = ?").run(coachText, bottleId);
    },
    listBlindBottles() {
      return sqlite.prepare(`
        SELECT b.id, b.bag_number, COUNT(t.id) AS vote_count
        FROM wine_bottles b
        LEFT JOIN tasting_entries t ON t.bottle_id = b.id
        GROUP BY b.id
        ORDER BY b.bag_number
      `).all().map((row) => bottleRow(row));
    },
    listHostBottles() {
      return sqlite.prepare(`
        SELECT b.*, COUNT(t.id) AS vote_count
        FROM wine_bottles b
        LEFT JOIN tasting_entries t ON t.bottle_id = b.id
        GROUP BY b.id
        ORDER BY b.bag_number
      `).all().map((row) => bottleRow(row, true));
    },
    upsertTasting(input) {
      const bottle = bottleByBagStmt.get(input.bagNumber);
      if (!bottle) return null;
      sqlite.prepare(`
        INSERT INTO tasting_entries
        (user_id, bottle_id, rating, grape_guess, selected_appearance, selected_nose, palate_structure, is_bookmarked)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, bottle_id) DO UPDATE SET
          rating = excluded.rating,
          grape_guess = excluded.grape_guess,
          selected_appearance = excluded.selected_appearance,
          selected_nose = excluded.selected_nose,
          palate_structure = excluded.palate_structure,
          is_bookmarked = excluded.is_bookmarked,
          timestamp = CURRENT_TIMESTAMP
      `).run(
        input.userId,
        bottle.id,
        input.rating,
        input.grapeGuess,
        input.appearance || null,
        JSON.stringify(input.nose || []),
        JSON.stringify(input.palate || {}),
        input.isBookmarked ? 1 : 0
      );
      const row = sqlite.prepare(`
        SELECT t.*, u.display_name, b.bag_number
        FROM tasting_entries t
        JOIN users u ON u.id = t.user_id
        JOIN wine_bottles b ON b.id = t.bottle_id
        WHERE t.user_id = ? AND t.bottle_id = ?
      `).get(input.userId, bottle.id);
      return entryRow(row);
    },
    deletePhoto(id) {
      const row = sqlite.prepare("SELECT storage_url FROM party_photos WHERE id = ?").get(id);
      if (!row) return null;
      sqlite.prepare("DELETE FROM party_photos WHERE id = ?").run(id);
      return { storageUrl: row.storage_url };
    },
    addPhoto({ userId, storageUrl }) {
      const result = sqlite.prepare(`
        INSERT INTO party_photos (uploaded_by_user_id, storage_url) VALUES (?, ?)
      `).run(userId || null, storageUrl);
      return this.listPhotos().find((photo) => photo.id === Number(result.lastInsertRowid));
    },
    listPhotos() {
      return sqlite.prepare(`
        SELECT p.*, u.display_name
        FROM party_photos p
        LEFT JOIN users u ON u.id = p.uploaded_by_user_id
        ORDER BY p.timestamp DESC, p.id DESC
      `).all().map((row) => ({
        id: row.id,
        storageUrl: row.storage_url,
        displayName: row.display_name || "Guest",
        timestamp: row.timestamp
      }));
    },
    leaderboard() {
      const guesses = sqlite.prepare(`
        SELECT bottle_id, grape_guess, COUNT(*) AS count
        FROM tasting_entries
        GROUP BY bottle_id, grape_guess
        ORDER BY bottle_id, count DESC, grape_guess COLLATE NOCASE
      `).all().reduce((counts, row) => {
        counts[row.bottle_id] ||= [];
        counts[row.bottle_id].push({ label: row.grape_guess, count: row.count });
        return counts;
      }, {});
      return sqlite.prepare(`
        SELECT b.id, b.bag_number, COUNT(t.id) AS vote_count,
               ROUND(COALESCE(AVG(t.rating), 0), 2) AS average_rating
        FROM wine_bottles b
        LEFT JOIN tasting_entries t ON t.bottle_id = b.id
        GROUP BY b.id
        ORDER BY average_rating DESC, vote_count DESC, b.bag_number ASC
      `).all().map((row, index) => ({
        id: row.id,
        rank: index + 1,
        bagNumber: row.bag_number,
        voteCount: row.vote_count,
        averageRating: row.average_rating,
        grapeGuesses: guesses[row.id] || []
      }));
    },
    reveal() {
      const bottles = this.listHostBottles();
      const rows = sqlite.prepare(`
        SELECT t.*, u.display_name, b.bag_number
        FROM tasting_entries t
        JOIN users u ON u.id = t.user_id
        JOIN wine_bottles b ON b.id = t.bottle_id
        ORDER BY b.bag_number, u.display_name
      `).all().map(entryRow);

      return bottles.map((bottle) => {
        const entries = rows.filter((entry) => entry.bottleId === bottle.id);
        const grapeGuesses = Object.entries(entries.reduce((counts, entry) => {
          counts[entry.grapeGuess] = (counts[entry.grapeGuess] || 0) + 1;
          return counts;
        }, {})).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
        const appearance = Object.entries(entries.reduce((counts, entry) => {
          if (entry.appearance) counts[entry.appearance] = (counts[entry.appearance] || 0) + 1;
          return counts;
        }, {})).map(([label, count]) => ({ label, count }));
        const correctGuests = entries
          .filter((entry) => entry.grapeGuess.toLowerCase() === bottle.grape.toLowerCase())
          .map((entry) => entry.displayName);

        return {
          ...bottle,
          averageRating: entries.length ? Number((entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length).toFixed(2)) : 0,
          voteCount: entries.length,
          grapeGuesses,
          appearance,
          correctGuests
        };
      });
    }
  };
}

export function resolveDataPaths(dataDir = process.env.DATA_DIR || "./data") {
  const root = resolve(dataDir);
  return {
    root,
    dbFile: join(root, "wine-party.sqlite"),
    uploadRoot: join(root, "uploads"),
    bottleUploads: join(root, "uploads/bottles"),
    partyUploads: join(root, "uploads/photos")
  };
}
