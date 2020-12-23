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
    global.propertyMutators = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    // @babel/plugin-transform-property-mutators
    var foo = Object.defineProperties(
      {},
      {
        bar: {
          get: function get() {
            return this._bar;
          },
          set: function set(value) {
            this._bar = value;
          },
          configurable: true,
          enumerable: true,
        },
      }
    );
  }
);
