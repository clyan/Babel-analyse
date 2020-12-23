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
    global._instanceof = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    function _instanceof(left, right) {
      if (
        right != null &&
        typeof Symbol !== 'undefined' &&
        right[Symbol.hasInstance]
      ) {
        return !!right[Symbol.hasInstance](left);
      } else {
        return left instanceof right;
      }
    }

    _instanceof(foo, Bar);
  }
);
