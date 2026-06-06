"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function queryParam(name) {
  var match = location.search.match(new RegExp("[?&]".concat(name, "=([^&]*)")));
  return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "";
}
function stateLabel(value) {
  return String(value || "").replace(/_/g, " ");
}
var state = {
  bootstrap: null,
  photos: [],
  reveal: [],
  revealData: null,
  host: null,
  selectedGuestId: localStorage.getItem("wineGuestId") || "",
  starRating: 0,
  view: ["tv", "album", "host", "taste"].includes(queryParam("view")) ? queryParam("view") : "taste",
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
  guestBulkSubmitting: false,
  showGuestEditor: false,
  guestEditId: null,
  guestEditName: ""
};
var views = [["taste", "Taste"], ["album", "Album"], ["tv", "TV"], ["host", "Host"]];
var app = document.querySelector("#app");
var nav = document.querySelector("#nav");
var toast = document.querySelector("#toast");
var hostToken = function hostToken() {
  return localStorage.getItem("wineHostToken") || "";
};
var escapeHtml = function escapeHtml() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
};
function shuffleBoard(items) {
  return _toConsumableArray(items).sort(function () {
    return Math.random() - 0.5;
  });
}
var DEMO_EVENT_DELAY = 3200;
var DEMO_GUESTS = ["Maria", "Hannah", "Ari", "Mia", "Noah", "Sam", "Jess", "Taylor", "Kai", "June"];
function cloneDemoBoard(items) {
  return _toConsumableArray(items).map(function (item) {
    var targetAverage = Number(item.averageRating || 3);
    var initial = Math.max(1.0, targetAverage - (Math.floor(Math.random() * 15) + 7) / 10);
    return _objectSpread(_objectSpread({}, item), {}, {
      targetAverageRating: targetAverage,
      targetVoteCount: Number(item.voteCount || 4),
      averageRating: Number(initial.toFixed(1)),
      voteCount: Math.max(1, Math.floor(Number(item.voteCount || 4) / 3 + Math.random() * 3)),
      voting: false
    });
  });
}
function clampRating(value) {
  return Number(Math.max(0.1, Math.min(5, value)).toFixed(1));
}
function buildDemoEvent(board) {
  var sorted = _toConsumableArray(board).sort(function (a, b) {
    return b.averageRating - a.averageRating || b.voteCount - a.voteCount || a.bagNumber - b.bagNumber;
  });
  if (sorted.length < 2) return null;
  var index = Math.floor(Math.random() * (sorted.length - 1));
  var above = sorted[index];
  var below = sorted[index + 1];
  var direction = Math.random() > 0.4 ? "raise" : "lower";
  var target = direction === "raise" ? below : above;
  var neighbor = direction === "raise" ? above : below;
  var ratingStep = 0.2 + Math.random() * 0.15;
  var newRating = direction === "raise" ? clampRating(neighbor.averageRating + ratingStep) : clampRating(neighbor.averageRating - ratingStep);
  return {
    bagNumber: target.bagNumber,
    guest: DEMO_GUESTS[Math.floor(Math.random() * DEMO_GUESTS.length)],
    direction: direction,
    newRating: newRating,
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
  var event = buildDemoEvent(state.demoBoard);
  if (!event) return;
  state.demoBoard.forEach(function (item) {
    item.moving = false;
    item.voting = false;
  });
  var target = state.demoBoard.find(function (item) {
    return item.bagNumber === event.bagNumber;
  });
  var changedBags = new Set();
  if (target) {
    target.voting = true;
    target.moving = true;
    target.averageRating = event.newRating;
    target.voteCount = target.voteCount + 1;
    changedBags.add(String(target.bagNumber));
    if (event.swapWith) {
      var neighbor = state.demoBoard.find(function (item) {
        return item.bagNumber === event.swapWith;
      });
      if (neighbor) {
        neighbor.moving = true;
        changedBags.add(String(neighbor.bagNumber));
      }
    }
  }
  state.demoBoard.sort(function (a, b) {
    return b.averageRating - a.averageRating || b.voteCount - a.voteCount || a.bagNumber - b.bagNumber;
  });
  state.demoScoreUpdates = _toConsumableArray(changedBags);
  state.demoAnimationPending = true;
  state.demoVoteTimer = -1;
  render();
  state.demoVoteTimer = setTimeout(function () {
    if (!state.demoBoard || state.view !== "tv") {
      state.demoVoteTimer = null;
      return;
    }
    state.demoBoard.forEach(function (item) {
      item.voting = false;
      item.moving = false;
    });
    render();
    runDemoVoteStep();
  }, DEMO_EVENT_DELAY);
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url) {
    var options,
      headers,
      response,
      payload,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          headers = _objectSpread(_objectSpread({}, options.body instanceof FormData ? {} : {
            "Content-Type": "application/json"
          }), options.headers);
          if (options.host) headers.Authorization = "Bearer ".concat(hostToken());
          _context3.n = 1;
          return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
            headers: headers,
            body: options.body instanceof FormData ? options.body : options.body && JSON.stringify(options.body)
          }));
        case 1:
          response = _context3.v;
          _context3.n = 2;
          return response.json().catch(function () {
            return {};
          });
        case 2:
          payload = _context3.v;
          if (response.ok) {
            _context3.n = 3;
            break;
          }
          throw new Error(payload.error || "Request failed.");
        case 3:
          return _context3.a(2, payload);
      }
    }, _callee3);
  }));
  return _api.apply(this, arguments);
}
function notice(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(notice.timer);
  notice.timer = setTimeout(function () {
    return toast.classList.add("hidden");
  }, 3200);
}
var REVEAL_SCENE_TITLES = {
  "sommelier": "The Vine Whisperer",
  "podium": "Crowd Favorites",
  "reveal-all": "The Wines",
  "group-accuracy": "How Did We Do?",
  "the-numbers": "The Numbers"
};

// TV header when no reveal scene is active — matches the event state so the
// title fits what's actually on screen (no "Live Standings" before tasting).
function tvStandbyTitle(eventState) {
  switch (eventState) {
    case "REGISTRATION":
      return "Welcome";
    case "GRAND_REVEAL":
      return "The Grand Reveal";
    case "ARCHIVE":
      return "Final Standings";
    default:
      return "Live Standings";
  }
}
function navMarkup() {
  nav.innerHTML = views.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      id = _ref2[0],
      label = _ref2[1];
    return "\n    <button class=\"".concat(state.view === id ? "tap-primary" : "tap-quiet", "\" data-view=\"").concat(id, "\" type=\"button\">").concat(label, "</button>\n  ");
  }).join("");
  var isTv = state.view === "tv";
  document.body.classList.toggle("tv-mode", isTv);
  var headerLabel = document.getElementById("header-label");
  if (headerLabel) {
    var _state$bootstrap, _state$bootstrap2;
    var scene = (_state$bootstrap = state.bootstrap) === null || _state$bootstrap === void 0 ? void 0 : _state$bootstrap.revealScene;
    var eventState = (_state$bootstrap2 = state.bootstrap) === null || _state$bootstrap2 === void 0 ? void 0 : _state$bootstrap2.state;
    var sceneActive = (eventState === "GRAND_REVEAL" || eventState === "ARCHIVE") && scene;
    var title = isTv ? sceneActive && REVEAL_SCENE_TITLES[scene] || tvStandbyTitle(eventState) : "";
    headerLabel.innerHTML = isTv ? "<span class=\"tv-header-label\">".concat(escapeHtml(title), "</span>") : "";
  }
}
function choice(name, value, label) {
  var checked = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "radio";
  return "\n    <label class=\"choice flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-amber-100/15 bg-stone-950/45 p-3 text-amber-50\">\n      <input class=\"size-5 accent-amber-300\" type=\"".concat(type, "\" name=\"").concat(name, "\" value=\"").concat(escapeHtml(value), "\" ").concat(checked ? "checked" : "", ">\n      <span>").concat(escapeHtml(label), "</span>\n    </label>\n  ");
}
function panel(content) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return "<section class=\"panel rounded-lg p-4 sm:p-6 ".concat(classes, "\">").concat(content, "</section>");
}
function guestOptions() {
  return "\n    <option value=\"\">Select your name</option>\n    ".concat(state.bootstrap.guests.map(function (guest) {
    return "<option value=\"".concat(guest.id, "\" ").concat(String(guest.id) === String(state.selectedGuestId) ? "selected" : "", ">").concat(escapeHtml(guest.displayName), "</option>");
  }).join(""), "\n    <option value=\"__add__\">+ Add new name\u2026</option>\n  ");
}
function bottleOptions() {
  var effective = state.selectedSleeve || (state.bootstrap.nowPouring ? String(state.bootstrap.nowPouring) : "");
  return "\n    <option value=\"\">Sleeve number</option>\n    ".concat(state.bootstrap.bottles.map(function (bottle) {
    var isSelected = String(bottle.bagNumber) === String(effective);
    var isPouring = state.bootstrap.nowPouring === bottle.bagNumber;
    var label = isPouring ? "Bottle ".concat(bottle.bagNumber, " \xB7 now pouring") : "Bottle ".concat(bottle.bagNumber);
    return "<option value=\"".concat(bottle.bagNumber, "\"").concat(isSelected ? " selected" : "", ">").concat(label, "</option>");
  }).join(""), "\n  ");
}
function coachInnerMarkup(sleeve) {
  if (!sleeve) return "";
  var key = String(sleeve);
  var coach = state.bottleCoach[key];
  var pending = coach === undefined || state.bottleCoachLoading === key;
  if (pending) {
    return "\n      <p class=\"kicker mb-2\">Notice this \xB7 Sleeve #".concat(escapeHtml(key), "</p>\n      <p class=\"text-sm italic text-amber-50/75\">Checking with the sommelier\u2026</p>\n    ");
  }
  if (!coach) return "";
  var formatted = escapeHtml(coach).replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>').replace(/\n/g, "<br>");
  return "\n    <p class=\"kicker mb-2\">Notice this \xB7 Sleeve #".concat(escapeHtml(key), "</p>\n    <div class=\"text-sm leading-6\">").concat(formatted, "</div>\n  ");
}
function coachCardMarkup() {
  var inner = coachInnerMarkup(state.selectedSleeve);
  var hidden = inner ? "" : " hidden";
  return "<div id=\"coach-card\" class=\"mt-4 rounded-lg border border-amber-200/25 bg-amber-950/25 p-4 text-amber-50".concat(hidden, "\">").concat(inner, "</div>");
}
function paintCoachCard() {
  var card = document.querySelector("#coach-card");
  if (!card) return;
  var inner = coachInnerMarkup(state.selectedSleeve);
  card.innerHTML = inner;
  card.classList.toggle("hidden", !inner);
}
function stars() {
  return "\n    <div class=\"rounded-md border border-amber-100/15 bg-stone-950/55 p-3\" role=\"radiogroup\" aria-label=\"Rating\">\n      <div class=\"flex flex-nowrap items-center justify-between gap-1 sm:justify-start sm:gap-2\">\n        ".concat([1, 2, 3, 4, 5].map(function (rating) {
    return "\n          <label class=\"cursor-pointer\">\n            <input class=\"peer sr-only\" type=\"radio\" name=\"rating\" value=\"".concat(rating, "\" aria-label=\"").concat(rating, " stars\" ").concat(state.starRating === rating ? "checked" : "", ">\n            <span class=\"star-pick ").concat(rating <= state.starRating ? "star-filled" : "", " flex size-10 items-center justify-center rounded-md text-4xl leading-none sm:size-12 sm:text-[2.75rem]\" data-star=\"").concat(rating, "\" aria-hidden=\"true\">").concat(rating <= state.starRating ? "★" : "☆", "</span>\n          </label>\n        ");
  }).join(""), "\n      </div>\n      <span class=\"mt-1 block text-sm text-amber-50/80 sm:mt-2\" data-rating-summary>").concat(state.starRating ? "".concat(state.starRating, " / 5") : "Tap a star", "</span>\n    </div>\n  ");
}
function tastingGrid() {
  var grid = state.bootstrap.tastingGrid;
  return "\n    <details class=\"mt-5 rounded-md border border-amber-100/15 bg-stone-950/35 p-4\">\n      <summary class=\"cursor-pointer text-base font-semibold text-amber-100\">Optional tasting details</summary>\n      <div class=\"mt-4 grid gap-5\">\n        <fieldset>\n          <legend class=\"mb-2 font-semibold\">Appearance</legend>\n          <p class=\"tooltip-note mb-3\">Assess the color and edge of the wine against a white background to judge age and variety.</p>\n          <div class=\"grid gap-2 sm:grid-cols-2\">".concat(grid.appearances.map(function (item) {
    return choice("appearance", item, item);
  }).join(""), "</div>\n        </fieldset>\n        <fieldset>\n          <legend class=\"mb-2 font-semibold\">Nose</legend>\n          <p class=\"tooltip-note mb-3\">Swirl the glass and take brief sniffs. Choose the aromatic profiles that stand out.</p>\n          <div class=\"grid gap-2 sm:grid-cols-2\">").concat(grid.noses.map(function (item) {
    return choice("nose", item, item, false, "checkbox");
  }).join(""), "</div>\n        </fieldset>\n        <fieldset>\n          <legend class=\"mb-2 font-semibold\">Palate</legend>\n          <p class=\"tooltip-note mb-3\">Notice structure on your tongue. Sweetness, acidity, tannins, and body describe feel more than flavor.</p>\n          <div class=\"grid gap-4 lg:grid-cols-2\">\n            ").concat(Object.entries(grid.palate).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      metric = _ref4[0],
      options = _ref4[1];
    return "\n              <div>\n                <p class=\"mb-2 text-sm font-bold text-amber-200\">".concat(escapeHtml(metric), "</p>\n                <div class=\"grid gap-2\">").concat(options.map(function (item) {
      return choice("palate-".concat(metric), item, item);
    }).join(""), "</div>\n              </div>\n            ");
  }).join(""), "\n          </div>\n        </fieldset>\n      </div>\n    </details>\n  ");
}
function tasteView() {
  if (state.bootstrap.state !== "LIVE_TASTING") {
    return panel("\n      <div class=\"mx-auto max-w-2xl py-8 text-center\">\n        <p class=\"kicker\">Ratings closed</p>\n        <h2 class=\"screen-title mt-2\">The reveal is on</h2>\n        <p class=\"mt-3 text-lg text-amber-50/80\">Head to the TV view for the bottles, crowd scores, and grape-guess results.</p>\n        <button class=\"tap-primary mt-6\" data-view=\"tv\" type=\"button\">See grand reveal</button>\n      </div>\n    ");
  }
  return "\n    <div class=\"grid gap-4 lg:grid-cols-[1.4fr_.8fr]\">\n      ".concat(panel("\n        <div class=\"mb-5 flex flex-wrap items-end justify-between gap-3\">\n          <div>\n            <p class=\"kicker\">Fast tasting</p>\n            <h2 class=\"screen-title\">Rate the sleeve in a few taps</h2>\n          </div>\n          <span class=\"rounded-md bg-emerald-400/15 px-3 py-2 text-sm text-emerald-100\">".concat(escapeHtml(stateLabel(state.bootstrap.state)), "</span>\n        </div>\n        <form id=\"tasting-form\">\n          <label>\n            <span class=\"mb-2 block text-sm font-bold text-amber-100\">Taster</span>\n            <select id=\"guest-select\" class=\"field\" required>").concat(guestOptions(), "</select>\n          </label>\n          <div id=\"guest-form\" class=\"mt-3 hidden grid gap-2 grid-cols-[1fr_auto]\">\n            <input class=\"field\" name=\"displayName\" maxlength=\"60\" placeholder=\"New taster name\" aria-label=\"New taster name\" autocomplete=\"off\">\n            <button class=\"tap-primary\" type=\"button\" id=\"add-guest\">Add</button>\n          </div>\n          <div class=\"mt-5 grid gap-4 md:grid-cols-[160px_1fr]\">\n            <label>\n              <span class=\"mb-2 block text-sm font-bold text-amber-100\">Blind bottle</span>\n              <select name=\"bagNumber\" class=\"field\" required>").concat(bottleOptions(), "</select>\n            </label>\n            <label>\n              <span class=\"mb-2 block text-sm font-bold text-amber-100\">Grape guess</span>\n              <select name=\"grapeGuess\" class=\"field\" required>\n                ").concat(state.bootstrap.grapes.map(function (grape) {
    var hint = grape.appellations ? " \u2014 ".concat(grape.appellations) : "";
    return "<option value=\"".concat(escapeHtml(grape.name), "\">").concat(escapeHtml(grape.name + hint), "</option>");
  }).join(""), "\n              </select>\n            </label>\n          </div>\n          ").concat(coachCardMarkup(), "\n          <fieldset class=\"mt-5\">\n            <legend class=\"mb-2 text-sm font-bold text-amber-100\">Your rating</legend>\n            ").concat(stars(), "\n          </fieldset>\n          <label class=\"mt-4 flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-rose-200/20 bg-rose-950/25 p-3\">\n            <input class=\"size-5 accent-rose-400\" type=\"checkbox\" name=\"isBookmarked\">\n            <span>Save this one as a favourite</span>\n          </label>\n          ").concat(tastingGrid(), "\n          <button class=\"tap-primary mt-5 w-full text-lg\" type=\"submit\">Save tasting</button>\n        </form>\n      ")), "\n      ").concat(panel("\n        <h2 class=\"text-xl font-semibold\">Party pace</h2>\n        <p class=\"mt-2 text-amber-50/80\">The core score is only stars and a grape guess. Hand the kiosk to the next taster after save.</p>\n        <div class=\"mt-5 grid gap-3\">\n          <div class=\"soft-stat rounded-md p-4\">\n            <p class=\"text-3xl font-semibold text-amber-300\">".concat(state.bootstrap.bottles.length, "</p>\n            <p class=\"text-amber-50/75\">blind bottles checked in</p>\n          </div>\n          <div class=\"soft-stat rounded-md p-4\">\n            <p class=\"text-3xl font-semibold text-emerald-300\">").concat(state.bootstrap.guests.length, "</p>\n            <p class=\"text-amber-50/75\">tasters on the list</p>\n          </div>\n        </div>\n      ")), "\n    </div>\n  ");
}
function photosMarkup() {
  if (!state.photos.length) return "<p class=\"rounded-md border border-amber-100/15 bg-stone-950/40 p-5 text-amber-50/75\">The shared album is waiting for the first party photo.</p>";
  return "<div class=\"grid gap-3 sm:grid-cols-2 lg:grid-cols-3\">".concat(state.photos.map(function (photo) {
    return "\n    <figure class=\"relative overflow-hidden rounded-lg border border-amber-100/15 bg-stone-950/55\">\n      <button style=\"position:absolute;top:8px;right:8px;z-index:10;width:28px;height:28px;border-radius:50%;background:rgba(10,5,5,0.75);color:#fff7ec;font-size:14px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.2)\" data-delete-photo=\"".concat(photo.id, "\" title=\"Delete photo\">\u2715</button>\n      <img class=\"aspect-[4/3] w-full object-cover\" src=\"").concat(escapeHtml(photo.storageUrl), "\" alt=\"Party photo uploaded by ").concat(escapeHtml(photo.displayName), "\">\n      <figcaption class=\"px-3 py-2 text-sm text-amber-50/80\">").concat(escapeHtml(photo.displayName), "</figcaption>\n    </figure>\n  ");
  }).join(""), "</div>");
}
function albumView() {
  return panel("\n    <div class=\"mb-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end\">\n      <div>\n        <p class=\"kicker\">Shared album</p>\n        <h2 class=\"screen-title\">Photos from the evening</h2>\n        <a href=\"/kiosk.html\" class=\"mt-1 inline-block text-sm text-amber-400/70 hover:text-amber-400\">\u2190 Back to kiosk</a>\n      </div>\n      <form id=\"photo-form\" class=\"grid gap-2 sm:grid-cols-[1fr_auto]\">\n        <input class=\"field file:mr-3 file:rounded-md file:border-0 file:bg-emerald-300 file:px-3 file:py-2 file:font-semibold file:text-stone-950\" type=\"file\" name=\"photo\" accept=\"image/*\" required>\n        <button class=\"tap-primary\" type=\"submit\">Upload</button>\n      </form>\n    </div>\n    ".concat(photosMarkup(), "\n  "));
}
function boardMarkup(items) {
  if (!items.length) return "<p class=\"rounded-md bg-stone-950/45 p-5 text-amber-50/75\">Host check-in will put numbered sleeves on the board.</p>";
  var visibleItems = state.demoBoard || items;
  var sorted = state.demoBoard ? visibleItems : _toConsumableArray(visibleItems).sort(function (a, b) {
    var left = a.voteCount ? a.averageRating : -1;
    var right = b.voteCount ? b.averageRating : -1;
    return right - left || a.bagNumber - b.bagNumber;
  });
  return "<ol class=\"tv-bottle-grid\">".concat(sorted.map(function (item) {
    return "\n    <li class=\"tv-rank tv-bottle-card".concat(item.voting ? " voting" : "").concat(item.moving ? " moving" : "", "\" data-bag-number=\"").concat(item.bagNumber, "\">\n      <div class=\"bottle-flip\">\n        <div class=\"bottle-flip-inner\" data-flip-bag=\"").concat(item.bagNumber, "\">\n          <div class=\"bottle-flip-front\">\n            <div class=\"blind-bottle\" aria-label=\"Sleeve ").concat(item.bagNumber, "\">\n              <div class=\"blind-bottle-lip\"></div>\n              <div class=\"blind-bottle-neck\"></div>\n              <div class=\"blind-bottle-shoulders\"></div>\n              <div class=\"blind-bottle-body\"><span>#").concat(item.bagNumber, "</span></div>\n            </div>\n          </div>\n          <div class=\"bottle-flip-back\"></div>\n        </div>\n      </div>\n      <p class=\"tv-bottle-score\">").concat(item.voteCount ? "".concat(Number(item.averageRating).toFixed(1), " / 5") : "Awaiting ratings", "</p>\n      <p class=\"text-sm text-amber-50/65\">").concat(item.voteCount, " rating").concat(item.voteCount === 1 ? "" : "s", "</p>\n      <div class=\"mt-3 min-h-14\">\n        ").concat(item.grapeGuesses.length ? function () {
      var top = item.grapeGuesses[0].count;
      var leaders = item.grapeGuesses.filter(function (g) {
        return g.count === top;
      });
      return "<div class=\"flex flex-wrap justify-center gap-1\">".concat(leaders.map(function (g) {
        return "<span class=\"tv-guess-chip\">".concat(g.count, " \xD7 ").concat(escapeHtml(g.label), "</span>");
      }).join(""), "</div>");
    }() : "", "\n      </div>\n    </li>\n  ");
  }).join(""), "</ol>");
}
function revealedBottleMarkup(bottle) {
  var photo = bottle.photoUrl ? "<img class=\"revealed-bottle-photo\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"").concat(escapeHtml(bottle.bottleName || ""), "\" loading=\"lazy\">") : "<div class=\"revealed-bottle-no-photo\">#".concat(bottle.bagNumber, "</div>");
  return "<div class=\"revealed-bottle\">\n    ".concat(photo, "\n    <div class=\"revealed-bottle-info\">\n      <p class=\"revealed-bottle-sleeve\">Sleeve ").concat(bottle.bagNumber, "</p>\n      <p class=\"revealed-bottle-name\">").concat(escapeHtml(bottle.bottleName || ""), "</p>\n      ").concat(bottle.grape ? "<p class=\"revealed-bottle-grape\">".concat(escapeHtml(bottle.grape), "</p>") : "", "\n    </div>\n  </div>");
}
var revealFlipDone = false;
var podiumStep = 0;
var podiumTimer = null;
var podiumSettleTimer = null;
var grandStandbyQuip = 0;
var grandStandbyTimer = null;
var welcomeQuip = 0;
var welcomeTimer = null;
var WELCOME_QUIPS = [{
  title: "Kiosks are all around the house 🍷",
  sub: "…but if you absolutely need your phone, we support you. Unconditionally."
}, {
  title: "There are kiosks literally everywhere 🍷",
  sub: "…but fine, use your phone. We didn't set up multiple iPads for nothing, but fine."
}, {
  title: "We put kiosks everywhere so you could keep drinking 🍷",
  sub: "…but if you need your phone to taste wine, here you go. No judgment. (A little judgment.)"
}, {
  title: "The kiosk is literally right there 🍷",
  sub: "…but scan this if you'd rather squint at your phone all night."
}, {
  title: "Pro tip: kiosks don't need charging 🍷",
  sub: "…your phone, however, is at 12%. But scan away."
}, {
  title: "You walked past three kiosks to get here 🍷",
  sub: "…but here's the app anyway. We respect the commitment."
}, {
  title: "Kiosks: tastefully placed throughout the home 🍷",
  sub: "…but we see you reaching for your phone. We see you."
}];
var GRAND_REVEAL_QUIPS = ["The results are in. Please pretend you weren't just guessing.", "The votes are counted. The wines have been judged. Your confidence was adorable.", "The results are in. Some of you will be smug. Some of you will be quiet. Both are valid.", "Yes, you can bring your glass. You're going to want your glass.", "You tasted blind. You guessed boldly. Now we find out how that went.", "Some of you nailed it. Some of you picked Malbec six times. We'll never tell.", "This is either going to be a triumphant moment or a humbling one. Statistically, one of those is more likely."];
function makeQrSvg(data, size) {
  if (typeof window.qrcode !== "function") return "";
  var qr = window.qrcode(0, "M");
  qr.addData(data);
  qr.make();
  return qr.createImgTag(size, 0);
}
function renderWelcomeScreen() {
  var port = window.location.port || "3000";
  var ip = state.bootstrap && state.bootstrap.lanIp || window.location.hostname;
  var kioskUrl = "http://" + ip + ":" + port + "/kiosk.html";
  var wifiQr = makeQrSvg("WIFI:T:WPA;S:LGB7;P:" + (state.bootstrap && state.bootstrap.wifiPassword || "") + ";;", 10);
  var kioskQr = makeQrSvg(kioskUrl, 10);
  var q = WELCOME_QUIPS[welcomeQuip % WELCOME_QUIPS.length];
  return "\n    <div class=\"welcome-screen\">\n      <h1 class=\"welcome-title\">".concat(escapeHtml(q.title), "</h1>\n      <p class=\"welcome-sub\">").concat(escapeHtml(q.sub), "</p>\n      <div class=\"welcome-qrs\">\n        <div class=\"welcome-qr-block\">\n          <div class=\"welcome-qr-box\"><div class=\"welcome-qr-inner\">").concat(wifiQr, "</div></div>\n          <p class=\"welcome-qr-label\">\uD83D\uDCF6 Join the Wi-Fi</p>\n          <p class=\"welcome-qr-hint\">LGB7</p>\n        </div>\n        <div class=\"welcome-qr-divider\">then</div>\n        <div class=\"welcome-qr-block\">\n          <div class=\"welcome-qr-box\"><div class=\"welcome-qr-inner\">").concat(kioskQr, "</div></div>\n          <p class=\"welcome-qr-label\">\uD83D\uDCF1 Open the Kiosk</p>\n          <p class=\"welcome-qr-hint\">Rate wines on your phone</p>\n        </div>\n      </div>\n    </div>\n  ");
}
function renderGrandRevealStandby() {
  var quip = GRAND_REVEAL_QUIPS[grandStandbyQuip % GRAND_REVEAL_QUIPS.length];
  return "\n    <div class=\"reveal-scene-shell grand-standby\">\n      <div class=\"grand-standby-glass\">\uD83C\uDF77</div>\n      <h1 class=\"grand-standby-title\">The Grand Reveal</h1>\n      <p class=\"grand-standby-quip\">".concat(escapeHtml(quip), "</p>\n      <p class=\"grand-standby-cue\">Grab a glass and gather round\u2026</p>\n    </div>\n  ");
}
function triggerRevealFlip() {
  var _state$revealData;
  if (revealFlipDone) return;
  var bottles = ((_state$revealData = state.revealData) === null || _state$revealData === void 0 ? void 0 : _state$revealData.revealAll) || state.reveal;
  if (!bottles.length) return;
  var revealMap = new Map(bottles.map(function (b) {
    return [String(b.bagNumber), b];
  }));
  var inners = document.querySelectorAll(".bottle-flip-inner");
  if (!inners.length) return;
  revealFlipDone = true;
  inners.forEach(function (inner) {
    var bottle = revealMap.get(inner.dataset.flipBag);
    if (!bottle) return;
    inner.querySelector(".bottle-flip-back").innerHTML = revealedBottleMarkup(bottle);
    var delay = Math.random() * 160;
    setTimeout(function () {
      return inner.classList.add("flipped");
    }, delay);
  });
}
function fitTvGrid() {
  if (state.view !== "tv") return;
  var grid = document.querySelector(".tv-bottle-grid");
  var header = document.querySelector("header");
  if (!grid || !header) return;
  var sampleBottle = grid.querySelector(".blind-bottle");
  if (!sampleBottle) return;
  var actualBottleH = sampleBottle.scrollHeight;
  if (!actualBottleH) return;
  var available = window.innerHeight - header.offsetHeight - 48;
  var perRow = (available - 16) / 2;
  var targetBottleH = perRow - 96;
  var scale = Math.min(1, Math.max(0.4, targetBottleH / actualBottleH));
  grid.querySelectorAll(".blind-bottle").forEach(function (el) {
    el.style.zoom = scale;
  });
}
function recordTvBoardPositions() {
  var board = document.querySelector(".tv-bottle-grid");
  if (!board) return null;
  return new Map(_toConsumableArray(board.querySelectorAll("[data-bag-number]")).map(function (item) {
    return [item.dataset.bagNumber, item.getBoundingClientRect()];
  }));
}
function animateTvBoard(oldPositions) {
  if (!oldPositions) return;
  var board = document.querySelector(".tv-bottle-grid");
  if (!board) return;
  board.querySelectorAll("[data-bag-number]").forEach(function (item) {
    var oldRect = oldPositions.get(item.dataset.bagNumber);
    if (!oldRect) return;
    var newRect = item.getBoundingClientRect();
    var dx = oldRect.left - newRect.left;
    var dy = oldRect.top - newRect.top;
    if (!dx && !dy) return;
    item.style.zIndex = "2";
    var animation = item.animate([{
      transform: "translate(".concat(dx, "px, ").concat(dy, "px)")
    }, {
      transform: "translate(0, 0)"
    }], {
      duration: 650,
      easing: "cubic-bezier(0.22,1,0.36,1)",
      fill: "both"
    });
    animation.onfinish = function () {
      item.style.zIndex = "";
    };
  });
}
function animateDemoScores() {
  var updates = new Set(state.demoScoreUpdates || []);
  if (!updates.size) return;
  var source = state.demoBoard || state.bootstrap.leaderboard;
  var targets = new Map(source.map(function (item) {
    return [String(item.bagNumber), Number(item.averageRating)];
  }));
  var cards = document.querySelectorAll(".tv-bottle-card");
  cards.forEach(function (card) {
    var bagNumber = card.dataset.bagNumber;
    if (!updates.has(bagNumber)) return;
    var scoreNode = card.querySelector(".tv-bottle-score");
    if (!scoreNode) return;
    var target = targets.get(bagNumber);
    if (typeof target !== "number" || Number.isNaN(target)) return;
    scoreNode.textContent = "".concat(target.toFixed(1), " / 5");
    card.classList.add("score-animating");
    window.setTimeout(function () {
      return card.classList.remove("score-animating");
    }, 700);
  });
  state.demoScoreUpdates = [];
}
function revealMarkup() {
  var reveal = (state.reveal || []).filter(function (bottle) {
    return bottle && bottle.id;
  });
  if (!reveal.length) return "<p class=\"rounded-md bg-stone-950/45 p-5\">The host controls the grand reveal.</p>";
  return "\n    <div class=\"mt-5 grid gap-4 xl:grid-cols-[.9fr_1.1fr]\">\n      <div class=\"grid gap-3\">\n        ".concat(state.reveal.map(function (bottle) {
    return "\n          <article class=\"rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\">\n            <div class=\"grid gap-3 sm:grid-cols-[110px_1fr]\">\n              ".concat(bottle.photoUrl ? "<img class=\"aspect-[3/4] w-full rounded-md object-cover\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"").concat(escapeHtml(bottle.bottleName), " bottle\">") : "<div class=\"flex aspect-[3/4] items-center justify-center rounded-md bg-stone-800 text-4xl\">#".concat(bottle.bagNumber, "</div>"), "\n              <div>\n                <p class=\"text-sm font-bold text-amber-300\">Sleeve ").concat(bottle.bagNumber, "</p>\n                <h3 class=\"text-xl font-semibold\">").concat(escapeHtml(bottle.bottleName), "</h3>\n                <p class=\"text-emerald-100\">").concat(escapeHtml([bottle.producer, bottle.vintage, bottle.region].filter(Boolean).join(" · ")), "</p>\n                <p class=\"mt-2\"><strong>").concat(escapeHtml(bottle.grape), "</strong></p>\n              </div>\n            </div>\n            <p class=\"mt-3 text-amber-50/85\">").concat(escapeHtml(bottle.expertScore === null ? "Host note" : "Expert ".concat(bottle.expertScore, "/100")), ": ").concat(escapeHtml(bottle.expertCommentary || "No expert note entered."), "</p>\n            <p class=\"mt-2 text-sm text-rose-100\">Correct grape guesses: ").concat(escapeHtml(bottle.correctGuests.join(", ") || "No correct guesses yet"), "</p>\n          </article>\n        ");
  }).join(""), "\n      </div>\n      <div class=\"grid gap-4 content-start\">\n        <label class=\"rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\">\n          <span class=\"mb-2 block font-semibold\">Chart bottle</span>\n          <select id=\"chart-bottle\" class=\"field\">").concat(state.reveal.filter(function (bottle) {
    return bottle && bottle.id;
  }).map(function (bottle) {
    return "<option value=\"".concat(bottle.id, "\">Sleeve ").concat(bottle.bagNumber, ": ").concat(escapeHtml(bottle.bottleName), "</option>");
  }).join(""), "</select>\n        </label>\n        <div class=\"chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\"><canvas id=\"grape-chart\" aria-label=\"Grape guesses chart\"></canvas></div>\n        <div class=\"chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\"><canvas id=\"appearance-chart\" aria-label=\"Appearance chart\"></canvas></div>\n      </div>\n    </div>\n  ");
}
function tvHeroMarkup() {
  var pour = state.bootstrap.nowPouring;
  if (!pour) return "";
  var key = String(pour);
  var coach = state.bottleCoach[key];
  var pending = coach === undefined || state.bottleCoachLoading === key;
  var formatted = coach ? escapeHtml(coach).replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>').replace(/\n/g, "<br>") : "";
  var body = pending ? '<p class="italic text-amber-50/70">Checking with the sommelier…</p>' : formatted || '<p class="italic text-amber-50/70">The sommelier&rsquo;s on a break. Trust your senses.</p>';
  return "\n    <section class=\"tv-hero rounded-2xl border border-amber-200/30 bg-amber-950/40 p-6 sm:p-10 mb-4\">\n      <div class=\"grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center\">\n        <div class=\"text-center\">\n          <p class=\"kicker\">Now pouring</p>\n          <p class=\"tv-hero-sleeve text-amber-300\">#".concat(pour, "</p>\n        </div>\n        <div>\n          <p class=\"kicker mb-3\">Notice this</p>\n          <div class=\"tv-hero-coach text-amber-50\">").concat(body, "</div>\n        </div>\n      </div>\n    </section>\n  ");
}
function renderTvHero() {
  var main = document.querySelector("#app");
  if (!main) return;
  var existing = main.querySelector(".tv-hero");
  var fresh = tvHeroMarkup().trim();
  if (existing && fresh) {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = fresh;
    existing.replaceWith(wrapper.firstElementChild);
  } else if (existing && !fresh) {
    existing.remove();
  } else if (!existing && fresh) {
    main.insertAdjacentHTML("afterbegin", fresh);
  }
}
function renderSommelierScene(sommelier) {
  if (!sommelier) {
    return "<div class=\"reveal-scene-shell reveal-sommelier\"><p class=\"reveal-scene-kicker\" style=\"opacity:0.6\">Results loading\u2026</p></div>";
  }
  var winners = sommelier.winners,
    correctCount = sommelier.correctCount,
    totalBottles = sommelier.totalBottles;
  var hasWinner = correctCount > 0;
  var winnerText = winners.length === 1 ? escapeHtml(winners[0]) : winners.map(escapeHtml).join(" &amp; ");
  var subtextBase = hasWinner ? "Correctly identified ".concat(correctCount, " of ").concat(totalBottles, " grape ").concat(totalBottles === 1 ? "variety" : "varieties") : "The grapes kept their secrets tonight.";
  return "\n    <div class=\"reveal-scene-shell reveal-sommelier\">\n      <div class=\"reveal-sommelier-inner\">\n        <div class=\"reveal-scene-trophy\">\uD83C\uDFC6</div>\n        <p class=\"reveal-scene-kicker\">The Vine Whisperer</p>\n        <h2 class=\"reveal-sommelier-name\">".concat(hasWinner ? winnerText : "No correct guesses", "</h2>\n        <p class=\"reveal-scene-sub\">").concat(subtextBase, "</p>\n      </div>\n    </div>\n  ");
}
function renderPodiumScene(podium) {
  if (!podium || !podium.length) {
    return "<div class=\"reveal-scene-shell reveal-podium\"><p class=\"reveal-scene-kicker\" style=\"opacity:0.6\">Ratings coming in \u2014 check back soon.</p></div>";
  }
  // Top to bottom, 1st → 2nd → 3rd; each row rises in starting with #1.
  var ordered = _toConsumableArray(podium).sort(function (a, b) {
    return a.rank - b.rank;
  });
  var rows = ordered.map(function (bottle, i) {
    // landed = already done animating; animating = just revealed this step; else hidden
    var isLanded = podiumStep > i + 1;
    var isAnimating = !isLanded && podiumStep === i + 1;
    var photo = bottle.photoUrl ? "<img class=\"podium-row-photo\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"").concat(escapeHtml(bottle.bottleName), "\" loading=\"lazy\">") : "<div class=\"podium-row-no-photo\">#".concat(bottle.bagNumber, "</div>");
    var meta = [bottle.producer, bottle.region, bottle.vintage].filter(Boolean).join(" · ");
    var critic = bottle.professionalRating ? " &middot; <span class=\"podium-row-critic\">\uD83C\uDF93 Critics ".concat(escapeHtml(String(bottle.professionalRating)), "</span>") : "";
    var note = bottle.professionalCommentary ? "<p class=\"podium-row-note\">&ldquo;".concat(escapeHtml(bottle.professionalCommentary), "&rdquo;</p>") : "";
    return "\n      <div class=\"podium-row ".concat(isLanded ? "podium-row-landed" : isAnimating ? "podium-row-visible" : "", "\">\n        <div class=\"podium-row-rank\">\n          <span class=\"podium-row-medal\">&#127942;</span>\n          <span class=\"podium-row-sleeve\">#").concat(bottle.bagNumber, "</span>\n        </div>\n        <div class=\"podium-row-body\">\n          ").concat(photo, "\n          <div class=\"podium-row-info\">\n            <h3 class=\"podium-row-name\">").concat(escapeHtml(bottle.bottleName || "Sleeve ".concat(bottle.bagNumber)), "</h3>\n            ").concat(meta ? "<p class=\"podium-row-meta\">".concat(escapeHtml(meta), "</p>") : "", "\n            ").concat(bottle.grape ? "<p class=\"podium-row-grape\">".concat(escapeHtml(bottle.grape), "</p>") : "", "\n            ").concat(critic ? "<p class=\"podium-row-scores\">".concat(critic.replace(" &middot; ", ""), "</p>") : "", "\n            ").concat(note, "\n          </div>\n        </div>\n      </div>\n    ");
  });
  return "\n    <div class=\"reveal-scene-shell reveal-podium\">\n      <div class=\"podium-rows\">".concat(rows.join(""), "</div>\n    </div>\n  ");
}
function renderRevealAllScene(revealAll) {
  if (!revealAll || !revealAll.length) {
    return "<div class=\"reveal-scene-shell\"><p class=\"reveal-scene-kicker\">The Wines</p><p class=\"reveal-scene-sub\" style=\"opacity:0.6\">No bottles to display yet.</p></div>";
  }
  var sorted = _toConsumableArray(revealAll).sort(function (a, b) {
    return a.bagNumber - b.bagNumber;
  });
  var step = Math.min(state.bootstrap.revealAllStep || 0, sorted.length - 1);
  var bottle = sorted[step];
  if (!bottle) return "<div class=\"reveal-scene-shell\"><p class=\"reveal-scene-kicker\">The Wines</p></div>";
  var photo = bottle.photoUrl ? "<img class=\"reveal-one-photo\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"").concat(escapeHtml(bottle.bottleName), "\" loading=\"lazy\">") : "<div class=\"reveal-one-no-photo\">#".concat(bottle.bagNumber, "</div>");
  var meta = [bottle.producer, bottle.region, bottle.vintage].filter(Boolean).join(" · ");
  var total = sorted.length;
  return "\n    <div class=\"reveal-scene-shell reveal-one-shell\">\n      <div class=\"reveal-one-card\" key=\"".concat(bottle.bagNumber, "\">\n        ").concat(photo, "\n        <div class=\"reveal-one-info\">\n          <p class=\"reveal-one-sleeve\">Sleeve #").concat(bottle.bagNumber, "</p>\n          <h2 class=\"reveal-one-name\">").concat(escapeHtml(bottle.bottleName || "Sleeve ".concat(bottle.bagNumber)), "</h2>\n          ").concat(meta ? "<p class=\"reveal-one-meta\">".concat(escapeHtml(meta), "</p>") : "", "\n          ").concat(bottle.grape ? "<p class=\"reveal-one-grape\">".concat(escapeHtml(bottle.grape), "</p>") : "", "\n          <p class=\"reveal-one-progress\">").concat(step + 1, " of ").concat(total, "</p>\n        </div>\n      </div>\n    </div>\n  ");
}
function consensusGridMarkup(consensus) {
  if (!consensus) return "";
  var items = [["Aromas", consensus.aromas], ["Sweetness", consensus.sweetness], ["Acidity", consensus.acidity], ["Tannins", consensus.tannins], ["Body", consensus.body]
  // Ratings consensus intentionally suppressed — kept in data, not displayed
  ];
  var stats = items.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      label = _ref6[0],
      value = _ref6[1];
    return "\n    <div style=\"min-width:6rem\">\n      <p style=\"margin:0;font-size:2.4rem;font-weight:800;color:#ffe7b8;line-height:1\">".concat(Number(value) || 0, "%</p>\n      <p style=\"margin:0.25rem 0 0;font-size:0.95rem;color:rgba(255,247,236,0.72)\">").concat(label, "</p>\n    </div>\n  ");
  }).join("");
  return "\n    <p style=\"margin-top:2.5rem;text-transform:uppercase;letter-spacing:0.1em;font-size:0.9rem;color:rgba(255,231,184,0.65)\">Where the room agreed</p>\n    <div style=\"margin-top:1.1rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1.5rem 2rem\">".concat(stats, "</div>\n  ");
}
function renderGroupAccuracyScene(groupAccuracy) {
  if (!groupAccuracy) {
    return "<div class=\"reveal-scene-shell reveal-group-accuracy\"><p class=\"reveal-scene-kicker\" style=\"opacity:0.6\">Results loading\u2026</p></div>";
  }
  var correct = groupAccuracy.correct,
    total = groupAccuracy.total,
    consensus = groupAccuracy.consensus;
  var pct = total > 0 ? correct / total : 0;
  var comment = pct >= 0.7 ? "Impressive palates in this room." : pct >= 0.4 ? "A respectable showing." : "The wines kept their secrets well.";
  return "\n    <div class=\"reveal-scene-shell reveal-group-accuracy\">\n      <div class=\"text-center px-8 max-w-4xl\">\n        <div class=\"reveal-scene-trophy\">\uD83C\uDFAF</div>\n        <p class=\"reveal-scene-kicker\">How Did We Do?</p>\n        <p class=\"reveal-accuracy-number\">".concat(correct, " <span class=\"reveal-accuracy-of\">of</span> ").concat(total, "</p>\n        <p class=\"reveal-accuracy-label\">grapes correctly identified</p>\n        <p class=\"reveal-scene-sub mt-6\">").concat(comment, "</p>\n        ").concat(consensusGridMarkup(consensus), "\n      </div>\n    </div>\n  ");
}
function renderTheNumbersScene(theNumbers) {
  if (!theNumbers) {
    return "<div class=\"reveal-scene-shell reveal-the-numbers\"><p class=\"reveal-scene-kicker\" style=\"opacity:0.6\">Results loading\u2026</p></div>";
  }
  var bottleCount = theNumbers.bottleCount,
    entryCount = theNumbers.entryCount,
    averageRating = theNumbers.averageRating;
  var stats = [{
    value: bottleCount,
    label: "bottles tasted"
  }, {
    value: entryCount,
    label: "tasting notes submitted"
  }, {
    value: Number(averageRating).toFixed(1) + " / 5",
    label: "average rating across all wines"
  }];
  return "\n    <div class=\"reveal-scene-shell reveal-the-numbers\">\n      <div class=\"text-center w-full max-w-4xl px-8\">\n        <p class=\"reveal-scene-kicker\">The Numbers</p>\n        <div class=\"numbers-grid mt-10\">\n          ".concat(stats.map(function (s) {
    return "\n            <div class=\"numbers-stat\">\n              <p class=\"numbers-value\">".concat(s.value, "</p>\n              <p class=\"numbers-label\">").concat(s.label, "</p>\n            </div>\n          ");
  }).join(""), "\n        </div>\n      </div>\n    </div>\n  ");
}
function renderRevealScene(scene) {
  var data = state.revealData;
  if (!data) return "<div class=\"reveal-scene-shell\"><p class=\"reveal-loading\">Loading\u2026</p></div>";
  switch (scene) {
    case "sommelier":
      return renderSommelierScene(data.sommelier);
    case "podium":
      return renderPodiumScene(data.podium);
    case "reveal-all":
      return renderRevealAllScene(data.revealAll);
    case "group-accuracy":
      return renderGroupAccuracyScene(data.groupAccuracy);
    case "the-numbers":
      return renderTheNumbersScene(data.theNumbers);
    default:
      return "<div class=\"reveal-scene-shell\"></div>";
  }
}
function tvView() {
  var eventState = state.bootstrap.state;
  var scene = state.bootstrap.revealScene;
  if ((eventState === "GRAND_REVEAL" || eventState === "ARCHIVE") && scene) {
    return renderRevealScene(scene);
  }

  // Grand Reveal, no scene yet: a fun "gather round" holding screen (no bottles).
  if (eventState === "GRAND_REVEAL") {
    return renderGrandRevealStandby();
  }
  if (eventState === "REGISTRATION") {
    return renderWelcomeScreen();
  }

  // Live board (LIVE_TASTING or ARCHIVE recap)
  return "\n    ".concat(tvHeroMarkup(), "\n    ").concat(panel("\n      ".concat(state.demoBoard ? "<div class=\"mb-5 flex justify-end\"><button class=\"tap-quiet\" id=\"stop-demo\" type=\"button\">Stop demo</button></div>" : "", "\n      ").concat(state.demoBoard ? "<div class=\"mb-4 rounded-2xl border border-amber-200/20 bg-amber-950/20 p-4 text-amber-100\">Demo vote mode is active. Watch bottles move as the crowd ranks them.</div>" : "", "\n      ").concat(boardMarkup(state.bootstrap.leaderboard), "\n    ")), "\n    ").concat(eventState === "ARCHIVE" ? panel("<h2 class=\"text-3xl font-semibold\">Grand reveal</h2>".concat(revealMarkup()), "mt-4") : "", "\n  ");
}
function hostBottleFields() {
  var _bottle$expertScore;
  var bottle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return "\n    <div class=\"grid gap-3 md:grid-cols-2\">\n      <label><span class=\"mb-1 block text-sm font-bold\">Bottle name</span><input class=\"field\" name=\"bottleName\" value=\"".concat(escapeHtml(bottle.bottleName), "\" required></label>\n      <label><span class=\"mb-1 block text-sm font-bold\">Correct grape</span><input class=\"field\" name=\"grape\" value=\"").concat(escapeHtml(bottle.grape), "\" required></label>\n      <label><span class=\"mb-1 block text-sm font-bold\">Producer</span><input class=\"field\" name=\"producer\" value=\"").concat(escapeHtml(bottle.producer), "\"></label>\n      <label><span class=\"mb-1 block text-sm font-bold\">Region</span><input class=\"field\" name=\"region\" value=\"").concat(escapeHtml(bottle.region), "\"></label>\n      <label><span class=\"mb-1 block text-sm font-bold\">Vintage</span><input class=\"field\" name=\"vintage\" value=\"").concat(escapeHtml(bottle.vintage), "\"></label>\n      <label><span class=\"mb-1 block text-sm font-bold\">Expert score</span><input class=\"field\" name=\"expertScore\" inputmode=\"numeric\" min=\"0\" max=\"100\" type=\"number\" value=\"").concat(escapeHtml((_bottle$expertScore = bottle.expertScore) !== null && _bottle$expertScore !== void 0 ? _bottle$expertScore : ""), "\"></label>\n    </div>\n    <label class=\"mt-3 block\"><span class=\"mb-1 block text-sm font-bold\">Expert commentary</span><textarea class=\"field min-h-28\" name=\"expertCommentary\">").concat(escapeHtml(bottle.expertCommentary), "</textarea></label>\n    <label class=\"mt-3 block\"><span class=\"mb-1 block text-sm font-bold\">Bottle photo</span><input class=\"field file:mr-3 file:rounded-md file:border-0 file:bg-rose-200 file:px-3 file:py-2 file:font-semibold file:text-stone-950\" name=\"photo\" type=\"file\" accept=\"image/*\" capture=\"environment\"></label>\n  ");
}
function hostView() {
  if (!hostToken() || !state.host) {
    return panel("\n      <div class=\"mx-auto max-w-md\">\n        <p class=\"kicker\">Host controls</p>\n        <h2 class=\"screen-title\">Unlock check-in and reveal</h2>\n        <form id=\"host-login\" class=\"mt-5 grid gap-3\">\n          <input class=\"field\" name=\"pin\" inputmode=\"numeric\" autocomplete=\"one-time-code\" placeholder=\"Host PIN\" required>\n          <button class=\"tap-primary\" type=\"submit\">Unlock</button>\n        </form>\n      </div>\n    ");
  }
  var editing = state.host.bottles.find(function (bottle) {
    return bottle.id === state.editBottleId;
  });
  return "\n    <div class=\"grid gap-4 xl:grid-cols-[1fr_.9fr]\">\n      ".concat(panel("\n        <div class=\"flex flex-wrap items-center justify-between gap-3\">\n          <div>\n            <p class=\"kicker\">Host check-in</p>\n            <h2 class=\"screen-title\">".concat(editing ? "Edit sleeve ".concat(editing.bagNumber) : "Scan arriving bottle", "</h2>\n          </div>\n          ").concat(editing ? "<button class=\"tap-quiet\" id=\"cancel-edit\" type=\"button\">New bottle</button>" : "", "\n        </div>\n        ").concat(!editing ? "\n          <form id=\"label-scan-form\" class=\"mt-4 rounded-lg border border-rose-100/15 bg-rose-950/20 p-4\">\n            <input id=\"label-photo\" class=\"sr-only\" name=\"photo\" type=\"file\" accept=\"image/*\" capture=\"environment\" required>\n            <label class=\"".concat(state.labelScanPending ? "opacity-60" : "", " tap-primary w-full cursor-pointer text-lg\" for=\"label-photo\">\n              ").concat(state.labelScanPending ? "Reading label..." : "Scan label", "\n            </label>\n            <p class=\"mt-2 text-sm text-amber-50/70\">Tap to open the camera. Winey scans the label, assigns the next sleeve, and saves the image for reveal.</p>\n          </form>\n          ").concat(state.lastLabelScan ? "\n            <div class=\"mt-3 rounded-lg border border-emerald-200/25 bg-emerald-950/45 p-4 text-emerald-50\">\n              <p class=\"text-sm font-bold uppercase text-emerald-200\">Bottle checked in</p>\n              <p class=\"mt-1 text-lg\">Put this bottle in sleeve</p>\n              <p class=\"text-6xl font-black text-amber-300 sm:text-7xl\">#".concat(state.lastLabelScan.bagNumber, "</p>\n              ").concat(state.lastLabelScan.bottleName ? "<p class=\"mt-2 text-base\"><strong>".concat(escapeHtml(state.lastLabelScan.bottleName), "</strong></p>") : "", "\n              <div class=\"mt-2 grid gap-2\">\n                <label class=\"text-xs uppercase tracking-wide text-emerald-200\" for=\"scan-grape-fix\">Grape ").concat(state.lastLabelScan.grapeSource === "printed" ? "(on label)" : state.lastLabelScan.grapeSource === "inferred" ? "(inferred from region)" : "(unknown)", "</label>\n                <select id=\"scan-grape-fix\" class=\"field\" data-scan-bottle=\"").concat(state.lastLabelScan.bottleId, "\">\n                  ").concat(state.bootstrap.grapes.map(function (grape) {
    var hint = grape.appellations ? " \u2014 ".concat(grape.appellations) : "";
    var selected = grape.name === state.lastLabelScan.grape ? " selected" : "";
    return "<option value=\"".concat(escapeHtml(grape.name), "\"").concat(selected, ">").concat(escapeHtml(grape.name + hint), "</option>");
  }).join(""), "\n                </select>\n              </div>\n              <p class=\"mt-2 text-xs text-emerald-200/80\">Confidence: ").concat(escapeHtml(state.lastLabelScan.confidence), ".").concat(state.lastLabelScan.notes ? " ".concat(escapeHtml(state.lastLabelScan.notes)) : "", "</p>\n              <div class=\"mt-3 grid gap-2 sm:grid-cols-2\">\n                <label class=\"tap-primary cursor-pointer text-center\" for=\"label-photo\">Scan next bottle</label>\n                <button class=\"tap-quiet\" data-edit-bottle=\"").concat(state.lastLabelScan.bottleId, "\" type=\"button\">Review details</button>\n              </div>\n            </div>\n          ") : "", "\n          <details class=\"mt-4 rounded-md border border-amber-100/15 bg-stone-950/35 p-4\">\n            <summary class=\"cursor-pointer font-semibold\">Manual check-in</summary>\n        ") : "", "\n        <form id=\"bottle-form\" class=\"mt-4\">\n          ").concat(hostBottleFields(editing), "\n          <button class=\"tap-primary mt-4 w-full\" type=\"submit\">").concat(editing ? "Save bottle" : "Check in manually", "</button>\n        </form>\n        ").concat(!editing ? "</details>" : "", "\n      ")), "\n      ").concat(panel("\n        <h2 class=\"text-2xl font-semibold\">Event control</h2>\n        <div class=\"mt-4 grid gap-2 sm:grid-cols-3\">\n          <button class=\"".concat(state.bootstrap.state === "REGISTRATION" ? "tap-primary" : "tap-quiet", "\" data-event-state=\"REGISTRATION\" type=\"button\">Registration").concat(state.bootstrap.state === "REGISTRATION" ? " ●" : "", "</button>\n          <button class=\"").concat(state.bootstrap.state === "LIVE_TASTING" ? "tap-primary" : "tap-quiet", "\" data-event-state=\"LIVE_TASTING\" type=\"button\">Live tasting").concat(state.bootstrap.state === "LIVE_TASTING" ? " ●" : "", "</button>\n          <button class=\"").concat(state.bootstrap.state === "GRAND_REVEAL" ? "tap-primary" : "tap-quiet", "\" data-event-state=\"GRAND_REVEAL\" type=\"button\">Grand reveal").concat(state.bootstrap.state === "GRAND_REVEAL" ? " ●" : "", "</button>\n        </div>\n        <div class=\"mt-4\">\n          <p class=\"mb-3 text-sm font-bold text-amber-300 uppercase tracking-widest\">Reveal Sequence</p>\n          <div class=\"reveal-host-buttons\">\n            ").concat([{
    scene: "podium",
    label: "🏆 Crowd Favorites"
  }, {
    scene: "reveal-all",
    label: "🍷 Reveal All"
  }, {
    scene: "sommelier",
    label: "🏆 The Vine Whisperer"
  }, {
    scene: "group-accuracy",
    label: "🎯 How Did We Do?"
  }, {
    scene: "the-numbers",
    label: "📊 The Numbers"
  }].map(function (_ref7) {
    var scene = _ref7.scene,
      label = _ref7.label;
    return "\n              <button\n                class=\"reveal-host-btn ".concat(state.bootstrap.revealScene === scene ? "reveal-host-btn-active" : "", "\"\n                data-reveal-scene=\"").concat(scene, "\"\n                type=\"button\"\n              >").concat(label, "</button>\n            ");
  }).join(""), "\n            ").concat(state.bootstrap.revealScene === "reveal-all" ? "\n              <div class=\"reveal-all-controls\">\n                <button class=\"reveal-all-btn\" data-reveal-all-step=\"prev\">\u2190 Prev</button>\n                <span class=\"reveal-all-counter\">".concat(function (_state$revealData2) {
    var total = (((_state$revealData2 = state.revealData) === null || _state$revealData2 === void 0 ? void 0 : _state$revealData2.revealAll) || state.reveal || []).length;
    var step = Math.min(state.bootstrap.revealAllStep || 0, total - 1);
    return total ? "".concat(step + 1, " / ").concat(total) : "—";
  }(), "</span>\n                <button class=\"reveal-all-btn reveal-all-btn-next\" data-reveal-all-step=\"next\">Next \u2192</button>\n              </div>\n            ") : "", "\n            ").concat(state.bootstrap.revealScene ? "\n              <button class=\"reveal-host-btn-clear\" data-reveal-scene=\"\" type=\"button\">\u2715 Clear scene</button>\n            " : "", "\n          </div>\n        </div>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"show-join-qr\" type=\"button\">Show join QR for guests</button>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"show-guest-bulk\" type=\"button\">Pre-load guest list</button>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"show-guest-editor\" type=\"button\">\u270F\uFE0F Edit guest names</button>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"seed-demo\" type=\"button\">Load 15-bottle demo</button>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"seed-demo-2\" type=\"button\">Load 3-bottle demo</button>\n        <p class=\"mt-4 rounded-md bg-emerald-400/15 p-3 text-emerald-50\">Current state: ").concat(escapeHtml(stateLabel(state.host.state)), "</p>\n        <div class=\"mt-5 grid grid-cols-2 gap-3\">\n          <div class=\"rounded-md bg-stone-950/55 p-4\"><p class=\"text-3xl text-amber-300\">").concat(state.host.bottles.length, "</p><p>Bottles</p></div>\n          <div class=\"rounded-md bg-stone-950/55 p-4\"><p class=\"text-3xl text-emerald-300\">").concat(state.host.photos.length, "</p><p>Party photos</p></div>\n        </div>\n      ")), "\n    </div>\n    ").concat(state.host.bottles.length ? panel("\n      <div class=\"flex flex-wrap items-end justify-between gap-3\">\n        <div>\n          <p class=\"kicker\">Pouring control</p>\n          <h2 class=\"screen-title\">Tell everyone what's in the glass</h2>\n        </div>\n        ".concat(state.bootstrap.nowPouring ? "\n          <button class=\"tap-quiet\" data-pour-sleeve=\"\" type=\"button\">Stop pouring</button>\n        " : "", "\n      </div>\n      ").concat(state.bootstrap.nowPouring ? "\n        <div class=\"mt-4 rounded-lg border border-amber-200/30 bg-amber-950/30 p-4 text-amber-50\">\n          <p class=\"kicker\">Now pouring</p>\n          <p class=\"text-6xl font-black text-amber-300\">#".concat(state.bootstrap.nowPouring, "</p>\n        </div>\n      ") : "\n        <p class=\"mt-2 text-amber-50/75\">Tap a sleeve to broadcast it to the TV and the kiosks. Guests will see coaching cues for that bottle.</p>\n      ", "\n      <div class=\"mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8\">\n        ").concat(_toConsumableArray(state.host.bottles).sort(function (a, b) {
    return a.bagNumber - b.bagNumber;
  }).map(function (bottle) {
    return "\n          <button class=\"".concat(bottle.bagNumber === state.bootstrap.nowPouring ? 'tap-primary' : 'tap-quiet', " text-lg font-bold\" data-pour-sleeve=\"").concat(bottle.bagNumber, "\" type=\"button\">#").concat(bottle.bagNumber, "</button>\n        ");
  }).join(""), "\n      </div>\n    "), "mt-4") : "", "\n    ").concat(panel("\n      <h2 class=\"mb-4 text-2xl font-semibold\">Checked-in bottles</h2>\n      <div class=\"grid gap-3 md:grid-cols-2 xl:grid-cols-3\">\n        ".concat(state.host.bottles.map(function (bottle) {
    return "\n          <article class=\"rounded-lg border border-amber-100/15 bg-stone-950/55 p-3\">\n            <div class=\"flex gap-3\">\n              ".concat(bottle.photoUrl ? "<img class=\"h-28 w-20 rounded-md object-cover\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"\">") : "", "\n              <div>\n                <p class=\"text-sm font-bold text-amber-300\">Sleeve ").concat(bottle.bagNumber, "</p>\n                <h3 class=\"font-semibold\">").concat(escapeHtml(bottle.bottleName), "</h3>\n                <p class=\"text-sm text-amber-50/75\">").concat(escapeHtml(bottle.grape), " \xB7 ").concat(bottle.voteCount, " ratings</p>\n              </div>\n            </div>\n            <button class=\"tap-quiet mt-3 w-full\" data-edit-bottle=\"").concat(bottle.id, "\" type=\"button\">Edit</button>\n          </article>\n        ");
  }).join("") || "<p class=\"text-amber-50/75\">No bottles checked in yet.</p>", "\n      </div>\n    "), "mt-4"), "\n  ");
}
function guestBulkModalMarkup() {
  var _state$bootstrap3;
  if (!state.showGuestBulk) return "";
  var guestCount = ((_state$bootstrap3 = state.bootstrap) === null || _state$bootstrap3 === void 0 || (_state$bootstrap3 = _state$bootstrap3.guests) === null || _state$bootstrap3 === void 0 ? void 0 : _state$bootstrap3.length) || 0;
  return "\n    <div id=\"guest-bulk-overlay\" class=\"fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-6\">\n      <div class=\"panel rounded-2xl p-6 max-w-lg w-full\">\n        <p class=\"kicker\">Setup</p>\n        <h2 class=\"screen-title mt-1\">Pre-load guest list</h2>\n        <p class=\"mt-2 text-amber-50/75 text-sm\">Paste names, one per line or comma-separated. Duplicates are skipped automatically. Currently ".concat(guestCount, " guest").concat(guestCount === 1 ? "" : "s", " loaded.</p>\n        <textarea id=\"guest-bulk-input\" class=\"field mt-3 min-h-40 w-full\" placeholder=\"Maria&#10;Hannah&#10;Ari, Mia, Noah&#10;Jess Taylor\"></textarea>\n        <div class=\"mt-4 grid gap-2 sm:grid-cols-2\">\n          <button class=\"tap-quiet\" id=\"cancel-guest-bulk\" type=\"button\">Cancel</button>\n          <button class=\"tap-primary\" id=\"submit-guest-bulk\" type=\"button\" ").concat(state.guestBulkSubmitting ? "disabled" : "", ">").concat(state.guestBulkSubmitting ? "Adding…" : "Add all", "</button>\n        </div>\n      </div>\n    </div>\n  ");
}
function guestEditorMarkup() {
  if (!state.showGuestEditor) return "";
  var guests = state.host && state.host.guests || state.bootstrap && state.bootstrap.guests || [];
  var sorted = _toConsumableArray(guests).sort(function (a, b) {
    return a.displayName.localeCompare(b.displayName);
  });
  var rows = sorted.map(function (g) {
    return "\n    <div class=\"flex items-center justify-between py-2 border-b border-amber-100/10\">\n      ".concat(state.guestEditId === g.id ? "\n        <input id=\"guest-edit-input\" class=\"field flex-1 py-1 text-sm mr-2\" value=\"".concat(escapeHtml(g.displayName), "\">\n        <div class=\"flex gap-2 shrink-0\">\n          <button class=\"tap-primary text-sm px-3 py-1\" data-save-guest=\"").concat(g.id, "\">Save</button>\n          <button class=\"tap-quiet text-sm px-3 py-1\" id=\"cancel-guest-edit\">\u2715</button>\n        </div>\n      ") : "\n        <span class=\"text-sm text-amber-50\">".concat(escapeHtml(g.displayName), "</span>\n        <button class=\"tap-quiet text-xs px-3 py-1 shrink-0\" data-edit-guest=\"").concat(g.id, "\">Edit</button>\n      "), "\n    </div>\n  ");
  }).join("");
  return "\n    <div id=\"guest-editor-overlay\" class=\"fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-6\">\n      <div class=\"panel rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto\">\n        <p class=\"kicker\">Host</p>\n        <h2 class=\"screen-title mt-1\">Edit guest names</h2>\n        <p class=\"mt-2 text-amber-50/75 text-sm\">Tap Edit next to any name to update it.</p>\n        <div class=\"mt-4\">".concat(rows, "</div>\n        <button class=\"tap-quiet mt-4 w-full\" id=\"close-guest-editor\">Done</button>\n      </div>\n    </div>\n  ");
}
function joinQrModalMarkup() {
  if (!state.showJoinQr) return "";
  var url = window.location.origin + "/kiosk.html";
  return "\n    <div id=\"join-qr-overlay\" class=\"fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-6\">\n      <div class=\"panel rounded-2xl p-6 max-w-md w-full text-center\">\n        <p class=\"kicker\">Scan to join</p>\n        <h2 class=\"screen-title mt-1\">Rate from your phone</h2>\n        <p class=\"mt-2 text-amber-50/75 text-sm\">Connect to <strong>Wine Party Guest</strong> WiFi first, then scan this code.</p>\n        <div id=\"join-qr-canvas\" class=\"mx-auto mt-4 inline-block rounded-md bg-amber-50 p-4\"></div>\n        <p class=\"mt-3 break-all text-xs text-amber-50/60\">".concat(escapeHtml(url), "</p>\n        <button class=\"tap-primary mt-5 w-full\" id=\"close-join-qr\" type=\"button\">Close</button>\n      </div>\n    </div>\n  ");
}
function renderJoinQrCode() {
  var node = document.querySelector("#join-qr-canvas");
  if (!node || typeof window.qrcode !== "function") return;
  node.innerHTML = "";
  var url = window.location.origin + "/kiosk.html";
  var qr = window.qrcode(0, "M");
  qr.addData(url);
  qr.make();
  node.innerHTML = qr.createImgTag(8, 0);
}
function render() {
  var _state$reveal$;
  navMarkup();
  if (!state.bootstrap) {
    app.innerHTML = panel("<p class=\"text-lg\">Loading the tasting room...</p>");
    return;
  }
  var oldPositions = state.view === "tv" ? recordTvBoardPositions() : null;
  app.innerHTML = {
    taste: tasteView,
    album: albumView,
    tv: tvView,
    host: hostView
  }[state.view]() + joinQrModalMarkup() + guestBulkModalMarkup() + guestEditorMarkup();
  if (state.showJoinQr) renderJoinQrCode();
  if (state.view === "tv") {
    var _state$bootstrap4;
    animateTvBoard(oldPositions);
    if (((_state$bootstrap4 = state.bootstrap) === null || _state$bootstrap4 === void 0 ? void 0 : _state$bootstrap4.state) === "LIVE_TASTING") startTrivia();else stopTrivia();
    requestAnimationFrame(fitTvGrid);
  } else {
    stopTrivia();
  }
  if (state.view === "tv" && state.bootstrap.nowPouring) {
    fetchCoach(state.bootstrap.nowPouring).then(function () {
      if (state.view === "tv" && state.bootstrap.nowPouring) renderTvHero();
    }).catch(function () {});
  }
  if (state.view === "taste" && state.bootstrap.nowPouring && !state.selectedSleeve) {
    state.selectedSleeve = String(state.bootstrap.nowPouring);
    fetchCoach(state.selectedSleeve).catch(function () {});
  }
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) {
    startDemoVoting();
  }
  if (state.view === "tv" && state.demoAnimationPending) {
    state.demoAnimationPending = false;
    requestAnimationFrame(function () {
      return animateDemoScores();
    });
  }
  if (state.view === "tv" && state.reveal.length && (_state$reveal$ = state.reveal[0]) !== null && _state$reveal$ !== void 0 && _state$reveal$.id && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) drawCharts(state.reveal[0].id);
  if (state.view === "tv" && state.bootstrap.revealScene === "reveal-all" && state.reveal.length) {
    triggerRevealFlip();
  } else if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state) || state.bootstrap.revealScene !== "reveal-all") {
    revealFlipDone = false;
  }
  if (state.view === "tv" && state.bootstrap.revealScene === "podium") {
    var _state$revealData3;
    var podiumLength = ((_state$revealData3 = state.revealData) === null || _state$revealData3 === void 0 || (_state$revealData3 = _state$revealData3.podium) === null || _state$revealData3 === void 0 ? void 0 : _state$revealData3.length) || 3;
    if (!podiumTimer && podiumStep < podiumLength) {
      podiumTimer = setInterval(function () {
        podiumStep++;
        render();
        if (podiumStep >= podiumLength) {
          clearInterval(podiumTimer);
          podiumTimer = null;
          // After the last card's animation finishes, bump step to 99 so every
          // subsequent re-render treats all rows as "landed" (no animation).
          // Guard: only apply if still on podium scene when callback fires.
          clearTimeout(podiumSettleTimer);
          podiumSettleTimer = setTimeout(function () {
            var _state$bootstrap5;
            podiumSettleTimer = null;
            if (((_state$bootstrap5 = state.bootstrap) === null || _state$bootstrap5 === void 0 ? void 0 : _state$bootstrap5.revealScene) === "podium") {
              podiumStep = 99;
              render();
            }
          }, 900);
        }
      }, 2500);
    }
  } else {
    if (podiumTimer) {
      clearInterval(podiumTimer);
      podiumTimer = null;
    }
    clearTimeout(podiumSettleTimer);
    podiumSettleTimer = null;
    if (state.bootstrap.revealScene !== "podium") podiumStep = 0;
  }
  // Rotate the Grand Reveal "gather round" quips while waiting on a scene.
  if (state.view === "tv" && state.bootstrap.state === "GRAND_REVEAL" && !state.bootstrap.revealScene) {
    if (!grandStandbyTimer) {
      grandStandbyTimer = setInterval(function () {
        grandStandbyQuip = (grandStandbyQuip + 1 + Math.floor(Math.random() * (GRAND_REVEAL_QUIPS.length - 1))) % GRAND_REVEAL_QUIPS.length;
        render();
      }, 15000);
    }
  } else {
    if (grandStandbyTimer) {
      clearInterval(grandStandbyTimer);
      grandStandbyTimer = null;
    }
    grandStandbyQuip = 0;
  }
  if (state.view === "tv" && state.bootstrap.state === "REGISTRATION") {
    if (!welcomeTimer) {
      welcomeTimer = setInterval(function () {
        welcomeQuip++;
        render();
      }, 15000);
    }
  } else {
    if (welcomeTimer) {
      clearInterval(welcomeTimer);
      welcomeTimer = null;
    }
    welcomeQuip = 0;
  }
}
function refresh() {
  return _refresh.apply(this, arguments);
}
function _refresh() {
  _refresh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var _ref10,
      _ref10$photos,
      photos,
      _ref10$reveal,
      reveal,
      _ref10$host,
      host,
      _yield$Promise$all,
      _yield$Promise$all2,
      _args4 = arguments;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _ref10 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, _ref10$photos = _ref10.photos, photos = _ref10$photos === void 0 ? false : _ref10$photos, _ref10$reveal = _ref10.reveal, reveal = _ref10$reveal === void 0 ? false : _ref10$reveal, _ref10$host = _ref10.host, host = _ref10$host === void 0 ? false : _ref10$host;
          _context4.n = 1;
          return api("/api/bootstrap");
        case 1:
          state.bootstrap = _context4.v;
          if (!photos) {
            _context4.n = 3;
            break;
          }
          _context4.n = 2;
          return api("/api/photos");
        case 2:
          state.photos = _context4.v;
        case 3:
          if (!(reveal && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state))) {
            _context4.n = 5;
            break;
          }
          _context4.n = 4;
          return Promise.all([api("/api/reveal"), api("/api/reveal-data")]);
        case 4:
          _yield$Promise$all = _context4.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          state.reveal = _yield$Promise$all2[0];
          state.revealData = _yield$Promise$all2[1];
        case 5:
          if (!(host && hostToken())) {
            _context4.n = 7;
            break;
          }
          _context4.n = 6;
          return api("/api/host/dashboard", {
            host: true
          });
        case 6:
          state.host = _context4.v;
        case 7:
          render();
        case 8:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _refresh.apply(this, arguments);
}
function palatePayload(form) {
  return Object.fromEntries(Object.keys(state.bootstrap.tastingGrid.palate).map(function (metric) {
    var _form$querySelector;
    return [metric, (_form$querySelector = form.querySelector("[name=\"palate-".concat(metric, "\"]:checked"))) === null || _form$querySelector === void 0 ? void 0 : _form$querySelector.value];
  }).filter(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      value = _ref9[1];
    return value;
  }));
}
function paintStars(rating) {
  var ratingGroup = document.querySelector('[role="radiogroup"][aria-label="Rating"]');
  if (!ratingGroup) return;
  ratingGroup.querySelectorAll("[data-star]").forEach(function (star) {
    var filled = Number(star.dataset.star) <= rating;
    star.textContent = filled ? "★" : "☆";
    star.classList.toggle("star-filled", filled);
  });
  var summary = ratingGroup.querySelector("[data-rating-summary]");
  if (summary) summary.textContent = "".concat(rating, " / 5");
}
function submitTasting(_x2) {
  return _submitTasting.apply(this, arguments);
}
function _submitTasting() {
  _submitTasting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(form) {
    var _form$querySelector2, _form$querySelector3;
    var selectedGuestId, rating, payload;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          selectedGuestId = form.querySelector("#guest-select").value;
          rating = (_form$querySelector2 = form.querySelector('[name="rating"]:checked')) === null || _form$querySelector2 === void 0 ? void 0 : _form$querySelector2.value;
          payload = {
            userId: Number(selectedGuestId),
            bagNumber: Number(form.bagNumber.value),
            rating: Number(rating),
            grapeGuess: form.grapeGuess.value,
            isBookmarked: form.isBookmarked.checked,
            appearance: ((_form$querySelector3 = form.querySelector('[name="appearance"]:checked')) === null || _form$querySelector3 === void 0 ? void 0 : _form$querySelector3.value) || "",
            nose: _toConsumableArray(form.querySelectorAll('[name="nose"]:checked')).map(function (item) {
              return item.value;
            }),
            palate: palatePayload(form)
          };
          _context5.n = 1;
          return api("/api/tastings", {
            method: "POST",
            body: payload
          });
        case 1:
          state.selectedGuestId = "";
          localStorage.removeItem("wineGuestId");
          state.starRating = 0;
          state.selectedSleeve = "";
          notice("Tasting saved. Ready for the next guest.");
          _context5.n = 2;
          return refresh();
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return _submitTasting.apply(this, arguments);
}
function addGuest(_x3) {
  return _addGuest.apply(this, arguments);
}
function _addGuest() {
  _addGuest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(form) {
    var name, guest;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          name = form.querySelector('[name="displayName"]').value;
          _context6.n = 1;
          return api("/api/guests", {
            method: "POST",
            body: {
              displayName: name
            }
          });
        case 1:
          guest = _context6.v;
          state.selectedGuestId = String(guest.id);
          localStorage.setItem("wineGuestId", guest.id);
          _context6.n = 2;
          return refresh();
        case 2:
          notice("".concat(guest.displayName, " is ready to taste."));
        case 3:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return _addGuest.apply(this, arguments);
}
function uploadPhoto(_x4) {
  return _uploadPhoto.apply(this, arguments);
}
function _uploadPhoto() {
  _uploadPhoto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(form) {
    var body;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          body = new FormData(form);
          if (state.selectedGuestId) body.append("userId", state.selectedGuestId);
          _context7.n = 1;
          return api("/api/photos", {
            method: "POST",
            body: body
          });
        case 1:
          form.reset();
          notice("Photo added to the shared album.");
          _context7.n = 2;
          return refresh({
            photos: true
          });
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return _uploadPhoto.apply(this, arguments);
}
function unlockHost(_x5) {
  return _unlockHost.apply(this, arguments);
}
function _unlockHost() {
  _unlockHost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(form) {
    var result;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return api("/api/host/session", {
            method: "POST",
            body: {
              pin: form.pin.value
            }
          });
        case 1:
          result = _context8.v;
          localStorage.setItem("wineHostToken", result.token);
          notice("Host controls unlocked on this device.");
          _context8.n = 2;
          return refresh({
            host: true
          });
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return _unlockHost.apply(this, arguments);
}
function saveBottle(_x6) {
  return _saveBottle.apply(this, arguments);
}
function _saveBottle() {
  _saveBottle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(form) {
    var body, editing, url, bottle;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          body = new FormData(form);
          editing = state.editBottleId;
          url = editing ? "/api/host/bottles/".concat(editing) : "/api/host/bottles";
          _context9.n = 1;
          return api(url, {
            method: editing ? "PATCH" : "POST",
            body: body,
            host: true
          });
        case 1:
          bottle = _context9.v;
          state.editBottleId = null;
          notice(editing ? "Sleeve ".concat(bottle.bagNumber, " updated.") : "Bottle checked in as sleeve ".concat(bottle.bagNumber, "."));
          _context9.n = 2;
          return refresh({
            host: true
          });
        case 2:
          return _context9.a(2);
      }
    }, _callee9);
  }));
  return _saveBottle.apply(this, arguments);
}
function seedDemo() {
  return _seedDemo.apply(this, arguments);
}
function _seedDemo() {
  _seedDemo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.n = 1;
          return api("/api/host/demo", {
            method: "POST",
            host: true
          });
        case 1:
          notice("14 demo bottles loaded.");
          _context0.n = 2;
          return refresh({
            host: true
          });
        case 2:
          state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard));
          state.demoAnimationPending = true;
          state.view = "tv";
          history.replaceState({}, "", "?view=tv");
          render();
          if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) startDemoVoting();
        case 3:
          return _context0.a(2);
      }
    }, _callee0);
  }));
  return _seedDemo.apply(this, arguments);
}
function seedDemo2() {
  return _seedDemo2.apply(this, arguments);
}
function _seedDemo2() {
  _seedDemo2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          if (state.bootstrap.leaderboard.length) {
            _context1.n = 1;
            break;
          }
          _context1.n = 1;
          return refresh({
            host: true,
            reveal: true
          });
        case 1:
          state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard).slice(0, 3));
          state.demoAnimationPending = true;
          state.view = "tv";
          history.replaceState({}, "", "?view=tv");
          render();
          if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) startDemoVoting();
        case 2:
          return _context1.a(2);
      }
    }, _callee1);
  }));
  return _seedDemo2.apply(this, arguments);
}
function fetchCoach(_x7) {
  return _fetchCoach.apply(this, arguments);
}
function _fetchCoach() {
  _fetchCoach = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(bagNumber) {
    var key, result, _t7;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          key = String(bagNumber);
          if (key) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2);
        case 1:
          if (!(state.bottleCoach[key] !== undefined || state.bottleCoachLoading === key)) {
            _context10.n = 2;
            break;
          }
          paintCoachCard();
          if (state.view === "tv") renderTvHero();
          return _context10.a(2);
        case 2:
          state.bottleCoachLoading = key;
          paintCoachCard();
          if (state.view === "tv") renderTvHero();
          _context10.p = 3;
          _context10.n = 4;
          return api("/api/bottles/".concat(encodeURIComponent(key), "/coach"));
        case 4:
          result = _context10.v;
          state.bottleCoach[key] = result.coach || "";
          _context10.n = 6;
          break;
        case 5:
          _context10.p = 5;
          _t7 = _context10.v;
          state.bottleCoach[key] = "";
        case 6:
          _context10.p = 6;
          if (state.bottleCoachLoading === key) state.bottleCoachLoading = null;
          if (state.selectedSleeve === key) paintCoachCard();
          if (state.view === "tv" && String(state.bootstrap.nowPouring) === key) renderTvHero();
          return _context10.f(6);
        case 7:
          return _context10.a(2);
      }
    }, _callee10, null, [[3, 5, 6, 7]]);
  }));
  return _fetchCoach.apply(this, arguments);
}
function compressImage(_x8) {
  return _compressImage.apply(this, arguments);
}
function _compressImage() {
  _compressImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(file) {
    var _file$type;
    var maxEdge,
      quality,
      bitmap,
      ratio,
      w,
      h,
      canvas,
      blob,
      _args11 = arguments;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          maxEdge = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 1600;
          quality = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 0.85;
          if (!(!file || !((_file$type = file.type) !== null && _file$type !== void 0 && _file$type.startsWith("image/")))) {
            _context11.n = 1;
            break;
          }
          return _context11.a(2, file);
        case 1:
          if (!(file.size < 350 * 1024)) {
            _context11.n = 2;
            break;
          }
          return _context11.a(2, file);
        case 2:
          _context11.n = 3;
          return window.createImageBitmap ? createImageBitmap(file) : new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
              return resolve(img);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
          });
        case 3:
          bitmap = _context11.v;
          ratio = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
          w = Math.round(bitmap.width * ratio);
          h = Math.round(bitmap.height * ratio);
          canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
          _context11.n = 4;
          return new Promise(function (resolve) {
            return canvas.toBlob(resolve, "image/jpeg", quality);
          });
        case 4:
          blob = _context11.v;
          if (!(!blob || blob.size >= file.size)) {
            _context11.n = 5;
            break;
          }
          return _context11.a(2, file);
        case 5:
          return _context11.a(2, new File([blob], "label.jpg", {
            type: "image/jpeg"
          }));
      }
    }, _callee11);
  }));
  return _compressImage.apply(this, arguments);
}
function scanLabel(_x9) {
  return _scanLabel.apply(this, arguments);
}
function _scanLabel() {
  _scanLabel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(form) {
    var _form$querySelector4;
    var original, photo, body, result;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          original = (_form$querySelector4 = form.querySelector('input[type="file"]')) === null || _form$querySelector4 === void 0 || (_form$querySelector4 = _form$querySelector4.files) === null || _form$querySelector4 === void 0 ? void 0 : _form$querySelector4[0];
          if (original) {
            _context12.n = 1;
            break;
          }
          throw new Error("Pick a photo to scan.");
        case 1:
          state.labelScanPending = true;
          render();
          _context12.p = 2;
          _context12.n = 3;
          return compressImage(original).catch(function () {
            return original;
          });
        case 3:
          photo = _context12.v;
          body = new FormData();
          body.append("photo", photo);
          _context12.n = 4;
          return api("/api/host/bottles/scan", {
            method: "POST",
            body: body,
            host: true
          });
        case 4:
          result = _context12.v;
          state.lastLabelScan = {
            bottleId: result.bottle.id,
            bagNumber: result.bottle.bagNumber,
            bottleName: result.bottle.bottleName,
            grape: result.bottle.grape,
            grapeSource: result.scan.grapeSource,
            confidence: result.scan.confidence,
            notes: result.scan.notes
          };
          notice("Put this bottle in sleeve ".concat(result.bottle.bagNumber, "."));
          _context12.n = 5;
          return refresh({
            host: true
          });
        case 5:
          _context12.p = 5;
          state.labelScanPending = false;
          render();
          return _context12.f(5);
        case 6:
          return _context12.a(2);
      }
    }, _callee12, null, [[2,, 5, 6]]);
  }));
  return _scanLabel.apply(this, arguments);
}
function destroyCharts() {
  state.charts.forEach(function (chart) {
    return chart.destroy();
  });
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
  var bottle = state.reveal.find(function (item) {
    return item && item.id === Number(id);
  });
  var grapeCanvas = document.querySelector("#grape-chart");
  var appearanceCanvas = document.querySelector("#appearance-chart");
  if (!bottle || !window.Chart || !grapeCanvas || !appearanceCanvas) return;
  var colors = ["#f2bd5d", "#d43f63", "#2d6a5b", "#9fb8d0", "#c37d46", "#e9d6a4"];
  var empty = [{
    label: "No optional notes yet",
    count: 1
  }];
  var grapeData = bottle.grapeGuesses.length ? bottle.grapeGuesses : empty;
  var appearanceData = bottle.appearance.length ? bottle.appearance : empty;
  state.charts.push(new Chart(grapeCanvas, {
    type: "bar",
    data: {
      labels: grapeData.map(function (item) {
        return item.label;
      }),
      datasets: [{
        label: "Grape guesses",
        data: grapeData.map(function (item) {
          return item.count;
        }),
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#fff7ec"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#fff7ec"
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            color: "#fff7ec"
          }
        }
      }
    }
  }));
  state.charts.push(new Chart(appearanceCanvas, {
    type: "pie",
    data: {
      labels: appearanceData.map(function (item) {
        return item.label;
      }),
      datasets: [{
        label: "Appearance",
        data: appearanceData.map(function (item) {
          return item.count;
        }),
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Appearance consensus",
          color: "#fff7ec"
        },
        legend: {
          labels: {
            color: "#fff7ec"
          }
        }
      }
    }
  }));
}
document.addEventListener("click", /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
    var _event$target$closest, _event$target$closest2, _event$target$closest3;
    var deletePhotoEl, id, view, editId, eventState, revealAllStepEl, action, editGuestEl, saveGuestEl, _id, input, revealSceneEl, scene, pourEl, raw, bagNumber, _input, names, _t, _t2, _t3, _t4, _t5;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          deletePhotoEl = event.target.closest("[data-delete-photo]");
          if (!deletePhotoEl) {
            _context.n = 6;
            break;
          }
          id = Number(deletePhotoEl.dataset.deletePhoto);
          _context.p = 1;
          _context.n = 2;
          return api("/api/photos/" + id, {
            method: "DELETE"
          });
        case 2:
          _context.n = 3;
          return api("/api/photos");
        case 3:
          state.photos = _context.v;
          render();
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          notice(_t.message);
        case 5:
          return _context.a(2);
        case 6:
          view = (_event$target$closest = event.target.closest("[data-view]")) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.dataset.view;
          if (!view) {
            _context.n = 17;
            break;
          }
          state.view = view;
          history.replaceState({}, "", view === "tv" ? "?view=tv" : location.pathname);
          if (!(view === "album" && !state.photos.length)) {
            _context.n = 8;
            break;
          }
          _context.n = 7;
          return refresh({
            photos: true
          });
        case 7:
          _context.n = 16;
          break;
        case 8:
          if (!(view === "host" && hostToken())) {
            _context.n = 13;
            break;
          }
          _context.p = 9;
          _context.n = 10;
          return refresh({
            host: true
          });
        case 10:
          _context.n = 12;
          break;
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          localStorage.removeItem("wineHostToken");
          state.host = null;
          notice("Host PIN changed. Please unlock again.");
          render();
        case 12:
          _context.n = 16;
          break;
        case 13:
          if (!(view === "tv")) {
            _context.n = 15;
            break;
          }
          _context.n = 14;
          return refresh({
            reveal: true
          });
        case 14:
          _context.n = 16;
          break;
        case 15:
          render();
        case 16:
          if (view === "tv" && state.demoBoard && !state.demoVoteTimer) {
            startDemoVoting();
          }
        case 17:
          if (event.target.closest("#add-guest")) addGuest(document.querySelector("#tasting-form")).catch(function (error) {
            return notice(error.message);
          });
          editId = (_event$target$closest2 = event.target.closest("[data-edit-bottle]")) === null || _event$target$closest2 === void 0 ? void 0 : _event$target$closest2.dataset.editBottle;
          if (editId) {
            state.editBottleId = Number(editId);
            render();
          }
          if (event.target.closest("#cancel-edit")) {
            state.editBottleId = null;
            render();
          }
          eventState = (_event$target$closest3 = event.target.closest("[data-event-state]")) === null || _event$target$closest3 === void 0 ? void 0 : _event$target$closest3.dataset.eventState;
          if (eventState) {
            api("/api/host/state", {
              method: "PATCH",
              host: true,
              body: {
                state: eventState
              }
            }).then(function () {
              return refresh({
                host: true,
                reveal: true
              });
            }).then(function () {
              return notice("Event set to ".concat(stateLabel(eventState), "."));
            }).catch(function (error) {
              return notice(error.message);
            });
          }
          revealAllStepEl = event.target.closest("[data-reveal-all-step]");
          if (!revealAllStepEl) {
            _context.n = 23;
            break;
          }
          action = revealAllStepEl.dataset.revealAllStep;
          _context.p = 18;
          _context.n = 19;
          return api("/api/host/reveal-all-step", {
            method: "PATCH",
            body: {
              action: action
            },
            host: true
          });
        case 19:
          _context.n = 21;
          break;
        case 20:
          _context.p = 20;
          _t3 = _context.v;
          notice(_t3.message);
          return _context.a(2);
        case 21:
          _context.n = 22;
          return refresh({
            host: true
          });
        case 22:
          return _context.a(2);
        case 23:
          if (!event.target.closest("#show-guest-editor")) {
            _context.n = 24;
            break;
          }
          state.showGuestEditor = true;
          state.guestEditId = null;
          render();
          return _context.a(2);
        case 24:
          if (!(event.target.closest("#close-guest-editor") || event.target.id === "guest-editor-overlay")) {
            _context.n = 25;
            break;
          }
          state.showGuestEditor = false;
          state.guestEditId = null;
          render();
          return _context.a(2);
        case 25:
          if (!event.target.closest("#cancel-guest-edit")) {
            _context.n = 26;
            break;
          }
          state.guestEditId = null;
          render();
          return _context.a(2);
        case 26:
          editGuestEl = event.target.closest("[data-edit-guest]");
          if (!editGuestEl) {
            _context.n = 27;
            break;
          }
          state.guestEditId = Number(editGuestEl.dataset.editGuest);
          render();
          setTimeout(function () {
            var _document$querySelect;
            return (_document$querySelect = document.querySelector("#guest-edit-input")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.focus();
          }, 0);
          return _context.a(2);
        case 27:
          saveGuestEl = event.target.closest("[data-save-guest]");
          if (!saveGuestEl) {
            _context.n = 33;
            break;
          }
          _id = Number(saveGuestEl.dataset.saveGuest);
          input = document.querySelector("#guest-edit-input");
          if (input) {
            _context.n = 28;
            break;
          }
          return _context.a(2);
        case 28:
          _context.p = 28;
          _context.n = 29;
          return api("/api/host/guests/".concat(_id), {
            method: "PATCH",
            body: {
              displayName: input.value
            },
            host: true
          });
        case 29:
          state.guestEditId = null;
          _context.n = 30;
          return refresh({
            host: true
          });
        case 30:
          _context.n = 32;
          break;
        case 31:
          _context.p = 31;
          _t4 = _context.v;
          notice(_t4.message);
        case 32:
          return _context.a(2);
        case 33:
          revealSceneEl = event.target.closest("[data-reveal-scene]");
          if (!(revealSceneEl && "revealScene" in revealSceneEl.dataset)) {
            _context.n = 39;
            break;
          }
          scene = revealSceneEl.dataset.revealScene || null;
          _context.p = 34;
          _context.n = 35;
          return api("/api/host/reveal-scene", {
            method: "PATCH",
            body: {
              scene: scene
            },
            host: true
          });
        case 35:
          _context.n = 37;
          break;
        case 36:
          _context.p = 36;
          _t5 = _context.v;
          notice(_t5.message);
          return _context.a(2);
        case 37:
          _context.n = 38;
          return refresh({
            host: true,
            reveal: true
          });
        case 38:
          return _context.a(2);
        case 39:
          pourEl = event.target.closest("[data-pour-sleeve]");
          if (pourEl) {
            raw = pourEl.dataset.pourSleeve;
            bagNumber = raw === "" ? null : Number(raw);
            api("/api/host/now-pouring", {
              method: "PATCH",
              host: true,
              body: {
                bagNumber: bagNumber
              }
            }).then(function () {
              return refresh({
                host: true
              });
            }).then(function () {
              return notice(bagNumber === null ? "Stopped pouring." : "Now pouring sleeve #".concat(bagNumber, "."));
            }).catch(function (error) {
              return notice(error.message);
            });
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
            setTimeout(function () {
              var _document$querySelect2;
              return (_document$querySelect2 = document.querySelector("#guest-bulk-input")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.focus();
            }, 0);
          }
          if (event.target.closest("#cancel-guest-bulk") || event.target.id === "guest-bulk-overlay") {
            state.showGuestBulk = false;
            render();
          }
          if (!event.target.closest("#submit-guest-bulk")) {
            _context.n = 42;
            break;
          }
          _input = document.querySelector("#guest-bulk-input");
          if (_input) {
            _context.n = 40;
            break;
          }
          return _context.a(2);
        case 40:
          names = _input.value.split(/[\n,]+/).map(function (s) {
            return s.trim();
          }).filter(Boolean);
          if (names.length) {
            _context.n = 41;
            break;
          }
          notice("Paste at least one name first.");
          return _context.a(2);
        case 41:
          state.guestBulkSubmitting = true;
          render();
          api("/api/host/guests/bulk", {
            method: "POST",
            host: true,
            body: {
              names: names
            }
          }).then(function (result) {
            state.guestBulkSubmitting = false;
            state.showGuestBulk = false;
            notice("Added ".concat(result.count, " guest").concat(result.count === 1 ? "" : "s", "."));
            refresh({
              host: true
            });
          }).catch(function (error) {
            state.guestBulkSubmitting = false;
            render();
            notice(error.message);
          });
        case 42:
          if (event.target.closest("#seed-demo")) {
            seedDemo().catch(function (error) {
              return notice(error.message);
            });
          }
          if (event.target.closest("#seed-demo-2")) {
            seedDemo2().catch(function (error) {
              return notice(error.message);
            });
          }
          if (event.target.closest("#stop-demo")) {
            stopDemo();
          }
        case 43:
          return _context.a(2);
      }
    }, _callee, null, [[34, 36], [28, 31], [18, 20], [9, 11], [1, 4]]);
  }));
  return function (_x0) {
    return _ref0.apply(this, arguments);
  };
}());
document.addEventListener("change", function (event) {
  var _event$target$files;
  if (event.target.id === "guest-select") {
    var value = event.target.value;
    var guestForm = document.querySelector("#guest-form");
    if (value === "__add__") {
      var _guestForm$querySelec;
      guestForm === null || guestForm === void 0 || guestForm.classList.remove("hidden");
      guestForm === null || guestForm === void 0 || (_guestForm$querySelec = guestForm.querySelector('input[name="displayName"]')) === null || _guestForm$querySelec === void 0 || _guestForm$querySelec.focus();
      event.target.value = state.selectedGuestId || "";
    } else {
      state.selectedGuestId = value;
      guestForm === null || guestForm === void 0 || guestForm.classList.add("hidden");
      if (state.selectedGuestId) localStorage.setItem("wineGuestId", state.selectedGuestId);
    }
  }
  if (event.target.name === "bagNumber") {
    state.selectedSleeve = event.target.value;
    if (state.selectedSleeve) {
      fetchCoach(state.selectedSleeve).catch(function () {});
    } else {
      paintCoachCard();
    }
  }
  if (event.target.name === "rating") {
    state.starRating = Number(event.target.value);
    paintStars(state.starRating);
  }
  if (event.target.id === "label-photo" && (_event$target$files = event.target.files) !== null && _event$target$files !== void 0 && _event$target$files.length) {
    scanLabel(event.target.form).catch(function (error) {
      state.labelScanPending = false;
      render();
      notice(error.message);
    });
  }
  if (event.target.id === "chart-bottle") drawCharts(event.target.value);
  if (event.target.id === "scan-grape-fix") {
    var bottleId = event.target.dataset.scanBottle;
    var grape = event.target.value;
    api("/api/host/bottles/".concat(bottleId), {
      method: "PATCH",
      host: true,
      body: {
        grape: grape
      }
    }).then(function () {
      if (state.lastLabelScan) state.lastLabelScan.grape = grape;
      notice("Grape updated.");
    }).catch(function (error) {
      return notice(error.message);
    });
  }
});
document.addEventListener("submit", function (event) {
  event.preventDefault();
  if (event.target.id === "tasting-form") submitTasting(event.target).catch(function (error) {
    return notice(error.message);
  });
  if (event.target.id === "photo-form") uploadPhoto(event.target).catch(function (error) {
    return notice(error.message);
  });
  if (event.target.id === "host-login") unlockHost(event.target).catch(function (error) {
    return notice(error.message);
  });
  if (event.target.id === "label-scan-form") scanLabel(event.target).catch(function (error) {
    return notice(error.message);
  });
  if (event.target.id === "bottle-form") saveBottle(event.target).catch(function (error) {
    return notice(error.message);
  });
});
window.addEventListener("resize", function () {
  if (state.view === "tv") fitTvGrid();
});
setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var _state$bootstrap6, _state$bootstrap7, evState, scene, isStaticRevealScene, _state$bootstrap8, _state$bootstrap9, newScene, newEvState, stillStatic, _t6;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        if (!(state.view === "tv" && !state.demoBoard)) {
          _context2.n = 9;
          break;
        }
        evState = (_state$bootstrap6 = state.bootstrap) === null || _state$bootstrap6 === void 0 ? void 0 : _state$bootstrap6.state;
        scene = (_state$bootstrap7 = state.bootstrap) === null || _state$bootstrap7 === void 0 ? void 0 : _state$bootstrap7.revealScene; // For static reveal scenes, always poll bootstrap so scene transitions are
        // detected promptly, but skip the heavier reveal-data fetch — data won't
        // change between host clicks and the poll would be wasted work.
        isStaticRevealScene = (evState === "GRAND_REVEAL" || evState === "ARCHIVE") && scene;
        _context2.p = 1;
        if (!isStaticRevealScene) {
          _context2.n = 6;
          break;
        }
        _context2.n = 2;
        return api("/api/bootstrap");
      case 2:
        state.bootstrap = _context2.v;
        // If the scene changed (or was cleared), fetch reveal data too.
        newScene = (_state$bootstrap8 = state.bootstrap) === null || _state$bootstrap8 === void 0 ? void 0 : _state$bootstrap8.revealScene;
        newEvState = (_state$bootstrap9 = state.bootstrap) === null || _state$bootstrap9 === void 0 ? void 0 : _state$bootstrap9.state;
        stillStatic = (newEvState === "GRAND_REVEAL" || newEvState === "ARCHIVE") && newScene;
        if (!(!stillStatic || newScene !== scene)) {
          _context2.n = 4;
          break;
        }
        _context2.n = 3;
        return refresh({
          reveal: true
        });
      case 3:
        _context2.n = 5;
        break;
      case 4:
        render();
      case 5:
        _context2.n = 7;
        break;
      case 6:
        _context2.n = 7;
        return refresh({
          reveal: true
        });
      case 7:
        if (!["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state)) {
          state.revealData = null;
        }
        _context2.n = 9;
        break;
      case 8:
        _context2.p = 8;
        _t6 = _context2.v;
        console.error("TV refresh failed:", _t6);
      case 9:
        return _context2.a(2);
    }
  }, _callee2, null, [[1, 8]]);
})), 2000);

// --- Wine trivia banner (TV view only) ---
var TRIVIA_ENABLED = true;
var TRIVIA_FACTS = ["A standard 750ml bottle holds roughly the same volume as a glassblower's single breath — that's how the size was standardized.", "The word 'toast' traces back to ancient Rome, where a piece of charred bread was dropped in wine to reduce its acidity.", "When a sommelier hands you the cork, inspect it — don't smell it theatrically. Look for cracks or seepage staining, and confirm the producer's name on the cork matches the label.", "Champagne bottles must withstand up to 90 psi of internal pressure — three times the pressure inside a car tire.", "White wine can be made from red grapes: the juice runs clear until it contacts the pigmented skins.", "Hold a wine glass by the stem, not the bowl. Body heat warms the wine faster than you'd expect, and fingerprints on the bowl make it harder to see the color and clarity.", "A single grapevine typically produces just 3–10 bottles of wine per growing season.", "Georgia (the country) has evidence of winemaking dating back 8,000 years, making it the oldest known wine-producing region.", "The small taste poured before service isn't an invitation to decide if you like the wine — it's your chance to check for flaws like a corked smell or oxidation. Only send it back if something is genuinely wrong.", "The world's most planted wine grape is Cabernet Sauvignon, cultivated on over 340,000 hectares worldwide.", "Grapes are the most widely cultivated fruit crop on Earth.", "In restaurant tradition, the sommelier pours the taste test for whoever ordered the bottle — the host — regardless of where they're seated at the table.", "Tannins in red wine come from grape skins, seeds, and stems — and from oak barrels used during aging.", "Pinot Noir is so finicky to grow that winemakers have nicknamed it the 'heartbreak grape.'", "A 'corked' wine smells like wet cardboard or a musty basement — that's your signal to send it back. Not liking a style isn't grounds for a return.", "Malbec originated in southwest France before emigrating to Argentina, where it became the country's signature red.", "A wine is called 'corked' when contaminated by TCA, a compound that smells like wet cardboard or a musty basement.", "Red wine is often served too warm in restaurants. It's perfectly acceptable to ask for a brief chill in an ice bucket — most reds show best at 60–65°F, not room temperature.", "Decanting a young red wine for an hour can mimic years of gentle aging by exposing it to oxygen.", "The 'legs' that run down the inside of a wine glass reflect alcohol content, not sweetness.", "Swirling wine in a glass is most effective when you keep the base on the table and rotate in small circles — you get maximum aeration without the risk of splashing.", "Riesling vines can survive temperatures as low as −22°F (−30°C) without significant damage.", "The term 'vintage' simply means the year the grapes were harvested — not that the wine is particularly old.", "When approving a wine at the table, a simple nod or 'that's fine' is all that's needed. You don't have to pronounce it great — just confirm it's not flawed.", "A Bordeaux barrel holds 225 liters — enough to fill exactly 300 standard bottles.", "Swirling wine increases its surface area and releases aromatic compounds, making subtle aromas more detectable.", "At a restaurant, it's acceptable to ask for a small sample before committing to a glass pour. Most good wine programs will oblige.", "Port wine takes its name from Porto, Portugal, the city from which it was historically shipped to Britain.", "The 1976 Judgment of Paris shocked the wine world when California wines outscored top French wines in a blind tasting.", "Wine lists organized by region are traditional European style; lists organized by grape variety are more common in New World restaurants. Both approaches are equally valid.", "A standard restaurant pour is 5 oz — about one-fifth of a bottle.", "Wine aged in larger bottles (magnums, jeroboams) typically develops more slowly and gracefully than in standard bottles.", "The second-cheapest bottle on a wine list is often more marked-up than the cheapest — savvy diners gravitate there. Look to lesser-known regions for the best value per dollar.", "Ancient Romans sometimes sweetened wine with lead acetate — known as 'sugar of lead' — with predictable health consequences.", "A magnum holds 1.5 liters, the equivalent of two standard bottles.", "If a restaurant's wine is genuinely faulty — corked, oxidized, or heat-damaged — a reputable establishment will replace it without argument, no matter how much of the bottle has been poured.", "Young red wines are deep purple; as they age, the color gradually shifts toward brick red or garnet at the rim.", "The Barossa Valley in South Australia is home to some of the world's oldest producing Shiraz vines — over 150 years old.", "Champagne gets its bubbles from a second fermentation that happens inside the sealed bottle.", "Grapes must reach a precise sugar level (measured in Brix) before harvest — picking too early or too late changes everything.", "Sommeliers can legally earn the title Master Sommelier only after passing one of the most difficult examinations in the world.", "A wine described as 'blind' means the taster doesn't know what they're drinking — not that the wine has anything to hide."];
var triviaTimer = null;
var triviaHideTimer = null;
var triviaPool = [];
function nextTriviaFact() {
  if (!triviaPool.length) {
    triviaPool = TRIVIA_FACTS.slice().sort(function () {
      return Math.random() - 0.5;
    });
  }
  return triviaPool.pop();
}
function showTrivia() {
  if (!TRIVIA_ENABLED || state.view !== "tv") return;
  var banner = document.getElementById("trivia-banner");
  if (!banner) return;
  clearTimeout(triviaHideTimer);
  banner.innerHTML = '<div class="trivia-card"><p class="trivia-text">' + escapeHtml(nextTriviaFact()) + '</p></div>';
  banner.classList.add("visible");
  triviaHideTimer = setTimeout(function () {
    banner.classList.remove("visible");
  }, 30000);
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
  var banner = document.getElementById("trivia-banner");
  if (banner) banner.classList.remove("visible");
}
refresh({
  photos: state.view === "album",
  reveal: state.view === "tv"
}).then(function () {
  if (state.view === "tv" && new URLSearchParams(location.search).has("demo") && state.bootstrap.leaderboard.length) {
    state.demoBoard = cloneDemoBoard(shuffleBoard(state.bootstrap.leaderboard));
    state.demoAnimationPending = true;
    render();
    startDemoVoting();
  }
}).catch(function (error) {
  app.innerHTML = panel("<p>".concat(escapeHtml(error.message), "</p>"));
});
