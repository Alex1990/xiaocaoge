---
title: "去除inline-block元素间空白间隙方案"
cover: ""
date: "2013-05-03"
category: "前端"
tags:
  - inline-block
  - 空白
---

通常在两个相邻元素均设置display:inline-block后，两个元素之间会有空白间隙（大多数浏览器中为4px），如下面代码：

HTML:

```html
<ul>
    <a href="#">One</a>
    <a href="#">Two</a>
    <a href="#">Three</a>
</ul>
```

CSS:

```css
ul a {
    display: inline-block;
    padding: 5px;
    background: #aaa;
}
```

形成空白是因为浏览器把标签间的空白当成一个文本节点来渲染。消除空白的方法很多，从HTML代码、CSS、JavaScript入手的都有，但是能够跨浏览器、简单的方法并不是很多，自己还没找到一种完美的方法。不过已知的方法，足以用来应付日常开发了，下面从HTML、CSS、JavaScript三方面介绍。

### HTML

最直接简单的一种就是把标签写在一行，消除标签间空白。此方法兼容所有浏览器，只是一来写在一行看着不习惯，二来用感觉应该用CSS控制样式规范些。
还有各种改变标签写法的方法，详细参考：

* [Fighting the Space Between Inline Block Elements](http://css-tricks.com/fighting-the-space-between-inline-block-elements/)

### CSS

**设置font-size：**自己觉得比较好的一种CSS方法就是，其父元素设置`font-size: 0;`然后本身都重新设置下字体。这种方法在Safari 5下无效（6没测），还得在父元素上设置letter-spacing: -4px，子元素`letter-spacing: normal;`才能兼容所有浏览器，而且添加代码只有几行。

**负外边距：**设置`display: inline-block;`的同时添加`margin-left: -4px;`。但是此方法，在IE6/8下测试不行，这两个浏览器中空白间隙宽8px，当然也可添加针对IE的注释条件倒可以兼容所有浏览器，而且添加的代码并不多。

**负单词间距：**给父元素添加`word-spacing: -4px;`也可以，原理同负外边距一样，而且还得加`letter-spacing: -4px;`因`word-spacing: -4px;`在Safari 5中不起作用。

**浮动：**干脆不设置`display: inline-block;`，改为设置`display: block;`加浮动，这样效果相似，且没有空白间隙的烦恼。

### JavaScript

原生JavaScript实现代码太长，因此若使用jQuery库的话，可用以下代码：

```js
$('a').contents().filter(function() {
    return this.nodeType === 3;
}).remove();
```

#### 参考文章

1.  [inline-block元素的4px空白间距解决方案](http://www.th7.cn/web/html-css/201212/9802.shtml)
2.  [Fighting the Space Between Inline Block Elements](http://css-tricks.com/fighting-the-space-between-inline-block-elements/)
3.  [Inline-Block whitespace workaround](http://www.lifeathighroad.com/web-development/css-web-development/inline-block-whitespace-workaround/)
4.  [How to remove the space between inline-block elements?](http://stackoverflow.com/questions/5078239/how-to-remove-the-space-between-inline-block-elements)
