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
    global.parameters = mod.exports;
  }
})(
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : this,
  function () {
    'use strict';

    function test() {
      var x =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : 'hello';

      var _ref = arguments.length > 1 ? arguments[1] : undefined,
        a = _ref.a,
        b = _ref.b;

      for (
        var _len = arguments.length,
          args = new Array(_len > 2 ? _len - 2 : 0),
          _key = 2;
        _key < _len;
        _key++
      ) {
        args[_key - 2] = arguments[_key];
      }

      console.log(x, a, b, args);
    }
  }
);
