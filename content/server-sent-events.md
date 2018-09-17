---
title: "使用 Server-Sent Events"
cover: ""
date: "2016-05-08"
category: "前端"
tags:
  - SSE
  - Server Push
---

最近在做一个需要不断更新状态的功能时，简单对比了下轮询、Comet、SSEs（Server-Sent Events）以及 WebSocket 几种方案之后，选择了实现起来简单的 SSEs 方案。如果不是之前听同事介绍过，恐怕不知道何时才能了解这种技术，我发现这个实现简单的技术在网上的资源并不是很多，看过的几篇文章是三五年前写的。在实际的使用过程中加深了其设计的理解以及踩了一些坑。

## 为什么选用 Server-Sent Events

关于 SSEs 的简单使用可以参考 [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)，详细的介绍可以阅读 [Stream Updates with Server-Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)。

**轮询**作为一种经典的数据更新技术，通过不断发送 AJAX 请求来实现，其明显的缺点有：一是发送无用的请求；二是服务端数据更新时，客户端不能即时更新。

**Comet**是轮询的升级版，避免了其明显的两个缺点，但与 SSEs 相比较还是存在缺点，其实现方式比较 Hack，而且不是浏览器厂商特意设计出来的，对连接错误处理不可靠。详细介绍可参考 [Reverse Ajax, Part 1: Introduction to Comet](http://www.ibm.com/developerworks/library/wa-reverseajax1/)。

**WebSocket**是专门用来实现双通道通信的，对于只需要服务端更新数据的应用来说有点儿杀鸡用牛刀的意思，而且其实现比较复杂，需要服务器支持。而 SSEs 不需要服务器做特殊处理，同时 IE8+ 及现代浏览器都支持或有兼容性方案。

可能还有一个选择 SSEs 的原因，我想尝试下这种技术。

## 接口

浏览器端通过全局的 **[EventSource](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface)** 构造函数来创建到服务端的 SSEs 连接。

```js
var ev = new EventSource('/sseapi');
```

默认情况下请求遵循同源策略，如果要建立跨域连接，需要设置第二个参数：

```js
var ev = new EventSource('//api.domain.com/sse', { withCredentity: true });
```

### 兼容性方案

[Can I Use](http://caniuse.com/#feat=eventsource) 显示主要 IE 及 Android 2.1~4.3 是不支持 EventSource。

尽管[这里](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills#eventsource)列出了多个 Polyfills，但是从最近提交记录、测试等考量后，自己选用了 [https://github.com/amvtek/EventSource](https://github.com/amvtek/EventSource)，支持 IE8+ 及 Android Browser 2.1+。

## 实例

### 浏览器端

**sse-example.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Server-Sent Events Example</title>
  <style>
    form {
      font-size: 16px;
      margin-bottom: 1em;
    }
    button {
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form>
    <button type="button" id="close">关闭连接</button>
  </form>
  <div id="message"></div>
  <div id="result"></div>

  <script>
  var ev = new EventSource('/sseapi');

  // 打印`ev`
  console.log('ev:', ev);

  ev.addEventListener('message', function (e) {

    // 打印事件对象`e`
    console.log('e:', e);

    var message = document.getElementById('message');
    message.innerHTML = e.data;
  }, false);

  ev.addEventListener('init', function (e) {
    var result = document.getElementById('result');
    var data = JSON.parse(e.data);
    result.innerHTML = '<p>Username: <span id="username">' +
                      data.username + '</span><br>' +
                      'Score: <span id="score">' +
                      data.score + '</span></p>';
  }, false);

  ev.addEventListener('update', function (e) {
    var data = JSON.parse(e.data);
    var score = document.getElementById('score');
    score.innerHTML = data.score;
  }, false);

  ev.addEventListener('open', function (e) {
    console.log('Connection was opened.');
  }, false);

  ev.addEventListener('error', function (e) {
    console.error('Connection came across an error.');
  }, false);

  var closeBtn = document.getElementById('close');

  closeBtn.addEventListener('click', function (e) {
    ev.close();
    console.log('EventSource was closed.');
    console.log('ev:', ev);
  }, false);
  </script>
</body>
</html>
```

### 服务端

使用 NodeJS 及 Express 实现。

**sse-server.js**

```js
var express = require('express');

var app = express();
var PORT = 8020;

// Serve static file sse-example.html
app.get('/', function (req, res, next) {
  var fileName = 'sse-example.html';
  res.sendFile(fileName, { root: __dirname }, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent: ', fileName);
    }
  });
});

// Server-sent events api
app.get('/sseapi', function (req, res, next) {

  // 设置 HTTP Status Code 与 HTTP Headers
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  // 设定浏览器在连接断开后延迟多长时间重新建立连接
  // 通过 retry 字段控制，其单位为毫秒
  res.write('retry: 10000\n');

  // 通过 data 字段发送所要传输的数据，冒号后面的空格字符被忽略，
  // 必须以两个换行符结尾才会发送一个 Event
  res.write('data: Test default event name\n\n');

  var score = 0;

  // 如果不指定 event，其默认为 "message"，即客户端需要监听的事件名称
  res.write('event: init\n');
  res.write('data: {"username": "Alex Chao", "score": ' + score + ' }\n\n');
  res.flushHeaders();

  var timerId = setInterval(function () {
    score++;

    res.write('event: update\n');
    res.write('data: { "score": ' + score + ' }\n\n');
    res.flushHeaders();
  }, 3000);

  // 连接关闭后清除定时器
  req.connection.on('close', function () {
    console.log('Connection was closed.');
    clearInterval(timerId);
  });
});

app.listen(PORT, function () {
  console.log('Server listening on: http://127.0.0.1:%s', PORT);
});
```

[Github 下载代码](https://github.com/Alex1990/sse-example)

## 注意事项

- 服务端在连接关闭后应该中止任务，防止可能的内存泄露。
- 如果浏览器到服务器端存在代理，则代理服务器转发 HTTP chunk 时可能会出现问题，比如 Nginx 会立即将接受到的数据包转发出去，此时可配置`proxy_buffer off;`，可参考 [EventSource/Server-Sent Events through Nginx](http://stackoverflow.com/questions/13672743/eventsource-server-sent-events-through-nginx)。
- 网上有提到某些杀毒软件会阻止 event streaming data chunks，我是用的 OSX 系统安装了 Microsoft Endpoint Protection，没有发现有影响。

## 参考

- [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Reverse Ajax, Part 1: Introduction to Commet](http://www.ibm.com/developerworks/library/wa-reverseajax1/)
- [Stream Updates with Server-Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
- [Serve-sent events specification](https://html.spec.whatwg.org/multipage/comms.html#server-sent-events)
- [Server-sent events support](http://caniuse.com/#feat=eventsource)

