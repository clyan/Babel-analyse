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
    global.blockScoping = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    {
      var _a = 3;
      var _b = 4;
    }
    var a = 3;
    var b = 4;
    console.log(a);
  }
);
