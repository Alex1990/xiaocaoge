---
title: "下拉菜单与Tab面板"
cover: ""
date: "2013-06-03"
category: "前端"
tags:
  - Tab面板
  - 下拉菜单
---

下拉菜单与Tab面板很相似，本质来说就是一种东西，相似的HTML代码结构，CSS设置，JavaScript代码。不考虑IE6，仅限hover事件的话，均可通过纯CSS实现。

下拉菜单可以有两种HTML代码结构，一种是主菜单包含子菜单，另一种是主菜单与子菜单同一层级。Tab面板HTML代码结构也同样是这两种。如下图所示：
[<a href="/uploads/2013/02/3158712188747102097.png">![3158712188747102097](/uploads/2013/02/3158712188747102097.png)](/uploads/2013/02/3158712188747102097.png)</a>

对于下拉菜单，纯CSS的实现方式必须采用第一种结构；对于Tab面板，两种结构均可以。不过个人认为第一种包含式结构更合理，禁用CSS的情况下，有条理。<span style="color: #888888;">（PS：不过没有数据说明有多少用户是禁用CSS的？有多少是禁用JS的？又有多少使用屏幕阅读器的？有多少国内开发者考虑这些的？）</span>

采用第二种结构，在写JS时，通常会通过标签的ID来传递数据。比如主导航的一个列表项目为

```html
<li id="css">CSS</li>
```

其对应的子菜单代码为

```html
  <ul id="sub-css">
    // ...
  </ul>
```

通过ID的如此命名，从而建立其联系，这对于那些并不是每个主导航的列表项都有下拉菜单时是很关键的。

兼容IE6：通过JS或者jQuery很容易实现。因为IE6不支持除a元素之外的:hover伪类，添加hover事件，添加/去除类（比如“hover”，“on”）来模拟:hover伪类。

附自己写的一些导航栏和Tab面板：

导航栏：

[nav-examples](/demo/nav-example/nav-examples.html)

Tab面板：

[hover tab](/demo/tab/hover-tab.html)

[click tab](/demo/tab/click-tab.html)
