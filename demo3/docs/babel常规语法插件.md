# Babel

[TOC]

**安装**：

```bash
yarn add -D @babel/core @babel/cli
```

安装插件：

```
yarn add -D @babel/plugin-transform-arrow-functions
```

**案例：**

1. 创建 src/index.js

```
const sayHi = () => {
  console.log('aaa');
};
sayHi();
```

**运行：**

```
npx babel src -d dist --plugins=@babel/plugin-transform-arrow-functions
```

**或配置 package.json：**

```
  "scripts": {
    "build": "babel src -d dist -plugins=@babel/plugintransform-arrow-functions"
  },
```

或配置 babel.config.js

```
module.exports = function (api) {
  api.cache(true);
  const plugins = ['@babel/plugin-transform-arrow-functions'];
  return {
    plugins
  };
};
```

**执行：**

```
npm run build
```

**结果：**

/dist/index.js

```
const sayHi = function () {
  console.log('aaa');
};

sayHi();
```

2. 使用@babel/preset-env 配置插件

   .babelrc.js

```
module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/env',
      {
        targets: {
          edge: '17',
          firefox: '40',
          chrome: '67',
          safari: '11.1',
        },
        useBuiltIns: 'usage',	//动态使用@babel/profill，之引入缺失的
        corejs: '3.6.4',
      },
    ],
  ];
  return {
    presets,
  };
};

```

创建 src/index.js

```
const sayHi = () => {
  console.log('aaa');
};
sayHi();
Promise.resolve().then(() => {
  console.log('bbb');
});

```

**运行：**

```
npx babel src -d dist
```

**或配置 package.json：**

```
  "scripts": {
    "build": "babel src -d dist"
  },
```

**结果：**

/dist/index.js

**解释：** useBuiltIns: 'usage'会动态导入@babel/profill 中的 api,避免一次性导入

**注意：**导入哪些包取决于 preset 中需要兼容浏览器的最低版本。

```
'use strict';

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

var sayHi = function sayHi() {
  console.log('aaa');
};

sayHi();
Promise.resolve().then(function () {
  console.log('bbb');
});
```

## ES3

### @babel/plugin-transform-member-expression-literals

用途：将关键字的使用改成[” “]包裹的方式调用

```
  const obj = {
    name: 'aaa',
  };
  obj.name = 'name';
  obj.const = 'const';
```

out:

```
  var obj = {
    name: 'aaa',
  };
  obj['const'] = 'const';
```

### @babel/plugin-transform-property-literals

用途：将带引号的属性取消引号

```
var foo = {
  "const": function () {},
  "var": function () {},

  "default": 1,
  [a]: 2,
  foo: 1
};
```

out:

```
  var foo = {
    // changed
    const: function _const() {},
    var: function _var() {},
    // not changed
    default: 1,
    [a]: 2,
    foo: 1,
  };
```

### @babel/plugin-transform-reserved-words

用途：一些词在 ES3 中被保留为潜在的未来关键词，但在 ES5 及以后版本中未被保留。这个插件将在 ES3 环境中使用，它将从一组单词中重命名变量。

```
var abstract = 1;
var x = abstract + 1;
```

out

```
var _abstract = 1;
var x = _abstract + 1;
```

## ES5

### @babel/plugin-transform-property-mutators

```
var foo = {
  get bar() {
    return this._bar;
  },
  set bar(value) {
    this._bar = value;
  }
};
```

out:

```
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return this._bar;
    },
    set: function (value) {
      this._bar = value;
    },
    configurable: true,
    enumerable: true
  }
});
```

## ES2015

### @babel/plugin-transform-arrow-functions

**描述：** 箭头函数转普通函数

```
var name = 'bbb';
var a = () => {
  this.name = 'aaa';
  console.log(this.name);
};
a();
```

out:

```
var _this = this;

var name = 'bbb';

var a = function () {
  _this.name = 'aaa';
  console.log(_this.name);
};

a();
```

### @babel/plugin-transform-block-scoped-functions

描述：作用域中避免使用 function 定义函数，会提升到全局

```
{
  function name(n) {
    return n;
  }
}
console.log(name('Steve'));
//输出Steve
```

out:

```
{
  let name = function (n) {
    return n;
  };
}
console.log(name('Steve'));
// ReferenceError: name is not defined
```

### @babel/plugin-transform-block-scoping

```
{
  let a = 3
  const b = 4
}

let a = 3
const b = 4
```

out:

```
{
  var _a = 3;
  var _b = 4;
}
var a = 3;
var b = 4
```

### @babel/plugin-transform-classes

```
class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log('Hello', this.name);
  }
}
```

out:

```
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Test = /*#__PURE__*/ (function () {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  _createClass(Test, [
    {
      key: 'logger',
      value: function logger() {
        console.log('Hello', this.name);
      },
    },
  ]);

  return Test;
})();

```

### @babel/plugin-transform-computed-properties

```
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};
```

out：

```
var _obj;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var obj = (
  _obj = {},
  _defineProperty(_obj, "x" + foo, "heh"),
  _defineProperty(_obj, "y" + bar, "noo"),
  _defineProperty(_obj, "foo", "foo"),
  _defineProperty(_obj, "bar", "bar"),
  _obj
);
```

### @babel/plugin-transform-destructuring

```
let { x, y } = obj;
let [a, b, ...rest] = arr;
```

out：

```
function _toArray(arr) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var _obj = obj,
  x = _obj.x,
  y = _obj.y;

var _arr = arr,
  _arr2 = _toArray(_arr),
  a = _arr2[0],
  b = _arr2[1],
  rest = _arr2.slice(2);
```

### @babel/plugin-transform-duplicate-keys

描述：这个插件实际上是将对象中的重复键转换为计算属性，然后必须由@babel/plugin-transform- computor -properties 插件处理。最终结果将不包含任何具有重复键的对象字面量

```
var x = { a: 5, a: 6 };
var y = {
  get a() {},
  set a(x) {},
  a: 3,
};
```

out:

```
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
      get: function () {},
      set: function (x) {},
      configurable: true,
      enumerable: true,
    },
  }
);
```

### @babel/plugin-transform-for-of

```
for (var i of foo) {}
```

out：

```
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function (e) {
          throw e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var _iterator = _createForOfIteratorHelper(foo),
  _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done; ) {
    var i = _step.value;
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

```

### @babel/plugin-transform-function-name

描述：给函数加上名称

```
let number = (x) => x
```

out:

```
var number = function number(x) {
  return x;
};
```

### @babel/plugin-transform-instanceof

```
foo instanceof Bar;
```

out:

```
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

```

### @babel/plugin-transform-literals

```
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!';
```

out

```
var b = 3; // binary integer literal

var o = 7; // octal integer literal

var u = 'Hello\n\t!';

```

### @babel/plugin-transform-new-target

```
function Foo() {
  console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo

```

out:

```
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

function Foo() {
  console.log(_instanceof(this, Foo) ? this.constructor : void 0);
}

Foo(); // => undefined

new Foo(); // => Foo

```

### @babel/plugin-transform-object-super

```
let obj = {
  say() {
    return 'Hello';
  },
};

let obj2 = {
  say() {
    return super.say() + 'World!';
  },
};

```

out:

```
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
  say() {
    return 'Hello';
  },
};
var obj2 = (_obj = {
  say() {
    return _get(_getPrototypeOf(_obj), 'say', this).call(this) + 'World!';
  },
});

```

### @babel/plugin-transform-parameters

```
function test(x = 'hello', { a, b }, ...args) {
  console.log(x, a, b, args);
}
```

out:

```
function test() {
  var x =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hello';

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

```

### @babel/plugin-transform-shorthand-properties

```
var o = { a, b, c };
var cat = {
  getName() {
    return name;
  }
};
```

out:

```
var o = {
  a: a,
  b: b,
  c: c,
};
var cat = {
  getName: function getName() {
    return name;
  },
};

```

### @babel/plugin-transform-spread

```
var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

var c = foo(...a);
```

out：

```
var a = ['a', 'b', 'c'];
var b = [].concat(a, ['foo']);
var c = foo.apply(void 0, a);
```

### @babel/plugin-transform-sticky-regex

```
const a = /o+/y;
```

out:

```
var a = new RegExp('o+', 'y');
```

### @babel/plugin-transform-template-literals

```
`foo${bar}dsad`;
```

out:

```
'foo'.concat(bar, 'dsad');
```

### @babel/plugin-transform-typeof-symbol

```
typeof Symbol() === "symbol";
```

out:

```
function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

_typeof(Symbol()) === 'symbol';
```

### @babel/plugin-transform-unicode-escapes

描述：编译 ES2015 Unicode 转义到 ES5，这个插件包含在@babel/preset-env 中

```
var \u{1d49c} = "\u{Babe1}";

console.log(\u{1d49c});
```

out:

```
var _ud835_udc9c = '\uDAAA\uDFE1';
console.log(_ud835_udc9c);
```

### @babel/plugin-transform-unicode-regex

```
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);
```

```
var string = 'foo💩bar';
var match = string.match(
  /foo((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))bar/
);
```

## ES2016

### @babel/plugin-transform-exponentiation-operator

```
let x = 10 ** 2;

x **= 3;
```

out:

```
var x = Math.pow(10, 2);
x = Math.pow(x, 3);
```

## ES2017

### @babel/plugin-transform-async-to-generator

描述：在 Babel 7 中，转换异步到模块的方法被合并到这个插件中

```
async function foo() {
  await bar();
}
```

out:

```
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator(function* () {
    yield bar();
  });
  return _foo.apply(this, arguments);
}
```

### @babel/plugin-proposal-async-generator-functions

```
async function* agf() {
  await 1;
  yield 2;
}
```

out:

```


```

### @babel/plugin-transform-named-capturing-groups-regex

```
var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

console.log(re.exec("1999-02-29").groups.year)
```

out:

```
function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _wrapRegExp(re, groups) {
  _wrapRegExp = function _wrapRegExp(re, groups) {
    return new BabelRegExp(re, undefined, groups);
  };
  var _RegExp = _wrapNativeSuper(RegExp);
  var _super = RegExp.prototype;
  var _groups = new WeakMap();
  function BabelRegExp(re, flags, groups) {
    var _this = _RegExp.call(this, re, flags);
    _groups.set(_this, groups || _groups.get(re));
    return _this;
  }
  _inherits(BabelRegExp, _RegExp);
  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);
    if (result) result.groups = buildGroups(result, this);
    return result;
  };
  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === 'string') {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(
        this,
        str,
        substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return '$' + groups[name];
        })
      );
    } else if (typeof substitution === 'function') {
      var _this = this;
      return _super[Symbol.replace].call(this, str, function () {
        var args = [];
        args.push.apply(args, arguments);
        if (_typeof(args[args.length - 1]) !== 'object') {
          args.push(buildGroups(args, _this));
        }
        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };
  function buildGroups(result, re) {
    var g = _groups.get(re);
    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }
  return _wrapRegExp.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === 'function' ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function');
    }
    if (typeof _cache !== 'undefined') {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var re = /*#__PURE__*/ _wrapRegExp(/([0-9]{4})\x2D([0-9]{2})\x2D([0-9]{2})/, {
  year: 1,
  month: 2,
  day: 3,
});

console.log(re.exec('1999-02-29').groups.year);

```

### @babel/plugin-transform-dotall-regex

```out:
/./s;
```

out:

```
/[\s\S]/;
```

### @babel/plugin-proposal-object-rest-spread

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

out：

```
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _x$y$a$b = {
    x: 1,
    y: 2,
    a: 3,
    b: 4,
  },
  x = _x$y$a$b.x,
  y = _x$y$a$b.y,
  z = _objectWithoutProperties(_x$y$a$b, ['x', 'y']);

console.log(x); // 1

console.log(y); // 2

console.log(z); // { a: 3, b: 4 }

```

### @babel/plugin-proposal-optional-catch-binding

```
try {
  throw 0;
} catch {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
}
```

out:

```
try {
  throw 0;
} catch (_unused) {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
}

```

### @babel/plugin-proposal-unicode-property-regex

```
var regex = /\p{Script_Extensions=Greek}/u;
```

```
var regex = /[\u0342\u0345\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF-\u1DC1\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65\u{10140}-\u{1018E}\u{101A0}\u{1D200}-\u{1D245}]/u;
```
