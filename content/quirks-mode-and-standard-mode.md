---
title: "浏览器渲染模式：Quirks Mode And Standard Mode"
cover: ""
date: "2013-04-26"
category: "前端"
tags:
  - quirks
  - quirks mode
  - strict mode
---

由于在写一个测试网页（中文）时，没有声明DOCTYPE，也没有用meta标签来指明使用何种字符编码方式，导致在除Chrome外的其他几大浏览器均出现乱码现象。只含有DOCTYPE而没有使用meta指明编码时，在FireFox中会出现乱码。然后经由百度和Google偶然间得知浏览器还有一种称为“Quirks”的模式，在未声明DOCTYPE时就是此模式。

在W3C标准出台以前，浏览器对页面的渲染与标准不一致，比如IE6之前的版本与标准在盒模型方面的宽度定义不同。而在出台以后，各浏览器逐渐趋向支持标准，问题是之前产生的大量网站的网页已经不符合标准，因此从IE Mac开始，IE6，Mozilla，Safari以及Opera等相继支持两种模式——Quirks Mode和Standard Mode（也称为Strict Mode）。Quirks Mode来显示以前的页面，Standard Mode显示符合标准的页面。后来从FireFox开始，大部分现代浏览器(Opera,Chrome,Safari,IE8-10)，支持了一种称为”Almost Standard Mode“的模式，也就是接近标准的模式。

**浏览器怎么决定采用那种模式呢？**这也引出了DTD声明，浏览器通过在页面开始声明不同类型的DOCTYPE来选择使用哪种模式。没有DOCTYPE时，就像以前的网页，浏览器会选择Quirks模式。关于各个浏览器对不同的DOCTYPE来选择何种模式，可以参考此文：[Activating Browser Modes with Doctype](http://hsivonen.iki.fi/doctype/)底部的表格。

**如何检测当前模式？**通过在地址栏中输入以下代码：

javascript:alert(document.compatMode)

BackCompat：对应quirks mode
CSS1Compat：对应standard mode

**两种模式有何区别？**主要表现在盒模型的定义上不同：

strict mode中，width不包括边框和内边距；quirks mode中，width包括边框和内边距。
在所有现代浏览器中可以通过box-sizing属性选择采用那种盒模型。

两种模式的其他方面的不同可以参见这两篇文章：

[What happens in Quirks Mode?](http://www.cs.tut.fi/~jkorpela/quirks-mode.html)

[Quirks mode and strict mode](http://www.quirksmode.org/css/quirksmode.html)
