"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
if (window.navigator && window.navigator.standalone) {
  document.body.className = (document.body.className + " standalone").trim();
}
var noSleep = null;
var noSleepArmed = false;
try {
  if (typeof NoSleep !== "undefined") {
    noSleep = new NoSleep();
  }
} catch (e) {/* unsupported, fall through */}
function armNoSleep() {
  if (!noSleep || noSleepArmed) return;
  noSleepArmed = true;
  var p = noSleep.enable();
  if (p && typeof p.catch === "function") p.catch(function () {
    noSleepArmed = false;
  });
}
document.addEventListener("click", armNoSleep, true);
document.addEventListener("touchstart", armNoSleep, true);
var IDLE_TIMEOUT_MS = 60000;
function clearForm() {
  state.selectedGuestId = "";
  state.selectedSleeve = "";
  state.selectedGrape = "";
  state.starRating = 0;
  state.appearance = "";
  state.nose = [];
  state.palate = {
    Sweetness: "",
    Acidity: "",
    Tannins: "",
    Body: ""
  };
  state.openModal = null;
  state.showAddGuest = false;
}
var idleTimer = null;
function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(function () {
    if (state.submitting) return;
    if (!state.selectedGuestId && !state.selectedSleeve && !state.selectedGrape && !state.starRating && !state.openModal && !state.showAddGuest && !state.appearance && !state.nose.length && !Object.keys(state.palate).some(function (m) {
      return state.palate[m];
    })) return;
    clearForm();
    render();
  }, IDLE_TIMEOUT_MS);
}
document.addEventListener("click", resetIdleTimer, true);
document.addEventListener("touchstart", resetIdleTimer, true);
document.addEventListener("keydown", resetIdleTimer, true);
var state = {
  bootstrap: null,
  selectedGuestId: "",
  selectedSleeve: "",
  selectedGrape: "",
  starRating: 0,
  appearance: "",
  nose: [],
  palate: {
    Sweetness: "",
    Acidity: "",
    Tannins: "",
    Body: ""
  },
  showAddGuest: false,
  openModal: null,
  submitting: false,
  lastError: ""
};
var APPEARANCE_OPTIONS = [{
  value: "Ruby",
  label: "Ruby"
}, {
  value: "Garnet",
  label: "Garnet"
}, {
  value: "Purple",
  label: "Purple"
}, {
  value: "Contains Sediment",
  label: "Sediment"
}];
var NOSE_OPTIONS = [{
  value: "Red Fruits (Cherry/Raspberry)",
  label: "Red Fruits"
}, {
  value: "Black Fruits (Blackberry/Plum)",
  label: "Black Fruits"
}, {
  value: "Earth / Mineral",
  label: "Earth"
}, {
  value: "Spice / Oak (Vanilla/Pepper)",
  label: "Spice / Oak"
}];
var PALATE_OPTIONS = {
  Sweetness: [{
    value: "Bone Dry",
    label: "Bone Dry"
  }, {
    value: "Off-Dry",
    label: "Off-Dry"
  }, {
    value: "Sweet",
    label: "Sweet"
  }],
  Acidity: [{
    value: "Low (Soft)",
    label: "Low"
  }, {
    value: "Medium (Fresh)",
    label: "Med"
  }, {
    value: "High (Tart)",
    label: "High"
  }],
  Tannins: [{
    value: "Low (Smooth)",
    label: "Low"
  }, {
    value: "Medium (Velvety)",
    label: "Med"
  }, {
    value: "High (Grippy)",
    label: "High"
  }],
  Body: [{
    value: "Light",
    label: "Light"
  }, {
    value: "Medium",
    label: "Med"
  }, {
    value: "Full-Bodied",
    label: "Full"
  }]
};
var main = document.querySelector("#main");
var modalMount = document.querySelector("#modal-mount");
var toast = document.querySelector("#toast");
var escapeHtml = function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c];
  });
};
function api(_x, _x2) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, options) {
    var isJson, headers, response, payload, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = options || {};
          isJson = !!options.body;
          headers = isJson ? {
            "Content-Type": "application/json"
          } : {};
          _context.n = 1;
          return fetch(url, {
            method: options.method || "GET",
            headers: headers,
            body: isJson ? JSON.stringify(options.body) : null
          });
        case 1:
          response = _context.v;
          payload = {};
          _context.p = 2;
          _context.n = 3;
          return response.json();
        case 3:
          payload = _context.v;
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
        case 5:
          if (response.ok) {
            _context.n = 6;
            break;
          }
          throw new Error(payload.error || "Request failed (" + response.status + ")");
        case 6:
          return _context.a(2, payload);
      }
    }, _callee, null, [[2, 4]]);
  }));
  return _api.apply(this, arguments);
}
var toastTimer = null;
function notice(message, isError) {
  toast.textContent = message;
  toast.className = "toast" + (isError ? " error-toast" : "");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.className = "toast hidden";
  }, 3200);
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
  var g = state.bootstrap.guests.filter(function (x) {
    return String(x.id) === state.selectedGuestId;
  })[0];
  return g ? g.displayName : "";
}
function sleeveLabel() {
  var sleeve = effectiveSleeve();
  if (!sleeve || !state.bootstrap) return "";
  var isCurrent = state.bootstrap.nowPouring && String(state.bootstrap.nowPouring) === sleeve;
  return "Bottle " + sleeve + (isCurrent ? " · now pouring" : "");
}
function grapeLabel() {
  if (!state.selectedGrape) return "";
  return state.selectedGrape;
}
function fieldButton(id, legend, value, placeholder) {
  var inner = value ? escapeHtml(value) : '<span class="placeholder">' + escapeHtml(placeholder) + '</span>';
  return '<div class="field-group"><label class="legend">' + escapeHtml(legend) + '</label>' + '<button type="button" class="field-button" data-open-modal="' + id + '">' + '<span class="value">' + inner + '</span><span class="caret">▼</span>' + '</button></div>';
}
function modalMarkup() {
  if (!state.openModal || !state.bootstrap) return "";
  var b = state.bootstrap;
  var title = "";
  var items = "";
  var footer = "";
  if (state.openModal === "taster") {
    title = "Pick your name";
    var sortedGuests = b.guests.slice().sort(function (a, c) {
      return a.displayName.localeCompare(c.displayName, undefined, {
        sensitivity: "base"
      });
    });
    var perCol = Math.ceil(sortedGuests.length / 2);
    var columnOrdered = [];
    for (var row = 0; row < perCol; row++) {
      for (var col = 0; col < 2; col++) {
        var idx = col * perCol + row;
        if (idx < sortedGuests.length) columnOrdered.push(sortedGuests[idx]);
      }
    }
    items = columnOrdered.map(function (g) {
      var isSelected = String(g.id) === state.selectedGuestId;
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-guest="' + g.id + '">' + escapeHtml(g.displayName) + '</button>';
    }).join("");
    items += '<button type="button" class="modal-item add-new" data-show-add-guest="1">+ Add new name…</button>';
    if (state.showAddGuest) {
      footer = '<div class="modal-add-form">' + '<input type="text" id="guest-name" placeholder="Your name" autocomplete="off" autocapitalize="words">' + '<button type="button" class="ghost" id="add-guest">Add</button>' + '</div>';
    }
  } else if (state.openModal === "sleeve") {
    title = "Pick a sleeve";
    var sleeve = effectiveSleeve();
    var sortedBottles = b.bottles.slice().sort(function (a, c) {
      return a.bagNumber - c.bagNumber;
    });
    var _perCol = Math.ceil(sortedBottles.length / 2);
    var _columnOrdered = [];
    for (var _row = 0; _row < _perCol; _row++) {
      for (var _col = 0; _col < 2; _col++) {
        var _idx = _col * _perCol + _row;
        if (_idx < sortedBottles.length) _columnOrdered.push(sortedBottles[_idx]);
      }
    }
    items = _columnOrdered.map(function (bot) {
      var isCurrent = b.nowPouring === bot.bagNumber;
      var isSelected = String(bot.bagNumber) === sleeve;
      var label = "Bottle " + bot.bagNumber + (isCurrent ? " · now pouring" : "");
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-sleeve="' + bot.bagNumber + '">' + escapeHtml(label) + '</button>';
    }).join("");
  } else if (state.openModal === "grape") {
    title = "Guess the grape";
    var allGrapes = b.grapes.slice().sort(function (a, c) {
      return a.name.localeCompare(c.name, undefined, {
        sensitivity: "base"
      });
    });
    var notSure = allGrapes.find(function (g) {
      return g.name === "Not sure";
    });
    var rest = allGrapes.filter(function (g) {
      return g.name !== "Not sure";
    });
    var _perCol2 = Math.ceil(rest.length / 2);
    var _columnOrdered2 = [];
    for (var _row2 = 0; _row2 < _perCol2; _row2++) {
      for (var _col2 = 0; _col2 < 2; _col2++) {
        var _idx2 = _col2 * _perCol2 + _row2;
        if (_idx2 < rest.length) _columnOrdered2.push(rest[_idx2]);
      }
    }
    items = "";
    if (notSure) {
      var isSelected = notSure.name === state.selectedGrape;
      items += '<button type="button" class="modal-item full-width' + (isSelected ? ' selected' : '') + '" data-pick-grape="' + escapeHtml(notSure.name) + '">' + escapeHtml(notSure.name) + '</button>';
    }
    items += _columnOrdered2.map(function (g) {
      var isSelected = g.name === state.selectedGrape;
      var hint = g.appellations ? '<span class="hint">' + escapeHtml(g.appellations) + '</span>' : "";
      return '<button type="button" class="modal-item' + (isSelected ? ' selected' : '') + '" data-pick-grape="' + escapeHtml(g.name) + '">' + escapeHtml(g.name) + hint + '</button>';
    }).join("");
  }
  var listClass = state.openModal === "taster" || state.openModal === "grape" || state.openModal === "sleeve" ? "modal-list cols-2" : "modal-list";
  return '<div class="modal-overlay" data-close-modal="1">' + '<div class="modal" data-modal-content="1">' + '<div class="modal-head"><h2>' + escapeHtml(title) + '</h2>' + '<button type="button" class="modal-close" data-close-modal="1">Close</button>' + '</div>' + '<div class="' + listClass + '">' + items + '</div>' + footer + '</div>' + '</div>';
}
function render() {
  if (!state.bootstrap) {
    main.innerHTML = '<p class="loading">Loading…</p>';
    return;
  }
  var b = state.bootstrap;
  if (b.state !== "LIVE_TASTING") {
    var headline = b.state === "GRAND_REVEAL" ? "The reveal is on" : b.state === "ARCHIVE" ? "Tasting wrapped up" : "Ratings closed";
    var sub = b.state === "GRAND_REVEAL" ? "Head to the TV for grape reveals and the leaderboard." : "Your host will reopen ratings when ready.";
    main.innerHTML = '<div class="now-pouring">' + '<div class="label">' + escapeHtml(headline) + '</div>' + '<div class="sleeve" style="font-size: 36px; margin-top: 12px;">🍷</div>' + '<p class="name" style="margin-top: 14px; font-size: 18px;">' + escapeHtml(sub) + '</p>' + '</div>';
    return;
  }
  var sleeve = effectiveSleeve();
  var starsHtml = [1, 2, 3, 4, 5].map(function (n) {
    var filled = n <= state.starRating;
    return '<button type="button" class="' + (filled ? 'selected' : '') + '" data-star="' + n + '" aria-label="' + n + ' stars">' + (filled ? '★' : '☆') + '</button>';
  }).join("");
  var canSubmit = !!(state.selectedGuestId && sleeve && state.selectedGrape && state.starRating > 0) && !state.submitting;
  var selectedGuest = state.selectedGuestId ? b.guests.filter(function (g) {
    return String(g.id) === state.selectedGuestId;
  })[0] : null;
  var alreadyRated = !!(selectedGuest && sleeve && selectedGuest.ratedBags && selectedGuest.ratedBags.indexOf(Number(sleeve)) >= 0);
  var repeatBanner = alreadyRated ? '<div class="repeat-note"><span>🍷 Already rated sleeve #' + escapeHtml(String(sleeve)) + '</span><button type="button" class="repeat-clear" data-clear-form aria-label="Clear and start over">Clear</button></div>' : '';
  var noseChips = NOSE_OPTIONS.map(function (o) {
    var sel = state.nose.indexOf(o.value) >= 0 ? " selected" : "";
    return '<button type="button" class="chip' + sel + '" data-toggle-nose="' + escapeHtml(o.value) + '">' + escapeHtml(o.label) + '</button>';
  }).join("");
  var palateRows = Object.keys(PALATE_OPTIONS).map(function (metric) {
    var chips = PALATE_OPTIONS[metric].map(function (o) {
      var sel = state.palate[metric] === o.value ? " selected" : "";
      return '<button type="button" class="chip' + sel + '" data-set-palate="' + metric + '|' + escapeHtml(o.value) + '">' + escapeHtml(o.label) + '</button>';
    }).join("");
    return '<div class="palate-row"><span class="palate-metric">' + metric + '</span><div class="chip-row palate-chips">' + chips + '</div></div>';
  }).join("");
  main.innerHTML = (b.nowPouring ? '<div class="now-pouring"><div class="label">Now pouring</div><div class="sleeve">#' + b.nowPouring + '</div></div>' : '') + '<form id="form" autocomplete="off">' + repeatBanner + fieldButton("taster", "Taster", guestLabel(), "Pick your name") + fieldButton("sleeve", "Sleeve", sleeveLabel(), "Pick a sleeve") + fieldButton("grape", "Grape guess", grapeLabel(), "Guess the grape") + '<div class="tight-group"><label class="legend tight-legend">Aromas</label><div class="chip-row">' + noseChips + '</div></div>' + '<div class="tight-group"><label class="legend tight-legend">Palate</label>' + palateRows + '</div>' + '<div class="tight-group"><label class="legend tight-legend">Your rating</label><div class="stars">' + starsHtml + '</div></div>' + '<button type="submit" class="save-btn"' + (canSubmit ? '' : ' disabled') + '>' + (state.submitting ? 'Saving…' : 'Save tasting') + '</button>' + '</form>';
  paintModal();
}
function paintModal() {
  modalMount.innerHTML = modalMarkup();
  if (state.openModal === "taster" && state.showAddGuest) {
    var nameInput = document.querySelector("#guest-name");
    if (nameInput) nameInput.focus();
  }
}
function updateFieldButtonText(modalId, value) {
  var btn = document.querySelector('[data-open-modal="' + modalId + '"] .value');
  if (!btn) return;
  if (value) {
    btn.textContent = value;
    btn.className = "value";
  } else {
    btn.className = "value placeholder";
  }
}
function updateSaveButton() {
  var sleeve = effectiveSleeve();
  var canSubmit = !!(state.selectedGuestId && sleeve && state.selectedGrape && state.starRating > 0) && !state.submitting;
  var btn = document.querySelector(".save-btn");
  if (btn) {
    if (canSubmit) btn.removeAttribute("disabled");else btn.setAttribute("disabled", "");
  }
}
function refresh() {
  return _refresh.apply(this, arguments);
}
function _refresh() {
  _refresh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return api("/api/bootstrap");
        case 1:
          state.bootstrap = _context2.v;
          render();
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _refresh.apply(this, arguments);
}
function submit() {
  return _submit.apply(this, arguments);
}
function _submit() {
  _submit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var sleeve, palatePayload, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!state.submitting) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          sleeve = effectiveSleeve();
          if (!(!state.selectedGuestId || !sleeve || !state.selectedGrape || !state.starRating)) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2);
        case 2:
          state.submitting = true;
          render();
          _context3.p = 3;
          palatePayload = {};
          Object.keys(state.palate).forEach(function (m) {
            if (state.palate[m]) palatePayload[m] = state.palate[m];
          });
          _context3.n = 4;
          return api("/api/tastings", {
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
        case 4:
          notice("Done. Now get back to tasting.");
          state.selectedGuestId = "";
          state.selectedSleeve = "";
          state.selectedGrape = "";
          state.starRating = 0;
          state.appearance = "";
          state.nose = [];
          state.palate = {
            Sweetness: "",
            Acidity: "",
            Tannins: "",
            Body: ""
          };
          state.showAddGuest = false;
          _context3.n = 5;
          return refresh();
        case 5:
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t2 = _context3.v;
          notice(_t2.message || "Could not save.", true);
        case 7:
          _context3.p = 7;
          state.submitting = false;
          render();
          return _context3.f(7);
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[3, 6, 7, 8]]);
  }));
  return _submit.apply(this, arguments);
}
function addGuest(_x3) {
  return _addGuest.apply(this, arguments);
}
function _addGuest() {
  _addGuest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(name) {
    var trimmed, guest, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          trimmed = (name || "").replace(/\s+/g, " ").trim();
          if (trimmed) {
            _context4.n = 1;
            break;
          }
          notice("Type a name first.", true);
          return _context4.a(2);
        case 1:
          _context4.p = 1;
          _context4.n = 2;
          return api("/api/guests", {
            method: "POST",
            body: {
              displayName: trimmed
            }
          });
        case 2:
          guest = _context4.v;
          state.selectedGuestId = String(guest.id);
          state.showAddGuest = false;
          _context4.n = 3;
          return refresh();
        case 3:
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t3 = _context4.v;
          notice(_t3.message || "Could not add.", true);
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 4]]);
  }));
  return _addGuest.apply(this, arguments);
}
function toggleChip(target) {
  var closest = function closest(sel) {
    return target.closest ? target.closest(sel) : null;
  };
  var appEl = closest("[data-set-appearance]");
  if (appEl) {
    var val = appEl.getAttribute("data-set-appearance");
    var wasSelected = state.appearance === val;
    state.appearance = wasSelected ? "" : val;
    var parent = appEl.parentNode;
    if (parent) {
      var others = parent.querySelectorAll(".chip.selected");
      for (var i = 0; i < others.length; i++) others[i].className = others[i].className.replace(" selected", "");
    }
    if (!wasSelected) appEl.className += " selected";
    return true;
  }
  var noseEl = closest("[data-toggle-nose]");
  if (noseEl) {
    var _val = noseEl.getAttribute("data-toggle-nose");
    var idx = state.nose.indexOf(_val);
    if (idx >= 0) {
      state.nose.splice(idx, 1);
      noseEl.className = noseEl.className.replace(" selected", "");
    } else {
      state.nose.push(_val);
      if (noseEl.className.indexOf("selected") < 0) noseEl.className += " selected";
    }
    return true;
  }
  var palateEl = closest("[data-set-palate]");
  if (palateEl) {
    var parts = palateEl.getAttribute("data-set-palate").split("|");
    var metric = parts[0];
    var _val2 = parts.slice(1).join("|");
    var _wasSelected = state.palate[metric] === _val2;
    state.palate[metric] = _wasSelected ? "" : _val2;
    var row = palateEl.parentNode;
    if (row) {
      var _others = row.querySelectorAll(".chip.selected");
      for (var _i = 0; _i < _others.length; _i++) _others[_i].className = _others[_i].className.replace(" selected", "");
    }
    if (!_wasSelected) palateEl.className += " selected";
    return true;
  }
  return false;
}
function handleTap(target) {
  if (!target) return false;
  var closest = function closest(sel) {
    return target.closest ? target.closest(sel) : null;
  };

  // Stars on the fast touch path — on iOS 9 the click event lags ~300ms.
  var starEl = closest("[data-star]");
  if (starEl) {
    state.starRating = Number(starEl.getAttribute("data-star"));
    render();
    return true;
  }

  // Discreet "Clear" — wipe the form and slip back to tasting.
  var clearEl = closest("[data-clear-form]");
  if (clearEl) {
    clearForm();
    render();
    return true;
  }

  // Save tasting on the fast touch path; submit() guards against double-fire.
  var saveEl = closest(".save-btn");
  if (saveEl && !saveEl.disabled) {
    submit();
    return true;
  }
  if (target.classList && target.classList.contains("chip")) {
    return toggleChip(target);
  }
  var openEl = closest("[data-open-modal]");
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
  var guestEl = closest("[data-pick-guest]");
  if (guestEl) {
    state.selectedGuestId = guestEl.getAttribute("data-pick-guest");
    state.openModal = null;
    state.showAddGuest = false;
    render();
    return true;
  }
  var sleeveEl = closest("[data-pick-sleeve]");
  if (sleeveEl) {
    state.selectedSleeve = sleeveEl.getAttribute("data-pick-sleeve");
    state.openModal = null;
    render();
    return true;
  }
  var grapeEl = closest("[data-pick-grape]");
  if (grapeEl) {
    state.selectedGrape = grapeEl.getAttribute("data-pick-grape");
    state.openModal = null;
    paintModal();
    updateFieldButtonText("grape", grapeLabel());
    updateSaveButton();
    return true;
  }
  var showAddEl = closest("[data-show-add-guest]");
  if (showAddEl) {
    state.showAddGuest = true;
    paintModal();
    return true;
  }
  return false;
}
var lastTouchHandled = 0;
var touchStartTarget = null;
var touchStartY = 0;
var touchStartX = 0;
var touchMoved = false;
document.addEventListener("touchstart", function (event) {
  touchStartTarget = event.target;
  if (event.touches && event.touches[0]) {
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
  }
  touchMoved = false;
}, true);
document.addEventListener("touchmove", function (event) {
  if (touchMoved || !event.touches || !event.touches[0]) return;
  var dy = Math.abs(event.touches[0].clientY - touchStartY);
  var dx = Math.abs(event.touches[0].clientX - touchStartX);
  if (dy > 10 || dx > 10) touchMoved = true;
}, true);
document.addEventListener("touchend", function (event) {
  if (touchMoved) {
    event.preventDefault();
    return;
  }
  var t = event.target;
  var startedInsideModal = touchStartTarget && touchStartTarget.closest && touchStartTarget.closest(".modal");
  var endingOnBackdrop = t && t.classList && t.classList.contains("modal-overlay");
  if (startedInsideModal && endingOnBackdrop) {
    event.preventDefault();
    return;
  }
  if (handleTap(t)) {
    lastTouchHandled = Date.now();
    event.preventDefault();
  }
}, false);
document.addEventListener("click", function (event) {
  var t = event.target;
  if (!t) return;
  if (Date.now() - lastTouchHandled < 600) return;
  var closest = function closest(sel) {
    return t.closest ? t.closest(sel) : null;
  };
  var starEl = closest("[data-star]");
  if (starEl) {
    state.starRating = Number(starEl.getAttribute("data-star"));
    render();
    return;
  }
  if (handleTap(t)) return;
  if (t.id === "add-guest") {
    var input = document.querySelector("#guest-name");
    if (input) addGuest(input.value);
  }
});
document.addEventListener("submit", function (event) {
  event.preventDefault();
  if (event.target.id === "form") submit();
});
refresh().catch(function (e) {
  main.innerHTML = '<p class="error">Could not load: ' + escapeHtml(e.message) + '</p>';
});
setInterval(function () {
  if (isIdle() && !state.submitting) {
    refresh().catch(function () {/* keep last bootstrap */});
  }
}, 20000);
