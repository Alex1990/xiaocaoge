---
title: "斑马表格（zebra table）——CSS与JavaScript实现"
cover: ""
date: "2013-02-08"
category: "前端"
tags:
  - zebra table
  - 斑马表格
  - 表格
---

斑马表格就是表格的相邻两行颜色不同，这样在看有很多行的表格时，不容易看错行。
下图即为简单的斑马表格

[![1082834235423952739](/uploads/2013/02/1082834235423952739.jpg)](/uploads/2013/02/1082834235423952739.jpg)

斑马表格的实现方法有很多种：CSS3，JavaScript，JQurey等，不过现在俺只会用CSS3或JavaScript实现。

## CSS3的E:nth-child(n)伪类选择器

E:nth-child(n) 表示第N个子元素E。其中括号里的n可以写成n(自然数)/odd(奇数)/even(偶数)/多项式(2n-1)因此,在表格中

*   `tr:nth-child(odd)`或`tr:nth-child(2n-1)`表示奇数行；
*   `tr:nth-child(even)`或`tr:nth-child(2n)`表示偶数行；

详细用法见：[http://www.qianduan.net/useful-nth-child-recipies.html](http://www.qianduan.net/useful-nth-child-recipies.html "前端观察——nth-child(n)伪类选择器")

下面是示例CSS代码

```css
#booklist {
    font-family: Arial, Verdana, sans-serif;
    margin: auto;
    border: 1px solid #ddd;
    border-collapse: collapse;
}

#booklist caption {
    font-size: 24px;
    margin: 15px 0;
}

#booklist thead th {
    font-size: 20px;
    border: 1px solid #ddd;
    padding: 3px 10px;
}

#booklist tbody td{
    padding: 2px 10px;
    border: 1px solid #ddd;
}

#booklist tbody tr:nth-child(odd) {
    background-color:#eee;
}
```

## JavaScript方法

简单地说就是通过取得所有tr对象，然后给奇数行的tr的背景色赋值，代码如下。

```js
function zebraTable(){
    var tbody = document.getElementById("tbody");
    var rows = tbody.getElementsByTagName("tr");

    for (var i=0; i<rows.length; i++) {
        if(i%2 == 0) {
            rows[i].style.backgroundColor = "#eee";
        }
    }
}

window.onload = zebraTable;
```

拓展思考：

1. 如何实现列之间的斑马线，这才像站着的斑马啊；
2. 怎么简单实现某列的属性调整，如对齐方式、字体、背景、边框等；
3. 通过JavaScript实现鼠标划过某行时，此行背景色改变；
