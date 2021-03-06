---
title: "前端代码规范实战"
cover: ""
date: "2016-12-24"
category: "前端"
tags:
  - 代码规范
  - 代码风格
---

本文总结目前开发组一年多以来在前端代码规范方面的实战经验，包括了为什么需要代码规范，如何制定代码规范、检测工具等。这一年多来，开发组前端的大致情况是：

- 前端开发人员：2 人。
- 项目规模：
  - 一个综合性主项目使用 jQuery + Bootstrap 开发，大约 40000 行自写代码。
  - 其他小项目全部 React + Ant Design，我们两个前端开发的有五个左右，其他大部分为后端人员开发前端。

## 为什么需要代码规范？

一开始是没有什么规范的，我和另一个前端开发不同的业务模块，使用着各自的代码风格。而且，项目初始阶段开发任务量大，且紧急，没有想着什么规范的事儿。直到后来，业务开发的节奏缓下来了，我们两个前端就大致协商了一些基本的规则，比如缩进、句尾分号、变量命名之类的。然后使用 JSHint 配置了一下规则，还没有制定代码规范文档，当时我也没听说过 ESLint，规则也参考了现有的代码风格，避免改动太大。

至于当初为什么约定一个基本的代码规范，是因为：

- **提高可读性**：在阅读或修改他人代码时，如果风格不同会降低可读性，两个人两种风格读起来就累，要是更多人没有统一的风格，就会影响开发效率了。
- **提高可维护性**：由于降低可读性，修改成本会高点儿，尤其是对我这种有点儿代码洁癖的人来说，会非常影响情绪。

代码规范不仅仅包括诸如缩进、分号、空格之类的问题，还包括一些使用该语言的最佳实践，比如 JavaScript 中的相等性比较、类型转换等。这些最佳实践有助于降低 bug 发生几率，从而提高代码的可靠性。

另外推动这个还有一点儿小小的私心，因为主要是我来制定规则，所以可以趁机推广自己倾向的风格。当然，我的风格也是从主流的开源项目学来的，所以就是推广主流的代码风格，消灭不规范或奇葩的风格。

## 制定代码规范

如上文所说，一开始只是一个简单的 JSHint 配置规则，后来随着项目的规模越来越大，开发的项目也不在只是一个，参与前端开发的人员也不止两个了。另外，离第一个项目启动已经过去大半年了，期间项目的前端技术栈也在不断升级，此时也有必要制定一份正式的前端代码规范了。

根据我们所使用的技术，制定了 HTML、CSS、JavaScript ES5、JavaScript 和 React 规范。在制定的过程中，**参考了业界流行的代码规范**，比如 HTML 与 CSS 参考了[@mdo](https://github.com/mdo) 的 [code-guide](https://github.com/mdo/code-guide) 和 [Google Style Guide](https://google.github.io/styleguide/htmlcssguide.xml)，JavaScript 与 React 参考了 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)。

**为什么不直接使用业界主流的规范？**当时认为这份规范的目标用户前端基础薄弱，且这些规范相对来说比较长，我们目前的代码也有很多地方不符合这些主流规范。所以在这些规范的基础上制定了一份精简的代码风格指南，更侧重于代码风格方面，而非语言的最佳实践。另外，由于嫌配置太多工具繁琐，且 HTML/CSS 写的并不是很多，所以只检测 JavaScript 与 React 的代码风格，并给出了 ESLint 的配置。

## 检测

当时，我已经听过并调研了下 ESLint 这个新的代码检测工具，发现相比 JSHint 有下面几个显著的优势：

- 规则全而精细：远远超过 JSHint 的可配置规则，从而实现更精细的控制，也包括大量为了降低 bug 发生率的规则。
- 扩展性强：任何人都可以写自己的规则或插件，也可以通过配置解析器或插件来实现对 ES6 和 React 的代码检测，而 ES6 与 React 正是我们将要采用的技术。
- 可靠：ESLint 是大神 Nicholas C. Zakas 开发的，读过他的书与一些博客文章，了解到他在前端界身经百战了，对项目可靠性很重视，对未来的 JavaScript 也很有研究。反观 JSHint，更新近乎停滞，也是一个老项目了。

为了保证提交的代码都能符合规范，就引入了[pre-commit](https://github.com/observing/pre-commit) 这个工具，可以在`git commit`执行前运行`eslint`检测代码。只是项目代码比较多，每次检测都要 30s 以上，实在无法忍受，就用下面一行代码来实现只检测要提交代码：

`package.json`

```json
{
  "scripts": {
    "lint": "files=$(git diff --cached --name-only | grep -v '.jsx$' | grep '.js$' | tr '\\n' ' ');  if [[ -n \"$files\" ]]; then eslint --config ./.eslintrc.json --quiet $files || (git reset HEAD; exit 1); else exit 0; fi"
  }
}
```

后来项目引入 ES6，新写的模块使用 ES6 语法，需要区别检测，就配置了两种 ESLint 规则，当然使用 ES6 的模块文件名统一使用`.jsx`作为后缀。新的`npm scripts`如下：

```json
{
  "scripts": {
    "lint-legacy": "files=$(git diff --cached --name-only | grep -v '.jsx$' | grep '.js$' | tr '\\n' ' ');  if [[ -n \"$files\" ]]; then eslint --config ./.eslintrc.legacy.json --quiet $files || (git reset HEAD; exit 1); else exit 0; fi",
    "lint-base": "files=$(git diff --cached --name-only | grep '.jsx$' | tr '\\n' ' ');  if [[ -n \"$files\" ]]; then eslint --config ./.eslintrc.base.json --quiet $files || (git reset HEAD; exit 1); else exit 0; fi",
    "lint": "npm run lint-legacy && npm run lint-base",
    "lint-all": "(eslint --config ./.eslintrc.base.json --ext .jsx --quiet ./) && (eslint --config ./.eslintrc.legacy.json --ext .js --quiet ./)"
  }
}
```

其中：

- `lint-legacy`：检测待提交的旧 ES5 代码；
- `lint-base`：检测待提交的 ES6 代码；
- `lint`：检测所有待提交的代码；
- `lint-all`：手动执行，检测所有代码。

## EditorConfig

我发现有些人的代码总是存在一些基本的风格问题：

- 空格与制表符作为缩进。
- 行结尾符，有三种风格 Windows/Linux/macOS，代码比较多的是 Linux（`\n`）。

这些问题可以配置编辑器就解决的，或者只要那怕注意一点儿代码风格问题，都不应该发生的问题。目前很多前端开源项目采用 [EditorConfig](http://editorconfig.org/) 这个工具来避免这些问题，我们开发组的前端方面就引入了这个工具。使用这个工具需要为编辑器安装插件，可以按照官方文档安装。

## 维护代码规范

自从制定好代码规范并配置好工具之后，大半年内没有什么改动。然而，前端技术的发展及随着检测工具的版本更新，Airbnb 代码规范的更新，以及这近一年来的 ES6 与 React 实战，发现需要更新代码规范了。

一开始制定规范时，本着照顾到旧代码以及后端人员，制定的规范比 Airbnb JavaScript 的宽松很多，加了很多自定义的工具配置规则。然而，只有我们两个前端在遵守，无论后端人员遵守规范还是我维护规范都需要花时间与精力。个人认为性价比不高，现在我倾向与直接使用 Airbnb JavaScript 的规范与 ESLint 配置，我个人倾向严格细致些的规范。

经过查看 ESLint 与 Airbnb JavaScript 的配置更新记录，发现除了极个别几个规则与目前代码风格不一致外，很多都已经一致了，可以比较平滑地升级。经过升级之后，自定义的 ESLint 配置规则由原来的二十多条减少到了十条左右，下一次更新的时候基本就可以废弃自定义的配置规则了。

