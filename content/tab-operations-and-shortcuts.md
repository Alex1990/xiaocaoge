---
title: "标签页操作与快捷键"
cover: ""
date: "2015-07-05"
category: "工具"
tags:
  - 标签页
  - 快捷键
  - Tab
---

## 标签的操作

在开发过程中，几个经常使用的工具会采用标签机制，目前有三个工具：

- **浏览器**：经常查找资料或其他上网活动时会打开几个，甚至十几二十几个标签页。
- **编辑器**：自己主用 Sublime，但是其他我见过的所有代码编辑器都支持标签页的，在敲代码时也会打开几个或十几个文件，就连以前操作 Word 时也安装个支持标签页的插件。
- **终端**：开发者也要经常使用命令行进行多种操作，也会打开几个或更多标签页。

而标签页通常有着固定的几个操作，可能不同软件名字不一样，不过实质一样：

- 创建
- 关闭
- 选择前一个
- 选择后一个
- 选择第N个
- 重新打开上一个关闭的
- 关闭其他所有
- 重新排序

## 标签操作的快捷键

这些操作通常比较常用，也会对应一些快捷键，很重要的一点就是：**在同一系统平台下，虽然软件不同，但是这些操作对应的快捷键都是大同小异的**。具体来说，Windows 与 Ubuntu 一样，而 Mac 通常只是把`Ctrl`换成了`Command`。这样就可以显著降低学习成本，我不知道有没有什么规范，但是觉得软件开发者也应该遵循这些惯例。

**Tab操作与三大系统平台上快捷键**

| Tab操作             | Window/Linux      | Mac                 |
| ------------------- | ----------------- | ------------------- |
| 创建                | `Ctrl+T`          | `Command+T`         |
| 关闭                | `Ctrl+W`          | `Command+W`         |
| 选择前一个          | `Ctrl+Tab`或<br>`Ctrl+PageUp`           | `Command+{`         |
| 选择后一个          | `Ctrl+Shift+Tab`或<br>`Ctrl+PageDown`   | `Command+}`         |
| 选择第N个（N<=8）   | `Ctrl+[1-8]`      | `Command+[1-8]`     |
| 选择最后一个        | `Ctrl+9`          | `Command+9`         |
| 重新打开上次关闭的  | `Ctrl+Shift+T`    | `Command+Shift+T`   |
| 关闭其他所有        | 无快捷键          | 无快捷键            |
| 重新排序            | 鼠标拖动，或 Ubuntu Gnome Terminal<br>可以使用`Ctrl+Shift+PageUp/PageDown`          | 鼠标拖动            |

备注：

- 这里的快捷键不是所有软件都完全支持。
- Chrome或其他软件的Tab操作可能比这里列出的多几个，如关闭右边所有的、固定当前。
- “关闭其他所有”没有默认的快捷键，但是可以通过插件来设置。

## 总结

这里只是简单地列出了标签的操作与快捷键，而标签机制属于 GUI 设计范畴，称之为 TDI（Tabbed Document Interface），与之相关的概念还有：窗口（Window）、MDI（Multiple Document Interface）、SDI（Single Document Interface），细节请查看参考链接。

## 参考链接

- [GUI Tab](https://en.wikipedia.org/wiki/Tab_(GUI))
- [MDI (Multiple Document Interface)](https://en.wikipedia.org/wiki/Multiple_document_interface)
- [Desktop metaphor](https://en.wikipedia.org/wiki/Desktop_metaphor)
