---
title: "从“On having layout”可以学到什么"
cover: ""
date: "2013-04-26"
category: "前端"
tags:
  - ie6
  - layout
  - 布局
---

早先从《精通CSS》一书中知道有这么一篇文章专门讲IE的一个专有属性hasLayout，hasLayout就是IE6/7中诸多bug的罪魁祸首。说是一篇文章，读完之后发现是“一本书”，知识容量有点大，有40页左右，再加上必须看里面链接的文章，估计总共不下百页，花了三天才马马虎虎看完，期间发生大脑神志模糊、缺氧等症状。言归正传：

原文链接：[On having layout](http://www.satzansatz.de/cssd/onhavinglayout.html)

BlueIdea的译文：[On having layout](http://www.blueidea.com/tech/site/2006/3698.asp)

“Layout”是IE/Win的一个私有概念，用来控制元素的尺寸和定位，拥有布局（have layout）的元素负责本身及其子元素的尺寸和定位。如果一个元素没有拥有布局，那么它的尺寸有最近的拥有布局的祖先元素控制。（这句话摘抄的，读得是云里雾里）

通常IE6/7中的bug可以通过使元素拥有布局（hasLayout = true）来解决，默认情况下拥有布局的元素包括：

* html
* table
* tr、td
* img
* hr
* input、select、textarea、button
* iframe、embed、object、applet
* marquee

  上面没几个是常用的元素，需要指出的是hasLayout不是CSS属性，不可以通过设置hasLayout = true 使元素拥有布局，可以通过设置某些CSS属性来触发hasLayout属性：
* float: left/right;
* display: inline-block;
* width: 任何值
* height: 任何值
* zoom: 任何值（IE的专有属性，常用）
* writing-mode: tb-rl（IE的专有属性）

在IE7中，下面属性也可以触发布局

* overflow: hidden/scroll/auto;
* min-width: 任何值
* max-width: 除none之外任何值

详细的关于hasLayout触发和重置（使元素不具有布局）的条件可参考此文：[layout-trigger-comparison](http://onhavinglayout.fwpf-webdesign.de/hack_management/)，第二部分是关于如何用条件注释管理IE hack的。

怎么查看一个元素是否具有布局呢？可以通过地址栏输入代码：

javascript:alert(eid.currentStyle.hasLayout)

“eid”指某个元素

另外也可以通过IE的Developer Toolbar查看，若hasLayout 为 true，其值为-1。

**一些关于hasLayout的实例：**

（本人采用以下浏览器验证：IE6（绿色版），IE7（IE8中的IE7模式），IE8，Chrome25，Firefox19，Opera12，Safari5/Win）

**包含浮动元素(Containing Floats):**

即一个容器内子元素浮动，若容器具有Layout，则容器会包含子元素，也就是自动扩展以适应内容(extend-to-fit)。设置容器高度，百分比为单位时，IE7才会自动扩展overflow:hidden|scroll|auto; 添加layout，仅对IE7有效，且在IE7中的表现和在其他现在浏览器中一样，会包含子元素。position: fixed同样。

另外，若容器相对定位，比如向左偏移（left: -20px），则在IE6中，浮动的子元素不会跟着发生偏移，除非容器具有layout

**紧跟浮动元素的元素(Elements next to floats)：**

若为块级元素，其包含的内容会被浮动元素挤占(标准情况下)

如果块级元素具有layout，则块级元素也会被浮动元素挤开，并且其包含的的内容也不会跑到浮动元素的下面形成环绕。另外在给块级元素使用相对定位时，相对原点也会从浮动元素的右上角计算。还有注意IE6下的3像素偏移bug。

**列表的项目符号**

IE6/7中的是通过列表的外边距空出空间的，而在其他现在浏览器中是通过列表的内边距空出空间的。若使列表具有layout，则会使项目符号凭空消失，也可能发生其他定位问题。

**有序列表序数数字**

IE6/7中有序列表项具有layout时，会从新计数，即从1开始；通常情况下应该给列表外面的容器设置宽度，设置列表项里面的内容的高度，从而避免使列表或列表项具有layout。

**垂直列表项目之间的空白间隔**

IE6 中，若列表项的内容是一个块级元素（比如anchor）时，多行列表项之间会形成空白，就好像插入了一个看不见的列表项，避免的方法有：

a. 使列表项的块级内容具有layout（标签a的鼠标单击/悬浮感应区域扩展，就是超链接的click和hover事件，同其他现代浏览器）

b. 设置列表项 display为 inline（标签a的鼠标单击/悬浮感应区域并不扩展）

**IE6下常规的垂直导航列表，列表元素(ul/ol浮动时**

若&lt;a&gt;没有layout则列表项之间有空白间隔，且&lt;a&gt;不具有扩展的点击或悬浮感应区域，但列表会收缩包裹；

若&lt;a&gt;有layout，则列表项之间无空白间隔，&lt;a&gt;具有扩展的点击或悬浮感应区域，但列表项会扩展直到整个宽度（指最近的祖先元素所限制的宽度）。

若列表项浮动（即想制作水平列表），&lt;a&gt;具有haslayout，且不浮动时，列表项扩展直到整个宽度，且有垂直空白间隔，解决方法时，让&lt;a&gt;不具有layout，或具有浮动。

**浮动之后的清理元素与浮动元素接触**

容器包含一个浮动元素时，若浮动之后的清理元素与浮动元素接触(外观接触），则在IE6/7中发生多种问题：容器的margin可能不起作用；清理元素之前的标准流内容，若不具有haslayout会消失。

**1像素舍入误差（1 pixel rounding error）**

绝对定位的元素以相对单位(%/em)为长度单位时，在IE6/7中可能会有1像素的计算误差，这取决于相对单位值大小和窗口的大小(也是祖先定位元素的大小)。

另外，绝对定位元素的百分比宽度或高度会根据最近已定位的祖先元素(relative,absolute,fixed)计算，但是在IE6中，会根据其父元素计算。

**对表单元素左外边距的影响**

IE6/7 表单元素的父元素若具有layout，则表单元素(除checkbox,radio,image和textarea)和select elements会继承所有祖先元素的左外边距之和。解决方法：通常可以在表单元素外加一个不具有layout的内联元素，如label,span，当然也可以是p块级元素。

**对背景属性的影响**

IE6/7 ：background-position的参考原点与是否具有layout有关。

hasLayout: 则原点为包含内边距的左上角，连背景颜色也是，因此边框下面也就没有背景颜色了

no hasLayout: 则原点为包含边框的左上角，背景颜色也是

当然hasLayout还有其他的影响，比如对表格的影响，还请参考原文或译文。由于原文及其链接信息含量有点大以及本人作为初学者，对文章的理解还未透彻，写得不好，主要为了自己有这个总结的过程。

另外一些在这几天发现的东西：

**窗口滚动条**

IE6 默认显示垂直滚动条，通过设置html的overflow: auto/hidden/visible取消。当设置为auto时，若页面宽度为100%，则当高度大于一竖屏时，即出现垂直滚动条时，横向滚动条也会出现。

**清理浮动**

IE6/7清理浮动时不像其他浏览器用外边距填充，而是直接凭空清理，浮动元素之前有同胞元素时，浮动元素与清理元素之间会复制浮动元素之前的同胞元素的下外边距。

**使用:first-letter或:first-line**

IE6中，对标签&lt;a&gt;使用:first-letter或:first-line似乎会激活activate状态或者下面对a:link or a:visited应用样式时可能无效，因此如果要兼容IE6，最好别用first-letter或first-line伪元素，利用&lt;span class=”first-letter”&gt;&lt;/span&gt;或&lt;span class=”first-line”&gt;&lt;/span&gt;等代替。

**边框样式(border-style):**

dotted: 在IE6-8,FF 中为圆点，IE中边缘锯齿明显，在SF/Ch/Op中表现为方点,因此，不要使用很宽的此类边框

dashed: 均是长条，但长度、密度、以及角交界处处理均不同，主要表现在IE与其他浏览器的不同，SF/Ch最相似，可能是同一核心的缘故吧

double: IE两条线间距小，也就是两条线较粗
