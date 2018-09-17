---
title: "Transition height from 0 to auto"
cover: ""
date: "2014-04-04"
category: "前端"
tags:
  - auto
  - height auto
  - transition
---

CSS3的transition可以作用于大部分属性值为数值之类的属性，包括width、height、font-size、color、opacity等。但是将transition应用于`height:auto;时`，浏览器会识别height值为0，因此无法直接从`height: 0;`过渡到`height: auto;`。

一种简单的方法是，将过渡应用于max-height属性，通过设置一个大于元素所可能达到的最大高度值。代码如下：

```css
.elem {
    max-height: 0;
    overflow: hidden;
    -webkit-transform: translate3d(0,0,0); /* 开启硬件加速 */
    transform: translate3d(0,0,0);
    -webkit-transition: all .3s ease-in;
    transition: all .3s ease-in;
}
.elem-show {
    max-height: 200px; /* 假如元素的最大可能高度为200px */
}
```

缺陷是，在元素最大可能高度与实际高度相差比较大时，由于过渡总是从最大可能高度过渡到0，因此会看到过渡效果有明显延迟。查看[DEMO](/demo/transition-auto-delay.html)
另一种方法是通过JS修正`height:auto;`不能过渡的问题，从而也避免了第一种方法的缺陷。思路是：

*   先不设置最大可能高度，先在隐藏状态下获取该元素的实际高度，通过设置`elem.style.visibility = 'hidden';`隐藏该元素;
*   要显示元素时，通过DOM2 Style的`insertRule()`方法将所获取的高度插入到样式表中，再添加一个class，触发过渡效果；
*   待要隐藏元素时，再通过`deleteRule()`把刚才添加的CSS规则移除，并去掉添加的class；
由于改变样式表，所以导致了全局重绘，性能不如第一种。

使用两种方法写的一个下拉菜单效果：[DEMO](/demo/transition-height-from-0-to-auto.html)，可查看相关源码

**参考资源：**

*   CSS transition height: 0; to height: auto;：[http://stackoverflow.com/questions/3508605/css-transition-height-0-to-height-auto](http://stackoverflow.com/questions/3508605/css-transition-height-0-to-height-auto)
*   CSS transition from/to auto values: [http://n12v.com/css-transition-to-from-auto/](http://n12v.com/css-transition-to-from-auto/)
