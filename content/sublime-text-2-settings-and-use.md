---
title: "Sublime Text 2配置与使用"
cover: ""
date: "2014-03-29"
category: "前端"
tags:
  - Sublime
  - Sublime Text 2
  - 编辑器
---

从notepad++切换到Sublime Text 2已经有两个月了，已经不习惯notepad++了。总得来说，Sublime比notepad++有很多功能方面的改进，使用体验非常好，又有丰富的插件，活跃的开发者氛围。当然，还是有个别地方不如notepad++的，比如重命名文件，所有的配置都是json格式，难免使得习惯图形界面的人头大。当时配置与上手练习花了大概5个小时，再加上解决一些插件等使用的问题，少说也有十多个小时，这还是有notepadd++的配置与使用基础。但我还是觉得十分划算，毕竟这个是天天用，也会用个几年的东西，最开始的十小时能带来很大的效率提升。

## 下载与安装

直接到[官网](http://www.sublimetext.com/)选择合适的版本下载即可，Windows、Mac和Linux系统都有。虽然Sublime是收费的，且70刀的价格对于我来说还是挺贵的，但是仔细想想，与买衣服的价格比起来也不算贵，这个要天天用，可能用好几年，又是工作必须的。之所以不买许可证，大概是因为它提供了不限期限不限功能的免费试用，与收费版本比起来，就是大概每个小时都会弹出一个让你购买许可证的窗口估计这个会让不少人去破解。要是衣服能像软件一样下载破解，还不吃官司，估计不少人都会尝试免费的衣服。

## 包管理器/插件管理器

Sublime没有自带包管理器，所以得自己安装。安装方法：首先打开Sublime的控制台，快捷键`Ctrl+\``或`View > Show Console`，然后到此网址[https://sublime.wbond.net/installation#st2](https://sublime.wbond.net/installation#st2)复制文本框中的一段代码即可，注意复制对应版本。

## 包管理器的使用

快捷键`ctrl+shift+p`可以打开万能的命令面板，然后输入Package Control会列出相关的命令，如Install Package、List Packages、Remove Package等。输入ip/lp/rp简写可直接出现Install Package/List Packages/Remove Package命令。

选择Install Package会列出[https://sublime.wbond.net/](https://sublime.wbond.net/)网站上的包列表，输入包名称，然后选择即可安装。有时候这个网站打不开，从而等好久都无法列出包列表，需要梯子翻过去。List Packages会列出目前安装的插件，Remove Package会列出当前安装的插件，选择即可删除。

## 配置

Sublime的配置在`Preferences > Settings - *`， 其中Default为默认配置，User为用户配置，一般不要更改Default，而将自己的配置写在User中，这样升级不会被覆盖，也方面多平台多设备同步配置。另外，对于插件的设置通常也分为Default与User。

常用配置项：字体大小，tab键转换成space，tab_size，auto_indent, auto_match_enabled等。具体的解释可以见Default文件中的注释说明，基本上不用设置太多。

## 快捷键设置

首先应该熟悉编辑器常用的快捷键：

新建、打开、保存、另存为、复制、粘贴、剪切、全选、切换标签、关闭标签、查找、替换、块语句缩进、复制当前行、选择当前行、删除当前行等，这些都是通用的功能，快捷键大都一样，可能复制/选择/删除当前行不一样，在Sublime中分别是`Ctrl+Shift+D/Ctrl+L/Ctrl+Shift+L`。

光标控制快捷键的设置，我自己不习惯默认的光标键控制光标的移动，而且常常需要移动到行首、行尾、词首、词尾，因此设置了这几个快捷键：

*   上: `Ctrl+I`
*   下：`Ctrl+M`
*   左：`Ctrl+J`
*   右：`Ctrl+O` (本来想设置成K的，但是Sublime已经占用了，而且改不了，且还有其他重要的用途)
*   行首：`Ctrl+A`
*   行尾：`Ctrl+E`
*   词首：`Ctrl+/` (这里是指英文单词)
*   词尾：`Ctrl+\`
*   文件开头：`Ctrl+Home`
*   文件结尾：`Ctrl+End`

这里的一些快捷键我覆盖了默认的功能，将默认的快捷键改成其他的了，尤其是那些使用频率不高的，比如打开文件、全选文件等。能体现Sublime比Notepad++强大的一点就是这些光标快捷键可以在查找/替换框，智能提示，万能搜索框的提示列表，多光标点使用，非常方便。另外安装上Emmet插件之后还会附带两个可再html编辑点间移动的快捷键。

*   前一个编辑点：`Ctrl+[`
*   后一个编辑点：`Ctrl+]`

其他常用的快捷键

*   选择当前单词：`Ctrl+D` (重复按会添加选择下一个与当前所选相同的单词)
*   删除当前单词：`Ctrl+Backspace`
*   光标下插入新行：`Ctrl+Enter`
*   光标上插入新行：`Ctrl+Shift+Enter`
*   选择文件内所有与当前选择单词相同的单词：`Alt+F3`
*   替换所有：`Ctrl+Alt+Enter`
*   跳转到指定行：`Ctrl+G`
*   跳转到指定的打开文件：`Ctrl+P`
*   万能命令面板：`Ctrl+Shift+P`
*   控制台：`Ctrl+'`
*   选择当前缩进块：`Ctrl+Shift+J `(下面这几个是我重新设置的，与默认快捷键不同)
*   添加注释：`Ctrl+U`
*   取消注释：`Ctrl+Shift+U`
*   新建文件：`Ctrl+Shift+N`
*   打开文件：`Ctrl+Alt+O`
*   全选：`Ctrl+Q`

## 几个前端常用插件

Emmet

如果只让我选一个插件，就非它莫属了，它的前身是zencoding(其实我挺喜欢这个名字的),关于它的用法网上有很多，基本上与zencoding一致，可以参考[这篇博文](http://www.qianduan.net/zen-coding-a-new-way-to-write-html-code.html)。需要说明的是它的默认快捷键是`Ctrl+E`，我觉得不方便，所以换成了`Ctrl+N`。

**Soda**

这是一个主题插件，Sublime的主题是作为插件形式存在的，虽然我觉得默认的主题看起来比notepad++好看多了，但是这个会更好看一点

**ConvertToUTF8**

Sublime Text 2默认不支持GB2312/GBK编码，通过这个可以编辑这些编码的文件

**View in Browser**

设置快捷键在浏览器中打开当前文件。注意浏览器的路径设置正确，默认选择的浏览器是firefox，使用Chrome的童鞋记得改一下。

**SublimeCodeIntel**

自动补全插件，十分强大，不必严格按顺序输入每个字母，只要候选项包含你输入的字母就会出现，另外已经定义过的变量、输入过的单词就可能出现在候选列表，输入的频率越高越靠前。

**SideBarInhancements**

可以增强侧边栏的插件，侧边栏的打开快捷键是Ctrl+K,B。默认的侧边栏文件右键菜单只有close选项，而这个可以添加诸如重命名、复制文件路径、删除、新建文件、新建文件夹等功能，但是必须先把文件所在的文件夹添加为Project，通过`Project > Add Folder to Project ...`菜单添加。这是我觉得不如notepad++的地方，notepad++在标签页上右击就会出现这些选项。

**BracketHighlighter**

Sublime默认的成对括号匹配显示不明显，即光标位于两个括号之间时，两个括号的位置只用下划线表示，通过这个插件就能明显看到括号位于第几行。

**Minifier**

压缩JS与CSS的插件，但是将来使用Grunt之后，我很怀疑是否需要这个插件。

当然上面几个插件只是我自己常用的，针对不同语言，不同的需求还是有很多其他的插件，如SFTP、Git、Prefixr、HtmlTidy、CTags、SVN、gist等等，可以到[https://sublime.wbond.net/](https://sublime.wbond.net/)网站上寻找。

## 软件图标

有人嫌默认的图标丑的可以更换一下，去dribbble上面搜索sublime text会出现一些好看的图标，我自己用的是这个[http://dribbble.com/shots/872166-Sublime-Text-2-Replacement-Icon#comments](http://dribbble.com/shots/872166-Sublime-Text-2-Replacement-Icon#comments)。也可以从这里下载[http://www.xiaocaoge.com/demo/st2icon/st2.ico](http://www.xiaocaoge.com/demo/st2icon/st2.ico)

### 其他参考文章：

*   Sublime Text 2功能介绍：[http://www.iplaysoft.com/sublimetext.html](http://www.iplaysoft.com/sublimetext.html)
*   Sublime配置全攻略：[http://cloudbbs.org/forum.php?mod=viewthread&amp;tid=3620](http://cloudbbs.org/forum.php?mod=viewthread&amp;tid=3620)
*   Sublime基本快捷键：[https://gist.github.com/eteanga/1736542](https://gist.github.com/eteanga/1736542)
*   Sublime Text 2 Tutorial：[http://leveluptuts.com/tutorials/sublime-text-2-tutorials](http://leveluptuts.com/tutorials/sublime-text-2-tutorials)
*   Essential Sublime Text 2 plugins and extensions：[http://code.tutsplus.com/tutorials/essential-sublime-text-2-plugins-and-extensions--net-24173](http://code.tutsplus.com/tutorials/essential-sublime-text-2-plugins-and-extensions--net-24173)
*   Sublime Text unofficial documentation：[http://sublime-text-unofficial-documentation.readthedocs.org/en/sublime-text-2/](http://sublime-text-unofficial-documentation.readthedocs.org/en/sublime-text-2/)
