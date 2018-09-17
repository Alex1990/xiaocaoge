---
title: "代码编辑器：Notepad++ equipped with Zen coding"
cover: ""
date: "2013-02-14"
category: "工具"
tags:
  - notepad++
  - zen coding
  - 代码编辑器
---

Notepad++：不像VIM/EMACS那样的神器强大，却非常容易上手；也不像VS/DW那样集成各种功能，却非常轻便灵活。

Notepad++的主题、插件、快捷键等自定义还是很强大的。

**主题：**

一直在用默认主题，突然换成其他的还真不习惯，不习惯其他的字体、行间距、高亮配色等等。据说TextMate 的有很多好看的主题样式，好上TextMate素以此闻名吧。于是乎，就搜索了下怎么使Notepad++具有TextMate的样式，也就几步的事，可见这篇博文介绍：[步步打造Notepadd++的TextMate主题](http://www.cnblogs.com/westfly/archive/2011/06/29/2093549.html)。

**插件：**

必须先吐槽一下Sourceforge.net所遭受的和谐之力，导致不能直接使用Notepad++的插件管理器下载插件。

知乎上推荐的一个适用于前端开发的插件列表：

* **zen coding**：代码生成功能，建议Python版
* **JSMin**：代码压缩与格式化工具
* **JSONViewer**
* **Campare**
* **Light Explorer**
* **NppExec** ：可执行cmd
* **JSLint** ：js代码检测
* **Xbrackets** ：自动补全各种括号{}[]()等,也可以配置补全&lt;&gt;''等

不过现在只用着zen coding。

官方下载：[http://code.google.com/p/zen-coding/downloads/list](http://code.google.com/p/zen-coding/downloads/list)

墙内下载：[http://www.softpedia.com/dyn-postdownload.php?p=189931&amp;t=4&amp;i=1](http://www.softpedia.com/dyn-postdownload.php?p=189931&amp;t=4&amp;i=1)

一篇博文教程：[http://www.qianduan.net/zen-coding-a-new-way-to-write-html-code.html](http://www.qianduan.net/zen-coding-a-new-way-to-write-html-code.html)

另最好修改下Zen coding的默认快捷键，可以在 NppScripting\includes\Zen Coding.js文件底部修改，这个文件还包含着HTML/CSS/XML的标签或属性的具体列表，可以看下。

**快捷键**

在“设置”—“管理快捷键”里可以管理文件操作/运行/编辑以及插件中用到的快捷键。

首先得设置下打开各个浏览器的快捷键，搞成一键打开；

其次光标移动的快捷键修改下：

（主要在"Main menu"及“Scintilla commands"中修改。 ）

向前(Ctrl+F)，向后(Ctrl+B)，上一行(Ctrl+P)，下一行(Ctrl+N)

行最前(Ctrl+A), 行最后(Ctrl+E)

其他常用的快捷键可以看看这篇文章

[http://hi.baidu.com/is_water/item/166296d1be69ce1be1f46f27](http://hi.baidu.com/is_water/item/166296d1be69ce1be1f46f27)

另外可以通过录制宏来实现一些快捷键。
