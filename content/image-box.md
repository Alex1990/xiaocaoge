---
title: "Image Box"
cover: ""
date: "2013-06-04"
category: "前端"
tags:
  - imagebox
---

通过在同一页面实现图片的浏览与查看，从而带来更好的用户体验，越来越与客户端的图片查看工具功能类似。将来，用户只用在网络上寻找、存储、编辑图片，不用下载到本地了。通过原生JavaScript实现的一个image box，比利用jQuery现成的插件要复杂的多。需要综合应用DOM编程能力，所以最好能之前有DOM处理的常见函数，比如DOM节点遍历、创建、删除、插入等。另外还要有处理BOM的函数，比如元素位置获得和修改、元素尺寸获得和修改、元素透明度变化等。这些东西都是《精通JavaScript》一书讲的，这本书对于如何打造自己的库很有帮助，当然对于学习jQuery也有用。书中讲了一个image box是实现，所以自己也跟着实现了一个。

DEMO：[image-gallery.html](/demo/imagebox/image-gallery.html)

有了之前的DOM和BOM函数库就可以很方便的开始编写了，学到的一些东西：

**跨浏览器透明度实现**

[http://www.quirksmode.org/css/opacity.html](http://www.quirksmode.org/css/opacity.html)

**动画及时间驱动函数使用**

无论渐变进入还是滑动进入动画效果，要看的自然些，应该开始的时候变化快，然后变化慢。

**渐进增强的JavaScript**

在JavaScript不能作用时仍然能够查看图片，可以为图片缩略图添加链接到图片地址的超链接。

**相关jQuery插件**

插件不仅可以实现图片的查看，还可以是其他任何HTML代码片段，比如注册、登录等。插件的兼容性处理都很好，从而只需关注那些需要定制的东西，如按钮样式、动画效果等。缺点可能就是需要依赖jQuery、也包括一些自己不需要的功能。

Fancybox

官网：[http://fancybox.net/](http://fancybox.net/)

ColorBox

官网：[http://www.jacklmoore.com/colorbox/](http://www.jacklmoore.com/colorbox/)

github：[https://github.com/jackmoore/colorbox](https://github.com/jackmoore/colorbox)
