---
title: "清除浮动影响——:after伪元素结合content属性方法"
cover: ""
date: "2013-02-02"
category: "前端"
tags:
  - 浮动
  - 布局
---

清除浮动的方法有很多，如：添加空div，让某一个元素（通常是footer）作清除元素，`overflow: hidden;`方法，利用CSS生成内容或JavaScript对浮动元素进行清理。这里只记录下利用`:after`伪元素和内容声明在制定的元素末尾添加新的内容的方法。

不过得先搞清楚一个问题：**为什么要对浮动元素进行清理？**

个人见解：一是浮动元素虽然不影响后面非浮动元素的布局，但是会影响元素里面的内容排版，这也是因为浮动的原理是利用添加外边距造成的，见下图；二是包含浮动元素的父容器会因为子元素脱离文档流而可能变成空元素或者发生高度塌陷。

![Float display](http://imgout.ph.126.net/12372012/layout-float-blog.jpg)

下面接着说利用CSS生成内容方法清理浮动元素的影响。

通常是对要清理的浮动元素添加clearfix类名，然后添加如下代码：

```css
.clearfix:after {
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}
```

**说明几点：**

1. 此方法在现代浏览器中能用，在IE6/7下不能用，因IE6/7不支持`:after`伪元素
2. 经测试`content: ""`也会使此方法生效
3. 高度为0，为了不使生成的内容占据垂直空间，`visibility: hidden`为了使内容不显示，因为生成的内容默认`display`属性值为`inline`，即为行框，而行框的上下外边距无效，影响清除，所以要设置：`display: block`
4. `content`属性是在元素**内容**后面添加内容，因此添加的内容仍被元素包裹着
5. 类名为什么为clearfix而不是clear呢？这个还真不太清楚，很多著名网站都用clearfix吧，也能区别以前的clear方法

IE6/7下要想使此方法生效，就得添加以下代码：

```css
.clearfix {zoom: 1;}
```

`zoom:1`可激活 IE 的专有属性`hasLayout`,有关神奇的引起诸多IE6 CSSbug的`hasLayout`属性，详情移步至：

英文原文：[http://www.satzansatz.de/cssd/onhavinglayout.html](http://www.satzansatz.de/cssd/onhavinglayout.html)，

中文译文：[http://www.blueidea.com/tech/site/2006/3698.asp](http://www.blueidea.com/tech/site/2006/3698.asp)。
