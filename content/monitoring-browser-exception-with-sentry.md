---
title: 使用 Sentry 监控浏览器异常
cover: ""
date: 2020-04-24
category: 前端
tags:
  - 异常
  - 错误
  - 监控
  - Sentry
---

一个典型的功能迭代周期，开发尽量按时交付功能，测试尽量测出多的 bug，然后开发修完发现的 bug，再然后，这个功能就上线了。但是，突然某一天用户通过客服反馈使用产品时遇到问题了，而你作为前端开发能从用户得到的信息非常有限，可能包括非常不精确的问题描述以及一张问题截图，然后你需要根据这些信息以及自己对相关代码的了解来复现用户遇到的问题。在这个过程中，你经常需要多次向用户获取更详细的问题，比如用户操作流程、用户的操作系统、浏览器、用户账号、页面地址等等信息。这些都大大浪费了时间，也浪费了用户的耐心。更糟糕的是有时候这些信息还是不够，你恨不得冲到用户那里，使用他的电脑来操作，当然也可以通过远程控制软件 TeamViewer 或者向日葵来完成。**在日复一日这样的过程当中，你非常渴望在用户反馈问题时能一次性获取尽量多的信息，甚至在用户反馈问题之前就主动发现问题，然后顺手解决**。

好消息是已经有这么一个**开源免费**、**可私有部署**的异常监控系统——[Sentry](https://github.com/getsentry/sentry)，可解决你遇到的烦恼。

## Sentry 是什么？

官方介绍如下

> Sentry fundamentally is a service that helps you monitor and fix crashes in realtime. The server is in Python, but it contains a full API for sending events from any language, in any application.

**译**：本质上，Sentry 是一个服务，可帮助你实时监控和修复崩溃。服务端使用 Python 书写，但是包含了一套完成的接口，可用于从任何语言、任何应用发送事件。

Sentry 主要用于错误上报、监控、分析、报警，错误信息包含错误描述、调用栈、程序运行环境、网络请求、用户 Id 等信息，官方支持下面语言或框架：

* JavaScript
* React-Native
* Python
* Ruby
* PHP
* Go
* Rust
* Java
* Objective-C/Swift
* C#
* Perl
* Elixir
* Laravel

更多信息可以查看官方文档：[Sentry Documentation](https://docs.sentry.io/)。

## 为什么选择 Sentry？

当然，除了 Sentry 还有其他商用的错误监控系统，比如

* [FunDebug](https://www.fundebug.com/)：国产收费服务，主要支持前端生态，功能比较全面。
* [bugsnag](https://www.bugsnag.com/)：支持主流语言与平台。
* [rollbar](https://rollbar.com/)：支持主流语言与平台。
* [airbrake](https://airbrake.io/)：支持主流语言与平台。
* [raygun](https://raygun.com/)：支持主流语言与平台。
* [LogRocket](https://logrocket.com/)：主要用于 JS，可录制播放用户操作。
* [trackjs](https://trackjs.com/)：仅限于 JS。
* [CatchJS](https://catchjs.com/)：仅限于 JS。

相比较而言，Sentry 具有以下优势：

* 开源
* 免费私有部署
* 支持语言或框架全面

## Sentry 入门

* 引入 SDK 可以查看 [Getting Started](https://docs.sentry.io/error-reporting/quickstart/?platform=node)
* 私有部署可以查看 [Installation](https://docs.sentry.io/server/installation/)

**下面操作假设已经有一个私有部署的系统和对应的账号，且以 Sentry JavaScript 为主。**

### 创建项目（Project）

进入 Sentry 系统按照指示，选择合适的语言或框架，并填写项目所属团队，项目名称信息，成功创建一个项目。

### Sentry SDK

每个项目都有唯一的 **DSN**，然后根据不同的语言或框架 SDK 教程来引入 SDK，并配置 dsn 或其他参数。

至此，项目部署之后，就可以进行错误收集了，当然你也可以本地测试时手动触发错误。

### 查看错误信息

Sentry 会对相似的错误进行聚合，成为一个问题（Issue），每次错误上报称为一个事件（Event）。

#### 问题列表

进入项目页面，默认展示最新上报的未解决的 问题列表，包含错误名称、文件路径、事件数量、用户数量等，并可以分配问题给某个成员。

#### 事件详情页面

点击某个问题，进入事件详情页面，页面包含丰富的运行环境、错误描述、调用栈、DOM、网络请求、时间相关信息，可以根据调用栈来定位问题发生的文件、行列。

### 修复错误

根据问题的时间数量、用户数量以及问题可能影响来决定修复的先后顺序。根据事件详情页面的调用栈、运行环境等复现、定位问题，然后修复问题。

## Sentry 实践

除了按照入门教程来配置和操作之外，经过实际项目体验，列举下面一些对于实践有帮助的经验。

### 配置钉钉通知

Sentry 默认有邮件通知，但是很多人不会安装邮件客户端或者打开网页版邮件，而配置钉钉通知可以更及时收到警告通知，需要安装 [Sentry 钉钉通知插件](https://github.com/anshengme/sentry-dingding)才可以配置钉钉通知。除了可以配置钉钉之外还可以 [Webhook Plugin](https://docs.sentry.io/webhook-plugin/) 来或者 [Integration](https://docs.sentry.io/workflow/integrations/integration-platform/) 实现其他方式通知。

### SDK CDN

默认的 Sentry CDN 对于国内来说比较慢，可以直接下载 [@sentry/browser](https://www.npmjs.com/package/@sentry/browser) 并上传到自有 CDN 上面来引入。

### 区分不同环境

通常项目会存在测试环境、预发布环境、正式环境，不同环境应该对于 Sentry 不同的 Project，因为不同环境对于异常处理不同的。

### 跟踪用户 ID

将错误与用户 ID 进行关联可以了解更多和用户相关信息，比如错误影响用户数量、具体影响了哪些用户。下面代码是进行关联的配置：

```js
Sentry.configureScope(function (scope){
    var uid = getCookie('uid') || 0
    scope.setUser({ id: uid })
})
```

### 采样频率

如果能收集所有错误当然最好，但是对于老旧项目可能存在相当多的对功能无关紧要的报错，另外，也要考虑到服务器的成本和压力，因此降低采样频率在某些情况下是很有必要的。可以通过参数`sampleRate`来设置，比如`sampleRate: 0.2`表示采样率为 20%。

### 过滤错误

在实际应用 Sentry 过程中，发现一些错误是因为页面运行环境存在问题或者恶意用户产生的错误，这时可以通过`beforeSend`参数来对上报事件进行过滤，比如：

```js
var ignoreRules = [
  'Blocked a frame with origin',
  'vivoNewsDetailPage.getNewsReadStatus4Vivo',
  'cefQuery is not defined'
]
function isMatchedIgnoreRules (value) {
  if (!value) return false
  for (var i = 0; i < ignoreRules.length; i++) {
    if (value.indexOf(ignoreRules[i]) > -1) return true
  }
  return false
}

beforeSend: function (event) {
  var values = event.exception.values
  var shouldIgnore = values.some(function (value) {
    return isMatchedIgnoreRules(value.value)
  })
  if (shouldIgnore) {
    return null
  }
  return event
}
```

### 解决问题优先级

默认是按照最近发生的来排序的，解决需要按照错误数量、影响人数来从高到底更合理些，另外更关注最近一天或一周的范围要比所有时间段更合理，因为可能过去的错误已经解决了，只是 Sentry 上面还没有标记已解决。Sentry 本身提供了相对比较强大的排序和筛选功能，比如最近7天未解决的可以搜索框输入`is:unresolved lastSeen:-7d`。

### 错误数据报表

有时我们需要通过数据来分析我们解决问题的成果，来分析错误事件数量变化趋势，Sentry 本身只提供了非常简单的柱状图，阅读体验并不好。幸好，我们可以通过爬取它接口的数据来自己生成表格或者图表，比如一个生成命令行表格的工具示例 [sentry-overview](https://github.com/Alex1990/sentry-overview)。

## JavaScript 异常上报基本原理

在浏览器中，可以通过浏览器提供的一些接口来获取信息，比如 [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)、[Screen](https://developer.mozilla.org/en-US/docs/Web/API/Screen)、[document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) 等等。还可以通过**全局监听**或者**接口重写**两种方式来获取错误或者其他页面相关信息，下面分别举一些基本的示例来说明如何使用这两种方式。

### 全局监听

#### error event

通过在`window`上面绑定`error`事件来监听代码错误、`<link>`或`<script>`资源加载错误等。

**查看在线示例：**[error.html](https://alex1990.github.io/javascript-exception-monitor/error.html) 和 [link.html](https://alex1990.github.io/javascript-exception-monitor/link.html)

```html
<script>
  window.addEventListener('error', function (event) {
    console.log('error message: ', event.message)
    console.log('error source: ', event.filename)
    console.log('error lineno: ', event.lineno)
    console.log('error colno: ', event.colno)
    console.log('error stack:\n', event.error.stack)
  }, true)
</script>
<script>
  function foo() {
    var n = 1
    n.split('')
  }
  foo()
</script>
```

#### unhandledrejection event

`error`事件无法监听到 Promise 异常，可以通过[`unhandledrejection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)事件来实现。

**查看在线示例：**[unhandledrejection.html](https://alex1990.github.io/javascript-exception-monitor/unhandledrejection.html)

```html
<script>
  window.onunhandledrejection = function (event) {
    var reason = event.reason
    console.log('error message: ', reason.message)
    console.log('error stack:\n', reason.stack)
  }
</script>
<script>
  function foo() {
    new Promise(function (resolve, reject) {
      reject(new Error('some error'))
    })
  }
  foo()
</script>
```

#### DOM Events

通过监听`window`上面的常见`DOM`事件，可以获取事件相关信息，比如事件类型、发生时间、事件触发元素路径等。需要注意，最好在捕获阶段监听，因为通常 Web 开发监听在冒泡阶段，而且有可能阻止事件冒泡。

**查看在线示例：**[dom-events.html](https://alex1990.github.io/javascript-exception-monitor/dom-events.html)

```html
<div class="page container">
  <button id="btn">Trigger Click Event</button>
</div>
<script>
  var toString = Object.prototype.toString
  var btn = document.getElementById('btn')
  btn.addEventListener('click', function (event) {
    event.stopPropagation()
    console.log('button clicked')
  })
  window.addEventListener('click', function (event) {
    console.log('event type: ', event.type)
    var path = []
    event.path.forEach(function (elem) {
      var tag = ''
      if (elem.nodeType) {
        if (elem.nodeType === 1) {
          tag += elem.tagName.toLowerCase()
          if (elem.id) {
            tag += '#' + elem.id
          } else if (elem.className) {
            tag += '.' + elem.className.replace(/\s+/g, '.')
          }
        }
        if (elem.nodeType === 9) {
          tag += 'document'
        }
      } else if (toString.call(elem) === '[object Window]') {
        tag += 'window'
      }
      path.push(tag)
    })
    console.log('event path: ', path)
    console.log('event', event)
  }, true)
</script>
```

### 接口重写

#### Ajax

可以通过重写`XMLHttpRequest`或者其原型方法来收集请求信息。

**查看在线示例：**[ajax.html](https://alex1990.github.io/javascript-exception-monitor/ajax.html)

```html
<script>
  var originalOpen = XMLHttpRequest.prototype.open
  var originalSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
    console.log('request method: ', method)
    console.log('request url: ', url)
    originalOpen.call(this, method, url, async, username, password)
  }
  XMLHttpRequest.prototype.send = function(data) {
    console.log(this)
    var _this = this
    var listener = function (event) {
      if (_this.readyState === 4) {
        console.log('response status', _this.status)
        console.log('response statusText', _this.statusText)
      }
      _this.removeEventListener('readystatechange', listener)
    }
    this.addEventListener('readystatechange', listener)
    originalSend.call(this, data)
  }
  var xhr = new XMLHttpRequest()
  xhr.open('get', '/')
  xhr.send(null)
</script>
```

#### console.log

通过重写`console.log`方法可以收集`console.log`输出。

**查看在线示例：**[console.html](https://alex1990.github.io/javascript-exception-monitor/console.html)

```html
<script>
    var LOG_MAX = 100
    var logs = []
    var originalLog = console.log
    window.console.log = function () {
      var args = Array.prototype.slice.call(arguments)
      var log = []
      args.forEach(function (arg) {
        if (typeof arg === 'undefined') {
          log.push('undefined')
        } else if (typeof arg === 'function') {
          log.push(arg.toString())
        } else {
          // Set, Map, ... need to be handled exceptionally
          log.push(JSON.stringify(arg))
        }
      })
      if (logs.length > LOG_MAX) {
        logs.shift()
      }
      logs.push(log)
      originalLog(JSON.stringify(logs))
    }
    console.log(1)
    console.log('hello world')
    console.log(function foo() {})
    console.log(null, undefined)
  </script>
  ```