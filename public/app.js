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
  revealData: null,
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
  charts: [],
  bottleCoach: {},
  bottleCoachLoading: null,
  selectedSleeve: "",
  showJoinQr: false,
  showGuestBulk: false,
  guestBulkSubmitting: false
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
  const isTv = state.view === "tv";
  document.body.classList.toggle("tv-mode", isTv);
  const headerLabel = document.getElementById("header-label");
  if (headerLabel) {
    headerLabel.innerHTML = isTv ? `<span class="tv-header-label">Live Standings</span>` : "";
  }
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
    <option value="__add__">+ Add new name…</option>
  `;
}

function bottleOptions() {
  const effective = state.selectedSleeve || (state.bootstrap.nowPouring ? String(state.bootstrap.nowPouring) : "");
  return `
    <option value="">Sleeve number</option>
    ${state.bootstrap.bottles.map((bottle) => {
      const isSelected = String(bottle.bagNumber) === String(effective);
      const isPouring = state.bootstrap.nowPouring === bottle.bagNumber;
      const label = isPouring ? `Bottle ${bottle.bagNumber} · now pouring` : `Bottle ${bottle.bagNumber}`;
      return `<option value="${bottle.bagNumber}"${isSelected ? " selected" : ""}>${label}</option>`;
    }).join("")}
  `;
}

function coachInnerMarkup(sleeve) {
  if (!sleeve) return "";
  const key = String(sleeve);
  const coach = state.bottleCoach[key];
  const pending = coach === undefined || state.bottleCoachLoading === key;
  if (pending) {
    return `
      <p class="kicker mb-2">Notice this · Sleeve #${escapeHtml(key)}</p>
      <p class="text-sm italic text-amber-50/75">Checking with the sommelier…</p>
    `;
  }
  if (!coach) return "";
  const formatted = escapeHtml(coach)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>')
    .replace(/\n/g, "<br>");
  return `
    <p class="kicker mb-2">Notice this · Sleeve #${escapeHtml(key)}</p>
    <div class="text-sm leading-6">${formatted}</div>
  `;
}

function coachCardMarkup() {
  const inner = coachInnerMarkup(state.selectedSleeve);
  const hidden = inner ? "" : " hidden";
  return `<div id="coach-card" class="mt-4 rounded-lg border border-amber-200/25 bg-amber-950/25 p-4 text-amber-50${hidden}">${inner}</div>`;
}

function paintCoachCard() {
  const card = document.querySelector("#coach-card");
  if (!card) return;
  const inner = coachInnerMarkup(state.selectedSleeve);
  card.innerHTML = inner;
  card.classList.toggle("hidden", !inner);
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
          <label>
            <span class="mb-2 block text-sm font-bold text-amber-100">Taster</span>
            <select id="guest-select" class="field" required>${guestOptions()}</select>
          </label>
          <div id="guest-form" class="mt-3 hidden grid gap-2 grid-cols-[1fr_auto]">
            <input class="field" name="displayName" maxlength="60" placeholder="New taster name" aria-label="New taster name" autocomplete="off">
            <button class="tap-primary" type="button" id="add-guest">Add</button>
          </div>
          <div class="mt-5 grid gap-4 md:grid-cols-[160px_1fr]">
            <label>
              <span class="mb-2 block text-sm font-bold text-amber-100">Blind bottle</span>
              <select name="bagNumber" class="field" required>${bottleOptions()}</select>
            </label>
            <label>
              <span class="mb-2 block text-sm font-bold text-amber-100">Grape guess</span>
              <select name="grapeGuess" class="field" required>
                ${state.bootstrap.grapes.map((grape) => {
                  const hint = grape.appellations ? ` — ${grape.appellations}` : "";
                  return `<option value="${escapeHtml(grape.name)}">${escapeHtml(grape.name + hint)}</option>`;
                }).join("")}
              </select>
            </label>
          </div>
          ${coachCardMarkup()}
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
      <div class="bottle-flip">
        <div class="bottle-flip-inner" data-flip-bag="${item.bagNumber}">
          <div class="bottle-flip-front">
            <div class="blind-bottle" aria-label="Sleeve ${item.bagNumber}">
              <div class="blind-bottle-lip"></div>
              <div class="blind-bottle-neck"></div>
              <div class="blind-bottle-shoulders"></div>
              <div class="blind-bottle-body"><span>#${item.bagNumber}</span></div>
            </div>
          </div>
          <div class="bottle-flip-back"></div>
        </div>
      </div>
      <p class="tv-bottle-score">${item.voteCount ? `${Number(item.averageRating).toFixed(1)} / 5` : "Awaiting ratings"}</p>
      <p class="text-sm text-amber-50/65">${item.voteCount} rating${item.voteCount === 1 ? "" : "s"}</p>
      <div class="mt-3 min-h-14">
        ${item.grapeGuesses.length ? (() => {
          const top = item.grapeGuesses[0].count;
          const leaders = item.grapeGuesses.filter(g => g.count === top);
          return `<div class="flex flex-wrap justify-center gap-1">${leaders.map(g =>
            `<span class="tv-guess-chip">${g.count} × ${escapeHtml(g.label)}</span>`
          ).join("")}</div>`;
        })() : ""}
      </div>
    </li>
  `).join("")}</ol>`;
}

function revealedBottleMarkup(bottle) {
  const photo = bottle.photoUrl
    ? `<img class="revealed-bottle-photo" src="${escapeHtml(bottle.photoUrl)}" alt="${escapeHtml(bottle.bottleName || "")}" loading="lazy">`
    : `<div class="revealed-bottle-no-photo">#${bottle.bagNumber}</div>`;
  return `<div class="revealed-bottle">
    ${photo}
    <div class="revealed-bottle-info">
      <p class="revealed-bottle-sleeve">Sleeve ${bottle.bagNumber}</p>
      <p class="revealed-bottle-name">${escapeHtml(bottle.bottleName || "")}</p>
      ${bottle.grape ? `<p class="revealed-bottle-grape">${escapeHtml(bottle.grape)}</p>` : ""}
    </div>
  </div>`;
}

let revealFlipDone = false;

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

function fitTvGrid() {
  if (state.view !== "tv") return;
  const grid = document.querySelector(".tv-bottle-grid");
  const header = document.querySelector("header");
  if (!grid || !header) return;
  const sampleBottle = grid.querySelector(".blind-bottle");
  if (!sampleBottle) return;
  const actualBottleH = sampleBottle.scrollHeight;
  if (!actualBottleH) return;
  const available = window.innerHeight - header.offsetHeight - 48;
  const perRow = (available - 16) / 2;
  const targetBottleH = perRow - 96;
  const scale = Math.min(1, Math.max(0.4, targetBottleH / actualBottleH));
  grid.querySelectorAll(".blind-bottle").forEach((el) => { el.style.zoom = scale; });
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
    item.style.zIndex = "2";
    const animation = item.animate([
      { transform: `translate(${dx}px, ${dy}px)` },
      { transform: "translate(0, 0)" }
    ], {
      duration: 650,
      easing: "cubic-bezier(0.22,1,0.36,1)",
      fill: "both"
    });
    animation.onfinish = () => {
      item.style.zIndex = "";
    };
  });
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
  const reveal = (state.reveal || []).filter((bottle) => bottle && bottle.id);
  if (!reveal.length) return `<p class="rounded-md bg-stone-950/45 p-5">The host controls the grand reveal.</p>`;
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
          <select id="chart-bottle" class="field">${state.reveal.filter((bottle) => bottle && bottle.id).map((bottle) => `<option value="${bottle.id}">Sleeve ${bottle.bagNumber}: ${escapeHtml(bottle.bottleName)}</option>`).join("")}</select>
        </label>
        <div class="chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4"><canvas id="grape-chart" aria-label="Grape guesses chart"></canvas></div>
        <div class="chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4"><canvas id="appearance-chart" aria-label="Appearance chart"></canvas></div>
      </div>
    </div>
  `;
}

function tvHeroMarkup() {
  const pour = state.bootstrap.nowPouring;
  if (!pour) return "";
  const key = String(pour);
  const coach = state.bottleCoach[key];
  const pending = coach === undefined || state.bottleCoachLoading === key;
  const formatted = coach
    ? escapeHtml(coach)
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>')
        .replace(/\n/g, "<br>")
    : "";
  const body = pending
    ? '<p class="italic text-amber-50/70">Checking with the sommelier…</p>'
    : (formatted || '<p class="italic text-amber-50/70">The sommelier&rsquo;s on a break. Trust your senses.</p>');
  return `
    <section class="tv-hero rounded-2xl border border-amber-200/30 bg-amber-950/40 p-6 sm:p-10 mb-4">
      <div class="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div class="text-center">
          <p class="kicker">Now pouring</p>
          <p class="tv-hero-sleeve text-amber-300">#${pour}</p>
        </div>
        <div>
          <p class="kicker mb-3">Notice this</p>
          <div class="tv-hero-coach text-amber-50">${body}</div>
        </div>
      </div>
    </section>
  `;
}

function renderTvHero() {
  const main = document.querySelector("#app");
  if (!main) return;
  const existing = main.querySelector(".tv-hero");
  const fresh = tvHeroMarkup().trim();
  if (existing && fresh) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = fresh;
    existing.replaceWith(wrapper.firstElementChild);
  } else if (existing && !fresh) {
    existing.remove();
  } else if (!existing && fresh) {
    main.insertAdjacentHTML("afterbegin", fresh);
  }
}

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
function renderPodiumScene(p) { return `<div class="reveal-scene-shell"></div>`; }
function renderRevealAllScene(r) { return `<div class="reveal-scene-shell"></div>`; }
function renderGroupAccuracyScene(g) { return `<div class="reveal-scene-shell"></div>`; }
function renderTheNumbersScene(n) { return `<div class="reveal-scene-shell"></div>`; }

function renderRevealScene(scene) {
  const data = state.revealData;
  if (!data) return `<div class="reveal-scene-shell"><p class="reveal-loading">Loading…</p></div>`;
  switch (scene) {
    case "sommelier": return renderSommelierScene(data.sommelier);
    case "podium": return renderPodiumScene(data.podium);
    case "reveal-all": return renderRevealAllScene(data.revealAll);
    case "group-accuracy": return renderGroupAccuracyScene(data.groupAccuracy);
    case "the-numbers": return renderTheNumbersScene(data.theNumbers);
    default: return `<div class="reveal-scene-shell"></div>`;
  }
}

function tvView() {
  const eventState = state.bootstrap.state;
  const scene = state.bootstrap.revealScene;

  if ((eventState === "GRAND_REVEAL" || eventState === "ARCHIVE") && scene) {
    return renderRevealScene(scene);
  }

  // Live board (LIVE_TASTING or GRAND_REVEAL standby with no scene)
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
              <p class="text-6xl font-black text-amber-300 sm:text-7xl">#${state.lastLabelScan.bagNumber}</p>
              ${state.lastLabelScan.bottleName ? `<p class="mt-2 text-base"><strong>${escapeHtml(state.lastLabelScan.bottleName)}</strong></p>` : ""}
              <div class="mt-2 grid gap-2">
                <label class="text-xs uppercase tracking-wide text-emerald-200" for="scan-grape-fix">Grape ${state.lastLabelScan.grapeSource === "printed" ? "(on label)" : state.lastLabelScan.grapeSource === "inferred" ? "(inferred from region)" : "(unknown)"}</label>
                <select id="scan-grape-fix" class="field" data-scan-bottle="${state.lastLabelScan.bottleId}">
                  ${state.bootstrap.grapes.map((grape) => {
                    const hint = grape.appellations ? ` — ${grape.appellations}` : "";
                    const selected = grape.name === state.lastLabelScan.grape ? " selected" : "";
                    return `<option value="${escapeHtml(grape.name)}"${selected}>${escapeHtml(grape.name + hint)}</option>`;
                  }).join("")}
                </select>
              </div>
              <p class="mt-2 text-xs text-emerald-200/80">Confidence: ${escapeHtml(state.lastLabelScan.confidence)}.${state.lastLabelScan.notes ? ` ${escapeHtml(state.lastLabelScan.notes)}` : ""}</p>
              <div class="mt-3 grid gap-2 sm:grid-cols-2">
                <label class="tap-primary cursor-pointer text-center" for="label-photo">Scan next bottle</label>
                <button class="tap-quiet" data-edit-bottle="${state.lastLabelScan.bottleId}" type="button">Review details</button>
              </div>
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
        <button class="tap-quiet mt-3 w-full" id="show-join-qr" type="button">Show join QR for guests</button>
        <button class="tap-quiet mt-3 w-full" id="show-guest-bulk" type="button">Pre-load guest list</button>
        <button class="tap-quiet mt-3 w-full" id="seed-demo" type="button">Load 15-bottle demo</button>
        <button class="tap-quiet mt-3 w-full" id="seed-demo-2" type="button">Load 3-bottle demo</button>
        <p class="mt-4 rounded-md bg-emerald-400/15 p-3 text-emerald-50">Current state: ${escapeHtml(stateLabel(state.host.state))}</p>
        <div class="mt-5 grid grid-cols-2 gap-3">
          <div class="rounded-md bg-stone-950/55 p-4"><p class="text-3xl text-amber-300">${state.host.bottles.length}</p><p>Bottles</p></div>
          <div class="rounded-md bg-stone-950/55 p-4"><p class="text-3xl text-emerald-300">${state.host.photos.length}</p><p>Party photos</p></div>
        </div>
      `)}
    </div>
    ${state.host.bottles.length ? panel(`
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="kicker">Pouring control</p>
          <h2 class="screen-title">Tell everyone what's in the glass</h2>
        </div>
        ${state.bootstrap.nowPouring ? `
          <button class="tap-quiet" data-pour-sleeve="" type="button">Stop pouring</button>
        ` : ""}
      </div>
      ${state.bootstrap.nowPouring ? `
        <div class="mt-4 rounded-lg border border-amber-200/30 bg-amber-950/30 p-4 text-amber-50">
          <p class="kicker">Now pouring</p>
          <p class="text-6xl font-black text-amber-300">#${state.bootstrap.nowPouring}</p>
        </div>
      ` : `
        <p class="mt-2 text-amber-50/75">Tap a sleeve to broadcast it to the TV and the kiosks. Guests will see coaching cues for that bottle.</p>
      `}
      <div class="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
        ${[...state.host.bottles].sort((a, b) => a.bagNumber - b.bagNumber).map((bottle) => `
          <button class="${bottle.bagNumber === state.bootstrap.nowPouring ? 'tap-primary' : 'tap-quiet'} text-lg font-bold" data-pour-sleeve="${bottle.bagNumber}" type="button">#${bottle.bagNumber}</button>
        `).join("")}
      </div>
    `, "mt-4") : ""}
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

function guestBulkModalMarkup() {
  if (!state.showGuestBulk) return "";
  const guestCount = state.bootstrap?.guests?.length || 0;
  return `
    <div id="guest-bulk-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-6">
      <div class="panel rounded-2xl p-6 max-w-lg w-full">
        <p class="kicker">Setup</p>
        <h2 class="screen-title mt-1">Pre-load guest list</h2>
        <p class="mt-2 text-amber-50/75 text-sm">Paste names, one per line or comma-separated. Duplicates are skipped automatically. Currently ${guestCount} guest${guestCount === 1 ? "" : "s"} loaded.</p>
        <textarea id="guest-bulk-input" class="field mt-3 min-h-40 w-full" placeholder="Maria&#10;Hannah&#10;Ari, Mia, Noah&#10;Jess Taylor"></textarea>
        <div class="mt-4 grid gap-2 sm:grid-cols-2">
          <button class="tap-quiet" id="cancel-guest-bulk" type="button">Cancel</button>
          <button class="tap-primary" id="submit-guest-bulk" type="button" ${state.guestBulkSubmitting ? "disabled" : ""}>${state.guestBulkSubmitting ? "Adding…" : "Add all"}</button>
        </div>
      </div>
    </div>
  `;
}

function joinQrModalMarkup() {
  if (!state.showJoinQr) return "";
  const url = window.location.origin + "/kiosk.html";
  return `
    <div id="join-qr-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-6">
      <div class="panel rounded-2xl p-6 max-w-md w-full text-center">
        <p class="kicker">Scan to join</p>
        <h2 class="screen-title mt-1">Rate from your phone</h2>
        <p class="mt-2 text-amber-50/75 text-sm">Connect to <strong>Wine Party Guest</strong> WiFi first, then scan this code.</p>
        <div id="join-qr-canvas" class="mx-auto mt-4 inline-block rounded-md bg-amber-50 p-4"></div>
        <p class="mt-3 break-all text-xs text-amber-50/60">${escapeHtml(url)}</p>
        <button class="tap-primary mt-5 w-full" id="close-join-qr" type="button">Close</button>
      </div>
    </div>
  `;
}

function renderJoinQrCode() {
  const node = document.querySelector("#join-qr-canvas");
  if (!node || typeof window.qrcode !== "function") return;
  node.innerHTML = "";
  const url = window.location.origin + "/kiosk.html";
  const qr = window.qrcode(0, "M");
  qr.addData(url);
  qr.make();
  node.innerHTML = qr.createImgTag(8, 0);
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
  }[state.view]() + joinQrModalMarkup() + guestBulkModalMarkup();
  if (state.showJoinQr) renderJoinQrCode();
  if (state.view === "tv") { animateTvBoard(oldPositions); startTrivia(); requestAnimationFrame(fitTvGrid); } else { stopTrivia(); }
  if (state.view === "tv" && state.bootstrap.nowPouring) {
    fetchCoach(state.bootstrap.nowPouring).then(() => {
      if (state.view === "tv" && state.bootstrap.nowPouring) renderTvHero();
    }).catch(() => {});
  }
  if (state.view === "taste" && state.bootstrap.nowPouring && !state.selectedSleeve) {
    state.selectedSleeve = String(state.bootstrap.nowPouring);
    fetchCoach(state.selectedSleeve).catch(() => {});
  }
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) {
    startDemoVoting();
  }
  if (state.view === "tv" && state.demoAnimationPending) {
    state.demoAnimationPending = false;
    requestAnimationFrame(() => animateDemoScores());
  }
  if (
    state.view === "tv"
    && state.reveal.length
    && state.reveal[0]?.id
    && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)
  ) drawCharts(state.reveal[0].id);
  if (state.view === "tv" && state.bootstrap.revealScene === "reveal-all" && state.reveal.length) {
    triggerRevealFlip();
  } else if (
    !["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state) ||
    state.bootstrap.revealScene !== "reveal-all"
  ) {
    revealFlipDone = false;
  }
}

async function refresh({ photos = false, reveal = false, host = false } = {}) {
  state.bootstrap = await api("/api/bootstrap");
  if (photos) state.photos = await api("/api/photos");
  if (reveal && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
    [state.reveal, state.revealData] = await Promise.all([
      api("/api/reveal"),
      api("/api/reveal-data")
    ]);
  }
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
  state.selectedSleeve = "";
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
  notice("14 demo bottles loaded.");
  await refresh({ host: true });
  state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard));
  state.demoAnimationPending = true;
  state.view = "tv";
  history.replaceState({}, "", "?view=tv");
  render();
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) startDemoVoting();
}

async function seedDemo2() {
  if (!state.bootstrap.leaderboard.length) {
    await refresh({ host: true, reveal: true });
  }
  state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard).slice(0, 3));
  state.demoAnimationPending = true;
  state.view = "tv";
  history.replaceState({}, "", "?view=tv");
  render();
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) startDemoVoting();
}

async function fetchCoach(bagNumber) {
  const key = String(bagNumber);
  if (!key) return;
  if (state.bottleCoach[key] !== undefined || state.bottleCoachLoading === key) {
    paintCoachCard();
    if (state.view === "tv") renderTvHero();
    return;
  }
  state.bottleCoachLoading = key;
  paintCoachCard();
  if (state.view === "tv") renderTvHero();
  try {
    const result = await api(`/api/bottles/${encodeURIComponent(key)}/coach`);
    state.bottleCoach[key] = result.coach || "";
  } catch {
    state.bottleCoach[key] = "";
  } finally {
    if (state.bottleCoachLoading === key) state.bottleCoachLoading = null;
    if (state.selectedSleeve === key) paintCoachCard();
    if (state.view === "tv" && String(state.bootstrap.nowPouring) === key) renderTvHero();
  }
}

async function compressImage(file, maxEdge = 1600, quality = 0.85) {
  if (!file || !file.type?.startsWith("image/")) return file;
  if (file.size < 350 * 1024) return file;
  const bitmap = await (window.createImageBitmap
    ? createImageBitmap(file)
    : new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      }));
  const ratio = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * ratio);
  const h = Math.round(bitmap.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], "label.jpg", { type: "image/jpeg" });
}

async function scanLabel(form) {
  const original = form.querySelector('input[type="file"]')?.files?.[0];
  if (!original) throw new Error("Pick a photo to scan.");
  state.labelScanPending = true;
  render();
  try {
    const photo = await compressImage(original).catch(() => original);
    const body = new FormData();
    body.append("photo", photo);
    const result = await api("/api/host/bottles/scan", { method: "POST", body, host: true });
    state.lastLabelScan = {
      bottleId: result.bottle.id,
      bagNumber: result.bottle.bagNumber,
      bottleName: result.bottle.bottleName,
      grape: result.bottle.grape,
      grapeSource: result.scan.grapeSource,
      confidence: result.scan.confidence,
      notes: result.scan.notes
    };
    notice(`Put this bottle in sleeve ${result.bottle.bagNumber}.`);
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

function stopDemo() {
  if (state.demoVoteTimer) {
    clearTimeout(state.demoVoteTimer);
  }
  state.demoVoteTimer = null;
  state.demoBoard = null;
  state.demoAnimationPending = false;
  render();
}

function drawCharts(id) {
  destroyCharts();
  const bottle = state.reveal.find((item) => item && item.id === Number(id));
  const grapeCanvas = document.querySelector("#grape-chart");
  const appearanceCanvas = document.querySelector("#appearance-chart");
  if (!bottle || !window.Chart || !grapeCanvas || !appearanceCanvas) return;
  const colors = ["#f2bd5d", "#d43f63", "#2d6a5b", "#9fb8d0", "#c37d46", "#e9d6a4"];
  const empty = [{ label: "No optional notes yet", count: 1 }];
  const grapeData = bottle.grapeGuesses.length ? bottle.grapeGuesses : empty;
  const appearanceData = bottle.appearance.length ? bottle.appearance : empty;
  state.charts.push(new Chart(grapeCanvas, {
    type: "bar",
    data: { labels: grapeData.map((item) => item.label), datasets: [{ label: "Grape guesses", data: grapeData.map((item) => item.count), backgroundColor: colors }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#fff7ec" } } }, scales: { x: { ticks: { color: "#fff7ec" } }, y: { beginAtZero: true, ticks: { precision: 0, color: "#fff7ec" } } } }
  }));
  state.charts.push(new Chart(appearanceCanvas, {
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
    else if (view === "host" && hostToken()) {
      try {
        await refresh({ host: true });
      } catch (error) {
        localStorage.removeItem("wineHostToken");
        state.host = null;
        notice("Host PIN changed. Please unlock again.");
        render();
      }
    }
    else if (view === "tv") await refresh({ reveal: true });
    else render();
    if (view === "tv" && state.demoBoard && !state.demoVoteTimer) {
      startDemoVoting();
    }
  }
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
  const pourEl = event.target.closest("[data-pour-sleeve]");
  if (pourEl) {
    const raw = pourEl.dataset.pourSleeve;
    const bagNumber = raw === "" ? null : Number(raw);
    api("/api/host/now-pouring", { method: "PATCH", host: true, body: { bagNumber } })
      .then(() => refresh({ host: true }))
      .then(() => notice(bagNumber === null ? "Stopped pouring." : `Now pouring sleeve #${bagNumber}.`))
      .catch((error) => notice(error.message));
  }
  if (event.target.closest("#show-join-qr")) {
    state.showJoinQr = true;
    render();
  }
  if (event.target.closest("#close-join-qr") || event.target.id === "join-qr-overlay") {
    state.showJoinQr = false;
    render();
  }
  if (event.target.closest("#show-guest-bulk")) {
    state.showGuestBulk = true;
    render();
    setTimeout(() => document.querySelector("#guest-bulk-input")?.focus(), 0);
  }
  if (event.target.closest("#cancel-guest-bulk") || event.target.id === "guest-bulk-overlay") {
    state.showGuestBulk = false;
    render();
  }
  if (event.target.closest("#submit-guest-bulk")) {
    const input = document.querySelector("#guest-bulk-input");
    if (!input) return;
    const names = input.value.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
    if (!names.length) {
      notice("Paste at least one name first.");
      return;
    }
    state.guestBulkSubmitting = true;
    render();
    api("/api/host/guests/bulk", { method: "POST", host: true, body: { names } })
      .then((result) => {
        state.guestBulkSubmitting = false;
        state.showGuestBulk = false;
        notice(`Added ${result.count} guest${result.count === 1 ? "" : "s"}.`);
        refresh({ host: true });
      })
      .catch((error) => {
        state.guestBulkSubmitting = false;
        render();
        notice(error.message);
      });
  }
  if (event.target.closest("#seed-demo")) {
    seedDemo().catch((error) => notice(error.message));
  }
  if (event.target.closest("#seed-demo-2")) {
    seedDemo2().catch((error) => notice(error.message));
  }
  if (event.target.closest("#stop-demo")) {
    stopDemo();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "guest-select") {
    const value = event.target.value;
    const guestForm = document.querySelector("#guest-form");
    if (value === "__add__") {
      guestForm?.classList.remove("hidden");
      guestForm?.querySelector('input[name="displayName"]')?.focus();
      event.target.value = state.selectedGuestId || "";
    } else {
      state.selectedGuestId = value;
      guestForm?.classList.add("hidden");
      if (state.selectedGuestId) localStorage.setItem("wineGuestId", state.selectedGuestId);
    }
  }
  if (event.target.name === "bagNumber") {
    state.selectedSleeve = event.target.value;
    if (state.selectedSleeve) {
      fetchCoach(state.selectedSleeve).catch(() => {});
    } else {
      paintCoachCard();
    }
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
  if (event.target.id === "scan-grape-fix") {
    const bottleId = event.target.dataset.scanBottle;
    const grape = event.target.value;
    api(`/api/host/bottles/${bottleId}`, { method: "PATCH", host: true, body: { grape } })
      .then(() => {
        if (state.lastLabelScan) state.lastLabelScan.grape = grape;
        notice("Grape updated.");
      })
      .catch((error) => notice(error.message));
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "tasting-form") submitTasting(event.target).catch((error) => notice(error.message));
  if (event.target.id === "photo-form") uploadPhoto(event.target).catch((error) => notice(error.message));
  if (event.target.id === "host-login") unlockHost(event.target).catch((error) => notice(error.message));
  if (event.target.id === "label-scan-form") scanLabel(event.target).catch((error) => notice(error.message));
  if (event.target.id === "bottle-form") saveBottle(event.target).catch((error) => notice(error.message));
});

window.addEventListener("resize", () => { if (state.view === "tv") fitTvGrid(); });

setInterval(async () => {
  if (state.view === "tv" && !state.demoBoard) {
    try {
      await refresh({ reveal: true });
      if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
        state.revealData = null;
      }
    } catch (error) {
      console.error("TV refresh failed:", error);
    }
  }
}, 2000);

// --- Wine trivia banner (TV view only) ---
const TRIVIA_ENABLED = true;

const TRIVIA_FACTS = [
  "A standard 750ml bottle holds roughly the same volume as a glassblower's single breath — that's how the size was standardized.",
  "The word 'toast' traces back to ancient Rome, where a piece of charred bread was dropped in wine to reduce its acidity.",
  "When a sommelier hands you the cork, inspect it — don't smell it theatrically. Look for cracks or seepage staining, and confirm the producer's name on the cork matches the label.",
  "Champagne bottles must withstand up to 90 psi of internal pressure — three times the pressure inside a car tire.",
  "White wine can be made from red grapes: the juice runs clear until it contacts the pigmented skins.",
  "Hold a wine glass by the stem, not the bowl. Body heat warms the wine faster than you'd expect, and fingerprints on the bowl make it harder to see the color and clarity.",
  "A single grapevine typically produces just 3–10 bottles of wine per growing season.",
  "Georgia (the country) has evidence of winemaking dating back 8,000 years, making it the oldest known wine-producing region.",
  "The small taste poured before service isn't an invitation to decide if you like the wine — it's your chance to check for flaws like a corked smell or oxidation. Only send it back if something is genuinely wrong.",
  "The world's most planted wine grape is Cabernet Sauvignon, cultivated on over 340,000 hectares worldwide.",
  "Grapes are the most widely cultivated fruit crop on Earth.",
  "In restaurant tradition, the sommelier pours the taste test for whoever ordered the bottle — the host — regardless of where they're seated at the table.",
  "Tannins in red wine come from grape skins, seeds, and stems — and from oak barrels used during aging.",
  "Pinot Noir is so finicky to grow that winemakers have nicknamed it the 'heartbreak grape.'",
  "A 'corked' wine smells like wet cardboard or a musty basement — that's your signal to send it back. Not liking a style isn't grounds for a return.",
  "Malbec originated in southwest France before emigrating to Argentina, where it became the country's signature red.",
  "A wine is called 'corked' when contaminated by TCA, a compound that smells like wet cardboard or a musty basement.",
  "Red wine is often served too warm in restaurants. It's perfectly acceptable to ask for a brief chill in an ice bucket — most reds show best at 60–65°F, not room temperature.",
  "Decanting a young red wine for an hour can mimic years of gentle aging by exposing it to oxygen.",
  "The 'legs' that run down the inside of a wine glass reflect alcohol content, not sweetness.",
  "Swirling wine in a glass is most effective when you keep the base on the table and rotate in small circles — you get maximum aeration without the risk of splashing.",
  "Riesling vines can survive temperatures as low as −22°F (−30°C) without significant damage.",
  "The term 'vintage' simply means the year the grapes were harvested — not that the wine is particularly old.",
  "When approving a wine at the table, a simple nod or 'that's fine' is all that's needed. You don't have to pronounce it great — just confirm it's not flawed.",
  "A Bordeaux barrel holds 225 liters — enough to fill exactly 300 standard bottles.",
  "Swirling wine increases its surface area and releases aromatic compounds, making subtle aromas more detectable.",
  "At a restaurant, it's acceptable to ask for a small sample before committing to a glass pour. Most good wine programs will oblige.",
  "Port wine takes its name from Porto, Portugal, the city from which it was historically shipped to Britain.",
  "The 1976 Judgment of Paris shocked the wine world when California wines outscored top French wines in a blind tasting.",
  "Wine lists organized by region are traditional European style; lists organized by grape variety are more common in New World restaurants. Both approaches are equally valid.",
  "A standard restaurant pour is 5 oz — about one-fifth of a bottle.",
  "Wine aged in larger bottles (magnums, jeroboams) typically develops more slowly and gracefully than in standard bottles.",
  "The second-cheapest bottle on a wine list is often more marked-up than the cheapest — savvy diners gravitate there. Look to lesser-known regions for the best value per dollar.",
  "Ancient Romans sometimes sweetened wine with lead acetate — known as 'sugar of lead' — with predictable health consequences.",
  "A magnum holds 1.5 liters, the equivalent of two standard bottles.",
  "If a restaurant's wine is genuinely faulty — corked, oxidized, or heat-damaged — a reputable establishment will replace it without argument, no matter how much of the bottle has been poured.",
  "Young red wines are deep purple; as they age, the color gradually shifts toward brick red or garnet at the rim.",
  "The Barossa Valley in South Australia is home to some of the world's oldest producing Shiraz vines — over 150 years old.",
  "Champagne gets its bubbles from a second fermentation that happens inside the sealed bottle.",
  "Grapes must reach a precise sugar level (measured in Brix) before harvest — picking too early or too late changes everything.",
  "Sommeliers can legally earn the title Master Sommelier only after passing one of the most difficult examinations in the world.",
  "A wine described as 'blind' means the taster doesn't know what they're drinking — not that the wine has anything to hide."
];

let triviaTimer = null;
let triviaHideTimer = null;
let triviaPool = [];

function nextTriviaFact() {
  if (!triviaPool.length) {
    triviaPool = TRIVIA_FACTS.slice().sort(() => Math.random() - 0.5);
  }
  return triviaPool.pop();
}

function showTrivia() {
  if (!TRIVIA_ENABLED || state.view !== "tv") return;
  const banner = document.getElementById("trivia-banner");
  if (!banner) return;
  clearTimeout(triviaHideTimer);
  banner.innerHTML = '<div class="trivia-card"><p class="trivia-text">' + escapeHtml(nextTriviaFact()) + '</p></div>';
  banner.classList.add("visible");
  triviaHideTimer = setTimeout(function() { banner.classList.remove("visible"); }, 30000);
}

function startTrivia() {
  if (!TRIVIA_ENABLED || triviaTimer) return;
  triviaTimer = setTimeout(function schedule() {
    showTrivia();
    triviaTimer = setTimeout(schedule, 480000 + Math.random() * 120000);
  }, 120000);
}

function stopTrivia() {
  clearTimeout(triviaTimer);
  clearTimeout(triviaHideTimer);
  triviaTimer = null;
  triviaHideTimer = null;
  const banner = document.getElementById("trivia-banner");
  if (banner) banner.classList.remove("visible");
}

refresh({ photos: state.view === "album", reveal: state.view === "tv" }).then(() => {
  if (state.view === "tv" && new URLSearchParams(location.search).has("demo") && state.bootstrap.leaderboard.length) {
    state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard));
    state.demoAnimationPending = true;
    render();
    startDemoVoting();
  }
}).catch((error) => {
  app.innerHTML = panel(`<p>${escapeHtml(error.message)}</p>`);
});
