'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-185921d7.js');
require('./chunk-52a2c25c.js');
require('./chunk-925c5339.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-e427c25d.js');
var __chunk_7 = require('./chunk-6f53a753.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
