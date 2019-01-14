---
title: "HTML 转 PDF 方案"
cover: ""
date: "2019-01-14"
category: "JavaScript"
tags:
  - "HTML"
  - "PDF"
  - "HTML to PDF"
---

在 Web 开发当中，HTML 转 PDF 是一个常见的需求，比如一些报告、证明等经常需要提供 PDF 格式文件，又或者一些内容需要转成 PDF 来供用户阅读。最简单的 HTML 转 PDF 的方式可能就是直接使用浏览器的打印功能来将整个页面转成 PDF。但是这种方式有很多缺点：

* 操作略繁琐，增加用户使用门槛
* 移动端或者其他嵌入应用未必有打印功能
* 样式在不同终端可能不一致

所以需要使用其他方式，通常有两类：服务端或客户端。

## 服务端

**优势**

* 无需解决客户端兼容性问题。
* 无需耗费客户端计算资源。
* 可缓存：相同内容只需要转换一次，使用文件 hash 或者其他唯一性标识校验。不一定以文件作为最小单元，假如是幻灯片之类的应用可以每张幻灯片作为最小单元，从而实现文件级别增量转换。
* 预渲染：可以提前转换好，用户可以即时下载。

**劣势**

* 占用网络带宽。

不同的语言有各自的解决方案（包/模块），如果是使用 Node.js 可以考虑使用 [puppeteer](https://github.com/GoogleChrome/puppeteer) 来开发。Puppeteer 是通过调用 Chrome 或者 Chromium 来实现 HTML 转 PDF，因此对于 HTML/CSS/JS 支持很好。也有基于 puppeteer 封装成的 URL 转 PDF 服务 [url-to-pdf-api](https://github.com/alvarcarto/url-to-pdf-api)。当然，puppeteer 在生成 PDF 时可能存在 bug，比如 [pdf size not completely equal to the page. （l can repeat）](https://github.com/GoogleChrome/puppeteer/issues/683)。

除了使用 puppeteer，也可以使用基于 Webkit 内核的 [wkhtmtopdf](https://github.com/wkhtmltopdf/wkhtmltopdf)，这个工具提供命令行方式调用，在个人需要将一些文档等转成 PDF 时很实用。

## 客户端

**优势**

* 节省服务器计算与存储资源。
* 节省网络带宽。

**劣势**

* 耗费客户端计算资源，HTML 生成图片及图片添加到 PDF 当中都是比较耗时的任务，会阻塞 DOM，CSS 动画等渲染。
* 基本上无法应用缓存，所以无法做到即时下载，用户需要等待。
* 兼容性问题，通常 IE10+ 才可以，在低版本移动端操作系统也会有兼容性问题。
* CSS 支持问题

客户端有一些使用 JS 来生成 PDF 的库，比如 [jsPDF](https://github.com/MrRio/jsPDF)，可以创建 PDF 的基本单元：文本、图片等。然后如果我们能将 HTML 转成一页一页的图片，然后将这些图片添加到 PDF 当中，这样就可以实现 HTML 转 PDF 了。使用 [html2canvas](https://github.com/niklasvh/html2canvas) 可以实现 HTML 转图片，而且已经有封装好的包了 [html2pdf](https://github.com/eKoopmans/html2pdf)。

html2canvas 对于某些 CSS 属性并不支持，比如`box-shadow`，支持列表可以查看[文档](https://html2canvas.hertzen.com/features)。另外，因为正确渲染 HTML 与 CSS 是一件复杂的事情，而 html2canvas 几乎只有一个人在开发，会有不少 bug，比如渲染 KaTeX 生成的公式就有问题 [Rendering &lt;svg&gt; with bug which is set with the css "width" style and svg "width" attribute](https://github.com/niklasvh/html2canvas/issues/1418)。

html2pdf 如果一次性渲染很多页比较复杂的 HTML 时会让用户明显感受到阻塞浏览器响应用户操作，可以一次 event loop 只渲染一页内容来解决这个问题，同时还可以支持渲染页数进度功能。这些我以前的工作当中实现过：[Alex1990/html2canvas](https://github.com/eKoopmans/html2pdf/compare/master...Alex1990:master)，虽然我现在已经看不大懂自己写的代码了。

另外，因为是先转成图片，然后再生成 PDF，所以 PDF 当中的文本是无法选中的。

## HTML 转 图片

与 HTML 转 PDF 类似，不仅是可以分为服务端与客户端，而且采用的技术也是类似的。服务端可以使用 puppeteer，客户端可以直接使用 html2canvas。

## 总结

相比于节省的服务器资源和网络带宽，生成的 PDF 质量以及用户体验更重要。对于简单少量的内容来说，使用客户端生成方案可以应对，但是对于复杂大量的内容来说使用服务端渲染方案更好。而且应该把服务端 HTML 转 PDF/图片 做成一个相对通用基础的服务，供各业务开发使用，甚至应该是云计算厂商的周边服务，供很多企业使用。
