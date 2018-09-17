---
title: "水平导航条与下拉菜单（兼容ie6）"
cover: ""
date: "2013-02-11"
category: "前端"
tags:
  - CSS
  - ie6
  - Javascript
  - 下拉菜单
  - 水平导航
---

## 水平导航条

关键技术即是列表项(li)的浮动，即添加以下代码：

```css
ul li { float: left;}
```

举一个例子，下面是html代码

```html
<ul id="mainnav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About Us</a></li>
    <li><a href="#">Our Clients</a></li>
    <li><a href="#">Support</a></li>
    <li><a href="#">Contact Us</a></li>
</ul>
```

第一步，预格式化，消除列表项，列表外边距与内边距；（实际中通过reset.css）

```css
#mainnav {
    list-style: none;
    margin: 0;
    padding: 0;
}
```

第二步，浮动列表项；

```css
#mainnav li {
    float: left;
}
```

如图所示即为一个最简单也是最丑的水平导航/横向导航

[![6597722876563981469](/uploads/2013/02/6597722876563981469.jpg)](/uploads/2013/02/6597722876563981469.jpg)

第三步，简单美化导航显示效果，如设置字体，去掉下划线，给列表添加背景色，通过设置列表项边框添加分割线，等等。最终效果图与代码如下：

[![6597653607331431555](/uploads/2013/02/6597653607331431555.jpg)](/uploads/2013/02/6597653607331431555.jpg)

```css
#mainnav {
    list-style:none;
    margin: 0;
    padding: 0;
    float: left;  /* 使无序列表框包裹住浮动的列表项 */
    background-color: #eee;
}

#mainnav li {
    float: left;
}

#mainnav li a {
    font: 20px/30px Arial, Verdana, sans-serif;
    display: block;
    text-decoration: none;
    color: #404040;
    padding: 5px 20px;
    border-left: 1px solid #bbb;
}

#mainnav .firstChild a {  /* 要给第一个列表项添加 class=”firstChild” */
    border-left: none;
}
```

最后添加鼠标悬停效果，即:hover样式，代码如下：

```css
#mainnav li a:hover,
#mainnav li a:focus {  /* :focus伪类使键盘操作获得鼠标悬停效果 */
    color: #fdfdfd;
    background-color: #4cc;
}
```

**最终DEMO：**[简单的水平导航条](/demo/shnav/hnav.html "简单的水平导航条")

## 下拉菜单

这种技术也叫Suckerfish dropdown，关键之处就是先通过设置二级列表的left属性为一个大的负值（如-999em），将其定位到窗口之外，然后鼠标悬停时再将left属性设置成0，从而显示出来。

注：虽然可以通过设置二级列表的display: none先隐藏，然后再鼠标悬停时设置diplay: block;

实现同样效果，但display: none会使屏幕阅读器无法读取其中的内容，从而造成可访问性问题。

html代码如下：

```html
<ul id="mainnav">
    <li class="firstChild"><a href="#">Home</a></li>
    <li><a href="#">About Us</a></li>
    <li><a href="#">Our Clients</a>
        <ul>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Involvement</a></li>
            <li class="subLastChild"><a href="#">Our Vision</a></li>
        </ul>
    </li>
    <li><a href="#">Support</a>
        <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Downloads</a></li>
            <li class="subLastChild"><a href="#">FAQ</a></li>
        </ul>
    </li>
    <li><a href="#">Contact Us</a></li>
</ul>
```

第一步，为了使二级列表绝对定位时的参考元素为包含其的一级列表项，先设置一级列表项为相对定位，添加 #mainnav li { position: relative;}。然后将二级列表定位到窗口之外：

```css
#mainnav .subnav {
    position: absolute;
    left: -999em;  /* 将二级列表定位到窗口之外 */
    top: 40px;
}
```

top属性的数值 = 锚的行高 + 锚的上下内边距和

第二步，鼠标悬停时显示二级列表/下拉菜单，添加如下代码：

```css
#mainnav li:hover .subnav {
    left: 0;
}

#mainnav .subnav li {
    float: none;  /* 消除列表项对所包含子元素的包裹，扩展宽度 */
}
```

最后设置一些美化代码，**最终DEMO：**[Suckerfish下拉菜单](/demo/dropdown/hnav-suckerfish-dropdown.html "Suckerfish下拉菜单")

另因为IE6不支持给除a元素之外的元素添加:hover伪类，需要通过JavaScript代码或修改.htc文件实现此效果，具体方法见下。

## JavaScript方法

原理就是鼠标悬停时给列表项添加类，并在CSS文件设置该类的的left属性，鼠标移出时删除类。详情参考该文：[http://htmldog.com/articles/suckerfish/dropdowns/](http://htmldog.com/articles/suckerfish/dropdowns/)

JS与CSS代码如下：

```js
function sfHover() {

    var sfEls = document.getElementById("mainnav").getElementsByTagName("li");

    for (var i=0; i<sfEls.length; i++) {
        sfEls[i].onmouseover = function() {
            this.className += " sfhover";
        }

        sfEls[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp(" sfhover\\b"), "");
        }
    }
}

window.onload = sfHover;
```

```css
#mainnav li:hover .subnav,
#mainnav li.sfhover .subnav {
    left: auto;
}
```

**DEMO：**[兼容ie6下拉菜单JS版](/demo/dropdown/hnav-suckerfish-dropdown-ie6-js.html "兼容ie6下拉菜单JS版")

## 通过CSS的behavior属性添加特定的.htc文件

需要添加如下代码引用 ie6hover.htc 文件。

参考文章：[http://www.cnblogs.com/czj33499173/archive/2011/12/30/2307674.html](http://www.cnblogs.com/czj33499173/archive/2011/12/30/2307674.html)

```css
body {
  behavior: url(ie6hover.htc);  /* 注意路径 */
}
```

ie6hover.htc文件代码如下：

```text
<attach event="ondocumentready" handler="parseStylesheets" />
<script language="JScript">
/**
* Pseudos - V1.30.050121 - hover &amp; active
* ---------------------------------------------
* Peterned - http://www.xs4all.nl/~peterned/
* (c) 2005 - Peter Nederlof
*
* Credits - Arnoud Berendsen
*         - Martin Reurings
*         - Robert Hanson
*
* howto: body { behavior:url("csshover.htc"); }
* ---------------------------------------------
*/

var currentSheet, doc = window.document, activators = {
    onhover:{on:'onmouseover', off:'onmouseout'},
    onactive:{on:'onmousedown', off:'onmouseup'}
}

function parseStylesheets() {
    //window.alert("hi");
    var sheets = doc.styleSheets, l = sheets.length;

    for(var i=0; i<l; i++)
        parseStylesheet(sheets[i]);
}

function parseStylesheet(sheet) {
    if(sheet.imports) {
        try {
            var imports = sheet.imports, l = imports.length;
            for(var i=0; i<l; i++) parseStylesheet(sheet.imports[i]);
        } catch(securityException){}
}

try {
    var rules = (currentSheet = sheet).rules, l = rules.length;
    for(var j=0; j<l; j++) parseCSSRule(rules[j]);
} catch(securityException){}
}

function parseCSSRule(rule) {

    var select = rule.selectorText, style = rule.style.cssText;

    if(!(/(^|\s)(([^a]([^ ]+)?)|(a([^#.][^ ]+)+)):(hover|active)/i).test(select) || !style) return;

    var pseudo = select.replace(/[^:]+:([a-z-]+).*/i, 'on$1');
    var newSelect = select.replace(/(\.([a-z0-9_-]+):[a-z]+)|(:[a-z]+)/gi, '.$2' + pseudo);
    var className = (/\.([a-z0-9_-]*on(hover|active))/i).exec(newSelect)[1];
    var affected = select.replace(/:hover.*$/, '');
    var elements = getElementsBySelect(affected);

    currentSheet.addRule(newSelect, style);

    for(var i=0; i<elements.length; i++)
        new HoverElement(elements[i], className, activators[pseudo]);
}

function HoverElement(node, className, events) {

    if(!node.hovers) node.hovers = {};
    if(node.hovers[className]) return;

    node.hovers[className] = true;
    node.attachEvent(events.on, function() {
        node.className += ' ' + className;
    });
    node.attachEvent(events.off, function() {
        node.className = node.className.replace(new RegExp('\\s+'+className, 'g'),'');
    });
}

function getElementsBySelect(rule) {
    var parts, nodes = [doc];

    parts = rule.split(' ');

    for(var i=0; i<parts.length; i++) {
        nodes = getSelectedNodes(parts[i], nodes);
    }

    return nodes;
}

function getSelectedNodes(select, elements) {

    var result, node, nodes = [];
    var classname = (/\.([a-z0-9_-]+)/i).exec(select);
    var identify = (/\#([a-z0-9_-]+)/i).exec(select);
    var tagName = select.replace(/(\.|\#|\:)[a-z0-9_-]+/i, '');

    for(var i=0; i<elements.length; i++) {
        result = tagName? elements[i].all.tags(tagName):elements[i].all;
        for(var j=0; j<result.length; j++) {
            node = result[j];
            if((identify && node.id != identify[1]) || (classname && !(new RegExp('\\b' +
                classname[1] + '\\b').exec(node.className)))) continue;
            nodes[nodes.length] = node;
        }
    }

    return nodes;
}
```
