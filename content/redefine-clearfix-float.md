---
title: "重新定义清除浮动"
cover: ""
date: "2014-05-25"
category: "前端"
tags:
  - CSS
  - float
  - 清除浮动
---

## 经典

以前最经典的清除浮动方法是利用`:after`伪元素，代码如下：

```css
.clearfix:after {
    content: "."; /* 元素内容后面，即元素闭合标签前面加个点 */
    height: 0; /* 伪元素高度为0 */
    visibility: hidden; /* 隐藏伪元素内容 */
    display: block; /* 默认是inline，所以默认clear不起作用 */
    clear: both; /* 清除浮动 */
}
.clearfix {
    zoom: 1; /* 针对IE6/7，触发hasLayout */
}
```

这种方法可兼容几乎所有浏览器，使用方便，不用在HTML代码中增加一个空标签，因此仍然被很多人使用。

但是，实际上针对IE6/7的方法与针对现代浏览器增加`:after`伪元素的方法本质上是不同的。针对IE6/7的`zoom:1;`使得元素触发了[hasLayout](http://satzansatz.de/cssd/onhavinglayout.html)这个IE专有特性，从而使得元素表现得如同现代浏览器里的[BFC](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context) (Block Formatting Context)一样，比如阻止与子元素垂直方向的[外边距叠加](http://www.w3school.com.cn/css/css_margin_collapsing.asp)、包裹内部的浮动元素、不与浮动元素重叠。而针对现代浏览器的`:after`伪元素方法具有了“包裹内部的浮动元素”这一功能，因此在特别的布局中会产生问题，比如被清除浮动元素与浮动元素并排时，又比如被清除浮动元素内部第一个元素具有垂直方向的外边距时，关于可能产生的问题详见这篇文章：[Everything you Know about Clearfix is Wrong](http://www.cssmojo.com/clearfix_block-formatting-context_and_hasLayout/)。

## 增强

鉴于以上问题，上面文章的作者后来在[clearfix Reloaded + overflow:hidden Demystified](http://www.yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/)一文中介绍了一种技术，利用`:before`伪元素在被清除浮动元素的内容前面插入伪元素，并设置`overflow:hidden`使该伪元素具有BFC，因此可以阻止与内部元素垂直方向的外边距叠加。代码如下：

```css
.clearfix:before,
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    overflow: hidden;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    zoom: 1;
}
```

## 精简

此后，来自Twitter的Nicolas Gallagher，也是normalize.css的作者，提出了一个更精简的实现方法，被他称为“micro clearfix”，此方法讲解可参考其写的一篇文章：[A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/)。其代码如下：

```css
.cf:before,
.cf:after {
    content: " ";
    display: table;
}
.cf:after {
    clear: both;
}
.cf {
    zoom: 1;
}
```

该技术关键之处：一是空格默认不会显示，二是利用`display:table;`可以产生一个`display:table-cell;`的匿名元素，而`display:table-cell;`可以使元素成为Block Formatting Context，从而避免了外边距叠加问题，从而和针对IE6/7的`zoom: 1;`设置表现一致。

另外，如果不打算兼容IE6/7，则可以去掉`zoom:1;`，也不用`:before`伪元素，而`content:” ”`;加一个空格是为了避免Opera里面的一个bug，但是在国内Opera的份额可以忽略不计。

另外的另外，我在[这里](http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best#answer-9932508)看到一个更精简的方法，兼容IE6+，代码只有三行：

```css
.cf {
    display: inline-block;
    width: 100%;
    zoom: 1;
}
```

## 参考资源

* CSS 101: Block Formatting Context: [http://www.yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/](http://www.yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/)
* How To Clear Floats Without Structural Markup: [http://www.positioniseverything.net/easyclearing.html](http://www.positioniseverything.net/easyclearing.html)
* Which method of clearfix is best?: [http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best](http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best)
