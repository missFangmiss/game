"use strict";

exports.__esModule = true;
exports.on = on;
exports.off = off;
exports.supportsPassive = void 0;

var _ = require("../");

var supportsPassive = false;
exports.supportsPassive = supportsPassive;

if (!_.isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        exports.supportsPassive = supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  !_.isServer && target.addEventListener(event, handler, supportsPassive ? {
    capture: false,
    passive: passive
  } : false);
}

function off(target, event, handler) {
  !_.isServer && target.removeEventListener(event, handler);
}