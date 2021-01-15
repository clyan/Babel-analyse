# Babel

**安装**：

```bash
yarn add -D @babel/core @babel/cli @babel/preset-env 
```

**配置：**

创建babel.config.[js | json | mjs | json],这里使用babel.config.js

配置：presets配置环境，plugins配插件

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
        useBuiltIns: 'usage',
        corejs: '3.6.4',
      },
    ],
  ];
  return {
    presets,
  };
};

```



**案例：**

1. 创建src/index.js

```
const sayHi = () => {
  console.log('aaa');
};
sayHi();
```

**运行：**

```
npx babel src/index.js
```

**结果：**

```
"use strict";

var sayHi = function sayHi() {
  console.log('aaa');
};

sayHi();

```

2. 创建build.js

```javascript
const bable = require('@babel/core');
const sayHi = () => {
  console.log('aaa');
};
const result = bable.transform();
console.log(result);
```

**运行：**

```
node build.js
```

**结果：**

```
{
  metadata: {},
  options: {
    cloneInputAst: true,
    babelrc: false,
    configFile: false,
    passPerPreset: false,
    envName: 'development',
    cwd: 'E:\\learnMaterials\\suanfa\\babel\\demo1',
    root: 'E:\\learnMaterials\\suanfa\\babel\\demo1',
    plugins: [
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin]
    ],
    presets: [],
    parserOpts: {
      sourceType: 'module',
      sourceFileName: undefined,
      plugins: [Array]
    },
    generatorOpts: {
      filename: undefined,
      auxiliaryCommentBefore: undefined,
      auxiliaryCommentAfter: undefined,
      retainLines: undefined,
      comments: true,
      shouldPrintComment: undefined,
      compact: 'auto',
      minified: undefined,
      sourceMaps: false,
      sourceRoot: undefined,
      sourceFileName: 'unknown'
    }
  },
  ast: null,
  code: `"use strict";\n\n(function () {\n  console.log('aaa');\n});`,
  map: null,
  sourceType: 'script'
}
```



