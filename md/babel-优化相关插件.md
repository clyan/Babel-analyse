# babel-优化相关插件

[官方文档minification](https://www.babeljs.cn/docs/plugins#minification)

[babel-preset-minify](https://www.babeljs.cn/docs/babel-preset-minify)

### 安装

```
yarn add -D babel-preset-minify
```

## 配置

设置需要的参数，进行优化

```
module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      'minify',
      {
        keepFnName: true,
        removeDebugger: true,
      },
    ],
  ];
  return {
    presets,
  };
};

```

## 参数

有两种类型的参数：

1. 通过插件一比一地映射
2. 相同的参数传递给多个插件

#### 通过插件一比一地映射

- `false` - 关闭插件
- `true` - 开启插件
- `{ ...pluginOpts }` - 开启插件并将 pluginOpts 传递给插件

| 参数名              | 插件                                                         | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------ |
| booleans            | [transform-minify-booleans](https://www.babeljs.cn/docs/babel-plugin-transform-minify-booleans) | true   |
| builtIns            | [minify-builtins](https://www.babeljs.cn/docs/babel-plugin-minify-builtins) | true   |
| consecutiveAdds     | [transform-inline-consecutive-adds](https://www.babeljs.cn/docs/babel-plugin-transform-inline-consecutive-adds) | true   |
| deadcode            | [minify-dead-code-elimination](https://www.babeljs.cn/docs/babel-plugin-minify-dead-code-elimination) | true   |
| evaluate            | [minify-constant-folding](https://www.babeljs.cn/docs/babel-plugin-minify-constant-folding) | true   |
| flipComparisons     | [minify-flip-comparisons](https://www.babeljs.cn/docs/babel-plugin-minify-flip-comparisons) | true   |
| guards              | [minify-guarded-expressions](https://www.babeljs.cn/docs/babel-plugin-minify-guarded-expressions) | true   |
| infinity            | [minify-infinity](https://www.babeljs.cn/docs/babel-plugin-minify-infinity) | true   |
| mangle              | [minify-mangle-names](https://www.babeljs.cn/docs/babel-plugin-minify-mangle-names) | true   |
| memberExpressions   | [transform-member-expression-literals](https://www.babeljs.cn/docs/babel-plugin-transform-member-expression-literals) | true   |
| mergeVars           | [transform-merge-sibling-variables](https://www.babeljs.cn/docs/babel-plugin-transform-merge-sibling-variables) | true   |
| numericLiterals     | [minify-numeric-literals](https://www.babeljs.cn/docs/babel-plugin-minify-numeric-literals) | true   |
| propertyLiterals    | [transform-property-literals](https://www.babeljs.cn/docs/babel-plugin-transform-property-literals) | true   |
| regexpConstructors  | [transform-regexp-constructors](https://www.babeljs.cn/docs/babel-plugin-transform-regexp-constructors) | true   |
| removeConsole       | [transform-remove-console](https://www.babeljs.cn/docs/babel-plugin-transform-remove-console) | false  |
| removeDebugger      | [transform-remove-debugger](https://www.babeljs.cn/docs/babel-plugin-transform-remove-debugger) | false  |
| removeUndefined     | [transform-remove-undefined](https://www.babeljs.cn/docs/babel-plugin-transform-remove-undefined) | true   |
| replace             | [minify-replace](https://www.babeljs.cn/docs/babel-plugin-minify-replace) | true   |
| simplify            | [minify-simplify](https://www.babeljs.cn/docs/babel-plugin-minify-simplify) | true   |
| simplifyComparisons | [transform-simplify-comparison-operators](https://www.babeljs.cn/docs/babel-plugin-transform-simplify-comparison-operators) | true   |
| typeConstructors    | [minify-type-constructors](https://www.babeljs.cn/docs/babel-plugin-minify-type-constructors) | true   |
| undefinedToVoid     | [transform-undefined-to-void](https://www.babeljs.cn/docs/babel-plugin-transform-undefined-to-void) | true   |

#### 相同的参数传递给多个插件

- 当多个插件需要相同的参数时，在一个地方声明更容易控制。然后将这些参数传递给两个或多个插件。

| 参数名        | 插件                                                         |
| ------------- | ------------------------------------------------------------ |
| keepFnName    | Passed to [mangle](https://www.babeljs.cn/docs/babel-plugin-minify-mangle-names) & [deadcode](https://www.babeljs.cn/docs/babel-plugin-minify-dead-code-elimination) |
| keepClassName | Passed to [mangle](https://www.babeljs.cn/docs/babel-plugin-minify-mangle-names) & [deadcode](https://www.babeljs.cn/docs/babel-plugin-minify-dead-code-elimination) |
| tdz           | Passed to [builtIns](https://www.babeljs.cn/docs/babel-plugin-minify-builtins), [evaluate](https://www.babeljs.cn/docs/babel-plugin-minify-constant-folding), [deadcode](https://www.babeljs.cn/docs/babel-plugin-minify-dead-code-elimination), [removeUndefined](https://www.babeljs.cn/docs/babel-plugin-transform-remove-undefined) |