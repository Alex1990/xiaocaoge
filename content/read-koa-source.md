---
title: "阅读 Koa 源码"
cover: ""
date: "2019-09-11"
category: "Node.js"
tags:
  - 源码
  - Koa
---

Koa 号称为 Node.js 的下一代 Web 框架。从多年以前的 Express 一枝独秀来看，确实如此，相比 Express 的函数回调写法，使用异步函数（或生成器函数）逻辑更符合人的思维防止，也避免回调嵌套。另外，虽然叫“框架”，但是与其他语言大而全的框架明显不同，Koa 相当轻量，大概提供了两个核心功能：

* 简化 HTTP 请求行、状态行、请求与响应头部处理
* 中间件机制，处理与控制数据流

其他 Web 开发常用的模块都需要通过中间件方式来实现，比如请求内容解析、路由、缓存、压缩等，当然数据库的访问也需要单独的包来实现。

## 一个简单的 HTTP Server

不使用任何框架也可以写 Web 应用，Web 框架只是集成了 Web 开发当中常用的模式、功能，提供了友好的使用方式。下面是使用 Node.js http 模块创建的一个简单的 HTTP Server。

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('hello world')
})

server.listen(8000)
```

其中`req`是一个 [http.IncomingMessage](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_incomingmessage) 对象，包含 HTTP 请求相关信息。`res`是一个 [http.ServerResponse](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_serverresponse) 对象，包含 HTTP 响应相关信息以及操作方法。

Koa 的核心之一是简化了我们对 HTTP 请求与响应的访问与操作，比如：

* 请求行信息：请求方法、请求路径（path）的解析、查询参数（querystring）解析
* 请求状态信息获取与响应状态信息设置
* Cookie 解析与设置
* Accept-* 相关头部解析
* Content-Type 头部解析与设置
* 缓存相关头部判断与设置
* HTTP 头部获取与设置
* HTTP 响应内容设置

而上面的所有事情都是围绕 hello world 示例当中`req`和`res`两个对象。当然，Koa 当中的中间件（Middleware）也并不神奇，就是函数的层层调用，只不过每个函数都可以选择是否调用下一层函数，具体实现细节下面再讲。


## Koa 当中用到的一些 JavaScript 语法

如果对下面几个语法不太熟悉，可以查看链接相关内容。

* 对象 [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) 和 [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)。
* 原型继承的实现之一 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。
* 异步处理 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 与[异步函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)。

## 核心模块

* [request](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/request.js)
* [response](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/response.js)
* [context](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/context.js)
* [application](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/application.js)

### request

### response

### context

### application

## 中间件

## 依赖模块

  + delegates
  + on-finished
  + accepts
  + fresh

## 总结