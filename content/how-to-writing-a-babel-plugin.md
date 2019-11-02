---
title: "如何写一个 Babel 插件"
cover: ""
date: "2019-11-02"
category: "JavaScript"
tags:
  - Babel
  - Babel Plugin
  - Babel 插件
---

Babel 是一个 JavaScript 语言的源码到源码（source to source）编译器，也可以进行源码静态分析，比如分析源码的依赖树。

> 本文只是记录一下自己学习写一个简单的 Babel Plugin [babel-plugin-log](https://www.npmjs.com/package/babel-plugin-log) 总结，更详细更好的入门教程可以看 [babel-handbook](https://github.com/jamiebuilds/babel-handbook)。

## 一个使用 console.log 的小问题

在调试 JavaScript 时，经常需要使用`console.log`打印应用执行到某行代码时，某些变量或表达式的值，也经常会在多个地方打印。这样会导致浏览器或者终端一次性输出很多，有时候难以区分到底是哪里打印出来的，浏览器调试工具会给出代码文件及行列信息，但是我们不会去记写`console.log`的行列信息。所以经常会使用下面这种写法来标识：

```js
console.log("data", data)
console.log("1", data)
```

当然，使用断点调试工具也可以非常方便观察某些变量或表达式运行过程中的值，但是有点儿大材小用，稍显麻烦，所以很多人还是习惯使用`console.log`。

所以如果能有一个工具自动将`console.log(a)`转换成`console.log("a", a)`就好了，很容想到写一个 Babel 插件来解决这个问题。

## Babel 插件快速上手

一些简单的代码转换插件是比较简单的，写 Babel 插件也是非常好上手的，并不需要惧怕。

### 抽象语法树（AST）

[抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree)（Abstract syntax tree，简写 AST）是用来描述源码抽象语法结构的树。

`@babel/parser`包，之前称为 babylon，用来完成将源码解析为 AST 的过程，遵循 [Babel AST Spec](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)。可以使用在线工具 [ASTExplorer](https://astexplorer.net/) 感受一下抽象语法树，这个工具在写插件时会经常用到。

### Babel 编译过程

Babel 编译的过程大致：

* **解析（Parse）**：解析源码为一个抽象语法树，涉及到[静态分析（Lexical Analysis）](https://en.wikipedia.org/wiki/Lexical_analysis)和[语法分析（Syntactic Analysis）](https://en.wikipedia.org/wiki/Parsing);
* **转换（Transform）**：对抽象语法树进行各种操作；
* **生成（Generate**：将转换后的抽象语法树生成代码；

Babel 插件只是在转换过程当中运行。

### 遍历

要对抽象语法树进行各种操作就涉及到抽象语法树的遍历，访问某一个节点，对节点进行各种操作。

#### Visitor

[Visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern) 是抽象语法树的遍历模式。

比如下面定义：

```js
const visitor = {
  Identifier () {
    console.log('called')
  }
}
```

只会对`Identifier`类型的节点起作用。

#### Paths

路径是一个对象用来定位树当中的节点，Visitor 方法的第一个参数就是一个 Path：

```js
const visitor = {
  Identifier (path) {
    console.log(path)
  }
}
```

`path`对象包含节点信息、各种节点的操作方法等。

### @babel/types

[@babel/types](https://babeljs.io/docs/en/next/babel-types) 包包含各种类型节点的判断与构建方法。

### babel-plugin-log

这里仅仅完成将`console.log(a)`转换为`console.log("a", a)`的操作，完整源码可以查看代码仓库 [babel-plugin-log](https://github.com/Alex1990/babel-plugin-log)。

在写 babel 插件时出来阅读 babel-handbook 教程之外，参考其他 babel 插件的源码是一个很好的方法，比如我就参考了 [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)，尤其是测试的方法。

#### 源码

**src/index.js**

```js
// console.log(a) 是一个 CallExpression 节点，但是 CallExpression 不仅仅包含 console.log(a)
// 所以这里需要一个方法来判断节点是否是 console.log(a) 调用，使用在线工具 astexplorer.net 可以
// 观察分析出使用下面代码来判断
function isConsoleLogCall (path) {
  const { callee } = path.node
  const {
    type,
    object,
    property
  } = callee
  return type === 'MemberExpression' &&
    (object.type === 'Identifier' && object.name === 'console') &&
    (property.type === 'Identifier' && property.name === 'log')
}

// 1. types 是 @babel/types
// 2. 返回值是一个 visitor 对象
module.exports = function ({ types: t }) {
  return {
    CallExpression (path) {
      // 我们要进行的转换就是为每个调用参数前插入参数名字符串
      const args = path.node.arguments
      const newArgs = []
      args.forEach(arg => {
        newArgs.push(t.stringLiteral(arg.name), arg)
      })
      path.node.arguments = newArgs
    }
  }
}
```

#### 测试

测试主要就是测试生成的代码与期望的代码是否匹配，这里参考了 [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) 的测试写法，使用 Jest 框架。

文件如下：

```txt
test/
  fixtures/
    one-identifier
      actual.js
      expected.js
    multiple-identifiers
      actaul.js
      expected.js
  index.spec.js
```

主要就是比对`actual.js`转换后的代码与`expected.js`文件内容是否相同，需要注意两点：

1. babel 生成的代码包含句尾分号`;`
2. 比对之前去除代码前后空白符

**index.spec.js**

```js
/* global describe, test, expect */
const _ = require('lodash')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const { transformFileSync } = require('@babel/core')
const plugin = require('../src')

function getTestName (testPath) {
  return path.basename(testPath).split('-').join(' ')
}

describe('babel-plugin-log', () => {
  const testPaths = glob.sync(path.join(__dirname, 'fixtures/*/'))

  for (const testPath of testPaths) {
    const testName = getTestName(testPath)
    const actualPath = path.join(testPath, 'actual.js')
    const expectedPath = path.join(testPath, 'expected.js')
    test(`should work with ${testName}`, () => {
      const expected = fs.readFileSync(expectedPath, 'utf8')
      const actual = transformFileSync(actualPath, {
        plugins: [[plugin]]
      }).code

      expect(_.trim(actual)).toBe(_.trim(expected))
    })
  }
})
```

### 总结

上面只是包含最入门的东西，实际写插件之前还需要了解 babel-handbook 当中 Scope、State 等概念和最佳实践，另外可以参考其他 babel 插件的源码。