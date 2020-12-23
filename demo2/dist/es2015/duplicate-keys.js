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
    global.duplicateKeys = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }

    var x = _defineProperty(
      {
        a: 5,
      },
      'a',
      6
    );

    var y = Object.defineProperties(
      {
        a: 3,
      },
      {
        a: {
          get: function get() {},
          set: function set(x) {},
          configurable: true,
          enumerable: true,
        },
      }
    );
  }
);
