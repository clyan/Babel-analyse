## 模块

### @babel/plugin-transform-modules-amd

```
export default 42;
```

```
define(['exports'], function (_exports) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  var _default = 42;
  _exports['default'] = _default;
});

```

### @babel/plugin-transform-modules-commonjs

```
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _default = 42;
exports['default'] = _default;

```

### @babel/plugin-transform-modules-systemjs

```
System.register([], function (_export, _context) {
  'use strict';

  return {
    setters: [],
    execute: function () {
      _export('default', 42);
    },
  };
});

```

### @babel/plugin-transform-modules-umd

```
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.modulesCommonjs = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  var _default = 42;
  _exports["default"] = _default;
});
```
