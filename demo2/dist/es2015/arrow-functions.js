(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports !== 'undefined') {
    factory();
  } else {
    var mod = {
      exports: {},
    };
    factory();
    global.arrowFunctions = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    var _this = void 0;

    var name = 'bbb';

    var a = function a() {
      _this.name = 'aaa';
      console.log(_this.name);
    };

    a();
  }
);
