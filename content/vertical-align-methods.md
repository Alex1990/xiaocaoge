---
title: "垂直居中（Vertical-Align)"
cover: ""
date: "2013-06-06"
category: "前端"
tags:
  - vertical-align
  - 垂直居中
---

垂直居中包括单行文本居中、单元格（td）内容居中、块级元素居中。由于单元格的display属性为table-cell，且浏览器默认vertical-align:middle，所以就是默认垂直居中，不做考虑。要注意的就是vertical-align属性的含义是设置内联元素在行框（一行）内的垂直对齐方式，对于display:table-cell的元素也适用，但是IE8+才支持display:table-cell设置，于是就有了各种跨浏览器垂直对齐的方法。

**DEMO：**[vertical align methods](/demo/vertical-align/vertical-align.html)

### 单行文本

此种情况最简单，使用line-height来控制元素的高度即可，兼容IE6+及其他现代浏览器。

HTML:

```html
<div>
    <div class="child">Text here</div>
</div>
```

CSS:

```css
.child {
    line-height:50px;
}
```

而此种方法对于display为inline或inline-block的元素也适用，只不过元素要加上vertical-align:middle，而且不兼容IE6。

HTML:

```html
<div>
    <div class="child">
        <img src="images/1024.jpg" alt="" />
    </div>
</div>
```

CSS:

```css
.child {
    line-height:300px;
}
img {
    width:200px;
    vertical-align:middle;
}
```

### 块级元素

块级元素的垂直对齐方法有很多种，但有些方法必须要求知道和统一块级元素的高度，有些不需要但是跨浏览器支持不好，最后还得需要针对个别浏览器（IE6、7）单独设置。

**元素高度预知：**

（两种方法兼容IE6+，Chrome，Firefox，Safari，Opera）

设置相等的内边距或外边距

HTML:

```html
<div class="parent">
    <div class="child">Div here</div>
</div>
```

CSS:

```css
.parent {
    padding:5% 0;
}
.child {
    height:50px;
}
```

绝对定位和负外边距

HTML:

```html
<div class="parent">
    <div class="child">Div here</div>
</div>
```

CSS:

```css
.parent {
    position:relative;
    height:100px;
}
.child {
    position:absolute;
    top:50%;
    height:50px;
    margin-top:-25px;
}
```

**元素高度不可预知：**

table-cell方法

(不兼容IE6-7)

HTML:

```html
<div>
    <div class="child">Div here</div>
</div>
```

CSS:

```css
.parent {
    display: table;
}
.child {
    display: table-cell;
    height: 200px;
    vertical-align:middle;
}
```

兼容所有现在浏览器的方法

DEMO: [multi-lined text vertical align](/demo/vertical-align/multi-lined-text-vc.html)

HTML:

```html
<div>
    <div>
        <p>To look best, text should really be centered inside this bubble both vertically and horizontally.</p>
    </div>
</div>
```

CSS:

```css
.area {
    display: table;
    width: 200px;
    height: 150px;
    background: #eee;
}
.bubble {
    display: table-cell;
    vertical-align: middle;
}
.bubble p {
    border: 1px solid red;
}
```

兼容IE6-7，利用条件注释单独设置，而且要添加一个多余的div标签，下面针对IE6-7的代码对于其他现代浏览器并不适用。

HTML:

```html
<div>
    <div>
        <div>
            <p>To look best, text should really be centered inside this bubble both vertically and horizontally.</p>
        </div>
    </div>
</div>

<!--[if lt IE 8]>
<style type="text/css">
    .bubble {
        position:relative;
    }
    .bubble div {
        position:absolute;
        top: 50%;
        width:100%;
        background:#aaa;
    }
    .bubble div p {
        position:relative;
        top:-50%;
    }
</style>
<![endif]-->
```
