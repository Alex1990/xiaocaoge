---
title: "图像替换技术"
cover: ""
date: "2013-03-19"
category: "前端"
tags:
  - CSS
  - Image Replacement
  - 图像替换
---

图像替换技术是一个很基础的CSS技术，主要应用在网站logo的替换上或图片导航。实现方法有很多，从最古老的Farhrner方法，到应用最广的Phark方法，以及JavaScript实现方法，并且还在不断的演进当中，一种完美的方法尚未出现。在选择实现方法时，主要考虑的就是可访问性问题（即屏幕阅读器、图片无效或CSS无效时仍能正常访问），还有对搜索引擎的友好度。

一些相关文章链接：

1. [来自CSS-Trick的一篇文章，介绍了九种方法；](http://css-tricks.com/css-image-replacement/ "Nine Techniques For Image Replacement")

2. [一种替代text-indent:-9999px的方法；](http://www.zeldman.com/2012/03/01/replacing-the-9999px-hack-new-image-replacement/ "一种替代text-indent:-9999px的方法")

3. [一种js实现方法：状态域方法；](http://www.blueidea.com/tech/web/2009/6931.asp "图像替换——状态域方法")

这里就先学习下前辈们的一些方法，名字就懒得写了。

### Technique#1

**HTML**

```html
<h1 id="technique-one">
    <span>百度</span>
</h1>
```

**CSS**

```css
#technique-one {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif) no-repeat top left;
}
#technique-one span {
    display: none;
}
```

使用 display:none 会使屏幕阅读器读不出文本， 搜索引擎通常不会去检索被隐藏的内容，图片无效，CSS有效时，看不到任何内容，且需额外的sapn标签，因此这种方法已经被抛弃了，毕竟是十年的前的方法了。

### Technique#2

**HTML**

```html
<h1 id="technique-two">百度</h1>
```

**CSS**

```css
#technique-two {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif) no-repeat top left;
    margin-left: -2000px;
}
```

图像无效，CSS有效时将看不到任何东西，而且绘制大的框不高效。

### Technique#3

**HTML**

```html
<h1 id="technique-three">百度</h1>
```

**CSS**

```css
#technique-three {
    width: 117px;
    height: 38px;</div>
    background: url(bd_logo.gif);
    text-indent: -9999px;
}
```

应用广泛的一种技术，很简单，但图像无效、CSS有效时看不到任何东西，而且绘制9999px级别的框，造成低效。

### Technique#4

**HTML**

```html
<h1 id="technique-four">
    <a href="#">
        <img src="bd_logo.gif" alt="百度" />
    </a>
</h1>
```

**CSS**

```css
#technique-four {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif);
    text-indent: -9999px;
}
```

图像无效，CSS作用时无法显示文本，其他情况表现正常，对搜索引擎不友好。

### Technique#5

**HTML**

```html
<h1 id="technique-five">
    <img src="bd_logo.gif" alt="百度" />
    <span>百度</span>
</h1>
```

**CSS**

```css
#technique-five {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif);
}
#technique-five span {
    display: none;
}
```

图像无效，CSS有效时显示正常；但两者都无效时，显示双文本。

###Technique#6

**HTML**

```html
<h1 id="technique-six">百度</h1>
```

**CSS**

```css
#technique-six {
    width: 117px;
    padding-top: 38px;
    height: 0;
    background: url(bd_logo.gif) no-repeat;
    overflow: hidden;
}
```

可访问性好，高效，但图像无效、CSS有效时将会看不到任何东西。

### Technique#7

**HTML**

```html
<h1 id="technique-seven">
    <span>百度</span>
</h1>
```

**CSS**

```css
#technique-seven {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif);
}

#technique-seven span {
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
}
```

图像无效，CSS有效时将看不到任何东西，且需要额外的标记。

### Technique#8

**HTML**

```html
<h1 id="technique-eight">
    <span></span>百度
</h1>
```

**CSS**

```css
#technique-eight {
    width: 117px;
    height: 38px;
    position: relative;
}

#technique-eight span {
    background: url(bd_logo.gif);
    position: absolute;
    width: 100%;
    height: 100%;
}
```

图像无效，CSS有效时显示正常，但图像透明时，文本可能显示 出来，最好加上overflow:hidden设置，防止字体过大时显示出来。

### Technique#9

**HTML**

```html
<h1 id="technique-nine">百度</h1>
```

**CSS**

```css
#technique-nine {
    width: 117px;
    height: 38px;
    background: url(bd_logo.gif);
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}
```

图像无效，CSS有效时无法显示，不过相比#3高效。

当然，其实还有很多其他的方法，不过主要考虑的问题就是：可访问性、解析效率、对搜索引擎友好度、是否简单、兼容性等。
