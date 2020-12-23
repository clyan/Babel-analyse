## Babel-React 插件

### @babel/plugin-transform-react-jsx

描述：根包，其他包依赖这个包，进行拓展

```
const Hr = () => {
  return <hr className="hr" />;
};
```

```
const Hr = () => {
  return /*#__PURE__*/ React.createElement('hr', {
    className: 'hr',
  });
};

```

### @babel/plugin-transform-react-constant-elements

描述: 这个插件可以通过将 React 元素提升到尽可能高的范围来加速协调和降低垃圾收集压力，防止不必要的重复。

```
var _ref = /*#__PURE__*/ React.createElement('hr', {
  className: 'hr',
});

const Hr = () => {
  return _ref;
};

```

### @babel/plugin-transform-react-display-name

```
var foo = React.createClass({}); // React <= 15
var bar = createReactClass({}); // React 16+
```

out:

```
var foo = React.createClass({
  displayName: 'foo',
}); // React <= 15

var bar = createReactClass({
  displayName: 'bar',
}); // React 16+

```

### @babel/plugin-transform-react-inline-elements

```
<Baz foo="bar" key="1"></Baz>;
```

out:

```
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE =
      (typeof Symbol === 'function' &&
        Symbol['for'] &&
        Symbol['for']('react.element')) ||
      0xeac7;
  }
  var defaultProps = type && type.defaultProps;
  var childrenLength = arguments.length - 3;
  if (!props && childrenLength !== 0) {
    props = { children: void 0 };
  }
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = new Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }
    props.children = childArray;
  }
  if (props && defaultProps) {
    for (var propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  } else if (!props) {
    props = defaultProps || {};
  }
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key === undefined ? null : '' + key,
    ref: null,
    props: props,
    _owner: null,
  };
}

/*#__PURE__*/
_jsx(
  Baz,
  {
    foo: 'bar',
  },
  '1'
);
```

### @babel/plugin-transform-react-jsx-compat

```
var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

```
var profile = React.DOM.div(
  null,
  React.DOM.img({
    src: 'avatar.png',
    class: 'profile',
  }),
  React.DOM.h3(null, [user.firstName, user.lastName].join(' '))
);

```

### @babel/plugin-transform-react-jsx-self

```
<sometag />;
```

out:

```
/*#__PURE__*/
React.createElement('sometag', {
  __self: this,
});

```

### @babel/plugin-transform-react-jsx-source

```
<sometag />
```

```
var _jsxFileName =
  'E:\\learnMaterials\\suanfa\\babel\\demo3\\src\\react-jsx-source.js';

/*#__PURE__*/
React.createElement('sometag', {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 1,
    columnNumber: 1,
  },
});

```
