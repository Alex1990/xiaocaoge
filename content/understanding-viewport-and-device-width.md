---
title: "理解viewport与device-width"
cover: ""
date: "2014-04-09"
category: "前端"
tags:
  - device-width
  - meta viewport
  - viewport
---

在响应式设计或移动Web开发当中经常见到的一句代码：

```html
<meta name="viewport" content="width=device-width">
```

content属性还包括initial-scale，user-scalable等，不过这里不谈，它们的意思都很容易理解。这里要谈得是：viewport代表什么？device-width又是啥？

### 先来理解两个概念：device pixels与CSS pixels。

device pixels指设备的物理像素，在PC端就是你在操作系统里设置的屏幕分辨率y，其值可以通过`screen.width/screen.height`获取。在移动端下面再说。

CSS pixels指在CSS文件中设置的字体大小、元素宽度等，如`font-size: 14px;` `width: 100px;` 。在PC端，浏览器缩放比例为100%，也即默认情况下，1 CSS pixel = 1 device pixel。

当你放大页面到200%时，字体大小与元素宽度的像素值不会改变，是因为这些像素值是用CSS pixels表示的，实际上放大的是CSS pixels，此时 1 CSS pixel = 4 device pixels，高和宽都是200%。此时你获取`screen.width/screen.height`的值，并没有变化，而`window.innerWidth`和`window.innerHeight`的值变成了原来一半，是因为`window.innerWidth/window.innerHeight`的值也是用CSS pixels来表示的。

当你进行流式布局时，会用百分比设置元素的宽度，比如一个块级元素宽度为10%，那么你也知道10%实际上是父级元素宽度的10%。但是你并没有设置父级元素的宽度啊，好吧，你也知道父级元素的宽度与其父级元素宽度一样（通过继承得来，假设这些元素都是块级元素）。然后向上到body元素的宽度，最终为html元素的宽度，其值可以通过`document.documentElement.clientWidth`获取。那这个宽度怎么来得呢？

### Viewport

viewport，翻译为视口，也即可视区域的大小，PC端通过`window.innerWidth`和`window.innerHeight`获取。

html元素也即文档的宽度，来自于viewport的宽度，在PC端要加上滚动条的宽度才会与viewport的宽度一样。因此，文档的宽度最终来自于viewport的宽度，PC端通过`window.innerWidth`获取。

## 而在移动端，情况将变得复杂。

首先，上面提到文档的宽度来自于viewport的宽度，我们把这个viewport称为layout viewport，因为它和布局有关。在手机上面，因为手机的屏幕很小，当初iphone发布时，为了显示完整的桌面网页，就把给layout viewport设置了一个980px的值。手机上，可以通过`document.documentElement.clientWidth`来获取，我在安卓手机上测试也是980px。

但是这样显示网页，那网页的字体、元素都很小，小到打开这样一个网页，首先要做的就是放大页面。为了提高可读性，Apple允许通meta标签来设置layout viewport的宽度，也即文章开头的那行代码。

### 但是，device-width又是什么呢？

第一代iphone的分辨率为320*480，屏幕尺寸为3.5寸。当时把layout viewport设置成与浏览器宽度一样（而手机上浏览器宽度与手机屏幕宽度一样）时，不用每次打开网页放大了，而且显示的字体与桌面上差不多，可读性很好。因此就定义了一个device-width，即是手机的屏幕分辨率，此时device翻译为“设备”还合适。

但是第二代iphone发布时，屏幕的分辨率变成了480*960，而屏幕尺寸仍然为3.5寸，如果device-width仍然为手机的屏幕分辨率宽度，那么字体将会比第一代小很多。所以，维持device-width的值不变将会是个很好得选择，能与前面兼容。也因此，iphone上的device-width的值一直为320，只不过device再表示“设备”已经不合适了，实际上代表的是一个中间层。而Android也采用了这一概念，其device-width的值为360的多，360=540/1.5，360=720/2。

### 如何获取device-width的值呢？

浏览器并没有提供一个获取device-width的属性或方法，但是通过`window.innerWidth`可以获取，需要注意的是，必须添加文章开头那行代码才可以跨浏览器获取。如果不添加那行代码，我自己在HTC G18/ Andoird OS 4.0.3中测试，自带浏览器/UC9.6/QQ5.0可以获取，而在Chrome33和Opera20中通过screen.width可以获取。iPhone与iPad我没测试。这是测试网页地址：

[/demo/viewport-screen-device-width-mobile.html](/demo/viewport-screen-device-width-mobile.html)。

Chrome与Opera比较深入实现了中间层的概念，屏幕的实际分辨率与Web开发关系并不大，Chrome与Opera就将`screen.width`返回中间层的宽度。这里我也不明白哪种设计更好些。

这里[有个链接](http://viewportsizes.com/?filter=)可以查看各种手机型号的device-width/device-height大小，虽然链接称为viewport size。

## 参考资源：

* A tale of two viewports - part one: [http://www.quirksmode.org/mobile/viewports.html](http://www.quirksmode.org/mobile/viewports.html)
* A tale of two viewports - part two: [http://www.quirksmode.org/mobile/viewports2.html](http://www.quirksmode.org/mobile/viewports2.html)
* (上面译文) 两个viewport的故事 - 第一篇：[http://weizhifeng.net/viewports.html](http://weizhifeng.net/viewports.html)
* 两个viewport的故事 - 第二篇：[http://weizhifeng.net/viewports2.html](http://weizhifeng.net/viewports2.html)
* Using the viewport meta tag to control layout on mobile browsers: [https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
* An introduction to meta viewport and viewport: [http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/)
* 什么是viewport，为什么需要viewport：[http://zhanchaojiang.iteye.com/blog/1470586](http://zhanchaojiang.iteye.com/blog/1470586)
