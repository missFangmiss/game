"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _swipe = _interopRequireDefault(require("./swipe"));

exports.Swipe = _swipe.default;

// This file is auto gererated by build/build-entry.js
var version = '1.3.1';
exports.version = version;
var components = [_swipe.default];

var install = function install(Vue) {
  components.forEach(function (Component) {
    Vue.use(Component);
  });
};
/* istanbul ignore if */


exports.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var _default = {
  install: install,
  version: version
};
exports.default = _default;