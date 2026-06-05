# Grand Reveal Sequence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a host-controlled, scene-based grand reveal sequence with 5 acts: The Sommelier spotlight, Top 3 Bottles podium, Reveal All, How Did We Do?, and The Numbers.

**Architecture:** A `reveal_scene` column in `event_state` drives which TV scene renders. The host sends `PATCH /api/host/reveal-scene` from large phone buttons. The TV polls every 2s and switches scenes. The bottle flip is decoupled from auto-triggering — it only fires when `reveal_scene === "reveal-all"`.

**Tech Stack:** Node.js/Express, SQLite (node:sqlite), plain JS frontend, Tailwind CSS via src/styles.css

---

## File Map

| File | Changes |
|------|---------|
| `src/db.js` | Add `reveal_scene` column; `getRevealScene()`, `setRevealScene(scene)`, `revealData()` methods; reset on `setState()` |
| `src/server.js` | Add `revealScene` to bootstrap response; add `PATCH /api/host/reveal-scene`; add `GET /api/reveal-data` |
| `public/app.js` | TV scene routing; decouple flip; 5 scene render functions; host reveal panel |
| `src/styles.css` | Styles for all 5 reveal scenes |
| `test/app.test.js` | Tests for reveal-scene and reveal-data endpoints |

---

## Task 1: DB — reveal_scene persistence

**Files:**
- Modify: `src/db.js`

- [ ] **Step 1: Add migration and schema**

In `src/db.js`, after the existing `ALTER TABLE` migration block (around line 145), add:

```js
try { sqlite.exec("ALTER TABLE event_state ADD COLUMN reveal_scene TEXT"); } catch { /* column exists */ }
```

Also update the `CREATE TABLE IF NOT EXISTS event_state` statement to include the column:

```sql
CREATE TABLE IF NOT EXISTS event_state (
  id INTEGER PRIMARY KEY CHECK(id = 1),
  current_state TEXT NOT NULL,
  now_pouring_bag_number INTEGER,
  reveal_scene TEXT
);
```

- [ ] **Step 2: Reset reveal_scene in setState()**

In the `setState(state)` method (around line 165), add reset logic alongside the existing `now_pouring_bag_number` reset:

```js
setState(state) {
  sqlite.prepare("UPDATE event_state SET current_state = ? WHERE id = 1").run(state);
  sqlite.prepare("UPDATE wine_bottles SET is_revealed = ?").run(state === "GRAND_REVEAL" || state === "ARCHIVE" ? 1 : 0);
  if (state === "GRAND_REVEAL" || state === "ARCHIVE") {
    sqlite.prepare("UPDATE event_state SET now_pouring_bag_number = NULL, reveal_scene = NULL WHERE id = 1").run();
  }
  return this.getState();
},
```

- [ ] **Step 3: Add getRevealScene() and setRevealScene()**

After the `setNowPouring()` method, add:

```js
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
```

- [ ] **Step 4: Add revealData() method**

After `setRevealScene()`, add:

```js
revealData() {
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
    SELECT b.id, b.bag_number, b.bottle_name, b.producer, b.grape, b.photo_url, b.vintage,
           ROUND(COALESCE(AVG(t.rating), 0), 2) AS avg_rating, COUNT(t.id) AS vote_count
    FROM wine_bottles b
    LEFT JOIN tasting_entries t ON t.bottle_id = b.id
    GROUP BY b.id
    ORDER BY avg_rating DESC, vote_count DESC, b.bag_number ASC
    LIMIT 3
  `).all().map((row, i) => ({
    rank: i + 1,
    bagNumber: row.bag_number,
    bottleName: row.bottle_name || "",
    producer: row.producer || "",
    grape: row.grape || "",
    photoUrl: row.photo_url || null,
    vintage: row.vintage || "",
    averageRating: row.avg_rating,
    voteCount: row.vote_count
  }));

  // Reveal all: all bottles in bag number order with nose data
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

  return {
    sommelier: { winners: sommelierWinners, correctCount: topCount, totalBottles },
    podium,
    revealAll,
    groupAccuracy: { correct: accRow.correct, total: accRow.total },
    theNumbers: {
      bottleCount: numbersRow.bottle_count,
      entryCount: numbersRow.entry_count,
      averageRating: numbersRow.avg_rating
    }
  };
},
```

- [ ] **Step 5: Commit**

```bash
git add src/db.js
git commit -m "feat: add reveal_scene persistence and revealData() to db"
```

---

## Task 2: Server — new endpoints + bootstrap update

**Files:**
- Modify: `src/server.js`
- Modify: `test/app.test.js`

- [ ] **Step 1: Write failing tests**

In `test/app.test.js`, add a new test block after the existing tests:

```js
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

  // Add a bottle and tasting entry so there's data
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
node --test test/app.test.js 2>&1 | tail -20
```

Expected: FAIL — `reveal-scene endpoint` and `reveal-data endpoint` tests fail (routes don't exist yet).

- [ ] **Step 3: Add revealScene to bootstrap response**

In `src/server.js`, find the `/api/bootstrap` handler (the one that returns `db.bootstrap()` or similar). The bootstrap data comes from `db.js`. Find where `getState()` is called in the bootstrap response.

In `src/db.js`, find `bootstrap()` or the object returned for bootstrap. In `db.js` around line 294:

```js
return {
  state: this.getState(),
  nowPouring: this.getNowPouring(),
  revealScene: this.getRevealScene(),   // ADD THIS LINE
  leaderboard: this.leaderboard(),
  ...
};
```

- [ ] **Step 4: Add PATCH /api/host/reveal-scene**

In `src/server.js`, after the `PATCH /api/host/now-pouring` block, add:

```js
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
  res.json({ revealScene });
});
```

- [ ] **Step 5: Add GET /api/reveal-data**

After the `/api/reveal` handler, add:

```js
app.get("/api/reveal-data", (_req, res) => {
  if (!["GRAND_REVEAL", "ARCHIVE"].includes(db.getState())) {
    res.status(403).json({ error: "Reveal has not started." });
    return;
  }
  res.json(db.revealData());
});
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
node --test test/app.test.js 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/server.js src/db.js test/app.test.js
git commit -m "feat: add reveal-scene and reveal-data endpoints"
```

---

## Task 3: Client — TV scene routing + decouple flip

**Files:**
- Modify: `public/app.js`

- [ ] **Step 1: Add revealData to state and fetch it**

Near the top of `app.js` where `state` is defined, add `revealData: null` to the state object:

```js
// Find the state object initialization and add:
revealData: null,
```

In the `refresh()` function, fetch reveal data when entering GRAND_REVEAL:

```js
async function refresh({ photos = false, reveal = false, host = false } = {}) {
  state.bootstrap = await api("/api/bootstrap");
  if (photos) state.photos = await api("/api/photos");
  if (reveal && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
    state.reveal = await api("/api/reveal");
    state.revealData = await api("/api/reveal-data");
  }
  if (host && hostToken()) state.host = await api("/api/host/dashboard", { host: true });
  render();
}
```

Also fetch revealData in the polling loop. Find where the regular poll runs (the `setInterval` or similar). When `state.bootstrap.state` is `GRAND_REVEAL` or `ARCHIVE` and `state.revealData` is null, fetch it:

```js
// In the poll tick, after fetching bootstrap:
if (["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state) && !state.revealData) {
  state.revealData = await api("/api/reveal-data");
}
```

- [ ] **Step 2: Decouple triggerRevealFlip from auto-fire**

Find the post-render block (around line 853):

```js
if (state.view === "tv" && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state) && state.reveal.length) {
  triggerRevealFlip();
} else if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
  revealFlipDone = false;
}
```

Change to only fire when scene is `reveal-all`:

```js
if (state.view === "tv" && state.bootstrap.revealScene === "reveal-all" && state.reveal.length) {
  triggerRevealFlip();
} else if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
  revealFlipDone = false;
}
```

- [ ] **Step 3: Route TV scenes in tvView()**

Find `function tvView()` and replace its body with:

```js
function tvView() {
  const eventState = state.bootstrap.state;
  const scene = state.bootstrap.revealScene;

  if ((eventState === "GRAND_REVEAL" || eventState === "ARCHIVE") && scene) {
    return renderRevealScene(scene);
  }

  // Live board (LIVE_TASTING or GRAND_REVEAL standby)
  return `
    ${tvHeroMarkup()}
    ${panel(`
      ${state.demoBoard ? `<div class="mb-5 flex justify-end"><button class="tap-quiet" id="stop-demo" type="button">Stop demo</button></div>` : ""}
      ${state.demoBoard ? `<div class="mb-4 rounded-2xl border border-amber-200/20 bg-amber-950/20 p-4 text-amber-100">Demo vote mode is active. Watch bottles move as the crowd ranks them.</div>` : ""}
      ${boardMarkup(state.bootstrap.leaderboard)}
    `)}
    ${eventState === "GRAND_REVEAL" || eventState === "ARCHIVE" ? panel(`<h2 class="text-3xl font-semibold">Grand reveal</h2>${revealMarkup()}`, "mt-4") : ""}
  `;
}
```

- [ ] **Step 4: Add renderRevealScene() dispatcher**

Add before `tvView()`:

```js
function renderRevealScene(scene) {
  const data = state.revealData;
  if (!data) return `<div class="reveal-scene-shell"><p class="reveal-loading">Loading…</p></div>`;
  switch (scene) {
    case "sommelier": return renderSommelierScene(data.sommelier);
    case "podium": return renderPodiumScene(data.podium);
    case "reveal-all": return renderRevealAllScene(data.revealAll);
    case "group-accuracy": return renderGroupAccuracyScene(data.groupAccuracy, data.theNumbers);
    case "the-numbers": return renderTheNumbersScene(data.theNumbers);
    default: return `<div class="reveal-scene-shell"></div>`;
  }
}
```

- [ ] **Step 5: Reset revealData on state transition out of GRAND_REVEAL**

In the poll tick, when state leaves GRAND_REVEAL:

```js
if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
  state.revealData = null;
}
```

- [ ] **Step 6: Commit**

```bash
git add public/app.js
git commit -m "feat: wire TV scene routing and decouple reveal flip"
```

---

## Task 4: Client — Sommelier scene

**Files:**
- Modify: `public/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add renderSommelierScene()**

```js
function renderSommelierScene(sommelier) {
  const { winners, correctCount, totalBottles } = sommelier;
  const hasWinner = correctCount > 0;
  const winnerText = winners.length === 1
    ? escapeHtml(winners[0])
    : winners.map(escapeHtml).join(" &amp; ");
  const subtextBase = hasWinner
    ? `Correctly identified ${correctCount} of ${totalBottles} grape ${totalBottles === 1 ? "variety" : "varieties"}`
    : "The grapes kept their secrets tonight.";
  return `
    <div class="reveal-scene-shell reveal-sommelier">
      <div class="reveal-sommelier-inner">
        <div class="reveal-scene-trophy">🏆</div>
        <p class="reveal-scene-kicker">The Sommelier</p>
        <h2 class="reveal-sommelier-name">${hasWinner ? winnerText : "No correct guesses"}</h2>
        <p class="reveal-scene-sub">${subtextBase}</p>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Add Sommelier CSS to src/styles.css**

```css
.reveal-scene-shell {
  @apply flex min-h-screen items-center justify-center bg-stone-950 text-amber-50;
}
.reveal-scene-trophy {
  @apply text-8xl mb-4;
}
.reveal-scene-kicker {
  @apply text-amber-400 text-xl font-semibold tracking-widest uppercase mb-2;
}
.reveal-scene-sub {
  @apply text-amber-100/70 text-2xl mt-4;
}
.reveal-sommelier-inner {
  @apply text-center px-8 max-w-3xl;
}
.reveal-sommelier-name {
  @apply text-6xl font-bold text-amber-300 mt-2 leading-tight;
}
```

- [ ] **Step 3: Build CSS**

```bash
npm run build:css
```

- [ ] **Step 4: Commit**

```bash
git add public/app.js src/styles.css
git commit -m "feat: add Sommelier reveal scene"
```

---

## Task 5: Client — Podium scene

**Files:**
- Modify: `public/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add podium reveal state**

Near the top of `app.js` with other state variables, add:

```js
let podiumStep = 0; // 0 = nothing shown, 1 = 3rd, 2 = 2nd, 3 = 1st
let podiumTimer = null;
```

- [ ] **Step 2: Add renderPodiumScene()**

```js
function renderPodiumScene(podium) {
  // podium is sorted rank 1,2,3 — display in reverse (3rd first)
  const ordered = [...podium].sort((a, b) => b.rank - a.rank); // 3rd, 2nd, 1st
  const cards = ordered.map((bottle, i) => {
    const visible = podiumStep >= (i + 1);
    const isFirst = bottle.rank === 1;
    const photo = bottle.photoUrl
      ? `<img class="podium-card-photo" src="${escapeHtml(bottle.photoUrl)}" alt="${escapeHtml(bottle.bottleName)}" loading="lazy">`
      : `<div class="podium-card-no-photo">#${bottle.bagNumber}</div>`;
    const stars = "★".repeat(Math.round(bottle.averageRating)) + "☆".repeat(5 - Math.round(bottle.averageRating));
    return `
      <div class="podium-card ${isFirst ? "podium-card-first" : ""} ${visible ? "podium-card-visible" : ""}">
        <p class="podium-rank-label">${["", "🥇 1st", "🥈 2nd", "🥉 3rd"][bottle.rank]}</p>
        ${photo}
        <div class="podium-card-info">
          <h3 class="podium-card-name">${escapeHtml(bottle.bottleName || `Sleeve ${bottle.bagNumber}`)}</h3>
          <p class="podium-card-producer">${escapeHtml([bottle.producer, bottle.vintage].filter(Boolean).join(" · "))}</p>
          <p class="podium-card-grape">${escapeHtml(bottle.grape)}</p>
          <p class="podium-card-rating">${stars} ${Number(bottle.averageRating).toFixed(1)}</p>
        </div>
      </div>
    `;
  });
  return `
    <div class="reveal-scene-shell reveal-podium">
      <p class="reveal-scene-kicker reveal-podium-kicker">Top 3 Bottles</p>
      <div class="podium-cards">${cards.join("")}</div>
    </div>
  `;
}
```

- [ ] **Step 3: Start podium timer when scene becomes "podium"**

In the render post-effects block (after the main `render()` body), add podium auto-advance logic. Find the section that runs after `document.querySelector("#app").innerHTML = markup` and add:

```js
// Podium auto-advance
if (state.view === "tv" && state.bootstrap.revealScene === "podium") {
  if (!podiumTimer && podiumStep < 3) {
    podiumTimer = setInterval(() => {
      podiumStep++;
      render();
      if (podiumStep >= 3) {
        clearInterval(podiumTimer);
        podiumTimer = null;
      }
    }, 2500);
  }
} else {
  if (podiumTimer) { clearInterval(podiumTimer); podiumTimer = null; }
  podiumStep = 0;
}
```

- [ ] **Step 4: Add Podium CSS to src/styles.css**

```css
.reveal-podium {
  @apply flex-col gap-6;
}
.reveal-podium-kicker {
  @apply text-amber-400 text-xl font-semibold tracking-widest uppercase;
}
.podium-cards {
  @apply flex gap-6 items-end justify-center flex-wrap px-8;
}
.podium-card {
  @apply flex flex-col items-center bg-stone-900 border border-amber-100/15 rounded-2xl p-5 w-64 opacity-0 translate-y-8 transition-all duration-700;
}
.podium-card-visible {
  @apply opacity-100 translate-y-0;
}
.podium-card-first {
  @apply border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.2)];
}
.podium-rank-label {
  @apply text-2xl font-bold mb-3;
}
.podium-card-photo {
  @apply w-full aspect-[3/4] object-cover rounded-xl mb-4;
}
.podium-card-no-photo {
  @apply w-full aspect-[3/4] flex items-center justify-center rounded-xl bg-stone-800 text-4xl font-bold mb-4;
}
.podium-card-info {
  @apply text-center w-full;
}
.podium-card-name {
  @apply text-lg font-bold text-amber-100 leading-snug;
}
.podium-card-producer {
  @apply text-sm text-amber-100/60 mt-1;
}
.podium-card-grape {
  @apply text-sm text-amber-300 mt-1;
}
.podium-card-rating {
  @apply text-amber-400 mt-2 text-lg;
}
```

- [ ] **Step 5: Build CSS**

```bash
npm run build:css
```

- [ ] **Step 6: Commit**

```bash
git add public/app.js src/styles.css
git commit -m "feat: add Top 3 Bottles podium reveal scene"
```

---

## Task 6: Client — Reveal All scene

**Files:**
- Modify: `public/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add renderRevealAllScene()**

```js
function renderRevealAllScene(revealAll) {
  const bottles = revealAll.map(bottle => {
    const photo = bottle.photoUrl
      ? `<img class="revealed-bottle-photo" src="${escapeHtml(bottle.photoUrl)}" alt="${escapeHtml(bottle.bottleName)}" loading="lazy">`
      : `<div class="revealed-bottle-no-photo">#${bottle.bagNumber}</div>`;
    return `
      <div class="bottle-flip">
        <div class="bottle-flip-inner" data-flip-bag="${bottle.bagNumber}">
          <div class="bottle-flip-front">
            <div class="blind-bottle reveal-all-blind">
              <div class="bottle-lip"></div>
              <div class="bottle-neck"></div>
              <div class="bottle-shoulders"></div>
              <div class="bottle-body">
                <span class="bag-number">${bottle.bagNumber}</span>
              </div>
            </div>
          </div>
          <div class="bottle-flip-back">
            <div class="revealed-bottle">
              ${photo}
              <div class="revealed-bottle-info">
                <p class="revealed-bottle-name">${escapeHtml(bottle.bottleName || `Sleeve ${bottle.bagNumber}`)}</p>
                <p class="revealed-bottle-grape">${escapeHtml(bottle.grape)}</p>
                <p class="revealed-bottle-score">${Number(bottle.averageRating).toFixed(1)} / 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  return `
    <div class="reveal-scene-shell reveal-all-shell">
      <p class="reveal-scene-kicker mb-6">The Wines</p>
      <div class="tv-bottle-grid reveal-all-grid">${bottles.join("")}</div>
    </div>
  `;
}
```

Note: `triggerRevealFlip()` will fire automatically after render because it's wired to `revealScene === "reveal-all"` in the post-render block (Task 3, Step 2). But `triggerRevealFlip()` reads from `state.reveal` — ensure `state.reveal` is populated. Update `triggerRevealFlip()` to also accept revealData:

```js
function triggerRevealFlip() {
  if (revealFlipDone) return;
  const bottles = state.revealData?.revealAll || state.reveal;
  if (!bottles.length) return;
  const revealMap = new Map(bottles.map((b) => [String(b.bagNumber), b]));
  const inners = document.querySelectorAll(".bottle-flip-inner");
  if (!inners.length) return;
  revealFlipDone = true;
  inners.forEach((inner) => {
    const bottle = revealMap.get(inner.dataset.flipBag);
    if (!bottle) return;
    inner.querySelector(".bottle-flip-back").innerHTML = revealedBottleMarkup(bottle);
    const delay = Math.random() * 160;
    setTimeout(() => inner.classList.add("flipped"), delay);
  });
}
```

- [ ] **Step 2: Add Reveal All CSS to src/styles.css**

```css
.reveal-all-shell {
  @apply flex-col pt-8 pb-8 px-4;
}
.reveal-all-grid {
  @apply grid gap-4;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}
.reveal-all-blind {
  @apply scale-75;
}
```

- [ ] **Step 3: Build CSS**

```bash
npm run build:css
```

- [ ] **Step 4: Commit**

```bash
git add public/app.js src/styles.css
git commit -m "feat: add Reveal All scene with bottle flip"
```

---

## Task 7: Client — Group Accuracy + The Numbers scenes

**Files:**
- Modify: `public/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add renderGroupAccuracyScene()**

```js
function renderGroupAccuracyScene(groupAccuracy) {
  const { correct, total } = groupAccuracy;
  const pct = total > 0 ? correct / total : 0;
  const comment = pct >= 0.7
    ? "Impressive palates in this room."
    : pct >= 0.4
    ? "A respectable showing."
    : "The wines kept their secrets well.";
  return `
    <div class="reveal-scene-shell reveal-group-accuracy">
      <div class="text-center px-8 max-w-2xl">
        <div class="reveal-scene-trophy">🎯</div>
        <p class="reveal-scene-kicker">How Did We Do?</p>
        <p class="reveal-accuracy-number">${correct} <span class="reveal-accuracy-of">of</span> ${total}</p>
        <p class="reveal-accuracy-label">grapes correctly identified</p>
        <p class="reveal-scene-sub mt-6">${comment}</p>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Add renderTheNumbersScene()**

```js
function renderTheNumbersScene(theNumbers) {
  const { bottleCount, entryCount, averageRating } = theNumbers;
  const stats = [
    { value: bottleCount, label: "bottles tasted" },
    { value: entryCount, label: "tasting notes submitted" },
    { value: Number(averageRating).toFixed(1) + " / 5", label: "average rating" }
  ];
  return `
    <div class="reveal-scene-shell reveal-the-numbers">
      <div class="text-center w-full max-w-4xl px-8">
        <p class="reveal-scene-kicker">The Numbers</p>
        <div class="numbers-grid mt-10">
          ${stats.map(s => `
            <div class="numbers-stat">
              <p class="numbers-value">${s.value}</p>
              <p class="numbers-label">${s.label}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
```

- [ ] **Step 3: Add CSS for both scenes to src/styles.css**

```css
.reveal-accuracy-number {
  @apply text-8xl font-bold text-amber-300 mt-4 leading-none;
}
.reveal-accuracy-of {
  @apply text-4xl text-amber-100/60 font-normal;
}
.reveal-accuracy-label {
  @apply text-2xl text-amber-100/70 mt-3;
}
.numbers-grid {
  @apply grid grid-cols-3 gap-8;
}
.numbers-stat {
  @apply flex flex-col items-center;
}
.numbers-value {
  @apply text-6xl font-bold text-amber-300;
}
.numbers-label {
  @apply text-xl text-amber-100/70 mt-2;
}
```

- [ ] **Step 4: Build CSS**

```bash
npm run build:css
```

- [ ] **Step 5: Commit**

```bash
git add public/app.js src/styles.css
git commit -m "feat: add Group Accuracy and The Numbers reveal scenes"
```

---

## Task 8: Client — Host reveal panel

**Files:**
- Modify: `public/app.js`

- [ ] **Step 1: Add setRevealScene() API helper**

In the event handler section of `app.js`, add a handler for reveal scene buttons. Find where other host action buttons are handled (look for `data-event-state` or similar data attributes). Add:

```js
// In the click/tap handler block, add case for reveal scene buttons:
if (el.dataset.revealScene !== undefined) {
  const scene = el.dataset.revealScene || null;
  await api("/api/host/reveal-scene", {
    method: "PATCH",
    body: { scene },
    host: true
  });
  await refresh({ host: true });
  return;
}
```

- [ ] **Step 2: Add reveal sequence panel to hostView()**

Find the `hostView()` function. After the state control buttons section, add a conditional reveal sequence section. Find the block that renders the `GRAND_REVEAL` button and add after it:

```js
${state.bootstrap.state === "GRAND_REVEAL" || state.bootstrap.state === "ARCHIVE" ? `
  ${panel(`
    <h2 class="text-xl font-semibold mb-4">Reveal Sequence</h2>
    <div class="reveal-host-buttons">
      ${[
        { scene: "sommelier",       label: "🏆 The Sommelier" },
        { scene: "podium",          label: "🥇 Top 3 Bottles" },
        { scene: "reveal-all",      label: "🍷 Reveal All" },
        { scene: "group-accuracy",  label: "🎯 How Did We Do?" },
        { scene: "the-numbers",     label: "📊 The Numbers" }
      ].map(({ scene, label }) => `
        <button
          class="reveal-host-btn ${state.bootstrap.revealScene === scene ? "reveal-host-btn-active" : ""}"
          data-reveal-scene="${scene}"
          type="button"
        >${label}</button>
      `).join("")}
      ${state.bootstrap.revealScene ? `
        <button class="reveal-host-btn-clear" data-reveal-scene="" type="button">✕ Clear scene</button>
      ` : ""}
    </div>
  `, "mt-4")}
` : ""}
```

- [ ] **Step 3: Add host reveal panel CSS to src/styles.css**

```css
.reveal-host-buttons {
  @apply flex flex-col gap-3;
}
.reveal-host-btn {
  @apply w-full rounded-xl border border-amber-200/30 bg-stone-900 px-6 py-5 text-left text-xl font-semibold text-amber-100 transition-colors hover:bg-stone-800 active:bg-stone-700;
  min-height: 64px;
}
.reveal-host-btn-active {
  @apply border-amber-400 bg-amber-950 text-amber-300;
}
.reveal-host-btn-clear {
  @apply w-full rounded-xl border border-rose-400/30 bg-stone-900 px-6 py-4 text-left text-base text-rose-300 hover:bg-stone-800;
}
```

- [ ] **Step 4: Build JS and CSS**

```bash
npm run build:js && npm run build:css
```

- [ ] **Step 5: Run full test suite**

```bash
node --test test/app.test.js 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add public/app.js src/styles.css public/app.legacy.js
git commit -m "feat: add host reveal sequence control panel"
```

---

## Task 9: Verify end-to-end + push

- [ ] **Step 1: Start server**

```bash
npm run dev
```

- [ ] **Step 2: Verify reveal panel appears on host view**

Open `http://localhost:3737?view=host`, enter host PIN, transition to GRAND_REVEAL state. Confirm the "Reveal Sequence" panel appears with 5 large buttons.

- [ ] **Step 3: Verify each scene on TV view**

Open `http://localhost:3737?view=tv` in a second tab. On the host view, tap each scene button in sequence. Verify:
- "The Sommelier" → spotlight with trophy, name, correct count
- "Top 3 Bottles" → podium cards appear one at a time (3rd → 2nd → 1st)
- "Reveal All" → bottle grid appears in bag number order, bottles flip
- "How Did We Do?" → group accuracy stat
- "The Numbers" → 3 stat cards
- "✕ Clear scene" → TV returns to board

- [ ] **Step 4: Verify grape badge on live view shows count**

Return to LIVE_TASTING state. Confirm grape badges read "N × GrapeName" format.

- [ ] **Step 5: Push**

```bash
git push
```

---

## Task 10 (Optional): Tasting notes teaching moment

**Decision gate:** Build 3 sample cards. Show to host. Include or cut based on feel in the room.

The `revealAll` data already includes `topNose` (top 3 detected aromas per bottle). Also add a `GRAPE_NOTES` lookup table in `app.js`:

```js
const GRAPE_NOTES = {
  "Cabernet Sauvignon": "Typical: black currant, cedar, firm tannins",
  "Merlot": "Typical: plum, chocolate, soft tannins",
  "Pinot Noir": "Typical: red cherry, earth, silky tannins",
  "Syrah / Shiraz": "Typical: dark fruit, pepper, smoky",
  "Malbec": "Typical: plum, violet, velvety tannins",
  "Zinfandel": "Typical: blackberry, spice, high alcohol",
  "Sangiovese": "Typical: cherry, tomato leaf, high acidity",
  "Nebbiolo": "Typical: tar, roses, high tannins",
  "Tempranillo": "Typical: leather, dried fig, oak",
  "Grenache": "Typical: red fruit, herbs, spice",
  "Chardonnay": "Typical: apple, butter, vanilla (if oaked)",
  "Sauvignon Blanc": "Typical: grapefruit, grass, mineral",
  "Riesling": "Typical: peach, petrol (with age), high acidity",
};
```

Add a `teachingNote` field to each `renderRevealAllScene` card:

```js
const teachingNote = GRAPE_NOTES[bottle.grape];
const noseText = bottle.topNose.length ? `Your group detected: ${bottle.topNose.join(", ")}` : "";
// Add to card:
`${noseText ? `<p class="teaching-nose">${escapeHtml(noseText)}</p>` : ""}
 ${teachingNote ? `<p class="teaching-grape-note">${escapeHtml(teachingNote)}</p>` : ""}`
```

Build 3 demo cards and show to host before committing.
