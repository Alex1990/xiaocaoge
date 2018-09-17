---
title: "浏览器请求性能数据"
cover: ""
date: "2017-05-01"
category: "前端"
tags:
  - 性能
  - 请求性能
---

性能似乎是编程当中一个永恒的话题，前端也不例外，而前端考虑性能的重要目的是提升用户体验。前端性能可以粗略地分为两部分：传输性能与运行性能。**传输性能**主要就是加载资源的请求耗时，**运行性能**主要就是应用运行时 CPU 耗时、内存及 GPU 内存等。通常在开发阶段，经常使用浏览器开发者工具来查看请求性能，比如查看`DOMContentLoaded`和`load`事件时间，又比如查看某个 AJAX 请求的相关时间。而由于线上产品会被不同地区不同网络条件的用户访问，可能全中国，也可能全球，可能使用电信，也可能使用网通，可能使用光纤，也可能是 4G。因此，要准确地衡量不同用户的请求耗时，就不能简简单单地通过自己的浏览器查看页面。有一种方式是通过遍布全国机房的服务端程序来发起请求统计不同地区请求耗时，但机房网络条件通常都比用户的网络条件好，所以这种方法还是不准确。

## 相关规范

因此，[W3C Web 性能工作组（W3C Web Performance Working Group）](https://www.w3.org/webperf/)制定了用户测量请求性能的规范：

- [High-Resolution Time](https://w3c.github.io/hr-time/)：定义了精读可达 5 微秒级别的时间类型，用于更精确的时间衡量。
- [Navigation Timing](https://w3c.github.io/navigation-timing/)：定义了页面请求性能相关信息。
- [Resource Timing](https://w3c.github.io/resource-timing/)：定义了页面其他资源请求性能相关信息。
- [Performance Timeline](https://w3c.github.io/performance-timeline/)：定义了获取性能测量值相关的接口，包括获取页面请求性能与页面资源请求性能相关信息。

相关规范及发布状态请查看[表格](https://bit.ly/w3c-webperf-status)。
### High-Resolution Time

该规范主要定义了 [DOMHighResTimeStamp](https://w3c.github.io/hr-time/#dom-domhighrestimestamp) 类型，用于存放精读最高可达 5 微秒的时间值，单位是毫秒。至于，为什么精读只能到 5 微妙，是因为[隐私与安全考虑](https://w3c.github.io/hr-time/#privacy-security)。

另外该规范还定义了`Performance`接口以及该接口的实现`performance`全局属性，一些性能相关的接口都挂载这个属性上面。

### Resource Timing

该规范定义了`PerformanceResourceTiming`接口，这个接口用于页面内资源请求的时间测量。

#### `PerformanceResourceTiming` 接口

该接口扩展了 [PerformanceEntry](https://www.w3.org/TR/performance-timeline-2/#performanceentry) 接口属性。例如下图展示了 Chrome 58 所支持的属性：

[![PerformanceResourceTiming 接口属性](/images/browser-request-performance-collect/PerformanceResourceTiming-attributes.png)](/images/browser-request-performance-collect/PerformanceResourceTiming-attributes.png)

各属性的含义还是比较直观的，下图展示一个请求周期各阶段的划分：

[![Resource Timing 请求阶段划分](/images/browser-request-performance-collect/resource-timing.png)](/images/browser-request-performance-collect/resource-timing.png)

具体各属性的含义及属性值详见规范中的[解释](https://w3c.github.io/resource-timing/#performanceresourcetiming)。

#### 哪些资源包含在`PerformanceResourceTiming`接口里面

此接口包括的请求类型有：XMLHttpRequest 对象，HTML 元素 iframe、image、script、object、embed、link[type="stylesheet"]、svg。而 Server Sent Events 和 WebSocket 并不包括，可能是因为这些连接属于“长连接”，而 Fetch API 发起的请求，旧版本浏览器是不支持的。

具体哪些资源加载应该包含进`PerformanceResourceTiming`，既要看[规范规定](https://w3c.github.io/resource-timing/#resources-included)，也要实际测量，各浏览器及各版本支持情况可能不同。

### Navigation Timing

规范定义了`PerformanceNavigationTiming`接口，该接口扩展了`PerformanceEntry`和`PerformanceResourceTiming`接口，下图展示了 Chrome 58 所支持的属性：

[![PerformanceNavigationTiming 接口属性](/images/browser-request-performance-collect/PerformanceNavigationTiming-attributes.png)](/images/browser-request-performance-collect/PerformanceNavigationTiming-attributes.png)

各属性的含义还是比较直观的，下图展示一个请求周期各阶段的划分：

[![Navigation Timing 请求阶段划分](/images/browser-request-performance-collect/navigation-timing.png)](/images/browser-request-performance-collect/navigation-timing.png)

### Performance Timeline

[Performance Timeline](https://w3c.github.io/performance-timeline/#extensions-to-the-performance-interface) 规范定义了获取页面请求性能即页面资源请求性能信息的接口。

通常使用下面代码获取页面资源请求性能：

```js
performance.getEntriesByType('resource');
```

而获取页面请求性能通过：

```js
performance.timing;
// 或
performance.getEntriesByType('navigation'); // 需浏览器支持 performance.getEntriesByType() 方法，不如 performance.timing 兼容性好
```

### 兼容性

[Can I use](http://caniuse.com/#search=performance) 网站包含上面规范的兼容性，但是不详细，没有说明规范的各版本支持情况，也不包括 Performance Timeline 兼容性信息。

- [High Resolution Time API support](http://caniuse.com/#feat=high-resolution-time)
- [Navigation Timing API support](http://caniuse.com/#search=nav-timing)
- [Resource Timing support](http://caniuse.com/#feat=resource-timing)

## 收集请求性能信息

### 获取请求性能信息

通过`performance.timing`即可获取当前页面请求性能信息。下面主要说下获取页面资源请求的性能信息注意事项：

#### Resource Timing 包含哪些资源

理论上所有从服务器请求的资源都被包含进来，但是有一些特殊情况，如 WebSockets、ServerSentEvent、DNS 查询失败、TCP 失败、服务端 4xx/5xx 响应等是否包含。

#### 缓存的资源

目前没有办法区分资源是否从缓存中加载的，只不过缓存的资源，一般`duration`值非常小（比如小于 10 毫秒）。

#### ResourceTiming Buffer

每个页面文档都有一个 ResourceTiming buffer 用于限制可以包含多少`PerformanceResourceTiming`对象，默认情况下浏览器将此设为 150，这是规范当中建议设置的大小。而实际应用当中虽然页面初次加载请求数一般不会超过 150，但是后面的 AJAX 请求，或者说应用是单页面应用，则通常会超过 150。

可以使用一个方法监听 [resourcetimingbufferfull](https://w3c.github.io/resource-timing/#dom-performance-onresourcetimingbufferfull) 事件，然后当该事件触发时，使用 [clearResourceTimings()](https://w3c.github.io/resource-timing/#dom-performance-clearresourcetimings) 来清空已有的数据。如下代码所示：

```js
if ('performance' in window && typeof window.getEntriesByType ===
    'function') {
  const bufferFullListener = () => {
    const resourceTimings = performance.getEntriesByType('resource');
    performance.clearResourceTimings();

    // Send resourceTimings to server
  };

  performance.addEventListener('resourcetimingbufferfull', bufferFullListener);
}
```

另外，不可以通过向方法`setResourceTimingBufferSize(n)`传入一个很大的值来避免 buffer 溢出，因为该方法会增加浏览器所需内存。

### 跨域

如果请求资源属于跨域请求，那么下面的时间值会被设为`0`：

- `redirectStart`
- `redirectEnd`
- `domainLookupStart`
- `domainLookupEnd`
- `connectStart`
- `connectEnd`
- `requestStart`
- `responseStart`
- `secureConnectStart`

除非所请求资源的包含合适的响应头部 [Timing-Allow-Origin](https://w3c.github.io/resource-timing/#timing-allow-origin) 允许当前文档中的脚本获取请求性能信息。通常服务静态资源（JS、CSS、字体文件等）的 CDN 请求响应应该带上`Timing-Allow-Origin`。

### 接口设计

**POST**

由于 Navigation Timing 和 Resource Timing 数据量比较大，所以需要使用 POST 方法，来将数据发送到服务端。实际应用当中，进行请求性能数据收集的服务在独立的域名，其他很多不同域名的应用会进行跨域请求。

**传输格式**

还是因为发送数据量大的原因，可能需要对数据进行压缩，比如使用 gzip、[lz-string](https://github.com/pieroxy/lz-string) 或者[自定义压缩算法](https://github.com/nicjansma/resourcetiming-compression.js)。

### Beacon

当用户刷新页面、跳转到另一个页面或者关闭当前页面时，如何将已经收集的性能数据发送到服务端是一个问题。一种常见的思路是通过绑定`window`的`unload`/`beforeunload`事件，当该事件触发时发送一个 Ajax 请求。然而，无论异步 Ajax，还是同步 Ajax 都有缺陷：

- 异步 Ajax：使用 Chrome 58 测试发现，在页面刷新或者跳转到另一个页面时，未完成的 Ajax 会被取消。
- 同步 Ajax：只有到请求完成之后才会刷新或跳转到另一个页面，从而降低页面跳转性能。

因此，[Beacon](https://www.w3.org/TR/beacon/) 规范就被制定出来解决这个问题，该规范包含了一个`sendBeacon()`方法，该方法在`navigator`上面。一个使用示例：

```js
// Send navigation timing data to server
function sendData() {
  const data = new Blob([JSON.stringify(performance.timing)], {
    type: 'application/json',
  });
  navigator.sendBeacon('/timing', data);
}
window.addEventListener('unload', sendData);
```

**兼容性**： 可以参考 [Beacon API in caniuse.com](http://caniuse.com/#feat=beacon)，除了 IE 与 Safari，其他浏览器都在很早就支持了。

**跨域**：可以查看规范的 [Privacy and Security](https://www.w3.org/TR/beacon/#privacy) 部分，但是我在实际测试跨域发送 JSON 数据时，Chrome 58 当中不会发送额外的`OPTIONS`请求，而 Firefox 53 发送额外的`OPTIONS`请求，请求相应头部需要包含下面的跨域相关头部。

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

另外，使用`sendBeacon()`无法获知请求响应状态，不过这对于数据收集类请求不算问题。

## 相关链接

- [A Primer for Web Performance Timing APIs](https://w3c.github.io/perf-timing-primer/)
- [Resource Timing practical tips](https://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/)
- [Understanding resource timing](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing?hl=en)
- [Navigation timing in practice](http://nicj.net/navigationtiming-in-practice/)
- [Resource timing in practice](http://nicj.net/resourcetiming-in-practice/)

## 更新日志

- 2017-05-11 修正错误：Firefox 无 bug，跨域请求默认`credentials: true`，且 Chrome 不符合规范。
- 2017-05-07 添加 Beacon 部分
