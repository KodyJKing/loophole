// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4UKJc":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "043affa210fd5d10be6d99797cacc1f4";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3rfh7":[function(require,module,exports) {
"use strict";
var _Game = _interopRequireDefault(require("./Game"));
var _Editor = _interopRequireDefault(require("./Editor"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
window.onload = function () {
  // let game = new Editor()
  // let game = new Game()
  var game = window.location.search.slice(1) == "edit" ? new _Editor["default"]() : new _Game["default"]();
  var time = performance.now();
  function loop() {
    var oldTime = time;
    time = performance.now();
    var dt = time - oldTime;
    game.update(Math.min(dt / 1000, 0.25));
    requestAnimationFrame(loop);
  }
  loop();
};

},{"./Game":"rxVhC","./Editor":"5sIwd"}],"rxVhC":[function(require,module,exports) {
"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Timeline = _interopRequireDefault(require("./Timeline"));
var _clone = _interopRequireWildcard(require("./common/clone"));
var _JumpTracker = _interopRequireDefault(require("./JumpTracker"));
var _assets = require("geode/lib/assets");
var _Canvas = _interopRequireDefault(require("geode/lib/graphics/Canvas"));
var ageBeforeBeauty = _interopRequireWildcard(require("./levels/AgeBeforeBeauty.json"));
var _loadTiledMap = _interopRequireDefault(require("./loadTiledMap"));
var _GMath = _interopRequireDefault(require("geode/lib/math/GMath"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Game = /*#__PURE__*/(function () {
  function Game() {
    _classCallCheck(this, Game);
    _defineProperty(this, "stepsPerSecond", 6);
    _defineProperty(this, "rewindSpeed", 5);
    _defineProperty(this, "jumpTracker", new _JumpTracker["default"]());
    _defineProperty(this, "timeModification", null);
    _defineProperty(this, "speedAdjust", 1);
    _defineProperty(this, "time", 0);
    window.game = this;
    Game.instance = this;
    this.canvas = new _Canvas["default"]("canvas");
    // let world = map0()
    var world = (0, _loadTiledMap["default"])(ageBeforeBeauty);
    world.initDraw();
    world.initPlay();
    this.timeline = new _Timeline["default"](world, function (world) {
      return world.update();
    });
  }
  _createClass(Game, [{
    key: "world",
    get: function get() {
      return this.timeline.state;
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.draw();
      this.updateTime(dt);
    }
  }, {
    key: "draw",
    value: function draw() {
      var canvas = this.canvas;
      canvas.fitWindow(2);
      canvas.smooth(false);
      this.world.draw(this.canvas, this.fracTime);
      if (this.timeModification !== null) {
        var img = (0, _assets.getImage)("GuiTimeTravelIndicator");
        canvas.alpha(0.5).translate(canvas.width / 2, canvas.height / 4).scale(2 * this.timeDirection, 2).translate(-img.width / 2, -img.height / 2).image(img, 0, 0);
      }
    }
  }, {
    key: "fracTime",
    get: function get() {
      return this.time % 1;
    }
  }, {
    key: "timeDirection",
    get: function get() {
      return this.timeModification !== null ? Math.sign(this.timeModification.time - this.time) : 1;
    }
  }, {
    key: "speedAdjustTarget",
    get: function get() {
      return this.timeDirection > 0 ? 1 : -this.rewindSpeed;
    }
  }, {
    key: "updateTime",
    value: function updateTime(dt) {
      if (this.timeModification !== null) {
        if (Math.floor(this.time) == this.timeModification.time) {
          this.timeline.applyModification(this.timeModification.time, this.timeModification.modifiedState);
          this.timeModification = null;
          this.speedAdjust = 1;
        }
      }
      this.speedAdjust = _GMath["default"].lerp(this.speedAdjust, this.speedAdjustTarget, 0.1);
      var intendedDeltaTime = this.stepsPerSecond * dt * this.speedAdjust;
      var deltaTime = Math.min(intendedDeltaTime, 1);
      if (deltaTime != intendedDeltaTime) console.log("Cannot keep up. Running under desired step rate.");
      this.time += deltaTime;
      var step = Math.floor(this.time);
      this.timeline.gotoTime(step);
    }
  }, {
    key: "getModifiedWorldState",
    value: function getModifiedWorldState(time, applyChanges) {
      var originalState = this.timeline.getState(time);
      var modifiedState = (0, _clone["default"])(originalState);
      applyChanges(modifiedState);
      var changed = !(0, _clone.deepCompare)(originalState, modifiedState);
      return changed ? {
        modifiedState: modifiedState,
        time: time
      } : null;
    }
  }, {
    key: "modifyWorldStateAtTime",
    value: function modifyWorldStateAtTime(time, applyChanges) {
      if (this.timeDirection < 0) return;
      // Don't make modifications while rewinding.
      this.timeModification = this.getModifiedWorldState(time, applyChanges);
      if (this.timeModification == null) {
        this.jumpTracker.resolveJump(time);
      } else {
        this.jumpTracker.openJump(time);
      }
    }
  }]);
  return Game;
})();
exports["default"] = Game;

},{"./Timeline":"4rvOk","./common/clone":"4OUyw","./JumpTracker":"5IB1O","geode/lib/assets":"2xPL5","geode/lib/graphics/Canvas":"3tMQ6","./levels/AgeBeforeBeauty.json":"63wra","./loadTiledMap":"4bJ0v","geode/lib/math/GMath":"360F0"}],"4rvOk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clone = _interopRequireDefault(require("./common/clone"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// Responsible for calculating, storing and retrieving game state at arbitrary time.
var Timeline = /*#__PURE__*/(function () {
  function Timeline(state, update) {
    _classCallCheck(this, Timeline);
    _defineProperty(this, "time", 0);
    _defineProperty(this, "snapshotInterval", 100);
    this.state = state;
    this.snapshots = _defineProperty({}, 0, (0, _clone["default"])(state));
    this.update = update;
  }
  _createClass(Timeline, [{
    key: "getUpdatedState",
    value: function getUpdatedState(state, time) {
      if (this.snapshots[time]) state = (0, _clone["default"])(this.snapshots[time]); else this.update(state);
      return state;
    }
  }, {
    key: "step",
    value: function step() {
      this.time++;
      this.state = this.getUpdatedState(this.state, this.time);
      if (this.time % this.snapshotInterval == 0) this.snapshot();
    }
  }, {
    key: "snapshot",
    value: function snapshot() {
      var prev = this.snapshots[this.time - this.snapshotInterval];
      this.snapshots[this.time] = (0, _clone["default"])(this.state, prev);
    }
  }, {
    key: "getState",
    value: function getState() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.snapshots[time]) return (0, _clone["default"])(this.snapshots[time]);
      var snapshotNumber = Math.floor(time / this.snapshotInterval);
      var lastSnapshotTime = snapshotNumber * this.snapshotInterval;
      var remainingTime = time - lastSnapshotTime;
      var snapshot = (0, _clone["default"])(this.snapshots[lastSnapshotTime] || this.snapshots[lastSnapshotTime]);
      for (var i = 0; i < remainingTime; i++) {
        snapshot = this.getUpdatedState(snapshot, ++lastSnapshotTime);
      }
      return snapshot;
    }
  }, {
    key: "rewindTo",
    value: function rewindTo(time) {
      this.state = this.getState(time);
      this.time = time;
    }
  }, {
    key: "gotoTime",
    value: function gotoTime(time) {
      if (time >= this.time) {
        while (this.time < time) {
          this.step();
        }
      } else {
        this.rewindTo(time);
      }
    }
  }, {
    key: "applyModification",
    value: // Goes back to given time and sets state to given state.
    function applyModification(time, state) {
      for (var key in this.snapshots) {
        var otherTime = parseInt(key, 10);
        if (otherTime > time) delete this.snapshots[otherTime];
      }
      this.snapshots[time] = state;
      this.rewindTo(time);
    }
  }]);
  return Timeline;
})();
exports["default"] = Timeline;

},{"./common/clone":"4OUyw"}],"4OUyw":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValueType = isValueType;
exports.markStatic = markStatic;
exports.markDirty = markDirty;
exports["default"] = clone;
exports.deepCompare = deepCompare;
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function isValueType(object) {
  return _typeof(object) != "object" || object === null;
}
function markStatic(object) {
  object.$static = true;
}
function markDirty(object, value) {
  object.$dirty = value;
}
function createInstance(constructor) {
  if (constructor == Array) return [];
  // if ( constructor == Map )
  // return new Map()
  // if ( constructor == Set )
  // return new Set()
  if (!constructor) return new Object(null);
  var result;
  result = {};
  result.__proto__ = constructor.prototype;
  return result;
}
/**
* Clones an arbitrary data structure, preserving topology.
* When a previous version is passed, the clone is performed relative this
* and will reuse anything found to be unchanged, either found to be
* deeply-equal or explicitly marked not dirty.
*/
function clone(cur) {
  var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var cloned = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();
  if (isValueType(cur)) return cur;
  if (cur.$static == true) return cur;
  if (cur.$dirty === false && prev !== undefined) return prev;
  if (cloned.has(cur)) return cloned.get(cur);
  var result = createInstance(cur.constructor);
  var deepEqual = prev !== undefined;
  cloned.set(cur, result);
  for (var key in cur) {
    if (key == "$dirty") continue;
    var curVal = cur[key];
    var prevVal = prev !== undefined ? prev[key] : undefined;
    var clonedVal = clone(curVal, prevVal, cloned);
    result[key] = clonedVal;
    if (clonedVal !== prevVal) deepEqual = false;
  }
  if (deepEqual) {
    cloned.set(cur, prev);
    return prev;
  }
  return result;
}
function deepCompare(a, b) {
  var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var visitedA = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Map();
  var visitedB = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Map();
  var pathStr = path.join(".");
  var log = function log(x) {
    return verbose ? console.log(x) : null;
  };
  if (a == b) return true;
  if (isValueType(a) || isValueType(b)) {
    log("value inequality at " + pathStr);
    log(a);
    log(b);
    return false;
  }
  var topologicalNumberA = visitedA.get(a);
  var topologicalNumberB = visitedB.get(b);
  if (topologicalNumberA !== topologicalNumberB) {
    log("topological inequality at " + pathStr);
    return false;
  }
  if (topologicalNumberA !== undefined) return true;
  if (!visitedA.has(a)) {
    visitedA.set(a, visitedA.size);
    visitedB.set(b, visitedB.size);
  }
  if (a.constructor !== b.constructor) {
    log("constructor inequality at " + pathStr);
    return false;
  }
  if (Object.keys(a).length != Object.keys(b).length) {
    log("key count inequality at " + pathStr);
    return false;
  }
  for (var _i = 0, _Object$keys = Object.keys(a); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    path.push(key);
    if (!deepCompare(a[key], b[key], verbose, path, visitedA, visitedB)) return false;
    path.pop();
  }
  return true;
}

},{}],"5IB1O":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var JumpTracker = /*#__PURE__*/(function () {
  function JumpTracker() {
    _classCallCheck(this, JumpTracker);
    _defineProperty(this, "openJumps", {});
    _defineProperty(this, "totalOpenJumps", 0);
  }
  _createClass(JumpTracker, [{
    key: "isResolved",
    get: function get() {
      return this.totalOpenJumps == 0;
    }
  }, {
    key: "openJump",
    value: function openJump(t) {
      var _this$openJumps$t;
      this.openJumps[t] = ((_this$openJumps$t = this.openJumps[t]) !== null && _this$openJumps$t !== void 0 ? _this$openJumps$t : 0) + 1;
      this.totalOpenJumps++;
    }
  }, {
    key: "resolveJump",
    value: function resolveJump(t) {
      var _this$openJumps$t2;
      var result = ((_this$openJumps$t2 = this.openJumps[t]) !== null && _this$openJumps$t2 !== void 0 ? _this$openJumps$t2 : 0) - 1;
      if (result <= 0) delete this.openJumps[t]; else this.openJump[t] = result;
      this.totalOpenJumps--;
    }
  }, {
    key: "forgetAfter",
    value: function forgetAfter(t) {
      for (var k in this.openJumps) {
        var u = parseInt(k);
        if (u <= t) continue;
        this.totalOpenJumps -= this.openJumps[u];
        delete this.openJumps[u];
      }
    }
  }]);
  return JumpTracker;
})();
exports["default"] = JumpTracker;

},{}],"2xPL5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSON = exports.isFontLoaded = exports.getAudio = exports.getImage = exports.getAsset = void 0;
const cache = {};
function getAsset(path, fromPath) {
    if (cache[path])
        return cache[path];
    let asset = fromPath(path);
    cache[path] = asset;
    return asset;
}
exports.getAsset = getAsset;
function assetPath(path, defaultExtension) {
    if (path.indexOf(".") == -1)
        path = path + "." + defaultExtension;
    return "/assets/" + path;
}
function getImage(path) {
    return getAsset(assetPath("images/" + path, "png"), path => {
        let img = new Image();
        img.src = path;
        return img;
    });
}
exports.getImage = getImage;
function getAudio(path) {
    return getAsset(assetPath("audio/" + path, "mp3"), path => new Audio(path));
}
exports.getAudio = getAudio;
function isFontLoaded(font) {
    return document.fonts.check("0px " + font);
}
exports.isFontLoaded = isFontLoaded;
function getJSON(path) {
    path = assetPath(path, "json");
    let req = new XMLHttpRequest();
    return new Promise(resolve => {
        req.onload = () => resolve(JSON.parse(req.response));
        req.open("GET", path);
        req.send();
    });
}
exports.getJSON = getJSON;

},{}],"3tMQ6":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../math/Vector2"));
const Color_1 = __importDefault(require("./Color"));
const util_1 = require("../util");
function coerceFillStyle(style) {
    return (style instanceof Color_1.default) ? style.toString() : style;
}
class Canvas {
    constructor(canvas) {
        this.pixelDensity = 1;
        this._imageSource = {
            x: 0, y: 0,
            w: 0, h: 0
        };
        if (typeof canvas == "string") {
            let _canvas = document.getElementById(canvas);
            if (_canvas instanceof HTMLCanvasElement)
                canvas = _canvas;
            else
                throw new Error("No canvas with id: " + canvas + " found.");
        }
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
    }
    get dimensions() {
        return new Vector2_1.default(this.width, this.height);
    }
    get center() {
        return this.dimensions.half();
    }
    resize(w, h, pixelDensity = 1) {
        this.width = w;
        this.height = h;
        if (this.canvas instanceof HTMLCanvasElement) {
            this.canvas.style.width = w + "px";
            this.canvas.style.height = h + "px";
        }
        this.canvas.width = w * pixelDensity;
        this.canvas.height = h * pixelDensity;
        this.pixelDensity = pixelDensity;
        this.scale(pixelDensity, pixelDensity);
        return this;
    }
    fitWindow(pixelDensity = 1) {
        this.resize(innerWidth, innerHeight, pixelDensity);
        return this;
    }
    background(style) {
        let { canvas, context: c, width, height } = this;
        c.fillStyle = coerceFillStyle(style);
        c.fillRect(0, 0, width, height);
        return this;
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        return this;
    }
    reset() {
        this.context.resetTransform();
        this.scale(this.pixelDensity, this.pixelDensity);
        this.clear();
    }
    vline(a, b) { this.line(a.x, a.y, b.x, b.y); return this; }
    line(x1, y1, x2, y2) {
        let { context: c } = this;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.closePath();
        return this;
    }
    vrect(p, dimensions, center = false) { this.rect(p.x, p.y, dimensions.x, dimensions.y, center); return this; }
    rect(x, y, w, h, centerX = false, centerY = centerX) {
        let { context: c } = this;
        if (centerX)
            x -= w / 2;
        if (centerY)
            y -= h / 2;
        c.beginPath();
        c.rect(x, y, w, h);
        c.closePath();
        return this;
    }
    vcircle(p, r) { this.circle(p.x, p.y, r); return this; }
    circle(x, y, r) {
        let { context: c } = this;
        c.beginPath();
        c.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
        c.closePath();
        return this;
    }
    stroke() {
        this.context.stroke();
        return this;
    }
    fill() {
        this.context.fill();
        return this;
    }
    strokeStyle(style) {
        this.context.strokeStyle = style.toString();
        return this;
    }
    fillStyle(style) {
        this.context.fillStyle = coerceFillStyle(style);
        return this;
    }
    lineWidth(width) {
        this.context.lineWidth = width;
        return this;
    }
    alpha(alpha) {
        this.context.globalAlpha = alpha;
        return this;
    }
    composition(operation) {
        this.context.globalCompositeOperation = operation;
        return this;
    }
    shadow(blur, color = "black") {
        this.context.shadowBlur = blur;
        this.context.shadowColor = color.toString();
        return this;
    }
    smooth(enable) {
        this.context.imageSmoothingEnabled = enable;
        return this;
    }
    filter(options) {
        if (typeof options == "string") {
            this.context.filter = options;
        }
        else if (options == null) {
            this.context.filter = "none";
        }
        else {
            let stringified = Object.entries(options).map(([key, value]) => {
                if (typeof value == "object")
                    value = Object.values(Object).map(x => x.toString()).join(", ");
                let suffix = key == "hueRotate" ? "turn" : "";
                return util_1.camelToDashes(key) + "(" + value + suffix + ")";
            }).join(" ");
            this.context.filter = stringified;
        }
        return this;
    }
    vimage(image, p, dimensions = Vector2_1.default.ZERO, center = false) { this.image(image, p.x, p.y, dimensions.x, dimensions.y, center); return this; }
    image(image, dx = 0, dy = 0, w = 0, h = 0, center = false) {
        if (image.width == 0)
            return this;
        if (center) {
            w = image.width;
            h = image.height;
            dx -= w / 2;
            dy -= h / 2;
        }
        else {
            w = w || image.width;
            h = h || image.height;
        }
        this.context.drawImage(image, dx, dy, w, h);
        return this;
    }
    vpartialImage(image, p, dimensions) { this.partialImage(image, p.x, p.y, dimensions.x, dimensions.y); return this; }
    partialImage(image, x = 0, y = 0, w = 0, h = 0) {
        let { _imageSource: imageSource } = this;
        w = w || imageSource.w;
        h = h || imageSource.h;
        this.context.drawImage(image, imageSource.x, imageSource.y, imageSource.w, imageSource.h, x, y, w, h);
    }
    vimageSource(p, dimensions) { this.imageSource(p.x, p.y, dimensions.x, dimensions.y); return this; }
    imageSource(x, y, w, h) {
        this._imageSource = { x, y, w, h };
        return this;
    }
    vtranslate(p) { this.translate(p.x, p.y); return this; }
    translate(x, y) {
        // this.context.translate( Math.round( x ), Math.round( y ) )
        this.context.translate(x, y);
        return this;
    }
    translateToCenter() {
        this.vtranslate(this.dimensions.half());
        return this;
    }
    rotate(angle) {
        this.context.rotate(angle);
        return this;
    }
    vscale(v) { this.scale(v.x, v.y); return this; }
    scale(x, y) {
        this.context.scale(x, y);
        return this;
    }
    transform(t) {
        let { x, y } = t.position;
        let { x: sx, y: sy } = t.scale;
        let { x: cx, y: cy } = t.center;
        if (t.parent)
            this.transform(t.parent);
        this.translate(x, y)
            .rotate(t.rotation)
            .scale(sx, sy)
            .translate(-cx, -cy);
        return this;
    }
    inverseTransform(t) {
        let { x, y } = t.position;
        let { x: sx, y: sy } = t.scale;
        let { x: cx, y: cy } = t.center;
        this.translate(cx, cy)
            .scale(1 / sx, 1 / sy)
            .rotate(-t.rotation)
            .translate(-x, -y);
        if (t.parent)
            this.inverseTransform(t.parent);
        return this;
    }
    applyMatrix(mat) {
        let { m11, m12, m13, m21, m22, m23 } = mat;
        this.context.transform(m11, m21, m12, m22, m13, m23);
        return this;
    }
    vtext(text, p, width, font = "50px pixel") { this.text(text, p.x, p.y, width, font); return this; }
    text(text, x, y, width, font = "50px pixel") {
        let c = this.context;
        c.font = font;
        c.fillText(text, x, y, width);
        return this;
    }
    push() {
        this.context.save();
        return this;
    }
    pop() {
        this.context.restore();
        return this;
    }
    path(coords) {
        this.context.beginPath();
        for (let i = 0; i < coords.length; i += 2) {
            let x = coords[i];
            let y = coords[i + 1];
            if (i == 0)
                this.context.moveTo(x, y);
            else
                this.context.lineTo(x, y);
        }
        return this;
    }
    vpath(points) {
        this.context.beginPath();
        let i = 0;
        for (let p of points) {
            if (i++ == 0)
                this.context.moveTo(p.x, p.y);
            else
                this.context.lineTo(p.x, p.y);
        }
        return this;
    }
    clip() {
        this.context.clip();
        return this;
    }
    gradient(from, to, colors) {
        let grad = this.context.createLinearGradient(from.x, from.y, to.x, to.y);
        for (let [percent, color] of colors)
            grad.addColorStop(percent, color.toString());
        return grad;
    }
}
exports.default = Canvas;

},{"../math/Vector2":"1YKlZ","./Color":"3Vz5E","../util":"4Wa80"}],"1YKlZ":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector = void 0;
const GMath_1 = __importDefault(require("./GMath"));
function vector(x, y) { return new Vector2(x, y); }
exports.vector = vector;
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    get lengthSquared() { return this.x * this.x + this.y * this.y; }
    get angle() { return Math.atan2(this.y, this.x); }
    unit() { return this.multiply(1 / this.length); }
    leftNormal() { return new Vector2(-this.y, this.x); }
    rightNormal() { return new Vector2(this.y, -this.x); }
    negate() { return new Vector2(-this.x, -this.y); }
    half() { return new Vector2(this.x * 0.5, this.y * 0.5); }
    copy() { return new Vector2(this.x, this.y); }
    floor(scale = 1) { return new Vector2(Math.floor(this.x / scale) * scale, Math.floor(this.y / scale) * scale); }
    add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
    addXY(x, y) { return new Vector2(this.x + x, this.y + y); }
    addX(x) { return new Vector2(this.x + x, this.y); }
    addY(y) { return new Vector2(this.x, this.y + y); }
    subtract(other) { return new Vector2(this.x - other.x, this.y - other.y); }
    dot(other) { return this.x * other.x + this.y * other.y; }
    cross(other) { return this.x * other.y - this.y * other.x; }
    multiply(scale) { return new Vector2(this.x * scale, this.y * scale); }
    stretch(x, y) { return new Vector2(this.x * x, this.y * y); }
    divide(divisor) { return new Vector2(this.x / divisor, this.y / divisor); }
    lerp(other, t) { return this.multiply(1 - t).add(other.multiply(t)); }
    rotated(angle) {
        return this.complexProduct(Vector2.polar(angle, 1));
    }
    isRightOf(other) {
        return this.cross(other) > 0;
    }
    normalOnSide(side) {
        if (side.isRightOf(this))
            return this.rightNormal();
        return this.leftNormal();
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    complexProduct(other) {
        let x = this.x * other.x - this.y * other.y;
        let y = this.x * other.y + this.y * other.x;
        return new Vector2(x, y);
    }
    complexQuotient(other) {
        let lengthSquared = other.lengthSquared;
        let x = this.x * other.x + this.y * other.y;
        let y = this.y * other.x - this.x * other.y;
        return new Vector2(x / lengthSquared, y / lengthSquared);
    }
    complexExponential() {
        let magnitude = Math.exp(this.x);
        return new Vector2(magnitude * Math.cos(this.y), magnitude * Math.sin(this.y));
    }
    projection(other) {
        return other.multiply(other.dot(this) / other.lengthSquared);
    }
    equivalent(other, epsilon = 0.000001) {
        return GMath_1.default.equalivalent(this.x, other.x, epsilon) &&
            GMath_1.default.equalivalent(this.y, other.y, epsilon);
    }
    static polar(angle, length) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    static lissajous(t, xPeriod, yPeriod, xAmplitude = 1, yAmplitude = xAmplitude, xPhase = 0, yPhase = 0) {
        return vector(Math.cos(GMath_1.default.TAU * (t + xPhase) / xPeriod) * xAmplitude, Math.sin(GMath_1.default.TAU * (t + yPhase) / yPeriod) * yAmplitude);
    }
    static random(length) {
        let angle = Math.random() * 2 * Math.PI;
        return Vector2.polar(angle, length);
    }
}
exports.default = Vector2;
Vector2.ZERO = new Vector2(0, 0);
Vector2.ONE = new Vector2(1, 1);
Vector2.RIGHT = new Vector2(1, 0);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.DOWN = new Vector2(0, 1);
Vector2.UP = new Vector2(0, -1);

},{"./GMath":"360F0"}],"360F0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GMath {
    static modulus(n, m) {
        return ((n % m) + m) % m;
    }
    static lerp(a, b, amount) {
        return a * (1 - amount) + b * amount;
    }
    static clamp(x, min, max) {
        if (x < min)
            return min;
        if (x > max)
            return max;
        return x;
    }
    static shortestRotation(from, to) {
        let diff = GMath.modulus(to - from, GMath.TAU);
        if (diff > Math.PI)
            diff -= GMath.TAU;
        return diff;
    }
    static angleLerp(from, to, amount) {
        return from + GMath.shortestRotation(from, to) * amount;
    }
    static sigmoid(x) {
        let exp = Math.exp(x);
        return exp / (exp + 1);
    }
    static soften(x, softness = 1) {
        function f(x) {
            return x > 1 ?
                x - 0.5 :
                x * x / 2;
        }
        return f(Math.abs(x) / softness) * softness * Math.sign(x);
    }
    static equalivalent(a, b, epsilon = 0.000001) {
        return Math.abs(a - b) <= epsilon;
    }
}
exports.default = GMath;
GMath.TAU = Math.PI * 2;
GMath.degreesToRadians = GMath.TAU / 360;

},{}],"3Vz5E":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgba = exports.rgb = void 0;
function rgb(r, g, b) {
    return new Color(r, g, b);
}
exports.rgb = rgb;
function rgba(r, g, b, a = 1) {
    return new Color(r, g, b, a);
}
exports.rgba = rgba;
class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static parse(str) {
        if (str[0] == "#") {
            // Parse Hex
            let parts = str.match(/[0-9a-f]{2,2}/ig).map(x => parseInt(x, 16));
            return new Color(parts[0], parts[1], parts[2], (parts[3] || 255) / 255);
        }
        if (str.indexOf("(") == -1) {
            let color = Color[str];
            if (!color)
                throw new Error("unrecognized color " + str);
            return color;
        }
        let type = str.match(/\w+/)[0];
        let args = str.match(/\d+/g).map(x => parseFloat(x));
        switch (type) {
            case "rgb":
                return new Color(args[0], args[1], args[2]);
            case "rgba":
                return new Color(args[0], args[1], args[2], args[3]);
        }
    }
    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}
exports.default = Color;
Color.aliceblue = Color.parse("#f0f8ff");
Color.antiquewhite = Color.parse("#faebd7");
Color.aqua = Color.parse("#00ffff");
Color.aquamarine = Color.parse("#7fffd4");
Color.azure = Color.parse("#f0ffff");
Color.beige = Color.parse("#f5f5dc");
Color.bisque = Color.parse("#ffe4c4");
Color.black = Color.parse("#000000");
Color.blanchedalmond = Color.parse("#ffebcd");
Color.blue = Color.parse("#0000ff");
Color.blueviolet = Color.parse("#8a2be2");
Color.brown = Color.parse("#a52a2a");
Color.burlywood = Color.parse("#deb887");
Color.cadetblue = Color.parse("#5f9ea0");
Color.chartreuse = Color.parse("#7fff00");
Color.chocolate = Color.parse("#d2691e");
Color.coral = Color.parse("#ff7f50");
Color.cornflowerblue = Color.parse("#6495ed");
Color.cornsilk = Color.parse("#fff8dc");
Color.crimson = Color.parse("#dc143c");
Color.cyan = Color.parse("#00ffff");
Color.darkblue = Color.parse("#00008b");
Color.darkcyan = Color.parse("#008b8b");
Color.darkgoldenrod = Color.parse("#b8860b");
Color.darkgray = Color.parse("#a9a9a9");
Color.darkgreen = Color.parse("#006400");
Color.darkgrey = Color.parse("#a9a9a9");
Color.darkkhaki = Color.parse("#bdb76b");
Color.darkmagenta = Color.parse("#8b008b");
Color.darkolivegreen = Color.parse("#556b2f");
Color.darkorange = Color.parse("#ff8c00");
Color.darkorchid = Color.parse("#9932cc");
Color.darkred = Color.parse("#8b0000");
Color.darksalmon = Color.parse("#e9967a");
Color.darkseagreen = Color.parse("#8fbc8f");
Color.darkslateblue = Color.parse("#483d8b");
Color.darkslategray = Color.parse("#2f4f4f");
Color.darkslategrey = Color.parse("#2f4f4f");
Color.darkturquoise = Color.parse("#00ced1");
Color.darkviolet = Color.parse("#9400d3");
Color.deeppink = Color.parse("#ff1493");
Color.deepskyblue = Color.parse("#00bfff");
Color.dimgray = Color.parse("#696969");
Color.dimgrey = Color.parse("#696969");
Color.dodgerblue = Color.parse("#1e90ff");
Color.firebrick = Color.parse("#b22222");
Color.floralwhite = Color.parse("#fffaf0");
Color.forestgreen = Color.parse("#228b22");
Color.fuchsia = Color.parse("#ff00ff");
Color.gainsboro = Color.parse("#dcdcdc");
Color.ghostwhite = Color.parse("#f8f8ff");
Color.goldenrod = Color.parse("#daa520");
Color.gold = Color.parse("#ffd700");
Color.gray = Color.parse("#808080");
Color.green = Color.parse("#008000");
Color.greenyellow = Color.parse("#adff2f");
Color.grey = Color.parse("#808080");
Color.honeydew = Color.parse("#f0fff0");
Color.hotpink = Color.parse("#ff69b4");
Color.indianred = Color.parse("#cd5c5c");
Color.indigo = Color.parse("#4b0082");
Color.ivory = Color.parse("#fffff0");
Color.khaki = Color.parse("#f0e68c");
Color.lavenderblush = Color.parse("#fff0f5");
Color.lavender = Color.parse("#e6e6fa");
Color.lawngreen = Color.parse("#7cfc00");
Color.lemonchiffon = Color.parse("#fffacd");
Color.lightblue = Color.parse("#add8e6");
Color.lightcoral = Color.parse("#f08080");
Color.lightcyan = Color.parse("#e0ffff");
Color.lightgoldenrodyellow = Color.parse("#fafad2");
Color.lightgray = Color.parse("#d3d3d3");
Color.lightgreen = Color.parse("#90ee90");
Color.lightgrey = Color.parse("#d3d3d3");
Color.lightpink = Color.parse("#ffb6c1");
Color.lightsalmon = Color.parse("#ffa07a");
Color.lightseagreen = Color.parse("#20b2aa");
Color.lightskyblue = Color.parse("#87cefa");
Color.lightslategray = Color.parse("#778899");
Color.lightslategrey = Color.parse("#778899");
Color.lightsteelblue = Color.parse("#b0c4de");
Color.lightyellow = Color.parse("#ffffe0");
Color.lime = Color.parse("#00ff00");
Color.limegreen = Color.parse("#32cd32");
Color.linen = Color.parse("#faf0e6");
Color.magenta = Color.parse("#ff00ff");
Color.maroon = Color.parse("#800000");
Color.mediumaquamarine = Color.parse("#66cdaa");
Color.mediumblue = Color.parse("#0000cd");
Color.mediumorchid = Color.parse("#ba55d3");
Color.mediumpurple = Color.parse("#9370db");
Color.mediumseagreen = Color.parse("#3cb371");
Color.mediumslateblue = Color.parse("#7b68ee");
Color.mediumspringgreen = Color.parse("#00fa9a");
Color.mediumturquoise = Color.parse("#48d1cc");
Color.mediumvioletred = Color.parse("#c71585");
Color.midnightblue = Color.parse("#191970");
Color.mintcream = Color.parse("#f5fffa");
Color.mistyrose = Color.parse("#ffe4e1");
Color.moccasin = Color.parse("#ffe4b5");
Color.navajowhite = Color.parse("#ffdead");
Color.navy = Color.parse("#000080");
Color.oldlace = Color.parse("#fdf5e6");
Color.olive = Color.parse("#808000");
Color.olivedrab = Color.parse("#6b8e23");
Color.orange = Color.parse("#ffa500");
Color.orangered = Color.parse("#ff4500");
Color.orchid = Color.parse("#da70d6");
Color.palegoldenrod = Color.parse("#eee8aa");
Color.palegreen = Color.parse("#98fb98");
Color.paleturquoise = Color.parse("#afeeee");
Color.palevioletred = Color.parse("#db7093");
Color.papayawhip = Color.parse("#ffefd5");
Color.peachpuff = Color.parse("#ffdab9");
Color.peru = Color.parse("#cd853f");
Color.pink = Color.parse("#ffc0cb");
Color.plum = Color.parse("#dda0dd");
Color.powderblue = Color.parse("#b0e0e6");
Color.purple = Color.parse("#800080");
Color.rebeccapurple = Color.parse("#663399");
Color.red = Color.parse("#ff0000");
Color.rosybrown = Color.parse("#bc8f8f");
Color.royalblue = Color.parse("#4169e1");
Color.saddlebrown = Color.parse("#8b4513");
Color.salmon = Color.parse("#fa8072");
Color.sandybrown = Color.parse("#f4a460");
Color.seagreen = Color.parse("#2e8b57");
Color.seashell = Color.parse("#fff5ee");
Color.sienna = Color.parse("#a0522d");
Color.silver = Color.parse("#c0c0c0");
Color.skyblue = Color.parse("#87ceeb");
Color.slateblue = Color.parse("#6a5acd");
Color.slategray = Color.parse("#708090");
Color.slategrey = Color.parse("#708090");
Color.snow = Color.parse("#fffafa");
Color.springgreen = Color.parse("#00ff7f");
Color.steelblue = Color.parse("#4682b4");
Color.tan = Color.parse("#d2b48c");
Color.teal = Color.parse("#008080");
Color.thistle = Color.parse("#d8bfd8");
Color.tomato = Color.parse("#ff6347");
Color.turquoise = Color.parse("#40e0d0");
Color.violet = Color.parse("#ee82ee");
Color.wheat = Color.parse("#f5deb3");
Color.white = Color.parse("#ffffff");
Color.whitesmoke = Color.parse("#f5f5f5");
Color.yellow = Color.parse("#ffff00");
Color.yellowgreen = Color.parse("#9acd32");
Color.transparent = rgba(0, 0, 0, 0);

},{}],"4Wa80":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argmax = exports.fitBox = exports.memoize = exports.camelToDashes = exports.splitCamel = exports.renameField = exports.frozen = void 0;
const BoundingBox_1 = __importDefault(require("./math/geometry/BoundingBox"));
function frozen(obj) {
    return Object.freeze(obj);
}
exports.frozen = frozen;
function renameField(obj, name, newName) {
    if (obj.hasOwnProperty(name)) {
        obj[newName] = obj[name];
        delete obj[name];
    }
}
exports.renameField = renameField;
function splitCamel(str) {
    return str.match(/[A-Za-z_][a-z0-9_]+/g);
}
exports.splitCamel = splitCamel;
function camelToDashes(str) {
    return (splitCamel(str) || []).join("-").toLowerCase();
}
exports.camelToDashes = camelToDashes;
function memoize(func) {
    let cache = {};
    return (arg) => {
        let cached = cache[arg];
        if (cached !== undefined)
            return cached;
        let value = func(arg);
        cache[arg] = value;
        return value;
    };
}
exports.memoize = memoize;
function fitBox(inner, outer) {
    let xRatio = outer.dimensions.x / inner.dimensions.x;
    let yRatio = outer.dimensions.y / inner.dimensions.y;
    let minRatio = Math.min(xRatio, yRatio);
    let dimensions = inner.dimensions.multiply(minRatio);
    let room = outer.dimensions.subtract(dimensions);
    let offset = room.half();
    return new BoundingBox_1.default(dimensions, outer.position.add(offset));
}
exports.fitBox = fitBox;
function argmax(values, func) {
    let best = func(values[0]);
    let bestIndex = 0;
    for (let i = 0; i < values.length; i++) {
        let score = func(values[i]);
        if (score > best) {
            best = score;
            bestIndex = i;
        }
    }
    return { best, bestIndex, bestArg: values[bestIndex] };
}
exports.argmax = argmax;

},{"./math/geometry/BoundingBox":"4zGHx"}],"4zGHx":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../Vector2"));
class BoundingBox {
    constructor(dimensions, position = Vector2_1.default.ZERO) {
        this.dimensions = dimensions;
        this.position = position;
    }
}
exports.default = BoundingBox;

},{"../Vector2":"1YKlZ"}],"63wra":[function(require,module,exports) {
"use strict";
module.exports = JSON.parse("{\"backgroundcolor\":\"#151729\",\"compressionlevel\":-1,\"editorsettings\":{\"chunksize\":{\"height\":32,\"width\":32},\"export\":{\"target\":\".\"}},\"height\":15,\"infinite\":false,\"layers\":[{\"data\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],\"height\":15,\"id\":1,\"name\":\"background\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":23,\"x\":0,\"y\":0},{\"data\":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,2,2,5,2,2,2,2,2,2,2,2,2,2,2,2,6,6,6,6,6,6,6,6,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,5,0,0,0,0,3,0,0,0,0,0,0,0,6,0,0,0,0,0,6,6,0,0,5,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,5,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],\"height\":15,\"id\":2,\"name\":\"center\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":23,\"x\":0,\"y\":0},{\"draworder\":\"topdown\",\"id\":4,\"name\":\"objects\",\"objects\":[{\"height\":0,\"id\":17,\"name\":\"\",\"point\":true,\"properties\":[{\"name\":\"direction\",\"type\":\"int\",\"value\":-1}],\"rotation\":0,\"type\":\"EntityBot\",\"visible\":true,\"width\":0,\"x\":160,\"y\":384},{\"height\":0,\"id\":18,\"name\":\"\",\"point\":true,\"rotation\":0,\"type\":\"EntityDoor\",\"visible\":true,\"width\":0,\"x\":512,\"y\":352},{\"height\":0,\"id\":19,\"name\":\"\",\"point\":true,\"rotation\":0,\"type\":\"EntityPlate\",\"visible\":true,\"width\":0,\"x\":384,\"y\":384},{\"height\":0,\"id\":20,\"name\":\"\",\"point\":true,\"rotation\":0,\"type\":\"EntityDoor\",\"visible\":true,\"width\":0,\"x\":512,\"y\":160}],\"opacity\":1,\"type\":\"objectgroup\",\"visible\":true,\"x\":0,\"y\":0},{\"data\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"height\":15,\"id\":3,\"name\":\"foreground\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":23,\"x\":0,\"y\":0}],\"nextlayerid\":6,\"nextobjectid\":22,\"orientation\":\"orthogonal\",\"renderorder\":\"right-down\",\"tiledversion\":\"1.3.3\",\"tileheight\":32,\"tilesets\":[{\"firstgid\":1,\"source\":\"../tiles/LoopholeTiles.json\"}],\"tilewidth\":32,\"type\":\"map\",\"version\":1.2,\"width\":23}");

},{}],"4bJ0v":[function(require,module,exports) {
"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadTiledMap;
var _EntityBot = require("./entities/EntityBot");
var _EntityDoor = _interopRequireDefault(require("./entities/EntityDoor"));
var _EntityPlate = _interopRequireDefault(require("./entities/EntityPlate"));
var _EntityMover = require("./entities/EntityMover");
var _Tile = _interopRequireDefault(require("./tiles/Tile"));
var _World = _interopRequireWildcard(require("./World"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function loadTiledMap(_level) {
  var level = _level;
  var width = level.width, height = level.height, layers = level.layers;
  var world = _World["default"].create(width, height);
  var _iterator = _createForOfIteratorHelper(layers), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var layer = _step.value;
      if (layer.data) {
        var layerId = _World.TileLayers[layer.name];
        world.layers[layerId] = layer.data.map(function (id) {
          return id - 1;
        });
      } else {
        var _iterator2 = _createForOfIteratorHelper(layer.objects), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var obj = _step2.value;
            var entity = new entityTable[obj.type]();
            if (obj.properties) {
              var _iterator3 = _createForOfIteratorHelper(obj.properties), _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                  var property = _step3.value;
                  if (entity.hasOwnProperty(property.name)) entity[property.name] = property.value;
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
            var x = (obj.x - obj.width * 0.5) / _Tile["default"].width;
            var y = (obj.y - obj.height * 0.5) / _Tile["default"].width;
            world.addEntity(entity, x, y);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  console.log(world);
  return world;
}
var entityTable = {};
var entityTypes = [_EntityBot.EntityBot, _EntityDoor["default"], _EntityPlate["default"], _EntityMover.EntityMover];
for (var _i = 0, _entityTypes = entityTypes; _i < _entityTypes.length; _i++) {
  var entityType = _entityTypes[_i];
  entityTable[entityType.name] = entityType;
}

},{"./entities/EntityBot":"4J1W0","./entities/EntityDoor":"5NjCY","./entities/EntityPlate":"72fLj","./entities/EntityMover":"2eCc5","./tiles/Tile":"1dKAG","./World":"3XL2d"}],"4J1W0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityBot = void 0;
var _Entity2 = _interopRequireDefault(require("./Entity"));
var _Tile = _interopRequireDefault(require("../tiles/Tile"));
var _Game = _interopRequireDefault(require("../Game"));
var _clone = _interopRequireWildcard(require("../common/clone"));
var _assets = require("geode/lib/assets");
var _Interpreter = _interopRequireDefault(require("loophole-lang/lib/interpreter/Interpreter"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EntityBot = /*#__PURE__*/(function (_Entity) {
  _inherits(EntityBot, _Entity);
  var _super = _createSuper(EntityBot);
  function EntityBot() {
    var _this;
    _classCallCheck(this, EntityBot);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "direction", 1);
    _defineProperty(_assertThisInitialized(_this), "timeout", 0);
    _defineProperty(_assertThisInitialized(_this), "timeTravelCountdown", 0);
    _defineProperty(_assertThisInitialized(_this), "timeTravelDelay", 2);
    _defineProperty(_assertThisInitialized(_this), "arivalCountdown", 0);
    _defineProperty(_assertThisInitialized(_this), "age", 0);
    return _this;
  }
  _createClass(EntityBot, [{
    key: "initPlay",
    value: function initPlay() {
      var source = "\n            driveN(n) { \n                for (i = 0; i < n; i = i + 1)\n                    drive(1) \n            }\n            driveN(9)\n            sleep(3)\n            jump(-7)\n            driveN(7)\n        ";
      this.interpreter = new _Interpreter["default"](source);
    }
  }, {
    key: "drive",
    value: function drive(world, dx) {
      if (!this.onGround(world)) return;
      var x = this.x, y = this.y;
      this.direction = Math.sign(dx);
      var dy = world.isEmpty(x + this.direction, y) ? 0 : -1;
      this.move(world, this.direction, dy);
    }
  }, {
    key: "alpha",
    value: function alpha(fracTime) {
      if (this.targetTime == undefined) {
        var arivalCountdown = Math.max(this.arivalCountdown - fracTime, 0);
        return 1 - arivalCountdown / this.timeTravelDelay;
      } else {
        var timeTravelCountdown = Math.max(this.timeTravelCountdown - fracTime, 0);
        return timeTravelCountdown / this.timeTravelDelay;
      }
    }
  }, {
    key: "drawAfterTranslation",
    value: function drawAfterTranslation(world, canvas, fracTime) {
      var sheet = (0, _assets.getImage)("EntityBot");
      var time = world.time + fracTime;
      var frame = time / 3 % 1 >= 0.5 ? 1 : 0;
      canvas.push();
      if (this.direction == -1) canvas.scale(-1, 1).translate(-_Tile["default"].width, 0);
      var a = this.alpha(fracTime);
      canvas.alpha(a);
      canvas.imageSource(0, frame * _Tile["default"].width, _Tile["default"].width, _Tile["default"].width).partialImage(sheet);
      var lightness = (1 - a) * a;
      canvas.alpha(lightness);
      canvas.composition("xor");
      canvas.imageSource(0, frame * _Tile["default"].width, _Tile["default"].width, _Tile["default"].width).partialImage(sheet);
      canvas.pop();
    }
  }, {
    key: "update",
    value: function update(world) {
      _get(_getPrototypeOf(EntityBot.prototype), "update", this).call(this, world);
      this.timeout = Math.max(0, this.timeout - 1);
      this.runScript(world);
      this.move(world, 0, 1);
      this.maybeTimeTravel(world);
      this.timeTravelCountdown--;
      this.arivalCountdown--;
      this.age++;
    }
  }, {
    key: "runScript",
    value: function runScript(world) {
      var _this2 = this;
      if (!this.interpreter || this.timeout > 0) return;
      var natives = {
        onGround: function onGround() {
          return _this2.onGround(world);
        },
        drive: function drive(direction) {
          if (typeof direction != "number") return;
          _this2.drive(world, direction);
          _this2.timeout = 1 + Math.abs(_this2.dy);
        },
        jump: function jump(deltaTime) {
          if (typeof deltaTime != "number") return;
          _this2.targetTime = world.time + deltaTime;
          _this2.timeTravelCountdown = _this2.timeTravelDelay;
          _this2.timeout = _this2.timeTravelDelay + 1;
        },
        sleep: function sleep(time) {
          if (typeof time != "number") return;
          _this2.timeout = time;
        }
      };
      this.interpreter.setNatives(natives);
      for (var i = 0; this.timeout == 0 && i < 10000; i++) {
        this.interpreter.step();
      }
      this.interpreter.nativeBindings = undefined;
    }
  }, {
    key: "maybeTimeTravel",
    value: function maybeTimeTravel(world) {
      var _this3 = this;
      if (this.targetTime == undefined || this.timeTravelCountdown > 1) return;
      var time = this.targetTime;
      this.targetTime = undefined;
      _Game["default"].instance.modifyWorldStateAtTime(time, function (world) {
        var copy = (0, _clone["default"])(_this3);
        copy.arivalCountdown = _this3.timeTravelDelay;
        world.addEntity(copy, copy.x, copy.y);
        var _iterator = _createForOfIteratorHelper(world.entities), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var other = _step.value;
            var logDifferences = false;
            if (other instanceof EntityBot && copy !== other && (0, _clone.deepCompare)(copy, other, logDifferences)) {
              world.entities.pop();
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      world.removeEntity(this);
    }
  }]);
  return EntityBot;
})(_Entity2["default"]);
exports.EntityBot = EntityBot;

},{"./Entity":"36AXO","../tiles/Tile":"1dKAG","../Game":"rxVhC","../common/clone":"4OUyw","geode/lib/assets":"2xPL5","loophole-lang/lib/interpreter/Interpreter":"3GTdl"}],"36AXO":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("../tiles/Tile"));
var _assets = require("geode/lib/assets");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Entity = /*#__PURE__*/(function () {
  function Entity() {
    _classCallCheck(this, Entity);
    _defineProperty(this, "x", 0);
    _defineProperty(this, "y", 0);
    _defineProperty(this, "dx", 0);
    _defineProperty(this, "dy", 0);
    _defineProperty(this, "layer", 0);
  }
  _createClass(Entity, [{
    key: "displacementX",
    value: function displacementX(fracTime) {
      return this.dx * _Tile["default"].width * (fracTime - 1);
    }
  }, {
    key: "displacementY",
    value: function displacementY(fracTime) {
      return this.dy * _Tile["default"].width * (fracTime - 1);
    }
  }, {
    key: "pixelX",
    value: function pixelX(fracTime) {
      return this.x * _Tile["default"].width + this.displacementX(fracTime);
    }
  }, {
    key: "pixelY",
    value: function pixelY(fracTime) {
      return this.y * _Tile["default"].width + this.displacementY(fracTime);
    }
  }, {
    key: "initDraw",
    value: function initDraw() {}
  }, {
    key: "initPlay",
    value: function initPlay() {}
  }, {
    key: "move",
    value: function move(world, dx, dy) {
      var x = this.x, y = this.y;
      var blocked = !world.isEmpty(x + dx, y + dy);
      var blockedX = !world.isEmpty(x + dx, y);
      var blockedY = !world.isEmpty(x, y + dy);
      var blockedXY = blockedX && blockedY;
      if (blocked || blockedXY) dx = 0;
      if (blocked || blockedXY) dy = 0;
      this.dx += dx;
      this.dy += dy;
      this.x += dx;
      this.y += dy;
    }
  }, {
    key: "onGround",
    value: function onGround(world) {
      var x = this.x, y = this.y;
      return !world.isEmpty(x, y + 1);
    }
  }, {
    key: "update",
    value: function update(world) {
      this.dx = 0;
      this.dy = 0;
    }
  }, {
    key: "block",
    value: function block(world) {}
  }, {
    key: "draw",
    value: function draw(world, canvas, fracTime) {
      canvas.push().translate(this.displacementX(fracTime), this.displacementY(fracTime));
      this.drawAfterTranslation(world, canvas, fracTime);
      canvas.pop();
    }
  }, {
    key: "drawAfterTranslation",
    value: function drawAfterTranslation(world, canvas, fracTime) {
      canvas.image(this.image);
    }
  }, {
    key: "image",
    get: function get() {
      return (0, _assets.getImage)(this.constructor.name);
    }
  }]);
  return Entity;
})();
exports["default"] = Entity;

},{"../tiles/Tile":"1dKAG","geode/lib/assets":"2xPL5"}],"1dKAG":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _assets = require("geode/lib/assets");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Tile = /*#__PURE__*/(function () {
  function Tile(name, id) {
    _classCallCheck(this, Tile);
    this.name = name;
    this.id = id;
  }
  _createClass(Tile, [{
    key: "image",
    value: function image(world, x, y, fracTime) {
      return (0, _assets.getImage)(this.name);
    }
  }, {
    key: "draw",
    value: function draw(world, x, y, canvas, fracTime) {
      canvas.image(this.image(world, x, y, fracTime));
    }
  }]);
  return Tile;
})();
exports["default"] = Tile;
_defineProperty(Tile, "width", 32);

},{"geode/lib/assets":"2xPL5"}],"3GTdl":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleUtils_1 = require("../util/consoleUtils");
const Scope_1 = require("./Scope");
const Task_1 = require("./Task");
const _1 = require(".");
const parse_1 = __importDefault(require("../parser/parse"));
class Interpreter {
    constructor(source) {
        this.source = source;
        let ast = parse_1.default(source);
        this.engineScope = new Scope_1.Scope();
        this.task = Task_1.Task.root(ast, this.engineScope);
    }
    setNatives(nativeBindings) {
        this.nativeBindings = nativeBindings;
        for (let name in nativeBindings) {
            if (!this.engineScope.get(name))
                this.engineScope.set(name, new _1.NativeFunction(name));
        }
        return this;
    }
    step() {
        if (this.task)
            this.task = this.task.stepAndGetNextTask(this);
    }
    run(maxSteps = Infinity) {
        let step = 0;
        while (this.task) {
            if (step++ == maxSteps)
                break;
            this.step();
            // console.log(this.location)
        }
        if (this.task)
            consoleUtils_1.warn(`Program reached the maximum number of allowed steps. (${maxSteps})`);
        else
            consoleUtils_1.success(`Program finished in ${step - 1} steps.`);
    }
    get location() {
        var _a, _b;
        return (_b = (_a = this.task) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.location;
    }
}
exports.default = Interpreter;

},{"../util/consoleUtils":"1Tsxp","./Scope":"6uMKK","./Task":"1A5pY",".":"5WzzC","../parser/parse":"16Tia"}],"1Tsxp":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.warn = exports.fail = exports.colors = exports.wrapText = exports.endDivider = exports.startDivider = exports.prettyPrint = void 0;
const ionStringify_1 = __importDefault(require("./ionStringify"));
function prettyPrint(obj, indentation = 4) {
    // console.log( ionStringify( obj, indentation ).replace( /"/g, "" ) )
    console.log(ionStringify_1.default(obj, indentation));
}
exports.prettyPrint = prettyPrint;
function startDivider(label) {
    let line = "\n=============================================";
    let lineChars = line.split("");
    let labelChars = ("[ " + label + " ]").split("");
    lineChars.splice(4, labelChars.length, ...labelChars);
    console.log(lineChars.join(""));
}
exports.startDivider = startDivider;
function endDivider() {
    console.log("=============================================\n");
}
exports.endDivider = endDivider;
function wrapText(str, maxWidth) {
    maxWidth = maxWidth !== null && maxWidth !== void 0 ? maxWidth : Math.floor(Math.sqrt(str.length * 4));
    let regex = new RegExp(`.{1,${maxWidth}}`, "g");
    return str.match(regex);
}
exports.wrapText = wrapText;
exports.colors = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
    brightBlack: "\u001b[30;1m",
    brightRed: "\u001b[31;1m",
    brightGreen: "\u001b[32;1m",
    brightYellow: "\u001b[33;1m",
    brightBlue: "\u001b[34;1m",
    brightMagenta: "\u001b[35;1m",
    brightCyan: "\u001b[36;1m",
    brightWhite: "\u001b[37;1m",
    reset: "\u001b[0m"
};
function fail(text) { console.log(exports.colors.red + text + exports.colors.reset); }
exports.fail = fail;
function warn(text) { console.log(exports.colors.yellow + text + exports.colors.reset); }
exports.warn = warn;
function success(text) { console.log(exports.colors.green + text + exports.colors.reset); }
exports.success = success;

},{"./ionStringify":"3EjxL"}],"3EjxL":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ionStringify(obj, indentation = 4, maxInlineLength = 60) {
    let dentPrime = new Array(indentation + 1).join(" ");
    function isValueType(object) { return typeof object != "object" || object === null; }
    function inlineStringify(obj) {
        let result = [];
        function internal(obj) {
            if (isValueType(obj))
                return result.push(obj === undefined
                    ? "undefined"
                    : JSON.stringify(obj));
            let i = 0;
            if (Array.isArray(obj)) {
                if (obj.length == 0)
                    return result.push("[]");
                result.push("[ ");
                for (let e of obj) {
                    if (i++ > 0)
                        result.push(",");
                    internal(e);
                }
                result.push(" ]");
            }
            else {
                if (Object.keys(obj).length == 0)
                    return result.push("{}");
                result.push("{ ");
                for (let k in obj) {
                    let v = obj[k];
                    if (i++ > 0)
                        result.push(", ");
                    result.push(k + ": ");
                    internal(v);
                }
                result.push(" }");
            }
        }
        internal(obj);
        return result.join("");
    }
    let parts = [];
    function internal(obj, dent) {
        if (isValueType(obj))
            return parts.push(obj === undefined
                ? "undefined"
                : JSON.stringify(obj));
        let str = inlineStringify(obj);
        if (str.length < maxInlineLength)
            return parts.push(str);
        dent = dent + dentPrime;
        if (Array.isArray(obj)) {
            parts.push("[]");
            for (let e of obj) {
                parts.push("\n" + dent);
                internal(e, dent);
            }
        }
        else {
            parts.push("{}");
            for (let k in obj) {
                let v = obj[k];
                parts.push("\n" + dent + k + ": ");
                internal(v, dent);
            }
        }
    }
    internal(obj, "");
    return parts.join("");
}
exports.default = ionStringify;

},{}],"6uMKK":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const _1 = require(".");
class Scope {
    constructor(parent) {
        this.values = new _1.Table();
        this.outerScope = parent;
    }
    lookupScope(name) {
        if (typeof name != "string")
            throw new Error("Variable names must be strings.");
        let scope = this;
        while (scope) {
            if (scope.values.get(name) !== undefined)
                return scope;
            scope = scope.outerScope;
        }
    }
    get(name) {
        var _a;
        let values = (_a = this.lookupScope(name)) === null || _a === void 0 ? void 0 : _a.values;
        if (values)
            return values.get(name);
    }
    set(name, value) {
        var _a;
        let scope = (_a = this.lookupScope(name)) !== null && _a !== void 0 ? _a : this;
        scope.values.set(name, value);
    }
    setLocal(name, value) {
        this.values.set(name, value);
    }
}
exports.Scope = Scope;

},{".":"5WzzC"}],"5WzzC":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.Closure = exports.NativeFunction = void 0;
class NativeFunction {
    constructor(name) {
        this.name = name;
    }
}
exports.NativeFunction = NativeFunction;
class Closure {
    constructor(node, scope) {
        this.node = node;
        this.scope = scope;
    }
}
exports.Closure = Closure;
// We have to use these because we want to safely handle dangerous keys like __proto__ or constructor, 
// and we don't want to use Maps which would complicate cloning and comparison in Loophole.
class Table {
    constructor() {
        this.values = {};
    }
    set(key, value) {
        key = "." + key;
        this.values[key] = value;
    }
    get(key) {
        key = "." + key;
        return this.values[key];
    }
    keys() {
        return this.values.keys.map(key => key.slice(1));
    }
}
exports.Table = Table;

},{}],"1A5pY":[function(require,module,exports) {
"use strict";
var process = require("process");
var __importDefault = this && this.__importDefault || (function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
});
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;
const TaskHandlers_1 = __importDefault(require("./TaskHandlers"));
const consoleUtils_1 = require("../util/consoleUtils");
class Task {
  constructor(node) {
    this.done = false;
    this.step = 0;
    this.node = node;
  }
  static child(node, instigator, returnKey) {
    let result = new Task(node);
    result.instigator = instigator;
    result.scope = instigator === null || instigator === void 0 ? void 0 : instigator.scope;
    result.returnKey = returnKey;
    return result;
  }
  static root(ast, engineScope) {
    let result = new Task(ast);
    result.scope = engineScope;
    return result;
  }
  exit() {
    this.done = true;
  }
  return(value) {
    var _a;
    this.done = true;
    if (this.instigator && this.returnKey !== undefined) {
      this.instigator.returns = (_a = this.instigator.returns) !== null && _a !== void 0 ? _a : {};
      this.instigator.returns[this.returnKey] = value;
    }
  }
  /** Call if jumping within tasks, otherwise call jumpInto.*/
  jump(step) {
    this.step = step - 1;
  }
  /** Call if jumping from a different task, otherwise call jump.*/
  jumpInto(step) {
    this.step = step;
  }
  /** Advances the state of the current task and possibly returns a different task to run.
  * Returned task can be either a sub task or the instigating task.*/
  stepAndGetNextTask(interpreter) {
    let type = this.node.type;
    let handler = TaskHandlers_1.default[type];
    if (!handler) {
      consoleUtils_1.fail("\nError: No step handler for type " + type);
      process.stdout.write(consoleUtils_1.colors.red);
      consoleUtils_1.prettyPrint(this.node);
      console.log(consoleUtils_1.colors.reset);
      throw new Error("No step handler for type " + type);
    }
    let next = handler.step(this, interpreter);
    if (this.done) {
      return this.instigator;
    } else {
      this.step++;
      if (next) return next;
    }
    return this;
  }
}
exports.Task = Task;

},{"process":"7AgFc","./TaskHandlers":"5mnMk","../util/consoleUtils":"1Tsxp"}],"7AgFc":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    // normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    // normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
// empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};

},{}],"5mnMk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("./Task");
const operators_1 = require("../operators");
const Scope_1 = require("./Scope");
const _1 = require(".");
const taskHandlers = {
    Program: task => {
        if (task.step == 0)
            return Task_1.Task.child(task.node.body, task);
        else
            task.exit();
    },
    Block: task => {
        let { step, node } = task;
        let { body } = node;
        if (step == 0)
            task.scope = new Scope_1.Scope(task.scope);
        if (step < body.length)
            return Task_1.Task.child(body[step], task);
        else
            task.exit();
    },
    Literal: task => { task.return(task.node.value); },
    Identifier: task => {
        let result = task.scope.get(task.node.name);
        if (result == undefined)
            throw new Error("Variable is not defined in current scope: " + task.node.name);
        task.return(result);
    },
    FunctionExpression: task => { task.return(new _1.Closure(task.node, task.scope)); },
    FunctionDeclaration: task => {
        let { node, scope } = task;
        let { name, expression } = node;
        scope.set(name.name, new _1.Closure(expression, scope));
        task.exit();
    },
    Assignment: task => {
        let { step, node } = task;
        if (step == 0)
            return Task_1.Task.child(node.right, task, "rval");
        if (step == 1) {
            task.scope.set(node.left.name, task.returns.rval);
            task.exit();
        }
    },
    MemberAssignment: task => {
        let { step, node } = task;
        if (step == 0)
            return Task_1.Task.child(node.left.object, task, "object");
        if (step == 1)
            return Task_1.Task.child(node.left.key, task, "key");
        if (step == 2)
            return Task_1.Task.child(node.right, task, "rval");
        if (step == 3) {
            let { object, key, rval } = task.returns;
            if (object instanceof _1.Table) {
                object.set(key, rval);
            }
            else {
                throw new Error("Tried to write member of non-table object.");
            }
            task.exit();
        }
    },
    MemberExpression: task => {
        let { step, node } = task;
        if (step == 0)
            return Task_1.Task.child(node.object, task, "object");
        if (step == 1)
            return Task_1.Task.child(node.key, task, "key");
        let { object, key } = task.returns;
        if (object instanceof _1.Table) {
            task.return(object.get(key));
        }
        else if (typeof object == "string") {
            task.return(object.charAt(key));
        }
        else {
            throw new Error("Tried to read member of non-table object.");
        }
    },
    ObjectLiteral: task => {
        let { step, node } = task;
        let { pairs } = node;
        if (step < pairs.length * 2) {
            let index = Math.floor(step / 2);
            let isKey = step % 2 == 0;
            let subtask = pairs[index][isKey ? "key" : "value"];
            return Task_1.Task.child(subtask, task, step);
        }
        else {
            let result = new _1.Table();
            for (let i = 0; i < pairs.length; i++) {
                let key = task.returns[i * 2];
                let value = task.returns[i * 2 + 1];
                result.set(key, value);
            }
            task.return(result);
        }
    },
    BinaryOperation: task => {
        let { step, node } = task;
        if (step == 0)
            return Task_1.Task.child(node.left, task, "left");
        if (step == 1)
            return Task_1.Task.child(node.right, task, "right");
        task.return(operators_1.evalOperation(node.operation, task.returns.left, task.returns.right));
    },
    CallExpression: (task, interpreter) => {
        let { step, node } = task;
        switch (step) {
            case 0: return Task_1.Task.child(node.callee, task, "callee");
            case 1: return Task_1.Task.child(node.args, task, "args");
            case 2:
                let args = task.returns.args;
                let callee = task.returns.callee;
                if (callee instanceof _1.Closure) {
                    let fnNode = callee.node;
                    let callCtx = Task_1.Task.child(fnNode.body, task, "result");
                    callCtx.scope = new Scope_1.Scope(callee.scope);
                    // Prepare scope with passed params.
                    for (let i = 0; i < fnNode.args.length; i++)
                        callCtx.scope.setLocal(fnNode.args[i].name, args[i]);
                    return callCtx;
                }
                else if (callee instanceof _1.NativeFunction) {
                    if (!interpreter.nativeBindings)
                        throw new Error("No native bindings provided.");
                    let native = interpreter.nativeBindings[callee.name];
                    if (!native)
                        throw new Error("No native binding for " + callee.name + " provided.");
                    let result = native.apply(null, args);
                    task.return(result);
                    return;
                }
                else {
                    throw new Error(`Callee (${callee}) is not a function.`);
                }
            case 3: task.return(task.returns.result);
        }
    },
    Arguments: task => {
        let { step, node } = task;
        let { values } = node;
        if (step == 0)
            task.returns = [];
        if (step < values.length)
            return Task_1.Task.child(values[step], task, step);
        task.return(task.returns);
    },
    IfStatement: task => {
        let { step, node, returns } = task;
        switch (step) {
            case 0: return Task_1.Task.child(node.test, task, "test");
            case 1:
                if (!returns.test)
                    return task.exit();
                return Task_1.Task.child(node.body, task);
            case 2: task.exit();
        }
    },
    WhileStatement: {
        step: task => {
            let { step, node, returns } = task;
            switch (step) {
                case 0: return Task_1.Task.child(node.test, task, "test");
                case 1:
                    if (!returns.test)
                        return task.exit();
                    return Task_1.Task.child(node.body, task);
                case 2:
                    return task.jump(0);
            }
        },
        continue: task => {
            task.jumpInto(0);
            return task;
        },
        break: task => task.instigator
    },
    ForStatement: {
        step: task => {
            let { step, node, returns } = task;
            let { init, test, update, body } = node;
            switch (step) {
                case 0: return Task_1.Task.child(init, task);
                case 1: return Task_1.Task.child(test, task, "test");
                case 2:
                    if (!returns.test)
                        return task.exit();
                    else
                        return Task_1.Task.child(body, task);
                case 3: return Task_1.Task.child(update, task);
                case 4: return task.jump(1);
            }
        },
        continue: task => {
            task.jumpInto(3);
            return task;
        },
        break: task => task.instigator
    },
    BreakStatement: (task, interpreter) => {
        let ancestorTask = task;
        while (ancestorTask) {
            let type = ancestorTask.node.type;
            let handler = TaskHandlers[type];
            if (handler.break)
                return handler.break(ancestorTask, interpreter);
            ancestorTask = ancestorTask.instigator;
        }
    },
    ContinueStatement: (task, interpreter) => {
        let ancestorTask = task;
        while (ancestorTask) {
            let type = ancestorTask.node.type;
            let handler = TaskHandlers[type];
            if (handler.continue)
                return handler.continue(ancestorTask, interpreter);
            ancestorTask = ancestorTask.instigator;
        }
    },
    ReturnStatement: task => {
        var _a;
        let { step, node } = task;
        if (step == 0)
            return Task_1.Task.child(node.result, task, "result");
        let ancestorTask = task;
        while (ancestorTask) {
            let instigatorType = (_a = ancestorTask.instigator) === null || _a === void 0 ? void 0 : _a.node.type;
            if (instigatorType == "CallExpression") {
                ancestorTask.return(task.returns.result);
                return ancestorTask.instigator;
            }
            ancestorTask = ancestorTask.instigator;
        }
    }
};
const TaskHandlers = {};
for (let key in taskHandlers) {
    let handler = taskHandlers[key];
    if (typeof handler == "object")
        TaskHandlers[key] = handler;
    else
        TaskHandlers[key] = { step: handler };
}
exports.default = TaskHandlers;

},{"./Task":"1A5pY","../operators":"3iCFT","./Scope":"6uMKK",".":"5WzzC"}],"3iCFT":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorPrecedences = exports.evalOperation = void 0;
const operators = [
    ["==", "!="],
    [">", "<", ">=", "<="],
    ["+", "-"],
    ["*", "/", "%"],
    ["**"]
];
exports.default = operators;
function evalOperation(operator, leftOperand, rightOperand) {
    let operation = operations[operator];
    if (!operation)
        throw new Error("Unsupported binary operation: " + operator);
    return operation(leftOperand, rightOperand);
}
exports.evalOperation = evalOperation;
const operations = (() => {
    let result = {};
    for (let op of operators.flat())
        result[op] = new Function("a", "b", `return a ${op} b`);
    return result;
})();
exports.operatorPrecedences = buildPrecedenceTable(operators);
function buildPrecedenceTable(groups) {
    let result = {};
    for (let p = 0; p < groups.length; p++)
        for (let operator of groups[p])
            result[operator] = p;
    return result;
}
function pegjsRule() {
    let ops = operators.flat();
    // Sort the operators from largest to shortest so we don't accidentally match part of an operator.
    ops.sort((a, b) => b.length - a.length);
    return ops.map(op => JSON.stringify(op)).join(" / ");
}
// console.log( pegjsRule() )

},{}],"16Tia":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./pegjs/parser"));
const postprocess_1 = __importDefault(require("./postprocess/postprocess"));
function parse(source) {
    return postprocess_1.default(parser_1.default.parse(source));
}
exports.default = parse;

},{"./pegjs/parser":"5f0u6","./postprocess/postprocess":"6hVki"}],"5f0u6":[function(require,module,exports) {
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
"use strict";
function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
}
function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
    }
}
peg$subclass(peg$SyntaxError, Error);
peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
        literal: function (expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
        },
        "class": function (expectation) {
            var escapedParts = "", i;
            for (i = 0; i < expectation.parts.length; i++) {
                escapedParts += expectation.parts[i] instanceof Array
                    ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                    : classEscape(expectation.parts[i]);
            }
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function (expectation) {
            return "any character";
        },
        end: function (expectation) {
            return "end of input";
        },
        other: function (expectation) {
            return expectation.description;
        }
    };
    function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function classEscape(s) {
        return s
            .replace(/\\/g, '\\\\')
            .replace(/\]/g, '\\]')
            .replace(/\^/g, '\\^')
            .replace(/-/g, '\\-')
            .replace(/\0/g, '\\0')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
    }
    function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected) {
        var descriptions = new Array(expected.length), i, j;
        for (i = 0; i < expected.length; i++) {
            descriptions[i] = describeExpectation(expected[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                    descriptions[j] = descriptions[i];
                    j++;
                }
            }
            descriptions.length = j;
        }
        switch (descriptions.length) {
            case 1:
                return descriptions[0];
            case 2:
                return descriptions[0] + " or " + descriptions[1];
            default:
                return descriptions.slice(0, -1).join(", ")
                    + ", or "
                    + descriptions[descriptions.length - 1];
        }
    }
    function describeFound(found) {
        return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {}, peg$startRuleFunctions = { Program: peg$parseProgram }, peg$startRuleFunction = peg$parseProgram, peg$c0 = function (body) { return node("Program", { body }); }, peg$c1 = peg$otherExpectation("statement"), peg$c2 = peg$otherExpectation("assignment"), peg$c3 = "=", peg$c4 = peg$literalExpectation("=", false), peg$c5 = function (left, right) { return node("Assignment", { left, right }); }, peg$c6 = peg$otherExpectation("member assignment"), peg$c7 = function (left) { return left.type == "MemberExpression"; }, peg$c8 = function (left, right) { return node("MemberAssignment", { left, right }); }, peg$c9 = peg$otherExpectation("function declaration"), peg$c10 = function (name, expression) { return node("FunctionDeclaration", { name, expression }); }, peg$c11 = peg$otherExpectation("if"), peg$c12 = "(", peg$c13 = peg$literalExpectation("(", false), peg$c14 = ")", peg$c15 = peg$literalExpectation(")", false), peg$c16 = function (test, body) { return node("IfStatement", { test, body }); }, peg$c17 = peg$otherExpectation("while"), peg$c18 = function (test, body) { return node("WhileStatement", { test, body }); }, peg$c19 = peg$otherExpectation("for"), peg$c20 = ";", peg$c21 = peg$literalExpectation(";", false), peg$c22 = function (init, test, update, body) { return node("ForStatement", { init, test, update, body }); }, peg$c23 = "{", peg$c24 = peg$literalExpectation("{", false), peg$c25 = "}", peg$c26 = peg$literalExpectation("}", false), peg$c27 = function (body) { return body; }, peg$c28 = peg$otherExpectation("break"), peg$c29 = function () { return node("BreakStatement", {}); }, peg$c30 = peg$otherExpectation("continue"), peg$c31 = function () { return node("ContinueStatement", {}); }, peg$c32 = peg$otherExpectation("return"), peg$c33 = function (result) { return node("ReturnStatement", { result }); }, peg$c34 = function (head, res) { return res; }, peg$c35 = function (head, tail) { return node("Block", { body: [head].concat(tail) }); }, peg$c36 = function () { return node("Block", { body: [] }); }, peg$c37 = peg$otherExpectation("expression"), peg$c38 = peg$otherExpectation("binary operation"), peg$c39 = function (head, operator, operand) { return { operator, operand }; }, peg$c40 = function (head, tail) { return orderOperations({ head, tail }); }, peg$c41 = function (head, operator) { return operator; }, peg$c42 = function (head, tail) { return buildMemberCallExpression({ head, tail }); }, peg$c43 = peg$otherExpectation("call"), peg$c44 = function (args) { return node("CallExpression", { args }); }, peg$c45 = peg$otherExpectation("arguments"), peg$c46 = ",", peg$c47 = peg$literalExpectation(",", false), peg$c48 = function (head, val) { return val; }, peg$c49 = function (head, tail) { return node("Arguments", { values: [head].concat(tail) }); }, peg$c50 = function () { return node("Arguments", { values: [] }); }, peg$c51 = peg$otherExpectation("member"), peg$c52 = "[", peg$c53 = peg$literalExpectation("[", false), peg$c54 = "]", peg$c55 = peg$literalExpectation("]", false), peg$c56 = function (key) { return node("MemberExpression", { key }); }, peg$c57 = ".", peg$c58 = peg$literalExpectation(".", false), peg$c59 = function (expression) { return expression; }, peg$c60 = peg$otherExpectation("function"), peg$c61 = function (args, body) { return node("FunctionExpression", { args: args || [], body }); }, peg$c62 = peg$otherExpectation("parameters"), peg$c63 = function (head, tail) { return [head].concat(tail); }, peg$c64 = peg$otherExpectation("object"), peg$c65 = ":", peg$c66 = peg$literalExpectation(":", false), peg$c67 = function (key, value) { return { key, value }; }, peg$c68 = function (pairs) { return node("ObjectLiteral", { pairs }); }, peg$c69 = peg$otherExpectation("property"), peg$c70 = function (id) { return node("Literal", { value: id.name }); }, peg$c71 = peg$otherExpectation("literal"), peg$c72 = function (value) { return node("Literal", { value }); }, peg$c73 = "E", peg$c74 = peg$literalExpectation("E", false), peg$c75 = "+", peg$c76 = peg$literalExpectation("+", false), peg$c77 = "-", peg$c78 = peg$literalExpectation("-", false), peg$c79 = function (text) { return parseFloat(text); }, peg$c80 = /^[0-9]/, peg$c81 = peg$classExpectation([["0", "9"]], false, false), peg$c82 = function (digits) { return parseInt(digits); }, peg$c83 = function () { return true; }, peg$c84 = function () { return false; }, peg$c85 = function () { return null; }, peg$c86 = "\"", peg$c87 = peg$literalExpectation("\"", false), peg$c88 = function () { return JSON.parse(text()); }, peg$c89 = /^[^\r\n\t\x08\f"]/, peg$c90 = peg$classExpectation(["\r", "\n", "\t", "\b", "\f", "\""], true, false), peg$c91 = "\\", peg$c92 = peg$literalExpectation("\\", false), peg$c93 = /^[rn"]/, peg$c94 = peg$classExpectation(["r", "n", "\""], false, false), peg$c95 = "u", peg$c96 = peg$literalExpectation("u", false), peg$c97 = /^[0-9A-Fa-f]/, peg$c98 = peg$classExpectation([["0", "9"], ["A", "F"], ["a", "f"]], false, false), peg$c99 = peg$otherExpectation("identifier"), peg$c100 = function (text) { return node("Identifier", { name: text }); }, peg$c101 = "==", peg$c102 = peg$literalExpectation("==", false), peg$c103 = "!=", peg$c104 = peg$literalExpectation("!=", false), peg$c105 = ">=", peg$c106 = peg$literalExpectation(">=", false), peg$c107 = "<=", peg$c108 = peg$literalExpectation("<=", false), peg$c109 = "**", peg$c110 = peg$literalExpectation("**", false), peg$c111 = ">", peg$c112 = peg$literalExpectation(">", false), peg$c113 = "<", peg$c114 = peg$literalExpectation("<", false), peg$c115 = "*", peg$c116 = peg$literalExpectation("*", false), peg$c117 = "/", peg$c118 = peg$literalExpectation("/", false), peg$c119 = "%", peg$c120 = peg$literalExpectation("%", false), peg$c121 = "while", peg$c122 = peg$literalExpectation("while", false), peg$c123 = "for", peg$c124 = peg$literalExpectation("for", false), peg$c125 = "if", peg$c126 = peg$literalExpectation("if", false), peg$c127 = "break", peg$c128 = peg$literalExpectation("break", false), peg$c129 = "continue", peg$c130 = peg$literalExpectation("continue", false), peg$c131 = "return", peg$c132 = peg$literalExpectation("return", false), peg$c133 = "true", peg$c134 = peg$literalExpectation("true", false), peg$c135 = "false", peg$c136 = peg$literalExpectation("false", false), peg$c137 = "null", peg$c138 = peg$literalExpectation("null", false), peg$c139 = /^[a-zA-Z]/, peg$c140 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false), peg$c141 = /^[a-zA-Z0-9]/, peg$c142 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"]], false, false), peg$c143 = peg$otherExpectation("newline"), peg$c144 = "\n", peg$c145 = peg$literalExpectation("\n", false), peg$c146 = "\r\n", peg$c147 = peg$literalExpectation("\r\n", false), peg$c148 = "\r", peg$c149 = peg$literalExpectation("\r", false), peg$c150 = peg$otherExpectation("whitespace"), peg$c151 = "\t", peg$c152 = peg$literalExpectation("\t", false), peg$c153 = " ", peg$c154 = peg$literalExpectation(" ", false), peg$c155 = peg$otherExpectation("comment"), peg$c156 = "//", peg$c157 = peg$literalExpectation("//", false), peg$c158 = peg$anyExpectation(), peg$c159 = "/*", peg$c160 = peg$literalExpectation("/*", false), peg$c161 = "*/", peg$c162 = peg$literalExpectation("*/", false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
    if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location);
    }
    function error(message, location) {
        location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location);
    }
    function peg$literalExpectation(text, ignoreCase) {
        return { type: "literal", text: text, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
    }
    function peg$buildSimpleError(message, location) {
        return new peg$SyntaxError(message, null, null, location);
    }
    function peg$buildStructuredError(expected, found, location) {
        return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parseProgram() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseBlock();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseStatement() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseMemberAssignment();
        if (s0 === peg$FAILED) {
            s0 = peg$parseAssignment();
            if (s0 === peg$FAILED) {
                s0 = peg$parseIfStatement();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseWhileStatement();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseForStatement();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseBreakStatement();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseContinueStatement();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseReturnStatement();
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$parseFunctionDeclaration();
                                        if (s0 === peg$FAILED) {
                                            s0 = peg$parseMemberOrCallChain();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c1);
            }
        }
        return s0;
    }
    function peg$parseAssignment() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseIdentifier();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                    s3 = peg$c3;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c4);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseExpression();
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c5(s1, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c2);
            }
        }
        return s0;
    }
    function peg$parseMemberAssignment() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseMemberOrCallChain();
        if (s1 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s2 = peg$c7(s1);
            if (s2) {
                s2 = void 0;
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse__();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 61) {
                        s4 = peg$c3;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c4);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parse__();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseExpression();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c8(s1, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c6);
            }
        }
        return s0;
    }
    function peg$parseFunctionDeclaration() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseIdentifier();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseFunctionExpression();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c10(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c9);
            }
        }
        return s0;
    }
    function peg$parseIfStatement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseIfKeyword();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c12;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseExpression();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse__();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                    s7 = peg$c14;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c15);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse__();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseControlBody();
                                        if (s9 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c16(s5, s9);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c11);
            }
        }
        return s0;
    }
    function peg$parseWhileStatement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseWhileKeyword();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c12;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseExpression();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse__();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                    s7 = peg$c14;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c15);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse__();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseControlBody();
                                        if (s9 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c18(s5, s9);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c17);
            }
        }
        return s0;
    }
    function peg$parseForStatement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseForKeyword();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                    s3 = peg$c12;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c13);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseStatement();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse__();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 59) {
                                    s7 = peg$c20;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c21);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse__();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseExpression();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse__();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 59) {
                                                    s11 = peg$c20;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c21);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse__();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parseStatement();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parse__();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 41) {
                                                                    s15 = peg$c14;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c15);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    s16 = peg$parse__();
                                                                    if (s16 !== peg$FAILED) {
                                                                        s17 = peg$parseControlBody();
                                                                        if (s17 !== peg$FAILED) {
                                                                            peg$savedPos = s0;
                                                                            s1 = peg$c22(s5, s9, s13, s17);
                                                                            s0 = s1;
                                                                        }
                                                                        else {
                                                                            peg$currPos = s0;
                                                                            s0 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s0;
                                                                        s0 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c19);
            }
        }
        return s0;
    }
    function peg$parseControlBody() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$parseStatement();
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c23;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c24);
                }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parse__();
                if (s2 !== peg$FAILED) {
                    s3 = peg$parseBlock();
                    if (s3 !== peg$FAILED) {
                        s4 = peg$parse__();
                        if (s4 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s5 = peg$c25;
                                peg$currPos++;
                            }
                            else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c26);
                                }
                            }
                            if (s5 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c27(s3);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parseBreakStatement() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBreakKeyword();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c29();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c28);
            }
        }
        return s0;
    }
    function peg$parseContinueStatement() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseContinueKeyword();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c31();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        return s0;
    }
    function peg$parseReturnStatement() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseReturnKeyword();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseExpression();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c33(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c32);
            }
        }
        return s0;
    }
    function peg$parseBlock() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parse__();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseStatement();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                s5 = peg$parse__();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parseStatement();
                    if (s6 !== peg$FAILED) {
                        peg$savedPos = s4;
                        s5 = peg$c34(s2, s6);
                        s4 = s5;
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    s5 = peg$parse__();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseStatement();
                        if (s6 !== peg$FAILED) {
                            peg$savedPos = s4;
                            s5 = peg$c34(s2, s6);
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c35(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse__();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c36();
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parseExpression() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseBinaryOperationTree();
        if (s0 === peg$FAILED) {
            s0 = peg$parseTerm();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c37);
            }
        }
        return s0;
    }
    function peg$parseBinaryOperationTree() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseTerm();
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                s5 = peg$parseBinaryOperator();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseTerm();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parse__();
                            if (s8 !== peg$FAILED) {
                                peg$savedPos = s4;
                                s5 = peg$c39(s1, s5, s7);
                                s4 = s5;
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    while (s4 !== peg$FAILED) {
                        s3.push(s4);
                        s4 = peg$currPos;
                        s5 = peg$parseBinaryOperator();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse__();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseTerm();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse__();
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s4;
                                        s5 = peg$c39(s1, s5, s7);
                                        s4 = s5;
                                    }
                                    else {
                                        peg$currPos = s4;
                                        s4 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s4;
                                    s4 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                }
                else {
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c40(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c38);
            }
        }
        return s0;
    }
    function peg$parseTerm() {
        var s0;
        s0 = peg$parseMemberOrCallChain();
        if (s0 === peg$FAILED) {
            s0 = peg$parsePrimaryTerm();
        }
        return s0;
    }
    function peg$parseMemberOrCallChain() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsePrimaryTerm();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseCallOperator();
                if (s5 === peg$FAILED) {
                    s5 = peg$parseMemberOperator();
                }
                if (s5 !== peg$FAILED) {
                    peg$savedPos = s3;
                    s4 = peg$c41(s1, s5);
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseCallOperator();
                        if (s5 === peg$FAILED) {
                            s5 = peg$parseMemberOperator();
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s3;
                            s4 = peg$c41(s1, s5);
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c42(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseCallOperator() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c12;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c13);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseArguments();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c14;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c15);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c44(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c43);
            }
        }
        return s0;
    }
    function peg$parseArguments() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseExpression();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                    s5 = peg$c46;
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c47);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseExpression();
                        if (s7 !== peg$FAILED) {
                            peg$savedPos = s3;
                            s4 = peg$c48(s1, s7);
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s5 = peg$c46;
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c47);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseExpression();
                            if (s7 !== peg$FAILED) {
                                peg$savedPos = s3;
                                s4 = peg$c48(s1, s7);
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c49(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse__();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c50();
            }
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c45);
            }
        }
        return s0;
    }
    function peg$parseMemberOperator() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c52;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c53);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseExpression();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 93) {
                            s5 = peg$c54;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c55);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c56(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
                s1 = peg$c57;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c58);
                }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsePropertyLiteral();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c56(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c51);
            }
        }
        return s0;
    }
    function peg$parsePrimaryTerm() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$parseLiteral();
        if (s0 === peg$FAILED) {
            s0 = peg$parseIdentifier();
            if (s0 === peg$FAILED) {
                s0 = peg$parseFunctionExpression();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseObjectLiteral();
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 40) {
                            s1 = peg$c12;
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c13);
                            }
                        }
                        if (s1 !== peg$FAILED) {
                            s2 = peg$parse__();
                            if (s2 !== peg$FAILED) {
                                s3 = peg$parseExpression();
                                if (s3 !== peg$FAILED) {
                                    s4 = peg$parse__();
                                    if (s4 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 41) {
                                            s5 = peg$c14;
                                            peg$currPos++;
                                        }
                                        else {
                                            s5 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c15);
                                            }
                                        }
                                        if (s5 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c59(s3);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseFunctionExpression() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c12;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c13);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseArgumentsDeclaration();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse__();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                            s5 = peg$c14;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c15);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse__();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 123) {
                                    s7 = peg$c23;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c24);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse__();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseBlock();
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse__();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c25;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c26);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c61(s3, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c60);
            }
        }
        return s0;
    }
    function peg$parseArgumentsDeclaration() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseExpression();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                    s5 = peg$c46;
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c47);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseIdentifier();
                        if (s7 !== peg$FAILED) {
                            peg$savedPos = s3;
                            s4 = peg$c48(s1, s7);
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s5 = peg$c46;
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c47);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseIdentifier();
                            if (s7 !== peg$FAILED) {
                                peg$savedPos = s3;
                                s4 = peg$c48(s1, s7);
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c63(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c62);
            }
        }
        return s0;
    }
    function peg$parseObjectLiteral() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c23;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c24);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
                s5 = peg$parseLiteral();
                if (s5 === peg$FAILED) {
                    s5 = peg$parsePropertyLiteral();
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();
                    if (s6 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 58) {
                            s7 = peg$c65;
                            peg$currPos++;
                        }
                        else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c66);
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parse__();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseExpression();
                                if (s9 !== peg$FAILED) {
                                    peg$savedPos = s3;
                                    s4 = peg$c67(s5, s9);
                                    s3 = s4;
                                }
                                else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$parse__();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseLiteral();
                    if (s5 === peg$FAILED) {
                        s5 = peg$parsePropertyLiteral();
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parse__();
                        if (s6 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 58) {
                                s7 = peg$c65;
                                peg$currPos++;
                            }
                            else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c66);
                                }
                            }
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parse__();
                                if (s8 !== peg$FAILED) {
                                    s9 = peg$parseExpression();
                                    if (s9 !== peg$FAILED) {
                                        peg$savedPos = s3;
                                        s4 = peg$c67(s5, s9);
                                        s3 = s4;
                                    }
                                    else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse__();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                        s4 = peg$c25;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c26);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c68(s2);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c64);
            }
        }
        return s0;
    }
    function peg$parsePropertyLiteral() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseIdentifier();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c70(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c69);
            }
        }
        return s0;
    }
    function peg$parseLiteral() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseFloat();
        if (s1 === peg$FAILED) {
            s1 = peg$parseInteger();
            if (s1 === peg$FAILED) {
                s1 = peg$parseBoolean();
                if (s1 === peg$FAILED) {
                    s1 = peg$parseString();
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c72(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        return s0;
    }
    function peg$parseFloat() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parseInteger();
        if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c57;
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c58);
                }
            }
            if (s4 !== peg$FAILED) {
                s5 = peg$parsePositiveInteger();
                if (s5 !== peg$FAILED) {
                    s6 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 69) {
                        s7 = peg$c73;
                        peg$currPos++;
                    }
                    else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c74);
                        }
                    }
                    if (s7 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 43) {
                            s8 = peg$c75;
                            peg$currPos++;
                        }
                        else {
                            s8 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c76);
                            }
                        }
                        if (s8 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 45) {
                                s8 = peg$c77;
                                peg$currPos++;
                            }
                            else {
                                s8 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c78);
                                }
                            }
                        }
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parseInteger();
                            if (s9 !== peg$FAILED) {
                                s7 = [s7, s8, s9];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    if (s6 === peg$FAILED) {
                        s6 = null;
                    }
                    if (s6 !== peg$FAILED) {
                        s3 = [s3, s4, s5, s6];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c79(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsePositiveInteger() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c80.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c81);
            }
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c80.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c81);
                    }
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c82(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseInteger() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
            s4 = peg$c77;
            peg$currPos++;
        }
        else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c78);
            }
        }
        if (s4 === peg$FAILED) {
            s4 = null;
        }
        if (s4 !== peg$FAILED) {
            if (peg$c80.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c81);
                }
            }
            if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 45) {
                    s4 = peg$c77;
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c78);
                    }
                }
                if (s4 === peg$FAILED) {
                    s4 = null;
                }
                if (s4 !== peg$FAILED) {
                    if (peg$c80.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c81);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c82(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseBoolean() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseTrueKeyword();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c83();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseFalseKeyword();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c84();
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parseNull() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseNullKeyword();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c85();
        }
        s0 = s1;
        return s0;
    }
    function peg$parseString() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c86;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c87);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDoubleStringChar();
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseDoubleStringChar();
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                    s3 = peg$c86;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c87);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c88();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseDoubleStringChar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        if (peg$c89.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c90);
            }
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 92) {
                s1 = peg$c91;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c92);
                }
            }
            if (s1 !== peg$FAILED) {
                if (peg$c93.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c94);
                    }
                }
                if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 117) {
                        s3 = peg$c95;
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c96);
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        s4 = peg$parseHexDigit();
                        if (s4 !== peg$FAILED) {
                            s5 = peg$parseHexDigit();
                            if (s5 !== peg$FAILED) {
                                s6 = peg$parseHexDigit();
                                if (s6 !== peg$FAILED) {
                                    s7 = peg$parseHexDigit();
                                    if (s7 !== peg$FAILED) {
                                        s3 = [s3, s4, s5, s6, s7];
                                        s2 = s3;
                                    }
                                    else {
                                        peg$currPos = s2;
                                        s2 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s2;
                                    s2 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s2;
                                s2 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parseHexDigit() {
        var s0;
        if (peg$c97.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c98);
            }
        }
        return s0;
    }
    function peg$parseIdentifier() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parseIdentifierStart();
        if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseIdentifierPart();
            while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseIdentifierPart();
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c100(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c99);
            }
        }
        return s0;
    }
    function peg$parseBinaryOperator() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c101) {
            s0 = peg$c101;
            peg$currPos += 2;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c102);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c103) {
                s0 = peg$c103;
                peg$currPos += 2;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c104);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c105) {
                    s0 = peg$c105;
                    peg$currPos += 2;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c106);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c107) {
                        s0 = peg$c107;
                        peg$currPos += 2;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c108);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c109) {
                            s0 = peg$c109;
                            peg$currPos += 2;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c110);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 62) {
                                s0 = peg$c111;
                                peg$currPos++;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c112);
                                }
                            }
                            if (s0 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 60) {
                                    s0 = peg$c113;
                                    peg$currPos++;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c114);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 43) {
                                        s0 = peg$c75;
                                        peg$currPos++;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c76);
                                        }
                                    }
                                    if (s0 === peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 45) {
                                            s0 = peg$c77;
                                            peg$currPos++;
                                        }
                                        else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c78);
                                            }
                                        }
                                        if (s0 === peg$FAILED) {
                                            if (input.charCodeAt(peg$currPos) === 42) {
                                                s0 = peg$c115;
                                                peg$currPos++;
                                            }
                                            else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c116);
                                                }
                                            }
                                            if (s0 === peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 47) {
                                                    s0 = peg$c117;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s0 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c118);
                                                    }
                                                }
                                                if (s0 === peg$FAILED) {
                                                    if (input.charCodeAt(peg$currPos) === 37) {
                                                        s0 = peg$c119;
                                                        peg$currPos++;
                                                    }
                                                    else {
                                                        s0 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                            peg$fail(peg$c120);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseWhileKeyword() {
        var s0;
        if (input.substr(peg$currPos, 5) === peg$c121) {
            s0 = peg$c121;
            peg$currPos += 5;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c122);
            }
        }
        return s0;
    }
    function peg$parseForKeyword() {
        var s0;
        if (input.substr(peg$currPos, 3) === peg$c123) {
            s0 = peg$c123;
            peg$currPos += 3;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c124);
            }
        }
        return s0;
    }
    function peg$parseIfKeyword() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c125) {
            s0 = peg$c125;
            peg$currPos += 2;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c126);
            }
        }
        return s0;
    }
    function peg$parseBreakKeyword() {
        var s0;
        if (input.substr(peg$currPos, 5) === peg$c127) {
            s0 = peg$c127;
            peg$currPos += 5;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c128);
            }
        }
        return s0;
    }
    function peg$parseContinueKeyword() {
        var s0;
        if (input.substr(peg$currPos, 8) === peg$c129) {
            s0 = peg$c129;
            peg$currPos += 8;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c130);
            }
        }
        return s0;
    }
    function peg$parseReturnKeyword() {
        var s0;
        if (input.substr(peg$currPos, 6) === peg$c131) {
            s0 = peg$c131;
            peg$currPos += 6;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c132);
            }
        }
        return s0;
    }
    function peg$parseTrueKeyword() {
        var s0;
        if (input.substr(peg$currPos, 4) === peg$c133) {
            s0 = peg$c133;
            peg$currPos += 4;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c134);
            }
        }
        return s0;
    }
    function peg$parseFalseKeyword() {
        var s0;
        if (input.substr(peg$currPos, 5) === peg$c135) {
            s0 = peg$c135;
            peg$currPos += 5;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c136);
            }
        }
        return s0;
    }
    function peg$parseNullKeyword() {
        var s0;
        if (input.substr(peg$currPos, 4) === peg$c137) {
            s0 = peg$c137;
            peg$currPos += 4;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c138);
            }
        }
        return s0;
    }
    function peg$parseKeyword() {
        var s0;
        s0 = peg$parseWhileKeyword();
        if (s0 === peg$FAILED) {
            s0 = peg$parseForKeyword();
            if (s0 === peg$FAILED) {
                s0 = peg$parseIfKeyword();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseBreakKeyword();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseContinueKeyword();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseReturnKeyword();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseTrueKeyword();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseFalseKeyword();
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$parseNullKeyword();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseIdentifierStart() {
        var s0;
        if (peg$c139.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c140);
            }
        }
        return s0;
    }
    function peg$parseIdentifierPart() {
        var s0;
        if (peg$c141.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c142);
            }
        }
        return s0;
    }
    function peg$parseNewline() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c144;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c145);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c146) {
                s0 = peg$c146;
                peg$currPos += 2;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c147);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 13) {
                    s0 = peg$c148;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c149);
                    }
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c143);
            }
        }
        return s0;
    }
    function peg$parseWhiteSpace() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 9) {
            s0 = peg$c151;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c152);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 32) {
                s0 = peg$c153;
                peg$currPos++;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c154);
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c150);
            }
        }
        return s0;
    }
    function peg$parseComment() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseLineComment();
        if (s0 === peg$FAILED) {
            s0 = peg$parseMultiLineComment();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c155);
            }
        }
        return s0;
    }
    function peg$parseLineComment() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c156) {
            s1 = peg$c156;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c157);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseNewline();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
                s4 = void 0;
            }
            else {
                peg$currPos = s4;
                s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c158);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                s5 = peg$parseNewline();
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                    s4 = void 0;
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c158);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMultiLineComment() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c159) {
            s1 = peg$c159;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c160);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 2) === peg$c161) {
                s5 = peg$c161;
                peg$currPos += 2;
            }
            else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c162);
                }
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
                s4 = void 0;
            }
            else {
                peg$currPos = s4;
                s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c158);
                    }
                }
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                if (input.substr(peg$currPos, 2) === peg$c161) {
                    s5 = peg$c161;
                    peg$currPos += 2;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c162);
                    }
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                    s4 = void 0;
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c158);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c161) {
                    s3 = peg$c161;
                    peg$currPos += 2;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c162);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parse__() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
            s1 = peg$parseNewline();
            if (s1 === peg$FAILED) {
                s1 = peg$parseComment();
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseWhiteSpace();
            if (s1 === peg$FAILED) {
                s1 = peg$parseNewline();
                if (s1 === peg$FAILED) {
                    s1 = peg$parseComment();
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c150);
            }
        }
        return s0;
    }
    function peg$parse_() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        s1 = peg$parseWhiteSpace();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseWhiteSpace();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c150);
            }
        }
        return s0;
    }
    function peg$parseEOL() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parseLineComment();
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseNewline();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse__();
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    const { orderOperations, buildMemberCallExpression } = require("./index.js");
    function node(type, properties, addLocation = true) {
        if (addLocation)
            properties.location = location();
        return Object.assign({ type }, properties);
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
module.exports = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
};

},{"./index.js":"7nX8p"}],"7nX8p":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderOperations = exports.buildMemberCallExpression = void 0;
const operators_1 = require("../../operators");
function node(type, properties) { return Object.assign({ type }, properties); }
const typeToProperty = { CallExpression: "callee", MemberExpression: "object" };
function buildMemberCallExpression(chain) {
    return chain.tail.reduce((left, right) => {
        right[typeToProperty[right.type]] = left;
        return right;
    }, chain.head);
}
exports.buildMemberCallExpression = buildMemberCallExpression;
function orderOperations(operationChain) {
    const nodeType = "BinaryOperation";
    let operands = [operationChain.head];
    let operators = [];
    for (let { operand, operator } of operationChain.tail) {
        operands.push(operand);
        operators.push(operator);
    }
    let operandIndex = 0;
    function parse(ops) {
        if (ops.length == 0)
            return operands[operandIndex++];
        let operation, left, right;
        if (ops.length == 1) {
            left = operands[operandIndex++];
            right = operands[operandIndex++];
            operation = ops[0];
        }
        else {
            // Find first of operators with highest precedence.
            operation = ops.reduce((a, b) => operators_1.operatorPrecedences[a] < operators_1.operatorPrecedences[b] ? a : b);
            let index = ops.indexOf(operation);
            left = parse(ops.slice(0, index));
            right = parse(ops.slice(index + 1, ops.length));
        }
        return node(nodeType, { operation, left, right });
    }
    return parse(operators);
}
exports.orderOperations = orderOperations;
function buildPrecedenceTable(groups) {
    let result = {};
    for (let p = 0; p < groups.length; p++)
        for (let operator of groups[p])
            result[operator] = p;
    return result;
}

},{"../../operators":"3iCFT"}],"6hVki":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = require("./traverse");
function postprocess(ast) {
    ast = moveFunctionsToTop(ast);
    ast = computeMissingLocations(ast);
    return ast;
}
exports.default = postprocess;
function moveFunctionsToTop(ast) {
    traverse_1.traverse(ast, {
        leave: node => {
            if (node.type != "Block")
                return;
            let declarations = [];
            let body = [];
            for (let stmt of node.body) {
                if (stmt.type == "FunctionDeclaration")
                    declarations.push(stmt);
                else
                    body.push(stmt);
            }
            node.body = declarations.concat(body);
        }
    });
    return ast;
}
function computeMissingLocations(ast) {
    traverse_1.traverse(ast, {
        leave: node => {
            if (node.location)
                return;
            let locations = [];
            traverse_1.forChildren(node, child => {
                if (child.location) {
                    locations.push(child.location.start);
                    locations.push(child.location.end);
                }
            });
            if (locations.length == 0)
                return; //console.log( "no child locations!!!" )
            let start = locations.reduce((a, b) => b.offset < a.offset ? b : a);
            let end = locations.reduce((a, b) => b.offset > a.offset ? b : a);
            node.location = { start, end };
        }
    });
    return ast;
}

},{"./traverse":"2pJ4z"}],"2pJ4z":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forChildren = exports.traverse = void 0;
const isValueType = value => typeof value != "object" || value == null;
function traverse(object, visitor) {
    let { enter, leave, filter } = visitor;
    function internal(value) {
        if (isValueType(value))
            return;
        if (value.type && filter && !filter(value))
            return;
        if (value.type && enter)
            if (enter(value) == traverse.stop)
                return;
        for (let key in value)
            internal(value[key]);
        if (value.type && leave)
            leave(value) || value;
    }
    internal(object);
}
exports.traverse = traverse;
traverse.stop = Symbol("stop");
function forChildren(object, callback) {
    function internal(value) {
        if (isValueType(value))
            return;
        if (value.type)
            callback(value);
        else
            for (let key in value)
                internal(value[key]);
    }
    for (let key in object)
        internal(object[key]);
}
exports.forChildren = forChildren;

},{}],"5NjCY":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Entity2 = _interopRequireDefault(require("./Entity"));
var _Tile = _interopRequireDefault(require("../tiles/Tile"));
var _assets = require("geode/lib/assets");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EntityDoor = /*#__PURE__*/(function (_Entity) {
  _inherits(EntityDoor, _Entity);
  var _super = _createSuper(EntityDoor);
  function EntityDoor() {
    var _this;
    _classCallCheck(this, EntityDoor);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "extension", 0);
    _defineProperty(_assertThisInitialized(_this), "direction", 0);
    _defineProperty(_assertThisInitialized(_this), "triggerName", "plateActive");
    _defineProperty(_assertThisInitialized(_this), "layer", 1);
    return _this;
  }
  _createClass(EntityDoor, [{
    key: "drawAfterTranslation",
    value: function drawAfterTranslation(world, canvas, fracTime) {
      var sheet = (0, _assets.getImage)("EntityDoor");
      var extension = this.extension, direction = this.direction;
      var w = _Tile["default"].width;
      // Upper segment.
      canvas.imageSource(0, 0, w, w * 2).partialImage(sheet);
      // Moving segment.
      canvas.push();
      canvas.rect(0, 0, w, w * 2);
      var motion = extension + direction * fracTime;
      canvas.clip();
      canvas.translate(0, motion * 20);
      canvas.imageSource(w, 0, w, w * 2).partialImage(sheet);
      canvas.pop();
      // // Light
      if (world.triggers[this.triggerName]) canvas.imageSource(w * 2, w, w, w).partialImage(sheet); else canvas.imageSource(w * 2, 0, w, w).partialImage(sheet);
    }
  }, {
    key: "block",
    value: function block(world) {
      var extension = this.extension, x = this.x, y = this.y;
      world.block(x, y);
      if (extension < 2) world.block(x, y + 1);
    }
  }, {
    key: "update",
    value: function update(world) {
      var active = world.triggers[this.triggerName];
      // let blocked = !world.isEmpty( this.x, this.y + 1 )
      this.extension += this.direction;
      this.direction = 0;
      if (active && this.extension < 2) this.direction = 1;
      if (!active && this.extension > 0) this.direction = -1;
    }
  }]);
  return EntityDoor;
})(_Entity2["default"]);
exports["default"] = EntityDoor;

},{"./Entity":"36AXO","../tiles/Tile":"1dKAG","geode/lib/assets":"2xPL5"}],"72fLj":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("../tiles/Tile"));
var _Entity2 = _interopRequireDefault(require("./Entity"));
var _EntityBot = require("./EntityBot");
var _assets = require("geode/lib/assets");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EntityPlate = /*#__PURE__*/(function (_Entity) {
  _inherits(EntityPlate, _Entity);
  var _super = _createSuper(EntityPlate);
  function EntityPlate() {
    var _this;
    _classCallCheck(this, EntityPlate);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "active", false);
    _defineProperty(_assertThisInitialized(_this), "layer", 1);
    _defineProperty(_assertThisInitialized(_this), "triggerName", "plateActive");
    return _this;
  }
  _createClass(EntityPlate, [{
    key: "setActive",
    value: function setActive(world, value) {
      this.active = value;
      world.triggers[this.triggerName] = value;
    }
  }, {
    key: "update",
    value: function update(world) {
      var active = false;
      var _iterator = _createForOfIteratorHelper(world.entities), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var entity = _step.value;
          if (entity.x == this.x && entity.y == this.y && entity instanceof _EntityBot.EntityBot) {
            active = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.setActive(world, active);
    }
  }, {
    key: "drawAfterTranslation",
    value: function drawAfterTranslation(world, canvas, fracTime) {
      var sheet = (0, _assets.getImage)("EntityPlate");
      var frame = this.active ? 1 : 0;
      canvas.imageSource(0, frame * _Tile["default"].width, _Tile["default"].width, _Tile["default"].width).partialImage(sheet);
    }
  }]);
  return EntityPlate;
})(_Entity2["default"]);
exports["default"] = EntityPlate;

},{"../tiles/Tile":"1dKAG","./Entity":"36AXO","./EntityBot":"4J1W0","geode/lib/assets":"2xPL5"}],"2eCc5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMover = void 0;
var _Entity2 = _interopRequireDefault(require("./Entity"));
var _assets = require("geode/lib/assets");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EntityMover = /*#__PURE__*/(function (_Entity) {
  _inherits(EntityMover, _Entity);
  var _super = _createSuper(EntityMover);
  function EntityMover() {
    var _this;
    _classCallCheck(this, EntityMover);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "direction", 1);
    return _this;
  }
  _createClass(EntityMover, [{
    key: "update",
    value: function update(world) {
      _get(_getPrototypeOf(EntityMover.prototype), "update", this).call(this, world);
      var x = this.x, y = this.y;
      var time = world.time;
      if (time % 1 != 0) return;
      if (!world.isEmpty(x, y + this.direction)) this.direction *= -1;
      this.move(world, 0, this.direction);
    }
  }, {
    key: "block",
    value: function block(world) {
      var x = this.x, y = this.y;
      world.block(x, y);
    }
  }, {
    key: "image",
    get: function get() {
      return (0, _assets.getImage)(this.direction == 1 ? "TileDown" : "TileUp");
    }
  }]);
  return EntityMover;
})(_Entity2["default"]);
exports.EntityMover = EntityMover;

},{"./Entity":"36AXO","geode/lib/assets":"2xPL5"}],"3XL2d":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TileLayers = void 0;
var _Tile = _interopRequireDefault(require("./tiles/Tile"));
var _Starfield = _interopRequireDefault(require("./Starfield"));
var _Matrix = _interopRequireDefault(require("geode/lib/math/Matrix3"));
var _LoopholeTiles = _interopRequireDefault(require("./tiles/LoopholeTiles"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TileLayers;
exports.TileLayers = TileLayers;
(function (TileLayers) {
  TileLayers[TileLayers["background"] = 0] = "background";
  TileLayers[TileLayers["center"] = 1] = "center";
  TileLayers[TileLayers["foreground"] = 2] = "foreground";
})(TileLayers || (exports.TileLayers = TileLayers = {}));
var World = /*#__PURE__*/(function () {
  function World() {
    _classCallCheck(this, World);
    _defineProperty(this, "time", 0);
  }
  _createClass(World, [{
    key: "initDraw",
    value: function initDraw() {
      this.stars = _Starfield["default"].create();
      this.triggers = {};
      var _iterator = _createForOfIteratorHelper(this.entities), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var entity = _step.value;
          entity.initDraw();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "initPlay",
    value: function initPlay() {
      var width = this.width, height = this.height;
      this.blocked = new Array(width * height);
      for (var i = 0; i < this.blocked.length; i++) {
        this.blocked[i] = false;
      }
      var _iterator2 = _createForOfIteratorHelper(this.entities), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var entity = _step2.value;
          entity.initPlay();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "pixelWidth",
    get: function get() {
      return this.width * _Tile["default"].width;
    }
  }, {
    key: "pixelHeight",
    get: function get() {
      return this.height * _Tile["default"].width;
    }
  }, {
    key: "worldToScreenMatrix",
    value: function worldToScreenMatrix(canvas) {
      var zoom = 2;
      var width = canvas.width, height = canvas.height;
      var pixelWidth = this.pixelWidth, pixelHeight = this.pixelHeight;
      return _Matrix["default"].transformation(-pixelWidth / 2, -pixelHeight / 2, 0, zoom, zoom, width / 2, height / 2);
    }
  }, {
    key: "screenSpaceToBlockSpace",
    value: function screenSpaceToBlockSpace(canvas, v) {
      return this.worldToScreenMatrix(canvas).inverse().multiplyVec2(v).divide(_Tile["default"].width);
    }
  }, {
    key: "blockSpaceToScreenSpace",
    value: function blockSpaceToScreenSpace(canvas, v) {
      return this.worldToScreenMatrix(canvas).multiplyVec2(v.multiply(_Tile["default"].width));
    }
  }, {
    key: "inBounds",
    value: function inBounds(x, y) {
      return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
  }, {
    key: "index",
    value: function index(x, y) {
      return y * this.width + x;
    }
  }, {
    key: "getTile",
    value: function getTile(x, y) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TileLayers.center;
      if (!this.inBounds(x, y)) return undefined;
      var tiles = this.layers[layer];
      var id = tiles[this.index(x, y)];
      if (id == undefined) return undefined;
      return _LoopholeTiles["default"][id];
    }
  }, {
    key: "setTile",
    value: function setTile(x, y, tile) {
      var layer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TileLayers.center;
      var tiles = this.layers[layer];
      if (this.inBounds(x, y)) {
        tiles[this.index(x, y)] = tile.id;
      }
    }
  }, {
    key: "remove",
    value: function remove(x, y) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TileLayers.center;
      var tiles = this.layers[layer];
      tiles[this.index(x, y)] = undefined;
    }
  }, {
    key: "isAir",
    value: function isAir(x, y) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TileLayers.center;
      return this.getTile(x, y, layer) == undefined;
    }
  }, {
    key: "block",
    value: function block(x, y) {
      this.blocked[this.index(x, y)] = true;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(x, y) {
      return this.isAir(x, y) && !this.blocked[this.index(x, y)];
    }
  }, {
    key: "addEntity",
    value: function addEntity(entity, x, y) {
      this.entities.push(entity);
      entity.x = x;
      entity.y = y;
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);
      if (index > -1) {
        this.entities[index] = this.entities[this.entities.length - 1];
        this.entities.pop();
      }
    }
  }, {
    key: "draw",
    value: function draw(canvas, fracTime) {
      canvas.background("#151729");
      this.stars.draw(canvas, this.time + fracTime);
      canvas.push().applyMatrix(this.worldToScreenMatrix(canvas));
      this.drawTiles(canvas, fracTime, TileLayers.background);
      this.drawTiles(canvas, fracTime, TileLayers.center);
      this.drawEntities(canvas, fracTime);
      this.drawTiles(canvas, fracTime, TileLayers.foreground);
      canvas.pop();
    }
  }, {
    key: "drawTiles",
    value: function drawTiles(canvas, fracTime) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TileLayers.center;
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var tile = this.getTile(x, y, layer);
          if (tile) {
            canvas.push().translate(x * _Tile["default"].width, y * _Tile["default"].width);
            tile.draw(this, x, y, canvas, fracTime);
            canvas.pop();
          }
        }
      }
    }
  }, {
    key: "drawEntities",
    value: function drawEntities(canvas, fracTime) {
      var entityRenderList = this.entities.slice().sort(function (a, b) {
        return a.layer - b.layer;
      });
      var _iterator3 = _createForOfIteratorHelper(entityRenderList), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var entity = _step3.value;
          canvas.push().translate(entity.x * _Tile["default"].width, entity.y * _Tile["default"].width);
          entity.draw(this, canvas, fracTime);
          canvas.pop();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.time++;
      var currentEntities = this.entities.slice();
      var _iterator4 = _createForOfIteratorHelper(currentEntities), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var entity = _step4.value;
          entity.block(this);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var _iterator5 = _createForOfIteratorHelper(currentEntities), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var _entity = _step5.value;
          _entity.update(this);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      for (var i = 0; i < this.blocked.length; i++) {
        this.blocked[i] = false;
      }
    }
  }], [{
    key: "create",
    value: function create(width, height) {
      var result = new World();
      result.width = width;
      result.height = height;
      result.layers = [new Array(width * height), new Array(width * height), new Array(width * height)];
      result.entities = [];
      return result;
    }
  }]);
  return World;
})();
exports["default"] = World;

},{"./tiles/Tile":"1dKAG","./Starfield":"3NvUh","geode/lib/math/Matrix3":"5yaLN","./tiles/LoopholeTiles":"7gyGP"}],"3NvUh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _common = require("./common/common");
var _clone = require("./common/clone");
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Star = function Star(x, y, z, phase) {
  _classCallCheck(this, Star);
  this.x = x;
  this.y = y;
  this.z = z;
  this.phase = phase;
};
var Starfield = /*#__PURE__*/(function () {
  function Starfield() {
    _classCallCheck(this, Starfield);
  }
  _createClass(Starfield, [{
    key: "draw",
    value: function draw(canvas, time) {
      var width = canvas.width, height = canvas.height;
      var _iterator = _createForOfIteratorHelper(this.stars), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var star = _step.value;
          var x = star.x, y = star.y, z = star.z, phase = star.phase;
          x *= width;
          y *= height;
          x = (0, _common.modulus)(x - time / (1 + z) * 100, width);
          var w = 12 / (z + 1);
          var alpha = (Math.cos(time + phase * Math.PI * 2) + 1) / 2;
          // let angle = ( time + phase ) * Math.PI * 2 * 0.25
          // push()
          // .translate( x, y )
          // .rotate( angle )
          // .fillStyle( "rgba(255, 255, 255, " + alpha + ")" )
          // .rect( -w, -w, w * 2, w * 2 )
          // .fill()
          // .pop()
          x = (x | 0) + .5;
          y = (y | 0) + .5;
          w = (w | 0) + .5;
          canvas.fillStyle("rgba(255, 255, 255, " + alpha + ")").rect(x - w, y - w, w * 2, w * 2).fill();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }], [{
    key: "create",
    value: function create() {
      var result = new Starfield();
      (0, _clone.markStatic)(result);
      result.stars = [];
      for (var i = 0; i < 1000; i++) {
        // The cross section of the viewing frustum grows quadratically with z.
        // So z should be quadratically distributed.
        // Taking the cuberoot of a uniform random number yeilds a quadratic distribution.
        // https://en.wikipedia.org/wiki/Inverse_transform_sampling
        var z = Math.pow(Math.random(), 1 / 3) * 16;
        result.stars.push(new Star(Math.random(), Math.random(), z, Math.random()));
      }
      return result;
    }
  }]);
  return Starfield;
})();
exports["default"] = Starfield;

},{"./common/common":"7i3rc","./common/clone":"4OUyw"}],"7i3rc":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modulus = modulus;
exports.forRect = forRect;
exports.forRectInclusive = forRectInclusive;
exports.swap = swap;
exports.shuffle = shuffle;
exports.randomNumberGenerator = randomNumberGenerator;
function modulus(n, m) {
  return (n % m + m) % m;
}
function forRect(x0, y0, x1, y1, action) {
  for (var y = y0; y < y1; y++) {
    for (var x = x0; x < x1; x++) {
      action(x, y);
    }
  }
}
function forRectInclusive(x0, y0, x1, y1, action) {
  forRect(x0, y0, x1 + 1, y1 + 1, action);
}
function swap(array) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var j = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}
function shuffle(array, random) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = random() * i | 0;
    swap(array, i, j);
  }
}
function randomNumberGenerator() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MAX_SAFE_INTEGER;
  var x = seed;
  var coef = 1 / (1 << 31);
  return function random() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    var r = Math.abs(x * coef);
    return min + r * (max - min);
  };
}

},{}],"5yaLN":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("./Vector2"));
const epsilon = 0.000001;
class Matrix3 {
    constructor(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m21 = 0;
        this.m22 = 0;
        this.m23 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 0;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
    }
    multiply(other) { return multiplyMatrix(this, other, Matrix3); }
    inverse() { return inverse(this, Matrix3); }
    determinant() { return determinant(this, Matrix3); }
    equals(other) { return equals(this, other, epsilon, Matrix3); }
    multiplyVec2(v, z = 1) {
        let { m11, m12, m13, m21, m22, m23, } = this;
        let { x, y } = v;
        return new Vector2_1.default(m11 * x + m12 * y + m13 * z, m21 * x + m22 * y + m23 * z);
    }
    static translation(x = 0, y = 0) {
        return new Matrix3(1, 0, x, 0, 1, y, 0, 0, 1);
    }
    static rotation(angle = 0) {
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        return new Matrix3(c, -s, 0, s, c, 0, 0, 0, 1);
    }
    static scale(x = 1, y = 1) {
        return new Matrix3(x, 0, 0, 0, y, 0, 0, 0, 1);
    }
    // https://en.wikipedia.org/wiki/Transformation_matrix#Affine_transformations
    static transformation(preTranslationX, preTranslationY, angle, scaleX, scaleY, translationX, translationY) {
        let px = preTranslationX, py = preTranslationY;
        let a = angle;
        let sx = scaleX;
        let sy = scaleY;
        let x = translationX;
        let y = translationY;
        let s = Math.sin(a), c = Math.cos(a);
        return new Matrix3(sx * c, -sy * s, px * sx * c - py * sy * s + x, sx * s, sy * c, px * sx * s + py * sy * c + y, 0, 0, 1);
    }
    print() {
        let { m11, m12, m13, m21, m22, m23, m31, m32, m33, } = this;
        let rows = [
            [m11, m12, m13],
            [m21, m22, m23],
            [m31, m32, m33],
        ];
        let columnWidths = [
            [m11, m21, m31],
            [m12, m22, m32],
            [m13, m23, m33],
        ].map(column => column.map(e => e.toString().length).reduce((a, b) => Math.max(a, b)));
        let pad = (n, column) => n.toString().padStart(columnWidths[column]);
        let result = rows.map(row => "| " + row.map(pad).join("  ") + " |").join("\n");
        console.log(result);
    }
}
exports.default = Matrix3;
Matrix3.identity = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
// Code generation:
function* rangeGen(n) { for (let i = 1; i <= n; i++)
    yield i; }
function range(n) { return Array.from(rangeGen(n)); }
function determinant2(a11, a12, a21, a22) {
    return "( " + a11 + " * " + a22 + " - " + a12 + " * " + a21 + " )";
}
function determinant3(args) {
    let [a11, a12, a13, a21, a22, a23, a31, a32, a33] = args;
    return `(${a11} * ${determinant2(a22, a23, a32, a33)} -
    ${a12} * ${determinant2(a21, a23, a31, a33)} +
    ${a13} * ${determinant2(a21, a22, a31, a32)})`;
}
function destructureMatrix(name) {
    let destructureArgs = range(3).map(j => range(3).map(i => "m" + j + i + ": " + name + j + i).join(", ")).join(",\n    ");
    return "let {\n    " + destructureArgs + "\n} = " + name;
}
const determinant = (() => {
    let args = range(3).map((j) => range(3).map((i) => "A.m" + j + i)).flat();
    let body = "return " + determinant3(args);
    return new Function("A", "Matrix3", body);
})();
const multiplyMatrix = (() => {
    let destructureA = destructureMatrix("A");
    let destructureB = destructureMatrix("B");
    let matrixArgs = range(3).map(j => range(3).map(i => range(3).map(k => "A" + j + k + " * B" + k + i).join(" + ")).join(", ")).join(",\n    ");
    let body = [
        destructureA,
        destructureB,
        `return new Matrix3(\n    ${matrixArgs}\n)`
    ].join("\n");
    return new Function("A", "B", "Matrix3", body);
})();
// https://en.wikipedia.org/wiki/Cramer%27s_rule#Finding_inverse_matrix
// https://en.wikipedia.org/wiki/Adjugate_matrix#3_%C3%97_3_generic_matrix
const inverse = (() => {
    let destructure = destructureMatrix("A");
    let detArgs = range(3).map((j) => range(3).map((i) => "A" + j + i)).flat();
    let coefStatemnent = "let c = 1 / " + determinant3(detArgs);
    let det2 = (a, b, c, d) => determinant2("A" + a, "A" + b, "A" + c, "A" + d);
    // Adjugate matrix:
    let b11 = det2(22, 23, 32, 33), b12 = "-" + det2(12, 13, 32, 33), b13 = det2(12, 13, 22, 23);
    let b21 = "-" + det2(21, 23, 31, 33), b22 = det2(11, 13, 31, 33), b23 = "-" + det2(11, 13, 21, 23);
    let b31 = det2(21, 22, 31, 32), b32 = "-" + det2(11, 12, 31, 32), b33 = det2(11, 12, 21, 22);
    let matrixArgs = [
        [b11, b12, b13],
        [b21, b22, b23],
        [b31, b32, b33]
    ].map(row => row.map(e => e + " * c").join(", ")).join(",\n    ");
    let body = [
        destructure,
        coefStatemnent,
        `\nreturn new Matrix3(${matrixArgs})`
    ].join("\n");
    return new Function("A", "Matrix3", body);
})();
const equals = (() => {
    let destructureA = destructureMatrix("A");
    let destructureB = destructureMatrix("B");
    let comparisons = range(3).map(j => range(3).map(i => {
        let index = j.toString() + i.toString();
        return `if (Math.abs(A${index} - B${index}) > epsilon) return false`;
    })).flat();
    let body = [
        destructureA,
        destructureB,
        ...comparisons,
        "return true"
    ].join("\n");
    return new Function("A", "B", "epsilon", "Matrix3", body);
})();

},{"./Vector2":"1YKlZ"}],"7gyGP":[function(require,module,exports) {
"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var loopHoleTileSet = _interopRequireWildcard(require("./LoopholeTiles.json"));
var _loadTileset = _interopRequireDefault(require("./loadTileset"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
var LoopholeTiles = (0, _loadTileset["default"])(loopHoleTileSet);
var _default = LoopholeTiles;
exports["default"] = _default;

},{"./LoopholeTiles.json":"9rBAe","./loadTileset":"5ecoA"}],"9rBAe":[function(require,module,exports) {
"use strict";
module.exports = JSON.parse("{\"columns\":0,\"grid\":{\"height\":1,\"orientation\":\"orthogonal\",\"width\":1},\"margin\":0,\"name\":\"LoopholeTiles\",\"spacing\":0,\"tilecount\":8,\"tiledversion\":\"1.3.3\",\"tileheight\":32,\"tiles\":[{\"id\":0,\"image\":\"../../www/assets/images/TileBackPanel.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":1,\"image\":\"../../www/assets/images/TileCatwalk.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":2,\"image\":\"../../www/assets/images/TileCrate.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":3,\"image\":\"../../www/assets/images/TileGlassPanel.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":4,\"image\":\"../../www/assets/images/TileLadder.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":5,\"image\":\"../../www/assets/images/TilePanel.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":6,\"image\":\"../../www/assets/images/TileRail.png\",\"imageheight\":32,\"imagewidth\":32},{\"id\":7,\"image\":\"../../www/assets/images/TileThruster.png\",\"imageheight\":32,\"imagewidth\":64}],\"tilewidth\":64,\"type\":\"tileset\",\"version\":1.2}");

},{}],"5ecoA":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadTileset;
var _path = _interopRequireDefault(require("path"));
var _assets = require("geode/lib/assets");
var _Tile = _interopRequireDefault(require("./Tile"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function loadTileset(tileSet) {
  var result = [];
  var _iterator = _createForOfIteratorHelper(tileSet.tiles), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var tile = _step.value;
      var imageFile = _path["default"].basename(tile.image);
      var name = imageFile.split(".")[0];
      var image = (0, _assets.getImage)(imageFile);
      result.push(new _Tile["default"](name, result.length));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}

},{"path":"7rNOE","geode/lib/assets":"2xPL5","./Tile":"1dKAG"}],"7rNOE":[function(require,module,exports) {
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
// 
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var process = require("process");
function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}
// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i); else if (code === 47) /*/*/
    break; else code = 47;
    if (code === 47) /*/*/
    {
      if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || /*.*/
        res.charCodeAt(res.length - 2) !== 46) /*.*/
        {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..'; else res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i); else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && /*.*/
    dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i]; else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);
      // Skip empty entries
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath; else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var isAbsolute = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);
    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';
    if (isAbsolute) return '/' + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined) joined = arg; else joined += '/' + arg;
      }
    }
    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return '';
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return '';
    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47) /*/*/
      break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47) /*/*/
      break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) /*/*/
          {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) /*/*/
          {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break; else if (fromCode === 47) /*/*/
      lastCommonSep = i;
    }
    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) /*/*/
      {
        if (out.length === 0) out += '..'; else out += '/..';
      }
    }
    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep); else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47) /*/*/
      ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd; else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return '';
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end); else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1); else if (isAbsolute) ret.dir = '/';
    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.posix = posix;
module.exports = posix;

},{"process":"7AgFc"}],"5sIwd":[function(require,module,exports) {
"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Canvas = _interopRequireDefault(require("geode/lib/graphics/Canvas"));
var _Input = _interopRequireDefault(require("geode/lib/Input"));
var _Tile = _interopRequireDefault(require("./tiles/Tile"));
var _Vector = _interopRequireDefault(require("geode/lib/math/Vector2"));
var _GMath = _interopRequireDefault(require("geode/lib/math/GMath"));
var ageBeforeBeauty = _interopRequireWildcard(require("./levels/AgeBeforeBeauty.json"));
var _loadTiledMap = _interopRequireDefault(require("./loadTiledMap"));
var _LoopholeTiles = _interopRequireDefault(require("./tiles/LoopholeTiles"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Editor = /*#__PURE__*/(function () {
  function Editor() {
    var _this = this;
    _classCallCheck(this, Editor);
    _defineProperty(this, "stepsPerSecond", 4);
    _defineProperty(this, "time", 0);
    _defineProperty(this, "selection", 0);
    _defineProperty(this, "selectionSmooth", 0);
    _defineProperty(this, "selectionFadeCooldown", 0);
    _defineProperty(this, "selectionWheelAlpha", 0);
    this.canvas = new _Canvas["default"]("canvas");
    this.canvas.canvas.addEventListener("contextmenu", function (e) {
      return e.preventDefault();
    });
    this.world = (0, _loadTiledMap["default"])(ageBeforeBeauty);
    this.world.initDraw();
    window.addEventListener("wheel", function (e) {
      _this.selectionFadeCooldown = 1;
      _this.selection -= Math.sign(e.deltaY);
    });
  }
  _createClass(Editor, [{
    key: "targetLayer",
    get: function get() {
      return _Input["default"].buttons.Shift ? 2 : _Input["default"].buttons.Control ? 0 : 1;
    }
  }, {
    key: "update",
    value: function update(dt) {
      var _world$getTile$id, _world$getTile;
      if (!this.world) return;
      var world = this.world, canvas = this.canvas;
      this.time += dt * this.stepsPerSecond;
      world.time = Math.floor(this.time);
      this.selectionFadeCooldown -= dt;
      if (this.selectionFadeCooldown < 0) this.selectionWheelAlpha = _GMath["default"].lerp(this.selectionWheelAlpha, 0, 0.05); else this.selectionWheelAlpha = _GMath["default"].lerp(this.selectionWheelAlpha, 1, 0.1);
      this.selectionSmooth = _GMath["default"].lerp(this.selectionSmooth, this.selection, 0.1);
      var blockPos = this.blockPos(_Input["default"].mouseScreenPosition(canvas));
      var x = blockPos.x, y = blockPos.y;
      if (_Input["default"].buttons.Mouse0) world.setTile(x, y, this.selectedTile, this.targetLayer);
      if (_Input["default"].buttons.Mouse1) this.selection = (_world$getTile$id = (_world$getTile = world.getTile(x, y, this.targetLayer)) === null || _world$getTile === void 0 ? void 0 : _world$getTile.id) !== null && _world$getTile$id !== void 0 ? _world$getTile$id : this.selection;
      if (_Input["default"].buttons.Mouse2) world.remove(x, y, this.targetLayer);
      this.draw();
    }
  }, {
    key: "blockPos",
    value: function blockPos(v) {
      return this.world.screenSpaceToBlockSpace(this.canvas, v).floor();
    }
  }, {
    key: "draw",
    value: function draw() {
      var canvas = this.canvas, world = this.world;
      canvas.fitWindow();
      canvas.smooth(false);
      canvas.push();
      world.draw(canvas, this.time % 1);
      canvas.pop();
      var blockPos = this.blockPos(_Input["default"].mouseScreenPosition(canvas));
      var worldPos = blockPos.multiply(_Tile["default"].width);
      canvas.push();
      canvas.applyMatrix(world.worldToScreenMatrix(canvas));
      canvas.vrect(worldPos, new _Vector["default"](_Tile["default"].width, _Tile["default"].width)).strokeStyle("#FF6F6F").stroke();
      canvas.vtranslate(worldPos);
      canvas.alpha(Math.sin(this.time) * 0.25 + 0.75);
      this.selectedTile.draw(world, 0, 0, canvas, 0);
      canvas.pop();
      var layer = this.targetLayer;
      var layerName = ["background", "middle", "foreground"][layer];
      if (layer != 1) canvas.fillStyle("#FF6F6F").text(layerName, 5, 20, 100, "20px impact");
      this.drawSelectionBar();
    }
  }, {
    key: "drawSelectionBar",
    value: function drawSelectionBar() {
      var canvas = this.canvas, world = this.world;
      var stride = _Tile["default"].width * 1.5;
      canvas.push();
      canvas.alpha(this.selectionWheelAlpha);
      canvas.translate(canvas.width / 2, 0).scale(2, 2).translate(0, stride / 2);
      canvas.rect(0, 0, stride * 9, stride, true).fillStyle("#4a473d").fill().clip();
      for (var i = -4; i <= 4; i++) {
        var _tile$image$width, _tile$image;
        var j = Math.round(this.selectionSmooth);
        var k = _GMath["default"].modulus(i + j, _LoopholeTiles["default"].length);
        var dx = this.selectionSmooth - j;
        var tile = _LoopholeTiles["default"][k];
        canvas.push().translate((i - dx) * stride - _Tile["default"].width / 2, -_Tile["default"].width / 2);
        var scale = _Tile["default"].width / ((_tile$image$width = (_tile$image = tile.image(world, 0, 0, 0)) === null || _tile$image === void 0 ? void 0 : _tile$image.width) !== null && _tile$image$width !== void 0 ? _tile$image$width : _Tile["default"].width);
        canvas.scale(scale, scale);
        tile.draw(world, 0, 0, canvas, 0);
        canvas.pop();
      }
      canvas.rect(0, 0, stride - 5, stride - 5, true).strokeStyle("#FF6F6F").stroke();
      canvas.pop();
    }
  }, {
    key: "selectedTile",
    get: function get() {
      return _LoopholeTiles["default"][this.selectionIndex];
    }
  }, {
    key: "selectionIndex",
    get: function get() {
      return _GMath["default"].modulus(this.selection, _LoopholeTiles["default"].length);
    }
  }]);
  return Editor;
})();
exports["default"] = Editor;

},{"geode/lib/graphics/Canvas":"3tMQ6","geode/lib/Input":"5XDOa","./tiles/Tile":"1dKAG","geode/lib/math/Vector2":"1YKlZ","geode/lib/math/GMath":"360F0","./levels/AgeBeforeBeauty.json":"63wra","./loadTiledMap":"4bJ0v","./tiles/LoopholeTiles":"7gyGP"}],"5XDOa":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importStar(require("./math/Vector2"));
const Canvas_1 = __importDefault(require("./graphics/Canvas"));
window.addEventListener("mousemove", e => { Input.mouse = Vector2_1.vector(e.x, e.y); });
window.addEventListener("keydown", e => Input.buttons[e.key] = true);
window.addEventListener("keyup", e => Input.buttons[e.key] = false);
window.addEventListener("mousedown", e => Input.buttons["Mouse" + e.button] = true);
window.addEventListener("mouseup", e => Input.buttons["Mouse" + e.button] = false);
class Input {
    static mouseScreenPosition(canvas) {
        if (canvas instanceof Canvas_1.default)
            canvas = canvas.canvas;
        let b = canvas.getBoundingClientRect();
        return Input.mouse.addXY(-b.left, -b.top);
    }
}
exports.default = Input;
Input.mouse = Vector2_1.default.ZERO;
Input.buttons = {};

},{"./math/Vector2":"1YKlZ","./graphics/Canvas":"3tMQ6"}]},["4UKJc","3rfh7"], "3rfh7", "parcelRequired75a")

//# sourceMappingURL=index.7cacc1f4.js.map
