"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

/**
 * Create a component with common options
 */
function _default(sfc) {
  sfc.components = (0, _extends2.default)(sfc.components || {}, {});
  return sfc;
}

;