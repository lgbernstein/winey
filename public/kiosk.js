if (window.navigator && window.navigator.standalone) {
  document.body.className = (document.body.className + " standalone").trim();
}

let noSleep = null;
let noSleepArmed = false;
try {
  if (typeof NoSleep !== "undefined") {
    noSleep = new NoSleep();
  }
} catch (e) { /* unsupported, fall through */ }

function armNoSleep() {
  if (!noSleep || noSleepArmed) return;
  noSleepArmed = true;
  const p = noSleep.enable();
  if (p && typeof p.catch === "function") p.catch(() => { noSleepArmed = false; });
}

document.addEventListener("click", armNoSleep, true);
document.addEventListener("touchstart", armNoSleep, true);

const IDLE_TIMEOUT_MS = 60000;
function clearForm() {
  state.selectedGuestId = "";
  state.selectedSleeve = "";
  state.selectedGrape = "";
  state.starRating = 0;
  state.appearance = "";
  state.nose = [];
  state.palate = { Sweetness: "", Acidity: "", Tannins: "", Body: "" };
  state.openModal = null;
  state.showAddGuest = false;
  state.guestRatedBags = [];
}

// Fetch (just) the chosen guest's already-rated sleeves, then re-render so the
// repeat banner appears. Scoped per guest — no global history broadcast.
async function loadRatedBags(userId) {
  try {
    const data = await api("/api/guests/" + encodeURIComponent(userId) + "/rated-bags");
    if (String(state.selectedGuestId) === String(userId)) {
      state.guestRatedBags = data.bags || [];
      render();
    }
  } catch (e) {
    /* non-fatal: leave repeat detection off if the lookup fails */
  }
}

let idleTimer = null;
function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (state.submitting) return;
    if (!state.selectedGuestId && !state.selectedSleeve && !state.selectedGrape && !state.starRating && !state.openModal && !state.showAddGuest && !state.appearance && !state.nose.length && !Object.keys(state.palate).some((m) => state.palate[m])) return;
    clearForm();
    render();
  }, IDLE_TIMEOUT_MS);
}
document.addEventListener("click", resetIdleTimer, true);
document.addEventListener("touchstart", resetIdleTimer, true);
document.addEventListener("keydown", resetIdleTimer, true);

const state = {
  bootstrap: null,
  selectedGuestId: "",
  selectedSleeve: "",
  selectedGrape: "",
  starRating: 0,
  appearance: "",
  nose: [],
  palate: { Sweetness: "", Acidity: "", Tannins: "", Body: "" },
  showAddGuest: false,
  openModal: null,
  submitting: false,
  lastError: "",
  guestRatedBags: []
};

const APPEARANCE_OPTIONS = [
  { value: "Ruby", label: "Ruby" },
  { value: "Garnet", label: "Garnet" },
  { value: "Purple", label: "Purple" },
  { value: "Contains Sediment", label: "Sediment" }
];
const NOSE_OPTIONS = [
  { value: "Red Fruits (Cherry/Raspberry)", label: "Red Fruits" },
  { value: "Black Fruits (Blackberry/Plum)", label: "Black Fruits" },
  { value: "Earth / Mineral", label: "Earth" },
  { value: "Spice / Oak (Vanilla/Pepper)", label: "Spice / Oak" }
];
const PALATE_OPTIONS = {
  Sweetness: [{ value: "Bone Dry", label: "Bone Dry" }, { value: "Off-Dry", label: "Off-Dry" }, { value: "Sweet", label: "Sweet" }],
  Acidity: [{ value: "Low (Soft)", label: "Low" }, { value: "Medium (Fresh)", label: "Med" }, { value: "High (Tart)", label: "High" }],
  Tannins: [{ value: "Low (Smooth)", label: "Low" }, { value: "Medium (Velvety)", label: "Med" }, { value: "High (Grippy)", label: "High" }],
  Body: [{ value: "Light", label: "Light" }, { value: "Medium", label: "Med" }, { value: "Full-Bodied", label: "Full" }]
};

const main = document.querySelector("#main");
const modalMount = document.querySelector("#modal-mount");
const toast = document.querySelector("#toast");

const escapeHtml = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[c]);

async function api(url, options) {
  options = options || {};
  const isJson = !!options.body;
  const headers = isJson ? { "Content-Type": "application/json" } : {};
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: headers,
    body: isJson ? JSON.stringify(options.body) : null
  });
  let payload = {};
  try { payload = await response.json(); } catch (e) { /* no body */ }
  if (!response.ok) throw new Error(payload.error || ("Request failed (" + response.status + ")"));
  return payload;
}

let toastTimer = null;
function notice(message, isError) {
  toast.textContent = message;
  toast.className = "toast" + (isError ? " error-toast" : "");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = "toast hidden"; }, 3200);
}

function effectiveSleeve() {
  if (state.selectedSleeve) return state.selectedSleeve;
  if (state.bootstrap && state.bootstrap.nowPouring) return String(state.bootstrap.nowPouring);
  return "";
}

function isIdle() {
  return !state.selectedGuestId && !state.selectedSleeve && !state.selectedGrape && !state.starRating && !state.showAddGuest;
}

function guestLabel() {
  if (!state.selectedGuestId || !state.bootstrap) return "";
  const g = state.bootstrap.guests.filter((x) => String(x.id) === state.selectedGuestId)[0];
  return g ? g.displayName : "";
}

function sleeveLabel() {
  const sleeve = effectiveSleeve();
  if (!sleeve || !state.bootstrap) return "";
  const isCurrent = state.bootstrap.nowPouring && String(state.bootstrap.nowPouring) === sleeve;
  return "Bottle " + sleeve + (isCurrent ? " · now pouring" : "");
}

function grapeLabel() {
  if (!state.selectedGrape) return "";
  return state.selectedGrape;
}

function fieldButton(id, legend, value, placeholder) {
  const inner = value
    ? escapeHtml(value)
    : '<span class="placeholder">' + escapeHtml(placeholder) + '</span>';
  return '<div class="field-group"><label class="legend">' + escapeHtml(legend) + '</label>' +
    '<button type="button" class="field-button" data-open-modal="' + id + '">' +
    '<span class="value">' + inner + '</span><span class="caret">▼</span>' +
    '</button></div>';
}

function modalMarkup() {
  if (!state.openModal || !state.bootstrap) return "";
  const b = state.bootstrap;
  let title = "";
  let items = "";
  let footer = "";

  if (state.openModal === "taster") {
    title = "Pick your name";
    const sortedGuests = b.guests.slice().sort((a, c) => a.displayName.localeCompare(c.displayName, undefined, { sensitivity: "base" }));
    const perCol = Math.ceil(sortedGuests.length / 2);
    const columnOrdered = [];
    for (let row = 0; row < perCol; row++) {
      for (let col = 0; col < 2; col++) {
        const idx = col * perCol + row;
        if (idx < sortedGuests.length) columnOrdered.push(sortedGuests[idx]);
      }
    }
    items = columnOrdered.map((g) => {
      const isSelected = String(g.id) === state.selectedGuestId;
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-guest="' + g.id + '">' + escapeHtml(g.displayName) + '</button>';
    }).join("");
    items += '<button type="button" class="modal-item add-new" data-show-add-guest="1">+ Add new name…</button>';
    if (state.showAddGuest) {
      footer = '<div class="modal-add-form">' +
        '<input type="text" id="guest-name" placeholder="Your name" autocomplete="off" autocapitalize="words">' +
        '<button type="button" class="ghost" id="add-guest">Add</button>' +
        '</div>';
    }
  } else if (state.openModal === "sleeve") {
    title = "Pick a sleeve";
    const sleeve = effectiveSleeve();
    const sortedBottles = b.bottles.slice().sort((a, c) => a.bagNumber - c.bagNumber);
    const perCol = Math.ceil(sortedBottles.length / 2);
    const columnOrdered = [];
    for (let row = 0; row < perCol; row++) {
      for (let col = 0; col < 2; col++) {
        const idx = col * perCol + row;
        if (idx < sortedBottles.length) columnOrdered.push(sortedBottles[idx]);
      }
    }
    items = columnOrdered.map((bot) => {
      const isCurrent = b.nowPouring === bot.bagNumber;
      const isSelected = String(bot.bagNumber) === sleeve;
      const label = "Bottle " + bot.bagNumber + (isCurrent ? " · now pouring" : "");
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-sleeve="' + bot.bagNumber + '">' + escapeHtml(label) + '</button>';
    }).join("");
  } else if (state.openModal === "grape") {
    title = "Guess the grape";
    const allGrapes = b.grapes.slice().sort((a, c) => a.name.localeCompare(c.name, undefined, { sensitivity: "base" }));
    const notSure = allGrapes.find((g) => g.name === "Not sure");
    const rest = allGrapes.filter((g) => g.name !== "Not sure");
    const perCol = Math.ceil(rest.length / 2);
    const columnOrdered = [];
    for (let row = 0; row < perCol; row++) {
      for (let col = 0; col < 2; col++) {
        const idx = col * perCol + row;
        if (idx < rest.length) columnOrdered.push(rest[idx]);
      }
    }
    items = "";
    if (notSure) {
      const isSelected = notSure.name === state.selectedGrape;
      items += '<button type="button" class="modal-item full-width' + (isSelected ? ' selected' : '') + '" data-pick-grape="' + escapeHtml(notSure.name) + '">' + escapeHtml(notSure.name) + '</button>';
    }
    items += columnOrdered.map((g) => {
      const isSelected = g.name === state.selectedGrape;
      const hint = g.appellations ? '<span class="hint">' + escapeHtml(g.appellations) + '</span>' : "";
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-grape="' + escapeHtml(g.name) + '">' + escapeHtml(g.name) + hint + '</button>';
    }).join("");
  }

  const listClass = state.openModal === "taster" || state.openModal === "grape" || state.openModal === "sleeve" ? "modal-list cols-2" : "modal-list";
  return '<div class="modal-overlay" data-close-modal="1">' +
    '<div class="modal" data-modal-content="1">' +
      '<div class="modal-head"><h2>' + escapeHtml(title) + '</h2>' +
        '<button type="button" class="modal-close" data-close-modal="1">Close</button>' +
      '</div>' +
      '<div class="' + listClass + '">' + items + '</div>' +
      footer +
    '</div>' +
  '</div>';
}

function render() {
  if (!state.bootstrap) {
    main.innerHTML = '<p class="loading">Loading…</p>';
    return;
  }

  const b = state.bootstrap;

  if (b.state !== "LIVE_TASTING") {
    const headline = b.state === "GRAND_REVEAL" ? "The reveal is on" : (b.state === "ARCHIVE" ? "Tasting wrapped up" : "Ratings closed");
    const sub = b.state === "GRAND_REVEAL" ? "Head to the TV for grape reveals and the leaderboard." : "Your host will reopen ratings when ready.";
    main.innerHTML =
      '<div class="now-pouring">' +
        '<div class="label">' + escapeHtml(headline) + '</div>' +
        '<div class="sleeve" style="font-size: 36px; margin-top: 12px;">🍷</div>' +
        '<p class="name" style="margin-top: 14px; font-size: 18px;">' + escapeHtml(sub) + '</p>' +
      '</div>';
    return;
  }

  const sleeve = effectiveSleeve();

  const starsHtml = [1,2,3,4,5].map((n) => {
    const filled = n <= state.starRating;
    return '<button type="button" class="' + (filled ? 'selected' : '') + '" data-star="' + n + '" aria-label="' + n + ' stars">' + (filled ? '★' : '☆') + '</button>';
  }).join("");

  const canSubmit = !!(state.selectedGuestId && sleeve && state.selectedGrape && state.starRating > 0) && !state.submitting;

  const alreadyRated = !!(state.selectedGuestId && sleeve
    && state.guestRatedBags.indexOf(Number(sleeve)) >= 0);
  const repeatBanner = alreadyRated
    ? '<div class="repeat-note">' +
        '<div class="repeat-title">Already rated sleeve #' + escapeHtml(String(sleeve)) + '</div>' +
        '<div class="repeat-sub">You\'re all set on this one 🍷</div>' +
        '<button type="button" class="repeat-clear" data-clear-form aria-label="Clear and start over">Clear &amp; keep tasting</button>' +
      '</div>'
    : '';

  const noseChips = NOSE_OPTIONS.map((o) => {
    const sel = state.nose.indexOf(o.value) >= 0 ? " selected" : "";
    return '<button type="button" class="chip' + sel + '" data-toggle-nose="' + escapeHtml(o.value) + '">' + escapeHtml(o.label) + '</button>';
  }).join("");
  const palateRows = Object.keys(PALATE_OPTIONS).map((metric) => {
    const chips = PALATE_OPTIONS[metric].map((o) => {
      const sel = state.palate[metric] === o.value ? " selected" : "";
      return '<button type="button" class="chip' + sel + '" data-set-palate="' + metric + '|' + escapeHtml(o.value) + '">' + escapeHtml(o.label) + '</button>';
    }).join("");
    return '<div class="palate-row"><span class="palate-metric">' + metric + '</span><div class="chip-row palate-chips">' + chips + '</div></div>';
  }).join("");

  // When this taster has already rated this sleeve, lock the form: no grape,
  // aromas, palate, rating, or save — just the prominent banner and Clear.
  const inputSection = alreadyRated
    ? ''
    : fieldButton("grape", "Grape guess", grapeLabel(), "Guess the grape") +
      '<div class="tight-group"><label class="legend tight-legend">Aromas</label><div class="chip-row">' + noseChips + '</div></div>' +
      '<div class="tight-group"><label class="legend tight-legend">Palate</label>' + palateRows + '</div>' +
      '<div class="tight-group"><label class="legend tight-legend">Your rating</label><div class="stars">' + starsHtml + '</div></div>' +
      '<button type="submit" class="save-btn"' + (canSubmit ? '' : ' disabled') + '>' + (state.submitting ? 'Saving…' : 'Save tasting') + '</button>';

  main.innerHTML =
    (b.nowPouring
      ? '<div class="now-pouring"><div class="label">Now pouring</div><div class="sleeve">#' + b.nowPouring + '</div></div>'
      : '') +
    '<form id="form" autocomplete="off">' +
      fieldButton("taster", "Taster", guestLabel(), "Pick your name") +
      fieldButton("sleeve", "Sleeve", sleeveLabel(), "Pick a sleeve") +
      repeatBanner +
      inputSection +
    '</form>';
  paintModal();
}

function paintModal() {
  modalMount.innerHTML = modalMarkup();
  if (state.openModal === "taster" && state.showAddGuest) {
    const nameInput = document.querySelector("#guest-name");
    if (nameInput) nameInput.focus();
  }
}

function updateFieldButtonText(modalId, value) {
  const btn = document.querySelector('[data-open-modal="' + modalId + '"] .value');
  if (!btn) return;
  if (value) {
    btn.textContent = value;
    btn.className = "value";
  } else {
    btn.className = "value placeholder";
  }
}

function updateSaveButton() {
  const sleeve = effectiveSleeve();
  const canSubmit = !!(state.selectedGuestId && sleeve && state.selectedGrape && state.starRating > 0) && !state.submitting;
  const btn = document.querySelector(".save-btn");
  if (btn) {
    if (canSubmit) btn.removeAttribute("disabled");
    else btn.setAttribute("disabled", "");
  }
}

async function refresh() {
  state.bootstrap = await api("/api/bootstrap");
  render();
}

async function submit() {
  if (state.submitting) return;
  const sleeve = effectiveSleeve();
  if (!state.selectedGuestId || !sleeve || !state.selectedGrape || !state.starRating) return;
  state.submitting = true;
  render();
  try {
    const palatePayload = {};
    Object.keys(state.palate).forEach((m) => { if (state.palate[m]) palatePayload[m] = state.palate[m]; });
    await api("/api/tastings", {
      method: "POST",
      body: {
        userId: Number(state.selectedGuestId),
        bagNumber: Number(sleeve),
        rating: state.starRating,
        grapeGuess: state.selectedGrape,
        isBookmarked: false,
        appearance: state.appearance,
        nose: state.nose,
        palate: palatePayload
      }
    });
    notice("Done. Now get back to tasting.");
    clearForm();
    await refresh();
  } catch (e) {
    notice(e.message || "Could not save.", true);
  } finally {
    state.submitting = false;
    render();
  }
}

async function addGuest(name) {
  const trimmed = (name || "").replace(/\s+/g, " ").trim();
  if (!trimmed) {
    notice("Type a name first.", true);
    return;
  }
  try {
    const guest = await api("/api/guests", { method: "POST", body: { displayName: trimmed } });
    state.selectedGuestId = String(guest.id);
    state.showAddGuest = false;
    state.guestRatedBags = [];
    loadRatedBags(state.selectedGuestId);
    await refresh();
  } catch (e) {
    notice(e.message || "Could not add.", true);
  }
}

function toggleChip(target) {
  const closest = (sel) => target.closest ? target.closest(sel) : null;

  const appEl = closest("[data-set-appearance]");
  if (appEl) {
    const val = appEl.getAttribute("data-set-appearance");
    const wasSelected = state.appearance === val;
    state.appearance = wasSelected ? "" : val;
    const parent = appEl.parentNode;
    if (parent) {
      const others = parent.querySelectorAll(".chip.selected");
      for (let i = 0; i < others.length; i++) others[i].className = others[i].className.replace(" selected", "");
    }
    if (!wasSelected) appEl.className += " selected";
    return true;
  }

  const noseEl = closest("[data-toggle-nose]");
  if (noseEl) {
    const val = noseEl.getAttribute("data-toggle-nose");
    const idx = state.nose.indexOf(val);
    if (idx >= 0) {
      state.nose.splice(idx, 1);
      noseEl.className = noseEl.className.replace(" selected", "");
    } else {
      state.nose.push(val);
      if (noseEl.className.indexOf("selected") < 0) noseEl.className += " selected";
    }
    return true;
  }

  const palateEl = closest("[data-set-palate]");
  if (palateEl) {
    const parts = palateEl.getAttribute("data-set-palate").split("|");
    const metric = parts[0];
    const val = parts.slice(1).join("|");
    const wasSelected = state.palate[metric] === val;
    state.palate[metric] = wasSelected ? "" : val;
    const row = palateEl.parentNode;
    if (row) {
      const others = row.querySelectorAll(".chip.selected");
      for (let i = 0; i < others.length; i++) others[i].className = others[i].className.replace(" selected", "");
    }
    if (!wasSelected) palateEl.className += " selected";
    return true;
  }

  return false;
}

function handleTap(target) {
  if (!target) return false;
  const closest = (sel) => target.closest ? target.closest(sel) : null;

  // Stars on the fast touch path — on iOS 9 the click event lags ~300ms.
  const starEl = closest("[data-star]");
  if (starEl) {
    state.starRating = Number(starEl.getAttribute("data-star"));
    render();
    return true;
  }

  // Discreet "Clear" — wipe the form and slip back to tasting.
  const clearEl = closest("[data-clear-form]");
  if (clearEl) {
    clearForm();
    render();
    return true;
  }

  // Save tasting on the fast touch path; submit() guards against double-fire.
  const saveEl = closest(".save-btn");
  if (saveEl && !saveEl.disabled) {
    submit();
    return true;
  }

  if (target.classList && target.classList.contains("chip")) {
    return toggleChip(target);
  }

  const openEl = closest("[data-open-modal]");
  if (openEl) {
    state.openModal = openEl.getAttribute("data-open-modal");
    state.showAddGuest = false;
    paintModal();
    return true;
  }

  if (target.classList && (target.classList.contains("modal-close") || target.classList.contains("modal-overlay"))) {
    state.openModal = null;
    state.showAddGuest = false;
    paintModal();
    return true;
  }

  const guestEl = closest("[data-pick-guest]");
  if (guestEl) {
    state.selectedGuestId = guestEl.getAttribute("data-pick-guest");
    state.openModal = null;
    state.showAddGuest = false;
    state.guestRatedBags = [];
    loadRatedBags(state.selectedGuestId);
    render();
    return true;
  }

  const sleeveEl = closest("[data-pick-sleeve]");
  if (sleeveEl) {
    const newSleeve = sleeveEl.getAttribute("data-pick-sleeve");
    // Switching to a different sleeve starts a fresh tasting — don't carry the
    // previous wine's grape guess, rating, or notes onto another bottle.
    if (newSleeve !== state.selectedSleeve) {
      state.selectedGrape = "";
      state.starRating = 0;
      state.appearance = "";
      state.nose = [];
      state.palate = { Sweetness: "", Acidity: "", Tannins: "", Body: "" };
    }
    state.selectedSleeve = newSleeve;
    state.openModal = null;
    render();
    return true;
  }

  const grapeEl = closest("[data-pick-grape]");
  if (grapeEl) {
    state.selectedGrape = grapeEl.getAttribute("data-pick-grape");
    state.openModal = null;
    paintModal();
    updateFieldButtonText("grape", grapeLabel());
    updateSaveButton();
    return true;
  }

  const showAddEl = closest("[data-show-add-guest]");
  if (showAddEl) {
    state.showAddGuest = true;
    paintModal();
    return true;
  }

  return false;
}

let lastTouchHandled = 0;
let touchStartTarget = null;
let touchStartY = 0;
let touchStartX = 0;
let touchMoved = false;
document.addEventListener("touchstart", (event) => {
  touchStartTarget = event.target;
  if (event.touches && event.touches[0]) {
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
  }
  touchMoved = false;
}, true);
document.addEventListener("touchmove", (event) => {
  if (touchMoved || !event.touches || !event.touches[0]) return;
  const dy = Math.abs(event.touches[0].clientY - touchStartY);
  const dx = Math.abs(event.touches[0].clientX - touchStartX);
  if (dy > 10 || dx > 10) touchMoved = true;
}, true);
document.addEventListener("touchend", (event) => {
  if (touchMoved) {
    event.preventDefault();
    return;
  }
  const t = event.target;
  const startedInsideModal = touchStartTarget && touchStartTarget.closest && touchStartTarget.closest(".modal");
  const endingOnBackdrop = t && t.classList && t.classList.contains("modal-overlay");
  if (startedInsideModal && endingOnBackdrop) {
    event.preventDefault();
    return;
  }
  if (handleTap(t)) {
    lastTouchHandled = Date.now();
    event.preventDefault();
  }
}, false);

document.addEventListener("click", (event) => {
  const t = event.target;
  if (!t) return;
  if (Date.now() - lastTouchHandled < 600) return;

  if (handleTap(t)) return;

  if (t.id === "add-guest") {
    const input = document.querySelector("#guest-name");
    if (input) addGuest(input.value);
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "form") submit();
});

refresh().catch((e) => {
  main.innerHTML = '<p class="error">Could not load: ' + escapeHtml(e.message) + '</p>';
});

setInterval(() => {
  if (isIdle() && !state.submitting) {
    refresh().catch(() => { /* keep last bootstrap */ });
  }
}, 20000);
