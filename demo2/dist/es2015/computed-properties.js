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
    global.computedProperties = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    var _obj;

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

    var obj =
      ((_obj = {}),
      _defineProperty(_obj, 'x' + foo, 'heh'),
      _defineProperty(_obj, 'y' + bar, 'noo'),
      _defineProperty(_obj, 'foo', 'foo'),
      _defineProperty(_obj, 'bar', 'bar'),
      _obj);
  }
);
