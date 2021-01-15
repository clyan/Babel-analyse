这里需要说明下ES特性支持的提案，不同阶段的提案支持的内容不同，其中`stage-4`阶段提案中的特性将会在未来发布。

关于各个Stage的说明参考[这里](https://link.jianshu.com?t=http://babeljs.io/docs/plugins#stage-x-experimental-presets)。上面介绍的`@babel/preset-env`或者`@babel/preset-latest`就是下面提到的`stage-4`。

> The TC39 categorizes proposals into the following stages:
>
> - Stage 0 - Strawman: just an idea, possible Babel plugin.
> - Stage 1 - Proposal: this is worth working on.
> - Stage 2 - Draft: initial spec.
> - Stage 3 - Candidate: complete spec and initial browser implementations.
> - Stage 4 - Finished: will be added to the next yearly release.

Stage的包含顺序是：**左边包含右边全部特性，即stage-0包含右边 1 / 2 / 3 的所有插件。**



```undefined
stage-0 > ~1 > ~2 > ~3 > ~4: 
```

### 疑问

#### 1. 这个和`@babel/preset-env`的区别

`@babel/preset-env`会根据预设的浏览器兼容列表从`stage-4`选取必须的plugin，也就是说，不引入别的`stage-x`，`@babel/preset-env`将只支持到`stage-4`。

### 建议

#### 1. 如果是React用户，建议配到`@babel/preset-stage-0`

其中的两个插件对于写JSX很有帮助。

- transform-do-expressions：if/else三目运算展开
- transform-function-bind：this绑定

#### 2. 通常使用建议配到`@babel/preset-stage-2`

插件包括：

- syntax-dynamic-import： 动态import
- transform-class-properties：用于 class 的属性转化
- transform-object-rest-spread：用来处理 rest spread
- transform-async-generator-functions：用来处理 async 和 await

[原文链接](https://www.jianshu.com/p/0dc3bddb6da8)

