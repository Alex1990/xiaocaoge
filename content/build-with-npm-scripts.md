---
title: "使用 npm scripts 作为构建工具"
cover: ""
date: "2016-07-24"
category: "前端"
tags:
  - 构建
  - npm scripts
  - Grunt
  - Gulp
---

## npm scripts

### 简介

npm scripts 是指Npm 对于`package.json`文件中`"scripts"`属性的处理，通过该属性，npm 可以执行命令。

比如有下面配置：

```json
{
  "scripts": {
    "lint": "eslint ."
  },
  "devDependencies": {
    "eslint": "^3.1.1"
  }
}
```

则，使用终端，在项目目录中执行`npm run-script lint`来执行`eslint .`命令。不过，更常使用的是`npm run-script`的简写形式`npm run`来执行`"scripts"`中的命令，即`npm run lint`。

实际上，npm 执行的命令是`./node_modules/.bin/eslint .`，原因是：

- `eslint`包会在项目的`node_modules/.bin`目录下生成一个`eslint`可执行命令，`node_modules/.bin`目录专门用来存放依赖包的可执行命令；
- 执行`npm run`时，Npm 会将`node_modules/.bin`加到环境变量`PATH`中;

### 内置的 scripts

npm 为几个最常使用的`scripts`内置了简写命令：

- test：通过`npm test`执行；
- start：通过`npm start`执行；
- stop：通过`npm stop`执行；
- restart：通过`npm restart`执行；

### pre 和 post hooks

依然以上面的`lint` script 为例，正如名字所示:

- `prelint`：在执行`npm run lint`之前执行；
- `postlint`：在执行`npm run lint`之后执行；

即执行顺序为：`npm run prelint` -> `npm run lint` -> `npm run postlint`，如果前一个命令执行失败，即退出码（Exit Code）为非 0，则不会继续执行下一个命令。

比如要在执行代码测试之前先执行`lint`，则可以通过下面配置实现：

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "mocha test/",

    "pretest": "npm run lint"
  }
}
```

另外 npm 会在执行一些内置命令时，执行其`pre`与`post`命令：

- prepublish：在包发布前执行，可执行测试、构建、修改版本号等任务；
- preinstall：会在包被安装前执行；
- postinstall：会在包安装完成后执行；
- 等等

更多内置的`pre`和`post`可以参考[官网文档](https://docs.npmjs.com/misc/scripts)说明。

### 环境变量

#### package.json 相关变量

如果你的`package.json`文件包含`{ "name": "foo", "version": "1.2.3" }`，则 npm 在 npm scripts 中添加下面两个环境变量：

- `npm_package_name`
- `npm_package_version`

#### 自定义环境变量

可以通过`package.json`中的`"config"`对象自定义一些环境变量，比如：

```json
{
  "config": {
    "port": "8080"
  },
  "scripts": {
    "start": "node server.js --port ${npm_package_config_port}"
  }
}
```
#### npm_lifecycle_event

npm 正在执行哪个 npm script，`npm_lifecycle_event`环境变量值就会设为其值，比如

- 执行`npm start`命令时，则其值为`"start"`；
- 执行`npm run build`命令时，其值为`"build"`；

从而可以根据该值判断正在执行的命令，然后就可以做不同的事。比如，`npm start`用于生成开发环境版本代码，而`npm run build`用于生成生产环境代码，这就可以在执行构建任务时，通过`npm_lifecycle_event`来判断。

**关于 npm scripts 更多及更详细的使用请参考官方文档：[npm scripts](https://docs.npmjs.com/misc/scripts#environment)**。

## Grunt vs Gulp vs npm scripts

关于这三者作为构建工具的对比，已经有人说明的很切中要点，也很细致了，流行的两篇文章：[Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/) 和 [Why I Left Gulp and Grunt for npm Scripts](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.d3jk4vv46)。对于文章中的观点，我也很赞同，在此只简单列下文章作者的观点。

### Gulp 与 Grunt 的不足

总得来说就是 Gulp 与 Grunt 引入了一层复杂但是多余的抽象层，用来抽象直接的构建命令，比如`gulp-uglify`和`grunt-contrib-uglify`用来包装`uglifyjs`命令。这层抽象所建立的插件生态带来了很多问题：

- 额外的抽象，带来了额外的学习成本；
- 插件依赖作者，无论是插件质量、设计合理性、文档、更新及时性等严重依赖作者自身的水平与投入；

为什么 npm scripts 先前使用的人不多？这可能是因为很多人存在对 npm scripts 的误解：

- 人们认为 npm scripts 需要熟悉命令行技能；
- 人们认为 npm scripts 不够强大；
- 人们认为 Gulp 的流（stream）对于快速构建是必须的；
- 人们认为 npm scripts 不能跨平台；

而真相是：

- npm scripts 并不需要熟悉命令行技能，当然熟悉的话更好；
- npm scripts 可以完成绝大多数 Grunt 与 Gulp 完成的任务，实在不行还可以写 NodeJS 代码来完成；
- 因为 npm scripts 在一个 Shell 环境中执行的，而 Shell 天生支持**流**；
- 几个常见的命令操作符`&&`/`<`/`>`/`|`是跨平台的，对于一些 Linux/Mac 中的 Shell 命令可以使用 [shelljs](https://www.npmjs.com/package/shelljs) 来实现跨平台；

而 npm scripts 的不足是由于`package.json`文件不可以写注释，对于复杂的构建任务，代码可读性很差。这个可以尽量通过贴切的命名，任务细分来减轻。另外就是需要熟悉各构建工具的命令行使用方式。

## npm scripts 构建实例

关于如何使用 npm scripts 来完成创建的前端开发当中的构建任务，可以参考 [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/#replacingbuildtools) 一文的教程，以及 github 上面的例子[npm-scripts-example](https://github.com/keithamus/npm-scripts-example)。

总得来说，下面常见的构建任务都可以使用 npm scripts 来完成：

- Lint
- CSS 预处理
- ES2015+/React 编译
- JS 依赖打包
- 压缩
- 合并
- 清除文件
- 测试
- 监听文件改动
- LiveReload

## 后话

到现在，我还会回想下，为什么 Grunt 与 Gulp 会大火？我觉得是因为前端中存在相当一部分很少接触命令行的开发者，对于 Linux/Mac 的命令行有点儿恐惧而不愿意学习它，另外看到构建工具命令行复杂的参数也会心生退却。个人认为，npm scripts 学习成本并不比 Grunt/Gulp 高，对于熟悉构建工具命令的人来说就更低了。所以，一个东西火，不代表它就是好的解决方案，只是代表很多人在关注和使用罢了。

## 参考

- 官方文档：[npm scripts](https://docs.npmjs.com/misc/scripts#environment)
- [Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/)
- [Why I Left Gulp and Grunt for npm Scripts](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.d3jk4vv46)
- [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
- [Why npm Scripts](https://css-tricks.com/why-npm-scripts/)
