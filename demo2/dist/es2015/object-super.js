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
    global.objectSuper = mod.exports;
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

    function _get(target, property, receiver) {
      if (typeof Reflect !== 'undefined' && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          var base = _superPropBase(target, property);
          if (!base) return;
          var desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.get) {
            return desc.get.call(receiver);
          }
          return desc.value;
        };
      }
      return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
      }
      return object;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
      return _getPrototypeOf(o);
    }

    var obj = {
      say: function say() {
        return 'Hello';
      },
    };
    var obj2 = (_obj = {
      say: function say() {
        return _get(_getPrototypeOf(_obj), 'say', this).call(this) + 'World!';
      },
    });
  }
);
