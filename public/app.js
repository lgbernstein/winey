function queryParam(name) {
  const match = location.search.match(new RegExp(`[?&]${name}=([^&]*)`));
  return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "";
}

function stateLabel(value) {
  return String(value || "").replace(/_/g, " ");
}

const state = {
  bootstrap: null,
  photos: [],
  reveal: [],
  host: null,
  selectedGuestId: localStorage.getItem("wineGuestId") || "",
  starRating: 0,
  view: queryParam("view") === "tv" ? "tv" : "taste",
  editBottleId: null,
  labelScanPending: false,
  lastLabelScan: null,
  demoBoard: null,
  demoVoteTimer: null,
  demoAnimationPending: false,
  demoScoreUpdates: [],
  charts: []
};

const views = [
  ["taste", "Taste"],
  ["album", "Album"],
  ["tv", "TV"],
  ["host", "Host"]
];
const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const toast = document.querySelector("#toast");
const hostToken = () => localStorage.getItem("wineHostToken") || "";
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function shuffleBoard(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

const DEMO_EVENT_DELAY = 3200;
const DEMO_GUESTS = ["Maria", "Hannah", "Ari", "Mia", "Noah", "Sam", "Jess", "Taylor", "Kai", "June"];

function cloneDemoBoard(items) {
  return [...items].map((item) => {
    const targetAverage = Number(item.averageRating || 3);
    const initial = Math.max(1.0, targetAverage - ((Math.floor(Math.random() * 15) + 7) / 10));
    return {
      ...item,
      targetAverageRating: targetAverage,
      targetVoteCount: Number(item.voteCount || 4),
      averageRating: Number(initial.toFixed(1)),
      voteCount: Math.max(1, Math.floor((Number(item.voteCount || 4) / 3) + Math.random() * 3)),
      voting: false
    };
  });
}

function clampRating(value) {
  return Number(Math.max(0.1, Math.min(5, value)).toFixed(1));
}

function pickDemoTarget(board) {
  const sorted = [...board].sort((a, b) => b.averageRating - a.averageRating || b.voteCount - a.voteCount);
  const threshold = Math.random();
  const index = threshold < 0.6
    ? Math.floor(Math.sqrt(Math.random()) * sorted.length)
    : Math.floor(Math.random() * sorted.length);
  return { sorted, index };
}

function buildDemoEvent(board) {
  const sorted = [...board].sort((a, b) => b.averageRating - a.averageRating || b.voteCount - a.voteCount || a.bagNumber - b.bagNumber);
  if (sorted.length < 2) return null;
  const index = Math.floor(Math.random() * (sorted.length - 1));
  const above = sorted[index];
  const below = sorted[index + 1];
  const direction = Math.random() > 0.4 ? "raise" : "lower";

  const target = direction === "raise" ? below : above;
  const neighbor = direction === "raise" ? above : below;
  const ratingStep = 0.2 + Math.random() * 0.15;
  const newRating = direction === "raise"
    ? clampRating(neighbor.averageRating + ratingStep)
    : clampRating(neighbor.averageRating - ratingStep);

  return {
    bagNumber: target.bagNumber,
    guest: DEMO_GUESTS[Math.floor(Math.random() * DEMO_GUESTS.length)],
    direction,
    newRating,
    voteCountChange: 1,
    swapWith: neighbor.bagNumber
  };
}

function startDemoVoting() {
  if (state.demoVoteTimer || state.view !== "tv" || !state.demoBoard) return;
  runDemoVoteStep();
}

function runDemoVoteStep() {
  if (state.view !== "tv" || !state.demoBoard) {
    if (state.demoVoteTimer) {
      clearTimeout(state.demoVoteTimer);
      state.demoVoteTimer = null;
    }
    return;
  }

  const beforeOrder = state.demoBoard.map((item) => item.bagNumber).join(",");
  const event = buildDemoEvent(state.demoBoard);
  if (!event) return;

  state.demoBoard.forEach((item) => { item.moving = false; item.voting = false; });
  const target = state.demoBoard.find((item) => item.bagNumber === event.bagNumber);
  const changedBags = new Set();
  if (target) {
    target.voting = true;
    target.moving = true;
    target.averageRating = event.newRating;
    target.voteCount = target.voteCount + 1;
    changedBags.add(String(target.bagNumber));
    if (event.swapWith) {
      const neighbor = state.demoBoard.find((item) => item.bagNumber === event.swapWith);
      if (neighbor) {
        neighbor.moving = true;
        changedBags.add(String(neighbor.bagNumber));
      }
    }
  }

  state.demoBoard.sort((a, b) => b.averageRating - a.averageRating || b.voteCount - a.voteCount || a.bagNumber - b.bagNumber);
  state.demoScoreUpdates = [...changedBags];
  state.demoAnimationPending = true;
  state.demoVoteTimer = -1;
  render();

  state.demoVoteTimer = setTimeout(() => {
    if (!state.demoBoard || state.view !== "tv") {
      state.demoVoteTimer = null;
      return;
    }
    state.demoBoard.forEach((item) => { item.voting = false; item.moving = false; });
    render();
    runDemoVoteStep();
  }, DEMO_EVENT_DELAY);
}

async function api(url, options = {}) {
  const headers = { ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...options.headers };
  if (options.host) headers.Authorization = `Bearer ${hostToken()}`;
  const response = await fetch(url, { ...options, headers, body: options.body instanceof FormData ? options.body : options.body && JSON.stringify(options.body) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Request failed.");
  return payload;
}

function notice(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

function navMarkup() {
  nav.innerHTML = views.map(([id, label]) => `
    <button class="${state.view === id ? "tap-primary" : "tap-quiet"}" data-view="${id}" type="button">${label}</button>
  `).join("");
}

function choice(name, value, label, checked = false, type = "radio") {
  return `
    <label class="choice flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-amber-100/15 bg-stone-950/45 p-3 text-amber-50">
      <input class="size-5 accent-amber-300" type="${type}" name="${name}" value="${escapeHtml(value)}" ${checked ? "checked" : ""}>
      <span>${escapeHtml(label)}</span>
    </label>
  `;
}

function panel(content, classes = "") {
  return `<section class="panel rounded-lg p-4 sm:p-6 ${classes}">${content}</section>`;
}

function guestOptions() {
  return `
    <option value="">Select your name</option>
    ${state.bootstrap.guests.map((guest) => `<option value="${guest.id}" ${String(guest.id) === String(state.selectedGuestId) ? "selected" : ""}>${escapeHtml(guest.displayName)}</option>`).join("")}
  `;
}

function bottleOptions() {
  return `
    <option value="">Sleeve number</option>
    ${state.bootstrap.bottles.map((bottle) => `<option value="${bottle.bagNumber}">Bottle ${bottle.bagNumber}</option>`).join("")}
  `;
}

function stars() {
  return `
    <div class="rounded-md border border-amber-100/15 bg-stone-950/55 p-3" role="radiogroup" aria-label="Rating">
      <div class="flex flex-nowrap items-center justify-between gap-1 sm:justify-start sm:gap-2">
        ${[1, 2, 3, 4, 5].map((rating) => `
          <label class="cursor-pointer">
            <input class="peer sr-only" type="radio" name="rating" value="${rating}" aria-label="${rating} stars" ${state.starRating === rating ? "checked" : ""}>
            <span class="star-pick ${rating <= state.starRating ? "star-filled" : ""} flex size-10 items-center justify-center rounded-md text-4xl leading-none sm:size-12 sm:text-[2.75rem]" data-star="${rating}" aria-hidden="true">${rating <= state.starRating ? "★" : "☆"}</span>
          </label>
        `).join("")}
      </div>
      <span class="mt-1 block text-sm text-amber-50/80 sm:mt-2" data-rating-summary>${state.starRating ? `${state.starRating} / 5` : "Tap a star"}</span>
    </div>
  `;
}

function tastingGrid() {
  const grid = state.bootstrap.tastingGrid;
  return `
    <details class="mt-5 rounded-md border border-amber-100/15 bg-stone-950/35 p-4">
      <summary class="cursor-pointer text-base font-semibold text-amber-100">Optional tasting details</summary>
      <div class="mt-4 grid gap-5">
        <fieldset>
          <legend class="mb-2 font-semibold">Appearance</legend>
          <p class="tooltip-note mb-3">Assess the color and edge of the wine against a white background to judge age and variety.</p>
          <div class="grid gap-2 sm:grid-cols-2">${grid.appearances.map((item) => choice("appearance", item, item)).join("")}</div>
        </fieldset>
        <fieldset>
          <legend class="mb-2 font-semibold">Nose</legend>
          <p class="tooltip-note mb-3">Swirl the glass and take brief sniffs. Choose the aromatic profiles that stand out.</p>
          <div class="grid gap-2 sm:grid-cols-2">${grid.noses.map((item) => choice("nose", item, item, false, "checkbox")).join("")}</div>
        </fieldset>
        <fieldset>
          <legend class="mb-2 font-semibold">Palate</legend>
          <p class="tooltip-note mb-3">Notice structure on your tongue. Sweetness, acidity, tannins, and body describe feel more than flavor.</p>
          <div class="grid gap-4 lg:grid-cols-2">
            ${Object.entries(grid.palate).map(([metric, options]) => `
              <div>
                <p class="mb-2 text-sm font-bold text-amber-200">${escapeHtml(metric)}</p>
                <div class="grid gap-2">${options.map((item) => choice(`palate-${metric}`, item, item)).join("")}</div>
              </div>
            `).join("")}
          </div>
        </fieldset>
      </div>
    </details>
  `;
}

function tasteView() {
  if (state.bootstrap.state !== "LIVE_TASTING") {
    return panel(`
      <div class="mx-auto max-w-2xl py-8 text-center">
        <p class="kicker">Ratings closed</p>
        <h2 class="screen-title mt-2">The reveal is on</h2>
        <p class="mt-3 text-lg text-amber-50/80">Head to the TV view for the bottles, crowd scores, and grape-guess results.</p>
        <button class="tap-primary mt-6" data-view="tv" type="button">See grand reveal</button>
      </div>
    `);
  }
  return `
    <div class="grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
      ${panel(`
        <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="kicker">Fast tasting</p>
            <h2 class="screen-title">Rate the sleeve in a few taps</h2>
          </div>
          <span class="rounded-md bg-emerald-400/15 px-3 py-2 text-sm text-emerald-100">${escapeHtml(stateLabel(state.bootstrap.state))}</span>
        </div>
        <form id="tasting-form">
          <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label>
              <span class="mb-2 block text-sm font-bold text-amber-100">Taster</span>
              <select id="guest-select" class="field" required>${guestOptions()}</select>
            </label>
            <button class="tap-quiet self-end" id="show-guest-form" type="button">Add name</button>
          </div>
          <div id="guest-form" class="mt-3 hidden grid gap-2 sm:grid-cols-[1fr_auto]">
            <input class="field" name="displayName" maxlength="60" placeholder="Guest name" aria-label="Guest name">
            <button class="tap-primary" type="button" id="add-guest">Join tasting</button>
          </div>
          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <label>
              <span class="mb-2 block text-sm font-bold text-amber-100">Blind bottle</span>
              <select name="bagNumber" class="field" required>${bottleOptions()}</select>
            </label>
            <label>
              <span class="mb-2 block text-sm font-bold text-amber-100">Grape guess</span>
              <select name="grapeGuess" class="field" required>
                ${state.bootstrap.grapes.map((grape) => `<option>${escapeHtml(grape)}</option>`).join("")}
              </select>
            </label>
          </div>
          <fieldset class="mt-5">
            <legend class="mb-2 text-sm font-bold text-amber-100">Your rating</legend>
            ${stars()}
          </fieldset>
          <label class="mt-4 flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-rose-200/20 bg-rose-950/25 p-3">
            <input class="size-5 accent-rose-400" type="checkbox" name="isBookmarked">
            <span>Save this one as a favourite</span>
          </label>
          ${tastingGrid()}
          <button class="tap-primary mt-5 w-full text-lg" type="submit">Save tasting</button>
        </form>
      `)}
      ${panel(`
        <h2 class="text-xl font-semibold">Party pace</h2>
        <p class="mt-2 text-amber-50/80">The core score is only stars and a grape guess. Hand the kiosk to the next taster after save.</p>
        <div class="mt-5 grid gap-3">
          <div class="soft-stat rounded-md p-4">
            <p class="text-3xl font-semibold text-amber-300">${state.bootstrap.bottles.length}</p>
            <p class="text-amber-50/75">blind bottles checked in</p>
          </div>
          <div class="soft-stat rounded-md p-4">
            <p class="text-3xl font-semibold text-emerald-300">${state.bootstrap.guests.length}</p>
            <p class="text-amber-50/75">tasters on the list</p>
          </div>
        </div>
      `)}
    </div>
  `;
}

function photosMarkup() {
  if (!state.photos.length) return `<p class="rounded-md border border-amber-100/15 bg-stone-950/40 p-5 text-amber-50/75">The shared album is waiting for the first party photo.</p>`;
  return `<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${state.photos.map((photo) => `
    <figure class="overflow-hidden rounded-lg border border-amber-100/15 bg-stone-950/55">
      <img class="aspect-[4/3] w-full object-cover" src="${escapeHtml(photo.storageUrl)}" alt="Party photo uploaded by ${escapeHtml(photo.displayName)}">
      <figcaption class="px-3 py-2 text-sm text-amber-50/80">${escapeHtml(photo.displayName)}</figcaption>
    </figure>
  `).join("")}</div>`;
}

function albumView() {
  return panel(`
    <div class="mb-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="kicker">Shared album</p>
        <h2 class="screen-title">Photos from the evening</h2>
      </div>
      <form id="photo-form" class="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input class="field file:mr-3 file:rounded-md file:border-0 file:bg-emerald-300 file:px-3 file:py-2 file:font-semibold file:text-stone-950" type="file" name="photo" accept="image/*" capture="environment" required>
        <button class="tap-primary" type="submit">Upload</button>
      </form>
    </div>
    ${photosMarkup()}
  `);
}

function boardMarkup(items) {
  if (!items.length) return `<p class="rounded-md bg-stone-950/45 p-5 text-amber-50/75">Host check-in will put numbered sleeves on the board.</p>`;
  const visibleItems = state.demoBoard || items;
  const sorted = state.demoBoard ? visibleItems : [...visibleItems].sort((a, b) => {
    const left = a.voteCount ? a.averageRating : -1;
    const right = b.voteCount ? b.averageRating : -1;
    return right - left || a.bagNumber - b.bagNumber;
  });
  return `<ol class="tv-bottle-grid">${sorted.map((item) => `
    <li class="tv-rank tv-bottle-card${item.voting ? " voting" : ""}${item.moving ? " moving" : ""}" data-bag-number="${item.bagNumber}">
      <div class="blind-bottle" aria-label="Sleeve ${item.bagNumber}">
        <div class="blind-bottle-lip"></div>
        <div class="blind-bottle-neck"></div>
        <div class="blind-bottle-shoulders"></div>
        <div class="blind-bottle-body"><span>#${item.bagNumber}</span></div>
      </div>
      <p class="tv-bottle-score">${item.voteCount ? `${Number(item.averageRating).toFixed(1)} / 5` : "Awaiting ratings"}</p>
      <p class="text-sm text-amber-50/65">${item.voteCount} rating${item.voteCount === 1 ? "" : "s"}</p>
      <div class="mt-3 min-h-14">
        ${item.grapeGuesses.length ? `
          <div class="flex flex-wrap justify-center gap-1">
            ${item.grapeGuesses.slice(0, 4).map((guess) => `<span class="tv-guess-chip">${escapeHtml(guess.label)} ${guess.count}</span>`).join("")}
          </div>
        ` : ""}
      </div>
    </li>
  `).join("")}</ol>`;
}

function recordTvBoardPositions() {
  const board = document.querySelector(".tv-bottle-grid");
  if (!board) return null;
  return new Map([...board.querySelectorAll("[data-bag-number]")].map((item) => [item.dataset.bagNumber, item.getBoundingClientRect()]));
}

function animateTvBoard(oldPositions) {
  if (!oldPositions) return;
  const board = document.querySelector(".tv-bottle-grid");
  if (!board) return;
  board.querySelectorAll("[data-bag-number]").forEach((item) => {
    const oldRect = oldPositions.get(item.dataset.bagNumber);
    if (!oldRect) return;
    const newRect = item.getBoundingClientRect();
    const dx = oldRect.left - newRect.left;
    const dy = oldRect.top - newRect.top;
    if (!dx && !dy) return;
    item.style.transform = `translate(${dx}px, ${dy}px)`;
    item.style.transition = "transform .75s cubic-bezier(0.22,1,0.36,1)";
    item.style.willChange = "transform";
    item.getBoundingClientRect();
    requestAnimationFrame(() => {
      item.style.transform = "";
      item.style.willChange = "";
    });
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateDemoScores() {
  const updates = new Set(state.demoScoreUpdates || []);
  if (!updates.size) return;
  const source = state.demoBoard || state.bootstrap.leaderboard;
  const targets = new Map(source.map((item) => [String(item.bagNumber), Number(item.averageRating)]));
  const cards = document.querySelectorAll(".tv-bottle-card");
  cards.forEach((card) => {
    const bagNumber = card.dataset.bagNumber;
    if (!updates.has(bagNumber)) return;
    const scoreNode = card.querySelector(".tv-bottle-score");
    if (!scoreNode) return;
    const target = targets.get(bagNumber);
    if (typeof target !== "number" || Number.isNaN(target)) return;
    scoreNode.textContent = `${target.toFixed(1)} / 5`;
    card.classList.add("score-animating");
    window.setTimeout(() => card.classList.remove("score-animating"), 700);
  });
  state.demoScoreUpdates = [];
}

function revealMarkup() {
  if (!state.reveal.length) return `<p class="rounded-md bg-stone-950/45 p-5">The host controls the grand reveal.</p>`;
  return `
    <div class="mt-5 grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
      <div class="grid gap-3">
        ${state.reveal.map((bottle) => `
          <article class="rounded-lg border border-amber-100/15 bg-stone-950/60 p-4">
            <div class="grid gap-3 sm:grid-cols-[110px_1fr]">
              ${bottle.photoUrl ? `<img class="aspect-[3/4] w-full rounded-md object-cover" src="${escapeHtml(bottle.photoUrl)}" alt="${escapeHtml(bottle.bottleName)} bottle">` : `<div class="flex aspect-[3/4] items-center justify-center rounded-md bg-stone-800 text-4xl">#${bottle.bagNumber}</div>`}
              <div>
                <p class="text-sm font-bold text-amber-300">Sleeve ${bottle.bagNumber}</p>
                <h3 class="text-xl font-semibold">${escapeHtml(bottle.bottleName)}</h3>
                <p class="text-emerald-100">${escapeHtml([bottle.producer, bottle.vintage, bottle.region].filter(Boolean).join(" · "))}</p>
                <p class="mt-2"><strong>${escapeHtml(bottle.grape)}</strong> · Crowd ${Number(bottle.averageRating).toFixed(1)} / 5 · ${bottle.voteCount} votes</p>
              </div>
            </div>
            <p class="mt-3 text-amber-50/85">${escapeHtml(bottle.expertScore === null ? "Host note" : `Expert ${bottle.expertScore}/100`)}: ${escapeHtml(bottle.expertCommentary || "No expert note entered.")}</p>
            <p class="mt-2 text-sm text-rose-100">Correct grape guesses: ${escapeHtml(bottle.correctGuests.join(", ") || "No correct guesses yet")}</p>
          </article>
        `).join("")}
      </div>
      <div class="grid gap-4 content-start">
        <label class="rounded-lg border border-amber-100/15 bg-stone-950/60 p-4">
          <span class="mb-2 block font-semibold">Chart bottle</span>
          <select id="chart-bottle" class="field">${state.reveal.map((bottle) => `<option value="${bottle.id}">Sleeve ${bottle.bagNumber}: ${escapeHtml(bottle.bottleName)}</option>`).join("")}</select>
        </label>
        <div class="chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4"><canvas id="grape-chart" aria-label="Grape guesses chart"></canvas></div>
        <div class="chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4"><canvas id="appearance-chart" aria-label="Appearance chart"></canvas></div>
      </div>
    </div>
  `;
}

function tvView() {
  return `
    ${panel(`
      <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="kicker">Live standings</p>
          <h2 class="screen-title">Bottle race</h2>
          <p class="mt-2 text-amber-50/75">Sleeves move left-to-right by crowd rating. Bottle identities stay blind until reveal.</p>
        </div>
      </div>
      ${state.demoBoard ? `<div class="mb-4 rounded-2xl border border-amber-200/20 bg-amber-950/20 p-4 text-amber-100">Demo vote mode is active. Watch bottles move as the crowd ranks them.</div>` : ""}
      ${boardMarkup(state.bootstrap.leaderboard)}
    `)}
    ${state.bootstrap.state === "GRAND_REVEAL" || state.bootstrap.state === "ARCHIVE" ? panel(`<h2 class="text-3xl font-semibold">Grand reveal</h2>${revealMarkup()}`, "mt-4") : ""}
  `;
}

function hostBottleFields(bottle = {}) {
  return `
    <div class="grid gap-3 md:grid-cols-2">
      <label><span class="mb-1 block text-sm font-bold">Bottle name</span><input class="field" name="bottleName" value="${escapeHtml(bottle.bottleName)}" required></label>
      <label><span class="mb-1 block text-sm font-bold">Correct grape</span><input class="field" name="grape" value="${escapeHtml(bottle.grape)}" required></label>
      <label><span class="mb-1 block text-sm font-bold">Producer</span><input class="field" name="producer" value="${escapeHtml(bottle.producer)}"></label>
      <label><span class="mb-1 block text-sm font-bold">Region</span><input class="field" name="region" value="${escapeHtml(bottle.region)}"></label>
      <label><span class="mb-1 block text-sm font-bold">Vintage</span><input class="field" name="vintage" value="${escapeHtml(bottle.vintage)}"></label>
      <label><span class="mb-1 block text-sm font-bold">Expert score</span><input class="field" name="expertScore" inputmode="numeric" min="0" max="100" type="number" value="${escapeHtml(bottle.expertScore ?? "")}"></label>
    </div>
    <label class="mt-3 block"><span class="mb-1 block text-sm font-bold">Expert commentary</span><textarea class="field min-h-28" name="expertCommentary">${escapeHtml(bottle.expertCommentary)}</textarea></label>
    <label class="mt-3 block"><span class="mb-1 block text-sm font-bold">Bottle photo</span><input class="field file:mr-3 file:rounded-md file:border-0 file:bg-rose-200 file:px-3 file:py-2 file:font-semibold file:text-stone-950" name="photo" type="file" accept="image/*" capture="environment"></label>
  `;
}

function hostView() {
  if (!hostToken() || !state.host) {
    return panel(`
      <div class="mx-auto max-w-md">
        <p class="kicker">Host controls</p>
        <h2 class="screen-title">Unlock check-in and reveal</h2>
        <form id="host-login" class="mt-5 grid gap-3">
          <input class="field" name="pin" inputmode="numeric" autocomplete="one-time-code" placeholder="Host PIN" required>
          <button class="tap-primary" type="submit">Unlock</button>
        </form>
      </div>
    `);
  }
  const editing = state.host.bottles.find((bottle) => bottle.id === state.editBottleId);
  return `
    <div class="grid gap-4 xl:grid-cols-[1fr_.9fr]">
      ${panel(`
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="kicker">Host check-in</p>
            <h2 class="screen-title">${editing ? `Edit sleeve ${editing.bagNumber}` : "Scan arriving bottle"}</h2>
          </div>
          ${editing ? `<button class="tap-quiet" id="cancel-edit" type="button">New bottle</button>` : ""}
        </div>
        ${!editing ? `
          <form id="label-scan-form" class="mt-4 rounded-lg border border-rose-100/15 bg-rose-950/20 p-4">
            <input id="label-photo" class="sr-only" name="photo" type="file" accept="image/*" capture="environment" required>
            <label class="${state.labelScanPending ? "opacity-60" : ""} tap-primary w-full cursor-pointer text-lg" for="label-photo">
              ${state.labelScanPending ? "Reading label..." : "Scan label"}
            </label>
            <p class="mt-2 text-sm text-amber-50/70">Tap to open the camera. Winey scans the label, assigns the next sleeve, and saves the image for reveal.</p>
          </form>
          ${state.lastLabelScan ? `
            <div class="mt-3 rounded-lg border border-emerald-200/25 bg-emerald-950/45 p-4 text-emerald-50">
              <p class="text-sm font-bold uppercase text-emerald-200">Bottle checked in</p>
              <p class="mt-1 text-lg">Put this bottle in sleeve</p>
              <p class="text-7xl font-black text-amber-300">#${state.lastLabelScan.bagNumber}</p>
              <p class="mt-2 text-sm">Label scan confidence: ${escapeHtml(state.lastLabelScan.confidence)}.</p>
              ${state.lastLabelScan.notes ? `<p class="mt-1 text-sm">${escapeHtml(state.lastLabelScan.notes)}</p>` : ""}
              <button class="tap-quiet mt-3 w-full" data-edit-bottle="${state.lastLabelScan.bottleId}" type="button">Review bottle details</button>
            </div>
          ` : ""}
          <details class="mt-4 rounded-md border border-amber-100/15 bg-stone-950/35 p-4">
            <summary class="cursor-pointer font-semibold">Manual check-in</summary>
        ` : ""}
        <form id="bottle-form" class="mt-4">
          ${hostBottleFields(editing)}
          <button class="tap-primary mt-4 w-full" type="submit">${editing ? "Save bottle" : "Check in manually"}</button>
        </form>
        ${!editing ? "</details>" : ""}
      `)}
      ${panel(`
        <h2 class="text-2xl font-semibold">Event control</h2>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <button class="tap-quiet" data-event-state="LIVE_TASTING" type="button">Live tasting</button>
          <button class="tap-primary" data-event-state="GRAND_REVEAL" type="button">Grand reveal</button>
        </div>
        <button class="tap-quiet mt-3 w-full" id="seed-demo" type="button">Load 15-bottle demo</button>
        <p class="mt-4 rounded-md bg-emerald-400/15 p-3 text-emerald-50">Current state: ${escapeHtml(stateLabel(state.host.state))}</p>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <div class="rounded-md bg-stone-950/55 p-4"><p class="text-3xl text-amber-300">${state.host.bottles.length}</p><p>Bottles</p></div>
          <div class="rounded-md bg-stone-950/55 p-4"><p class="text-3xl text-emerald-300">${state.host.photos.length}</p><p>Party photos</p></div>
        </div>
      `)}
    </div>
    ${panel(`
      <h2 class="mb-4 text-2xl font-semibold">Checked-in bottles</h2>
      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        ${state.host.bottles.map((bottle) => `
          <article class="rounded-lg border border-amber-100/15 bg-stone-950/55 p-3">
            <div class="flex gap-3">
              ${bottle.photoUrl ? `<img class="h-28 w-20 rounded-md object-cover" src="${escapeHtml(bottle.photoUrl)}" alt="">` : ""}
              <div>
                <p class="text-sm font-bold text-amber-300">Sleeve ${bottle.bagNumber}</p>
                <h3 class="font-semibold">${escapeHtml(bottle.bottleName)}</h3>
                <p class="text-sm text-amber-50/75">${escapeHtml(bottle.grape)} · ${bottle.voteCount} ratings</p>
              </div>
            </div>
            <button class="tap-quiet mt-3 w-full" data-edit-bottle="${bottle.id}" type="button">Edit</button>
          </article>
        `).join("") || `<p class="text-amber-50/75">No bottles checked in yet.</p>`}
      </div>
    `, "mt-4")}
  `;
}

function render() {
  navMarkup();
  if (!state.bootstrap) {
    app.innerHTML = panel(`<p class="text-lg">Loading the tasting room...</p>`);
    return;
  }
  const oldPositions = state.view === "tv" ? recordTvBoardPositions() : null;
  app.innerHTML = {
    taste: tasteView,
    album: albumView,
    tv: tvView,
    host: hostView
  }[state.view]();
  if (state.view === "tv") animateTvBoard(oldPositions);
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) {
    startDemoVoting();
  }
  if (state.view === "tv" && state.demoAnimationPending) {
    state.demoAnimationPending = false;
    requestAnimationFrame(() => animateDemoScores());
  }
  if (state.view === "tv" && state.reveal.length) drawCharts(state.reveal[0].id);
}

async function refresh({ photos = false, reveal = false, host = false } = {}) {
  state.bootstrap = await api("/api/bootstrap");
  if (photos) state.photos = await api("/api/photos");
  if (reveal && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) state.reveal = await api("/api/reveal");
  if (host && hostToken()) state.host = await api("/api/host/dashboard", { host: true });
  render();
}

function palatePayload(form) {
  return Object.fromEntries(Object.keys(state.bootstrap.tastingGrid.palate).map((metric) => [metric, form.querySelector(`[name="palate-${metric}"]:checked`)?.value]).filter(([, value]) => value));
}

function paintStars(rating) {
  const ratingGroup = document.querySelector('[role="radiogroup"][aria-label="Rating"]');
  if (!ratingGroup) return;
  ratingGroup.querySelectorAll("[data-star]").forEach((star) => {
    const filled = Number(star.dataset.star) <= rating;
    star.textContent = filled ? "★" : "☆";
    star.classList.toggle("star-filled", filled);
  });
  const summary = ratingGroup.querySelector("[data-rating-summary]");
  if (summary) summary.textContent = `${rating} / 5`;
}

async function submitTasting(form) {
  const selectedGuestId = form.querySelector("#guest-select").value;
  const rating = form.querySelector('[name="rating"]:checked')?.value;
  const payload = {
    userId: Number(selectedGuestId),
    bagNumber: Number(form.bagNumber.value),
    rating: Number(rating),
    grapeGuess: form.grapeGuess.value,
    isBookmarked: form.isBookmarked.checked,
    appearance: form.querySelector('[name="appearance"]:checked')?.value || "",
    nose: [...form.querySelectorAll('[name="nose"]:checked')].map((item) => item.value),
    palate: palatePayload(form)
  };
  await api("/api/tastings", { method: "POST", body: payload });
  state.selectedGuestId = "";
  localStorage.removeItem("wineGuestId");
  state.starRating = 0;
  notice("Tasting saved. Ready for the next guest.");
  await refresh();
}

async function addGuest(form) {
  const name = form.querySelector('[name="displayName"]').value;
  const guest = await api("/api/guests", { method: "POST", body: { displayName: name } });
  state.selectedGuestId = String(guest.id);
  localStorage.setItem("wineGuestId", guest.id);
  await refresh();
  notice(`${guest.displayName} is ready to taste.`);
}

async function uploadPhoto(form) {
  const body = new FormData(form);
  if (state.selectedGuestId) body.append("userId", state.selectedGuestId);
  await api("/api/photos", { method: "POST", body });
  form.reset();
  notice("Photo added to the shared album.");
  await refresh({ photos: true });
}

async function unlockHost(form) {
  const result = await api("/api/host/session", { method: "POST", body: { pin: form.pin.value } });
  localStorage.setItem("wineHostToken", result.token);
  notice("Host controls unlocked on this device.");
  await refresh({ host: true });
}

async function saveBottle(form) {
  const body = new FormData(form);
  const editing = state.editBottleId;
  const url = editing ? `/api/host/bottles/${editing}` : "/api/host/bottles";
  const bottle = await api(url, { method: editing ? "PATCH" : "POST", body, host: true });
  state.editBottleId = null;
  notice(editing ? `Sleeve ${bottle.bagNumber} updated.` : `Bottle checked in as sleeve ${bottle.bagNumber}.`);
  await refresh({ host: true });
}

async function seedDemo() {
  await api("/api/host/demo", { method: "POST", host: true });
  notice("15 demo bottles loaded.");
  await refresh({ host: true });
  state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard));
  state.demoAnimationPending = true;
  state.view = "tv";
  history.replaceState({}, "", "?view=tv");
  render();
  setTimeout(() => {
    if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) startDemoVoting();
  }, 50);
}

async function scanLabel(form) {
  const body = new FormData(form);
  state.labelScanPending = true;
  render();
  try {
    const result = await api("/api/host/bottles/scan", { method: "POST", body, host: true });
    state.lastLabelScan = {
      bottleId: result.bottle.id,
      bagNumber: result.bottle.bagNumber,
      confidence: result.scan.confidence,
      notes: result.scan.notes
    };
    notice(`Put this bottle in sleeve ${result.bottle.bagNumber}.`);
    form.reset();
    await refresh({ host: true });
  } finally {
    state.labelScanPending = false;
    render();
  }
}

function destroyCharts() {
  state.charts.forEach((chart) => chart.destroy());
  state.charts = [];
}

function drawCharts(id) {
  destroyCharts();
  const bottle = state.reveal.find((item) => item.id === Number(id));
  if (!bottle || !window.Chart) return;
  const colors = ["#f2bd5d", "#d43f63", "#2d6a5b", "#9fb8d0", "#c37d46", "#e9d6a4"];
  const empty = [{ label: "No optional notes yet", count: 1 }];
  const grapeData = bottle.grapeGuesses.length ? bottle.grapeGuesses : empty;
  const appearanceData = bottle.appearance.length ? bottle.appearance : empty;
  state.charts.push(new Chart(document.querySelector("#grape-chart"), {
    type: "bar",
    data: { labels: grapeData.map((item) => item.label), datasets: [{ label: "Grape guesses", data: grapeData.map((item) => item.count), backgroundColor: colors }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#fff7ec" } } }, scales: { x: { ticks: { color: "#fff7ec" } }, y: { beginAtZero: true, ticks: { precision: 0, color: "#fff7ec" } } } }
  }));
  state.charts.push(new Chart(document.querySelector("#appearance-chart"), {
    type: "pie",
    data: { labels: appearanceData.map((item) => item.label), datasets: [{ label: "Appearance", data: appearanceData.map((item) => item.count), backgroundColor: colors }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: "Appearance consensus", color: "#fff7ec" }, legend: { labels: { color: "#fff7ec" } } } }
  }));
}

document.addEventListener("click", async (event) => {
  const view = event.target.closest("[data-view]")?.dataset.view;
  if (view) {
    state.view = view;
    history.replaceState({}, "", view === "tv" ? "?view=tv" : location.pathname);
    if (view === "album" && !state.photos.length) await refresh({ photos: true });
    else if (view === "host" && hostToken()) await refresh({ host: true });
    else if (view === "tv") await refresh({ reveal: true });
    else render();
    if (view === "tv" && state.demoBoard && !state.demoVoteTimer) {
      startDemoVoting();
    }
  }
  if (event.target.closest("#show-guest-form")) document.querySelector("#guest-form")?.classList.toggle("hidden");
  if (event.target.closest("#add-guest")) addGuest(document.querySelector("#tasting-form")).catch((error) => notice(error.message));
  const editId = event.target.closest("[data-edit-bottle]")?.dataset.editBottle;
  if (editId) {
    state.editBottleId = Number(editId);
    render();
  }
  if (event.target.closest("#cancel-edit")) {
    state.editBottleId = null;
    render();
  }
  const eventState = event.target.closest("[data-event-state]")?.dataset.eventState;
  if (eventState) {
    api("/api/host/state", { method: "PATCH", host: true, body: { state: eventState } })
      .then(() => refresh({ host: true, reveal: true }))
      .then(() => notice(`Event set to ${stateLabel(eventState)}.`))
      .catch((error) => notice(error.message));
  }
  if (event.target.closest("#seed-demo")) {
    seedDemo().catch((error) => notice(error.message));
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "guest-select") {
    state.selectedGuestId = event.target.value;
    if (state.selectedGuestId) localStorage.setItem("wineGuestId", state.selectedGuestId);
  }
  if (event.target.name === "rating") {
    state.starRating = Number(event.target.value);
    paintStars(state.starRating);
  }
  if (event.target.id === "label-photo" && event.target.files?.length) {
    scanLabel(event.target.form).catch((error) => {
      state.labelScanPending = false;
      render();
      notice(error.message);
    });
  }
  if (event.target.id === "chart-bottle") drawCharts(event.target.value);
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "tasting-form") submitTasting(event.target).catch((error) => notice(error.message));
  if (event.target.id === "photo-form") uploadPhoto(event.target).catch((error) => notice(error.message));
  if (event.target.id === "host-login") unlockHost(event.target).catch((error) => notice(error.message));
  if (event.target.id === "label-scan-form") scanLabel(event.target).catch((error) => notice(error.message));
  if (event.target.id === "bottle-form") saveBottle(event.target).catch((error) => notice(error.message));
});

setInterval(() => {
  if (state.view === "tv") refresh({ reveal: true }).catch(() => {});
}, 7000);

refresh({ photos: state.view === "album", reveal: state.view === "tv" }).catch((error) => {
  app.innerHTML = panel(`<p>${escapeHtml(error.message)}</p>`);
});
