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
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url) {
    var options,
      headers,
      response,
      payload,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          headers = _objectSpread(_objectSpread({}, options.body instanceof FormData ? {} : {
            "Content-Type": "application/json"
          }), options.headers);
          if (options.host) headers.Authorization = "Bearer ".concat(hostToken());
          _context2.n = 1;
          return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
            headers: headers,
            body: options.body instanceof FormData ? options.body : options.body && JSON.stringify(options.body)
          }));
        case 1:
          response = _context2.v;
          _context2.n = 2;
          return response.json().catch(function () {
            return {};
          });
        case 2:
          payload = _context2.v;
          if (response.ok) {
            _context2.n = 3;
            break;
          }
          throw new Error(payload.error || "Request failed.");
        case 3:
          return _context2.a(2, payload);
      }
    }, _callee2);
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
function navMarkup() {
  nav.innerHTML = views.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      id = _ref2[0],
      label = _ref2[1];
    return "\n    <button class=\"".concat(state.view === id ? "tap-primary" : "tap-quiet", "\" data-view=\"").concat(id, "\" type=\"button\">").concat(label, "</button>\n  ");
  }).join("");
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
  }).join(""), "\n  ");
}
function bottleOptions() {
  return "\n    <option value=\"\">Sleeve number</option>\n    ".concat(state.bootstrap.bottles.map(function (bottle) {
    return "<option value=\"".concat(bottle.bagNumber, "\">Bottle ").concat(bottle.bagNumber, "</option>");
  }).join(""), "\n  ");
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
  return "\n    <div class=\"grid gap-4 lg:grid-cols-[1.4fr_.8fr]\">\n      ".concat(panel("\n        <div class=\"mb-5 flex flex-wrap items-end justify-between gap-3\">\n          <div>\n            <p class=\"kicker\">Fast tasting</p>\n            <h2 class=\"screen-title\">Rate the sleeve in a few taps</h2>\n          </div>\n          <span class=\"rounded-md bg-emerald-400/15 px-3 py-2 text-sm text-emerald-100\">".concat(escapeHtml(stateLabel(state.bootstrap.state)), "</span>\n        </div>\n        <form id=\"tasting-form\">\n          <div class=\"grid gap-3 sm:grid-cols-[1fr_auto]\">\n            <label>\n              <span class=\"mb-2 block text-sm font-bold text-amber-100\">Taster</span>\n              <select id=\"guest-select\" class=\"field\" required>").concat(guestOptions(), "</select>\n            </label>\n            <button class=\"tap-quiet self-end\" id=\"show-guest-form\" type=\"button\">Add name</button>\n          </div>\n          <div id=\"guest-form\" class=\"mt-3 hidden grid gap-2 sm:grid-cols-[1fr_auto]\">\n            <input class=\"field\" name=\"displayName\" maxlength=\"60\" placeholder=\"Guest name\" aria-label=\"Guest name\">\n            <button class=\"tap-primary\" type=\"button\" id=\"add-guest\">Join tasting</button>\n          </div>\n          <div class=\"mt-5 grid gap-4 md:grid-cols-2\">\n            <label>\n              <span class=\"mb-2 block text-sm font-bold text-amber-100\">Blind bottle</span>\n              <select name=\"bagNumber\" class=\"field\" required>").concat(bottleOptions(), "</select>\n            </label>\n            <label>\n              <span class=\"mb-2 block text-sm font-bold text-amber-100\">Grape guess</span>\n              <select name=\"grapeGuess\" class=\"field\" required>\n                ").concat(state.bootstrap.grapes.map(function (grape) {
    return "<option>".concat(escapeHtml(grape), "</option>");
  }).join(""), "\n              </select>\n            </label>\n          </div>\n          <fieldset class=\"mt-5\">\n            <legend class=\"mb-2 text-sm font-bold text-amber-100\">Your rating</legend>\n            ").concat(stars(), "\n          </fieldset>\n          <label class=\"mt-4 flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-rose-200/20 bg-rose-950/25 p-3\">\n            <input class=\"size-5 accent-rose-400\" type=\"checkbox\" name=\"isBookmarked\">\n            <span>Save this one as a favourite</span>\n          </label>\n          ").concat(tastingGrid(), "\n          <button class=\"tap-primary mt-5 w-full text-lg\" type=\"submit\">Save tasting</button>\n        </form>\n      ")), "\n      ").concat(panel("\n        <h2 class=\"text-xl font-semibold\">Party pace</h2>\n        <p class=\"mt-2 text-amber-50/80\">The core score is only stars and a grape guess. Hand the kiosk to the next taster after save.</p>\n        <div class=\"mt-5 grid gap-3\">\n          <div class=\"soft-stat rounded-md p-4\">\n            <p class=\"text-3xl font-semibold text-amber-300\">".concat(state.bootstrap.bottles.length, "</p>\n            <p class=\"text-amber-50/75\">blind bottles checked in</p>\n          </div>\n          <div class=\"soft-stat rounded-md p-4\">\n            <p class=\"text-3xl font-semibold text-emerald-300\">").concat(state.bootstrap.guests.length, "</p>\n            <p class=\"text-amber-50/75\">tasters on the list</p>\n          </div>\n        </div>\n      ")), "\n    </div>\n  ");
}
function photosMarkup() {
  if (!state.photos.length) return "<p class=\"rounded-md border border-amber-100/15 bg-stone-950/40 p-5 text-amber-50/75\">The shared album is waiting for the first party photo.</p>";
  return "<div class=\"grid gap-3 sm:grid-cols-2 lg:grid-cols-3\">".concat(state.photos.map(function (photo) {
    return "\n    <figure class=\"overflow-hidden rounded-lg border border-amber-100/15 bg-stone-950/55\">\n      <img class=\"aspect-[4/3] w-full object-cover\" src=\"".concat(escapeHtml(photo.storageUrl), "\" alt=\"Party photo uploaded by ").concat(escapeHtml(photo.displayName), "\">\n      <figcaption class=\"px-3 py-2 text-sm text-amber-50/80\">").concat(escapeHtml(photo.displayName), "</figcaption>\n    </figure>\n  ");
  }).join(""), "</div>");
}
function albumView() {
  return panel("\n    <div class=\"mb-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end\">\n      <div>\n        <p class=\"kicker\">Shared album</p>\n        <h2 class=\"screen-title\">Photos from the evening</h2>\n      </div>\n      <form id=\"photo-form\" class=\"grid gap-2 sm:grid-cols-[1fr_auto]\">\n        <input class=\"field file:mr-3 file:rounded-md file:border-0 file:bg-emerald-300 file:px-3 file:py-2 file:font-semibold file:text-stone-950\" type=\"file\" name=\"photo\" accept=\"image/*\" capture=\"environment\" required>\n        <button class=\"tap-primary\" type=\"submit\">Upload</button>\n      </form>\n    </div>\n    ".concat(photosMarkup(), "\n  "));
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
    return "\n    <li class=\"tv-rank tv-bottle-card".concat(item.voting ? " voting" : "").concat(item.moving ? " moving" : "", "\" data-bag-number=\"").concat(item.bagNumber, "\">\n      <div class=\"blind-bottle\" aria-label=\"Sleeve ").concat(item.bagNumber, "\">\n        <div class=\"blind-bottle-lip\"></div>\n        <div class=\"blind-bottle-neck\"></div>\n        <div class=\"blind-bottle-shoulders\"></div>\n        <div class=\"blind-bottle-body\"><span>#").concat(item.bagNumber, "</span></div>\n      </div>\n      <p class=\"tv-bottle-score\">").concat(item.voteCount ? "".concat(Number(item.averageRating).toFixed(1), " / 5") : "Awaiting ratings", "</p>\n      <p class=\"text-sm text-amber-50/65\">").concat(item.voteCount, " rating").concat(item.voteCount === 1 ? "" : "s", "</p>\n      <div class=\"mt-3 min-h-14\">\n        ").concat(item.grapeGuesses.length ? "\n          <div class=\"flex flex-wrap justify-center gap-1\">\n            ".concat(item.grapeGuesses.slice(0, 4).map(function (guess) {
      return "<span class=\"tv-guess-chip\">".concat(escapeHtml(guess.label), " ").concat(guess.count, "</span>");
    }).join(""), "\n          </div>\n        ") : "", "\n      </div>\n    </li>\n  ");
  }).join(""), "</ol>");
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
    item.style.transform = "translate(".concat(dx, "px, ").concat(dy, "px)");
    item.style.transition = "transform .75s cubic-bezier(0.22,1,0.36,1)";
    item.style.willChange = "transform";
    item.getBoundingClientRect();
    requestAnimationFrame(function () {
      item.style.transform = "";
      item.style.willChange = "";
    });
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
  if (!state.reveal.length) return "<p class=\"rounded-md bg-stone-950/45 p-5\">The host controls the grand reveal.</p>";
  return "\n    <div class=\"mt-5 grid gap-4 xl:grid-cols-[.9fr_1.1fr]\">\n      <div class=\"grid gap-3\">\n        ".concat(state.reveal.map(function (bottle) {
    return "\n          <article class=\"rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\">\n            <div class=\"grid gap-3 sm:grid-cols-[110px_1fr]\">\n              ".concat(bottle.photoUrl ? "<img class=\"aspect-[3/4] w-full rounded-md object-cover\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"").concat(escapeHtml(bottle.bottleName), " bottle\">") : "<div class=\"flex aspect-[3/4] items-center justify-center rounded-md bg-stone-800 text-4xl\">#".concat(bottle.bagNumber, "</div>"), "\n              <div>\n                <p class=\"text-sm font-bold text-amber-300\">Sleeve ").concat(bottle.bagNumber, "</p>\n                <h3 class=\"text-xl font-semibold\">").concat(escapeHtml(bottle.bottleName), "</h3>\n                <p class=\"text-emerald-100\">").concat(escapeHtml([bottle.producer, bottle.vintage, bottle.region].filter(Boolean).join(" · ")), "</p>\n                <p class=\"mt-2\"><strong>").concat(escapeHtml(bottle.grape), "</strong> \xB7 Crowd ").concat(Number(bottle.averageRating).toFixed(1), " / 5 \xB7 ").concat(bottle.voteCount, " votes</p>\n              </div>\n            </div>\n            <p class=\"mt-3 text-amber-50/85\">").concat(escapeHtml(bottle.expertScore === null ? "Host note" : "Expert ".concat(bottle.expertScore, "/100")), ": ").concat(escapeHtml(bottle.expertCommentary || "No expert note entered."), "</p>\n            <p class=\"mt-2 text-sm text-rose-100\">Correct grape guesses: ").concat(escapeHtml(bottle.correctGuests.join(", ") || "No correct guesses yet"), "</p>\n          </article>\n        ");
  }).join(""), "\n      </div>\n      <div class=\"grid gap-4 content-start\">\n        <label class=\"rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\">\n          <span class=\"mb-2 block font-semibold\">Chart bottle</span>\n          <select id=\"chart-bottle\" class=\"field\">").concat(state.reveal.map(function (bottle) {
    return "<option value=\"".concat(bottle.id, "\">Sleeve ").concat(bottle.bagNumber, ": ").concat(escapeHtml(bottle.bottleName), "</option>");
  }).join(""), "</select>\n        </label>\n        <div class=\"chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\"><canvas id=\"grape-chart\" aria-label=\"Grape guesses chart\"></canvas></div>\n        <div class=\"chart-shell rounded-lg border border-amber-100/15 bg-stone-950/60 p-4\"><canvas id=\"appearance-chart\" aria-label=\"Appearance chart\"></canvas></div>\n      </div>\n    </div>\n  ");
}
function tvView() {
  return "\n    ".concat(panel("\n      <div class=\"mb-5 flex flex-wrap items-end justify-between gap-3\">\n        <div>\n          <p class=\"kicker\">Live standings</p>\n          <h2 class=\"screen-title\">Bottle race</h2>\n          <p class=\"mt-2 text-amber-50/75\">Sleeves move left-to-right by crowd rating. Bottle identities stay blind until reveal.</p>\n        </div>\n        ".concat(state.demoBoard ? "<button class=\"tap-quiet\" id=\"stop-demo\" type=\"button\">Stop demo</button>" : "", "\n      </div>\n      ").concat(state.demoBoard ? "<div class=\"mb-4 rounded-2xl border border-amber-200/20 bg-amber-950/20 p-4 text-amber-100\">Demo vote mode is active. Watch bottles move as the crowd ranks them.</div>" : "", "\n      ").concat(boardMarkup(state.bootstrap.leaderboard), "\n    ")), "\n    ").concat(state.bootstrap.state === "GRAND_REVEAL" || state.bootstrap.state === "ARCHIVE" ? panel("<h2 class=\"text-3xl font-semibold\">Grand reveal</h2>".concat(revealMarkup()), "mt-4") : "", "\n  ");
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
  return "\n    <div class=\"grid gap-4 xl:grid-cols-[1fr_.9fr]\">\n      ".concat(panel("\n        <div class=\"flex flex-wrap items-center justify-between gap-3\">\n          <div>\n            <p class=\"kicker\">Host check-in</p>\n            <h2 class=\"screen-title\">".concat(editing ? "Edit sleeve ".concat(editing.bagNumber) : "Scan arriving bottle", "</h2>\n          </div>\n          ").concat(editing ? "<button class=\"tap-quiet\" id=\"cancel-edit\" type=\"button\">New bottle</button>" : "", "\n        </div>\n        ").concat(!editing ? "\n          <form id=\"label-scan-form\" class=\"mt-4 rounded-lg border border-rose-100/15 bg-rose-950/20 p-4\">\n            <input id=\"label-photo\" class=\"sr-only\" name=\"photo\" type=\"file\" accept=\"image/*\" capture=\"environment\" required>\n            <label class=\"".concat(state.labelScanPending ? "opacity-60" : "", " tap-primary w-full cursor-pointer text-lg\" for=\"label-photo\">\n              ").concat(state.labelScanPending ? "Reading label..." : "Scan label", "\n            </label>\n            <p class=\"mt-2 text-sm text-amber-50/70\">Tap to open the camera. Winey scans the label, assigns the next sleeve, and saves the image for reveal.</p>\n          </form>\n          ").concat(state.lastLabelScan ? "\n            <div class=\"mt-3 rounded-lg border border-emerald-200/25 bg-emerald-950/45 p-4 text-emerald-50\">\n              <p class=\"text-sm font-bold uppercase text-emerald-200\">Bottle checked in</p>\n              <p class=\"mt-1 text-lg\">Put this bottle in sleeve</p>\n              <p class=\"text-7xl font-black text-amber-300\">#".concat(state.lastLabelScan.bagNumber, "</p>\n              <p class=\"mt-2 text-sm\">Label scan confidence: ").concat(escapeHtml(state.lastLabelScan.confidence), ".</p>\n              ").concat(state.lastLabelScan.notes ? "<p class=\"mt-1 text-sm\">".concat(escapeHtml(state.lastLabelScan.notes), "</p>") : "", "\n              <button class=\"tap-quiet mt-3 w-full\" data-edit-bottle=\"").concat(state.lastLabelScan.bottleId, "\" type=\"button\">Review bottle details</button>\n            </div>\n          ") : "", "\n          <details class=\"mt-4 rounded-md border border-amber-100/15 bg-stone-950/35 p-4\">\n            <summary class=\"cursor-pointer font-semibold\">Manual check-in</summary>\n        ") : "", "\n        <form id=\"bottle-form\" class=\"mt-4\">\n          ").concat(hostBottleFields(editing), "\n          <button class=\"tap-primary mt-4 w-full\" type=\"submit\">").concat(editing ? "Save bottle" : "Check in manually", "</button>\n        </form>\n        ").concat(!editing ? "</details>" : "", "\n      ")), "\n      ").concat(panel("\n        <h2 class=\"text-2xl font-semibold\">Event control</h2>\n        <div class=\"mt-4 grid gap-2 sm:grid-cols-2\">\n          <button class=\"tap-quiet\" data-event-state=\"LIVE_TASTING\" type=\"button\">Live tasting</button>\n          <button class=\"tap-primary\" data-event-state=\"GRAND_REVEAL\" type=\"button\">Grand reveal</button>\n        </div>\n        <button class=\"tap-quiet mt-3 w-full\" id=\"seed-demo\" type=\"button\">Load 15-bottle demo</button>\n        <p class=\"mt-4 rounded-md bg-emerald-400/15 p-3 text-emerald-50\">Current state: ".concat(escapeHtml(stateLabel(state.host.state)), "</p>\n        <div class=\"mt-5 grid grid-cols-2 gap-3\">\n          <div class=\"rounded-md bg-stone-950/55 p-4\"><p class=\"text-3xl text-amber-300\">").concat(state.host.bottles.length, "</p><p>Bottles</p></div>\n          <div class=\"rounded-md bg-stone-950/55 p-4\"><p class=\"text-3xl text-emerald-300\">").concat(state.host.photos.length, "</p><p>Party photos</p></div>\n        </div>\n      ")), "\n    </div>\n    ").concat(panel("\n      <h2 class=\"mb-4 text-2xl font-semibold\">Checked-in bottles</h2>\n      <div class=\"grid gap-3 md:grid-cols-2 xl:grid-cols-3\">\n        ".concat(state.host.bottles.map(function (bottle) {
    return "\n          <article class=\"rounded-lg border border-amber-100/15 bg-stone-950/55 p-3\">\n            <div class=\"flex gap-3\">\n              ".concat(bottle.photoUrl ? "<img class=\"h-28 w-20 rounded-md object-cover\" src=\"".concat(escapeHtml(bottle.photoUrl), "\" alt=\"\">") : "", "\n              <div>\n                <p class=\"text-sm font-bold text-amber-300\">Sleeve ").concat(bottle.bagNumber, "</p>\n                <h3 class=\"font-semibold\">").concat(escapeHtml(bottle.bottleName), "</h3>\n                <p class=\"text-sm text-amber-50/75\">").concat(escapeHtml(bottle.grape), " \xB7 ").concat(bottle.voteCount, " ratings</p>\n              </div>\n            </div>\n            <button class=\"tap-quiet mt-3 w-full\" data-edit-bottle=\"").concat(bottle.id, "\" type=\"button\">Edit</button>\n          </article>\n        ");
  }).join("") || "<p class=\"text-amber-50/75\">No bottles checked in yet.</p>", "\n      </div>\n    "), "mt-4"), "\n  ");
}
function render() {
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
  }[state.view]();
  if (state.view === "tv") animateTvBoard(oldPositions);
  if (state.view === "tv" && state.demoBoard && !state.demoVoteTimer) {
    startDemoVoting();
  }
  if (state.view === "tv" && state.demoAnimationPending) {
    state.demoAnimationPending = false;
    requestAnimationFrame(function () {
      return animateDemoScores();
    });
  }
  if (state.view === "tv" && state.reveal.length) drawCharts(state.reveal[0].id);
}
function refresh() {
  return _refresh.apply(this, arguments);
}
function _refresh() {
  _refresh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _ref8,
      _ref8$photos,
      photos,
      _ref8$reveal,
      reveal,
      _ref8$host,
      host,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _ref8 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, _ref8$photos = _ref8.photos, photos = _ref8$photos === void 0 ? false : _ref8$photos, _ref8$reveal = _ref8.reveal, reveal = _ref8$reveal === void 0 ? false : _ref8$reveal, _ref8$host = _ref8.host, host = _ref8$host === void 0 ? false : _ref8$host;
          _context3.n = 1;
          return api("/api/bootstrap");
        case 1:
          state.bootstrap = _context3.v;
          if (!photos) {
            _context3.n = 3;
            break;
          }
          _context3.n = 2;
          return api("/api/photos");
        case 2:
          state.photos = _context3.v;
        case 3:
          if (!(reveal && ["GRAND_REVEAL", "ARCHIVE"].includes(state.bootstrap.state))) {
            _context3.n = 5;
            break;
          }
          _context3.n = 4;
          return api("/api/reveal");
        case 4:
          state.reveal = _context3.v;
        case 5:
          if (!(host && hostToken())) {
            _context3.n = 7;
            break;
          }
          _context3.n = 6;
          return api("/api/host/dashboard", {
            host: true
          });
        case 6:
          state.host = _context3.v;
        case 7:
          render();
        case 8:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _refresh.apply(this, arguments);
}
function palatePayload(form) {
  return Object.fromEntries(Object.keys(state.bootstrap.tastingGrid.palate).map(function (metric) {
    var _form$querySelector;
    return [metric, (_form$querySelector = form.querySelector("[name=\"palate-".concat(metric, "\"]:checked"))) === null || _form$querySelector === void 0 ? void 0 : _form$querySelector.value];
  }).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      value = _ref6[1];
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
  _submitTasting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(form) {
    var _form$querySelector2, _form$querySelector3;
    var selectedGuestId, rating, payload;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
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
          _context4.n = 1;
          return api("/api/tastings", {
            method: "POST",
            body: payload
          });
        case 1:
          state.selectedGuestId = "";
          localStorage.removeItem("wineGuestId");
          state.starRating = 0;
          notice("Tasting saved. Ready for the next guest.");
          _context4.n = 2;
          return refresh();
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _submitTasting.apply(this, arguments);
}
function addGuest(_x3) {
  return _addGuest.apply(this, arguments);
}
function _addGuest() {
  _addGuest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(form) {
    var name, guest;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          name = form.querySelector('[name="displayName"]').value;
          _context5.n = 1;
          return api("/api/guests", {
            method: "POST",
            body: {
              displayName: name
            }
          });
        case 1:
          guest = _context5.v;
          state.selectedGuestId = String(guest.id);
          localStorage.setItem("wineGuestId", guest.id);
          _context5.n = 2;
          return refresh();
        case 2:
          notice("".concat(guest.displayName, " is ready to taste."));
        case 3:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return _addGuest.apply(this, arguments);
}
function uploadPhoto(_x4) {
  return _uploadPhoto.apply(this, arguments);
}
function _uploadPhoto() {
  _uploadPhoto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(form) {
    var body;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          body = new FormData(form);
          if (state.selectedGuestId) body.append("userId", state.selectedGuestId);
          _context6.n = 1;
          return api("/api/photos", {
            method: "POST",
            body: body
          });
        case 1:
          form.reset();
          notice("Photo added to the shared album.");
          _context6.n = 2;
          return refresh({
            photos: true
          });
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return _uploadPhoto.apply(this, arguments);
}
function unlockHost(_x5) {
  return _unlockHost.apply(this, arguments);
}
function _unlockHost() {
  _unlockHost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(form) {
    var result;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return api("/api/host/session", {
            method: "POST",
            body: {
              pin: form.pin.value
            }
          });
        case 1:
          result = _context7.v;
          localStorage.setItem("wineHostToken", result.token);
          notice("Host controls unlocked on this device.");
          _context7.n = 2;
          return refresh({
            host: true
          });
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return _unlockHost.apply(this, arguments);
}
function saveBottle(_x6) {
  return _saveBottle.apply(this, arguments);
}
function _saveBottle() {
  _saveBottle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(form) {
    var body, editing, url, bottle;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          body = new FormData(form);
          editing = state.editBottleId;
          url = editing ? "/api/host/bottles/".concat(editing) : "/api/host/bottles";
          _context8.n = 1;
          return api(url, {
            method: editing ? "PATCH" : "POST",
            body: body,
            host: true
          });
        case 1:
          bottle = _context8.v;
          state.editBottleId = null;
          notice(editing ? "Sleeve ".concat(bottle.bagNumber, " updated.") : "Bottle checked in as sleeve ".concat(bottle.bagNumber, "."));
          _context8.n = 2;
          return refresh({
            host: true
          });
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return _saveBottle.apply(this, arguments);
}
function seedDemo() {
  return _seedDemo.apply(this, arguments);
}
function _seedDemo() {
  _seedDemo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return api("/api/host/demo", {
            method: "POST",
            host: true
          });
        case 1:
          notice("15 demo bottles loaded.");
          _context9.n = 2;
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
          return _context9.a(2);
      }
    }, _callee9);
  }));
  return _seedDemo.apply(this, arguments);
}
function scanLabel(_x7) {
  return _scanLabel.apply(this, arguments);
}
function _scanLabel() {
  _scanLabel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(form) {
    var body, result;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          body = new FormData(form);
          state.labelScanPending = true;
          render();
          _context0.p = 1;
          _context0.n = 2;
          return api("/api/host/bottles/scan", {
            method: "POST",
            body: body,
            host: true
          });
        case 2:
          result = _context0.v;
          state.lastLabelScan = {
            bottleId: result.bottle.id,
            bagNumber: result.bottle.bagNumber,
            confidence: result.scan.confidence,
            notes: result.scan.notes
          };
          notice("Put this bottle in sleeve ".concat(result.bottle.bagNumber, "."));
          form.reset();
          _context0.n = 3;
          return refresh({
            host: true
          });
        case 3:
          _context0.p = 3;
          state.labelScanPending = false;
          render();
          return _context0.f(3);
        case 4:
          return _context0.a(2);
      }
    }, _callee0, null, [[1,, 3, 4]]);
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
    return item.id === Number(id);
  });
  if (!bottle || !window.Chart) return;
  var colors = ["#f2bd5d", "#d43f63", "#2d6a5b", "#9fb8d0", "#c37d46", "#e9d6a4"];
  var empty = [{
    label: "No optional notes yet",
    count: 1
  }];
  var grapeData = bottle.grapeGuesses.length ? bottle.grapeGuesses : empty;
  var appearanceData = bottle.appearance.length ? bottle.appearance : empty;
  state.charts.push(new Chart(document.querySelector("#grape-chart"), {
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
  state.charts.push(new Chart(document.querySelector("#appearance-chart"), {
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
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
    var _event$target$closest, _document$querySelect, _event$target$closest2, _event$target$closest3;
    var view, editId, eventState;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          view = (_event$target$closest = event.target.closest("[data-view]")) === null || _event$target$closest === void 0 ? void 0 : _event$target$closest.dataset.view;
          if (!view) {
            _context.n = 8;
            break;
          }
          state.view = view;
          history.replaceState({}, "", view === "tv" ? "?view=tv" : location.pathname);
          if (!(view === "album" && !state.photos.length)) {
            _context.n = 2;
            break;
          }
          _context.n = 1;
          return refresh({
            photos: true
          });
        case 1:
          _context.n = 7;
          break;
        case 2:
          if (!(view === "host" && hostToken())) {
            _context.n = 4;
            break;
          }
          _context.n = 3;
          return refresh({
            host: true
          });
        case 3:
          _context.n = 7;
          break;
        case 4:
          if (!(view === "tv")) {
            _context.n = 6;
            break;
          }
          _context.n = 5;
          return refresh({
            reveal: true
          });
        case 5:
          _context.n = 7;
          break;
        case 6:
          render();
        case 7:
          if (view === "tv" && state.demoBoard && !state.demoVoteTimer) {
            startDemoVoting();
          }
        case 8:
          if (event.target.closest("#show-guest-form")) (_document$querySelect = document.querySelector("#guest-form")) === null || _document$querySelect === void 0 || _document$querySelect.classList.toggle("hidden");
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
          if (event.target.closest("#seed-demo")) {
            seedDemo().catch(function (error) {
              return notice(error.message);
            });
          }
          if (event.target.closest("#stop-demo")) {
            stopDemo();
          }
        case 9:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x8) {
    return _ref7.apply(this, arguments);
  };
}());
document.addEventListener("change", function (event) {
  var _event$target$files;
  if (event.target.id === "guest-select") {
    state.selectedGuestId = event.target.value;
    if (state.selectedGuestId) localStorage.setItem("wineGuestId", state.selectedGuestId);
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
setInterval(function () {
  if (state.view === "tv" && !state.demoBoard) {
    refresh({
      reveal: true
    }).catch(function (error) {
      return console.error("TV refresh failed:", error);
    });
  }
}, 7000);
refresh({
  photos: state.view === "album",
  reveal: state.view === "tv"
}).catch(function (error) {
  app.innerHTML = panel("<p>".concat(escapeHtml(error.message), "</p>"));
});
