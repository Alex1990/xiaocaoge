---
title: "Micell - 前端开发常用函数库"
cover: ""
date: "2021-01-18"
category: "JavaScript"
tags:
  - micell
  - utility
---

不论在大型项目还是小项目当中，经常需要写一些工具/帮助函数。这些函数五花八门，其中有些可以在所有项目当中共享，比如：

* Cookie 操作
* 日期解析和格式化
* 数字格式化
* 检测浏览器类型
* Base64 编码
* 常用正则
* 等等

现在终于有一个库包含了这些常用的函数，这就是 [Micell](https://micell.org)，一个专注于前端开发的常用函数库。

## Micell 是什么？

Micell（发音为 /maɪˈsel/，类似于 **my-cell**）是一个函数集合，这些函数用于每日的 Web 开发当中。
Micell 只包含那些在大部分项目当中共同使用的函数。当然，为了完整性，也会包含一些不常用的函数。

## Micell 不是什么？

* 不是 lodash、momentjs 或 dayjs 的替代品。
* 不会包含你的应用当中所有的工具函数。

## 为什么需要 Micell？

* **社区共享**：你无需重复写公用的工具函数了，Micell 实现了所有项目的复用。
* **Typescript 支持**：源码使用 TypeScript 书写，同时类型声明文件也包含在 npm 包里面。
* **高可靠性**：经过所有现代浏览器当中测试，测试覆盖率达到 96%。
* **按需引入**：使用 **babel-plugin-lodash** 来实现按需引入模块。

## 安装

**Npm**

```sh
npm i --save micell
```

**Yarn**

```sh
yarn add micell
```

**CDN**

如果你想通过`<script>`标签来直接使用 micell，可以使用 [jsDelivr](https://www.jsdelivr.com/package/npm/micell)。

最新版本：

```html
<script src="https://cdn.jsdelivr.net/npm/micell"></script>
```

指定版本：

```html
<script src="https://cdn.jsdelivr.net/npm/micell@0.11.0/dist/micell.js"></script>
```

ES 模块版本：

```html
<script src="https://cdn.jsdelivr.net/npm/micell@0.11.0/dist/micell.esm.browser.js"></script>
```

micell 同样存在于 [unpkg](https://unpkg.com/) 上。

## 使用

```js
import micell from 'micell'

// 生成一个随机字符串
micell.randomString(6);

// 获取 Cookie 值
micell.cookie.get('name')
```

更多函数请查看[文档](/cn/docs/)。

> **小提示**：你可以在浏览器控制台尝试 micell，使用全局对象`micell`。

## 减少打包体积

可以通过 [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) 来实现按需打包。

**.babelrc**

```json
{
  "plugins": [
    ["lodash", { "id": ["micell"] }]
  ]
}
```

## 总结

尽管 micell 已经断断续续开发了一年以上，包含了 100 多个函数，但是肯定还有欠缺，还需要你的帮助，比如：

* 开始在你的项目当中使用
* 提升文档
* 反馈 bug
* 请求增加新方法
* 或者任何其他你认为 micell 应该做的

欢迎所有类型的贡献。

* 官方网站：[https://micell.org](https://micell.org)
* Github 仓库：[micell](https://github.com/micell/micell)