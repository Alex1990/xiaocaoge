---
title: "Koa 源码介绍"
cover: ""
date: "2019-09-11"
category: "Node.js"
tags:
  - 源码
  - Koa
  - HTTP
---

Koa 号称为 Node.js 的下一代 Web 框架。从多年以前的 Express 一枝独秀来看，确实如此，相比 Express 的函数回调写法，使用异步函数（或生成器函数）逻辑更符合人的思维，也避免回调嵌套。另外，虽然叫“框架”，但是与其他语言大而全的框架明显不同，Koa 相当轻量，大概提供了两个核心功能：

* 简化 HTTP 请求行、状态行、请求与响应头部处理
* 中间件机制，处理与控制数据流

其他 Web 开发常用的模块都需要通过中间件方式来实现，比如请求内容解析、路由、缓存、压缩等，当然数据库的访问也需要单独的包。

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

而上面的所有事情都是围绕 hello world 示例当中`req`和`res`两个对象。另外，Koa 当中的中间件（Middleware）也并不神奇，就是函数的层层调用，只不过每个函数都可以选择是否调用下一层函数，具体实现细节下面再讲。


## Koa 当中用到的一些 JavaScript 语法

如果对下面几个语法不太熟悉，可以查看链接相关内容。

* 对象 [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) 和 [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)。
* 原型继承的使用方式之一 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。
* 异步处理 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 与[异步函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)。

## 核心模块

* [request](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/request.js)
* [response](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/response.js)
* [context](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/context.js)
* [application](https://github.com/koajs/koa/tree/817b49830571b45a8aec6b1fc1525434f5798c58/lib/application.js)

### request

request 模块主要是对 HTTP 请求信息获取与设置方法封装：

* HTTP 请求行：请求方法、请求协议、请求路径、请求 URL、请求查询参数
* HTTP 请求头部
* 主机名
* IP
* 缓存新鲜度判断
* `Accept`/`Accept-Encoding`/`Accept-Language`头部解析
* `Content-Type`头部解析

### response

response 模块主要是对 HTTP 响应信息获取与设置方法封装：

* HTTP 状态码及状态信息
* HTTP 响应头部
* HTTP 响应内容
* `Content-Length`计算
* 重定向方法
* `Content-Type`设置
* `Content-Disposition`设置
* `Vary`设置

### context

Koa 的 middleware 是一个函数，其第一个参数为 context 对象，context 模块定义了一个 context 原型对象，其上面挂载 request 与 response 对象，另外通过 [delegates](https://www.npmjs.com/package/delegates) 模块将 request 与 response 对象上面的方法代理到了 context 对象上面，便于使用。

除了代理 request 与 response 对象方法，也提供了一些错误处理、异常响应、Cookie 处理等方法。

### application

application 模块用于创建 koa 应用，`const Koa = require('koa')`当中的`Koa`即为`application`模块。

## 中间件 middleware

中间件通过 [koa-compose](https://github.com/koajs/compose) 模块实现。Koa middleware 就是一个异步函数，或者说其返回值为 Promise 对象的函数，如下形式：

```js
async function middleware(ctx, next) {
  if (condition1) {
    await next()
  }
}
```

其中`ctx`为`context`对象，`next`为下一个中间件函数。

HTTP 请求（context 对象）的流向如下图所示，每一个中间件当中都可以选择是否将执行控制交给下一个中间件，直到最后一个中间执行完毕之后会执行 controller（异步函数）。

```txt
receive request
    |
middleware1
    |
    |--------|
    |   middleware2
    |        |
    |        |---------|
    |        |         |
    |        |    middleware3
    |        |         |
    |        |---------|
    |--------|
    |
controller
    |
send response
```

## 依赖模块

Koa 项目本身代码没有多少，依赖了不少三方模块，比如

* [accepts](https://www.npmjs.com/package/accepts)：主要对 HTTP 头部`Accept`/`Accept-Encoding`/`Accept-Language`/`Content-Type`解析处理。
* [content-disposition](https://www.npmjs.com/package/content-disposition)：对`Content-Disposition`头部解析处理。
* [content-type](https://www.npmjs.com/package/content-type)：对`Content-Type`头部解析处理。
* [cookies](https://www.npmjs.com/package/cookies)：对`Cookie`和`Set-Cookie`头部解析与处理。
* [fresh](https://www.npmjs.com/package/fresh)：响应新鲜度判断。
* [parseurl](https://www.npmjs.com/package/parseurl)：解析 URL，并具有 memoization 功能。
* [statues](https://www.npmjs.com/package/statuses)：HTTP 状态码与状态信息处理。
* [vary](https://www.npmjs.com/package/vary)：`Vary`头部处理。

## 总结

个人认为 Koa 两个核心的亮点是：

* **异步函数**形式中间件
* 挂载在 context 对象上面的**统一的 getter 与 setter**

当然了，要想开发实际的 Web 应用，Koa 本身还欠缺很多，需要使用中间件来弥补，另外 Koa 及 Koa 中间件的维护状态近一两年不太活跃，中间件也没有 express 丰富。