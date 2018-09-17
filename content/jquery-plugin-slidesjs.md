---
title: "jQuery图片播放插件——Slidesjs"
cover: ""
date: "2013-05-08"
category: "前端"
tags:
  - SlideJS
  - slideshow
  - 图片轮播
---

一款具有滑动切换和渐变切换效果的图片播放插件，可以定制左右按钮、播放/停止按钮等，标准的效果图如下

[![1872934495132729043](/uploads/2013/02/1872934495132729043.jpg)](/uploads/2013/02/1872934495132729043.jpg)

**DEMO：**[slidesjs-example](/demo/slidesjs-example/slidesjs.html)

**DEMO下载：**[slidesjs-example](/demo/slidesjs-example.zip)

**插件下载：**[SlidesJS DOWNLOAD](https://github.com/nathansearles/Slides/archive/SlidesJS-3.zip)

**插件设置说明：**[SlidesJS DOCS](http://www.slidesjs.com/#docs)

需要说明的几点：

### **图片宽度：**

使用时发现必须得通过CSS设置外层的DIV的宽度才有效，仅仅通过插件里面设置不起作用。

### 兼容IE6

**PNG透明：**导航按钮要用到PNG图片，要求背景图透明，支持:hover，支持CSS Sprite，经过尝试iepngfix.htc和DD_belatedPNG.js方法均不行。首先是显示有瑕疵像素，其次似乎不支持利用JS动态加入的class。对于这种只有几种单色的图片，直接使用GIF或PNG-8就可以了，使用Photoshop转换一下即可，这种方法简单、不添加多余代码、通用性强、显示效果好。IE6支持PNG透明的详细解决方案可参考此贴：[IE6 PNG透明终极解决方案](http://www.w3cfuns.com/thread-297-1-1.html)。

**相邻inline-block元素间空白问题：**此处在其父元素设置font-size:0; 此问题的解决方案可参考文章：[去除inline-block元素间空白间隙方案](/get-rid-of-the-space-between-inline-block.html)。

### 导航按钮位置及样式

可以通过CSS浮动或绝对定位将按钮放到任何位置，更可以替换成自己的按钮图片，这都是CSS的事儿。
