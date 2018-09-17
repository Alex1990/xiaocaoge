---
title: "黑苹果（Hackintosh）实战"
cover: ""
date: "2017-12-27"
category: "Mac"
tags:
  - 黑苹果
  - Hackintosh
  - 双系统
---

一个多月前把手中的 Mac Mini 2014 中配换成了台式机，然后装了双系统：MacOS 和 Windows 10。本来一直打算买一台 Mac Book Pro 的，后来随着“吃鸡”游戏——绝地求生，的火热，决定自己组装个台式机。另外，工作以及其他日常使用一直是 Mac，所以得装个黑苹果系统。

虽早就听过“黑苹果”系统，但是具体如何安装，以及有什么坑却一点儿不知。正好微博关注的一个人发了个网址：[tonymacx86.com](https://www.tonymacx86.com)，我看了下不错，有推荐配置列表，安装教程，也有很多问题的解决方案。于是，就趁着双十一的来临，依照这个网站上面的推荐配置列表以及自己的预算，在京东上面攒了一台机器。我的配置列表：

- CPU：i7 7700K
- 显卡：技嘉 GTX 1070 G1 GAMING
- 主板：技嘉 Z270-Phoenix Gaming
- 内存：英睿达/镁光 DDR4 2400 8G x2
- SSD：三星 960 EVO 250G M.2 NVMe
- 硬盘：希捷 1TB 7200转
- 机箱：追风者 416P黑色
- 电源：长城 600W
- 无线网卡：TP-LINK TL-WDN7280 1900M
- CPU风扇：九州风神 玄冰400
- 鼠标：雷蛇 蝰蛇2013原版有线
- 耳麦：雷蛇北海巨妖标准版

有些配件在 tonymacx86 网站推荐列表找不到，我就自己看着选了。兼容性方面主要就是 CPU、主板、显卡这三项。

另外，tonymacx86 网站是英文的，所以需要有一定的英文阅读能力。在实际安装过程中可能会遇到各种问题，这个时候有用的中文资源几乎是没有的，所以别指望百度能解决，需要 Google ，所以还需要翻墙。如果英文和翻墙两个条件达不到，安装的过程将会非常麻烦，最好找个有安装经验的人。

## 推荐配置列表

tonymacx86.com 网站每过一段时间都会发布一个推荐配置列表，比如 2017 年 12 月的[购买指引](https://www.tonymacx86.com/buyersguide/december/2017/)，自己看着列表选购即可。

## 安装教程

- 一篇基于 Intel CPU 的单系统教程：[UniBeast: Install macOS High Sierra on Any Supported Intel-based PC](https://www.tonymacx86.com/threads/unibeast-install-macos-high-sierra-on-any-supported-intel-based-pc.235474/)
- 双系统或多系统教程：[Guide: MultiBooting UEFI](https://www.tonymacx86.com/threads/guide-multibooting-uefi.197352/)

另外，最好准备个移动硬盘，通过 Mac 自带的 Time Machine 工具将自己之前的 Mac 系统备份，便在新系统中恢复。

## 遇到的问题

安装的过程不太顺利，前后花了三个晚上才搞定。基本上解决问题的思路就是：首先引导系统 Clover 的启动配置设置成可以在显示屏上输出 Log 信息的模式，如果停到哪里了，就把屏幕上的信息使用谷歌搜索一下，基本上就可以找到相关链接，这些链接往往来自于 tonymacx86.com 上面的帖子。然后就是仔细读上面的帖子，相关的都读一下，想想该如何尝试，再实际操作一下，很多问题就可以解决了。

我主要遇到的问题有：

- 第一次从 U 盘安装盘启动时就卡在了苹果 Logo 的进度条哪里，看了这个解决的：https://www.tonymacx86.com/threads/hackintosh-freezes-at-beginning-of-progress-bar-clover-sierra.208648/。
- 然后还是卡在了进度条某个地方，当然我这个时候是 Log 模式，后来通过把独立显卡卸掉解决的。
- 然后进入到系统安装好后，并且安装了独立显卡，但是系统未使用独立显卡，通过这个解决的：https://www.tonymacx86.com/threads/solving-nvidia-driver-install-loading-problems.161256/。
- 然后是耳机没有声音，通过 [https://www.tonymacx86.com/threads/applehda-hdmi-audio-guide.234735/](https://www.tonymacx86.com/threads/applehda-hdmi-audio-guide.234735/) 解决。
- 然后是双系统时间不一致，百度或谷歌可搜索到很多解决方案，比如这篇：[https://jingyan.baidu.com/article/455a9950a73aa1a16627783a.html](https://jingyan.baidu.com/article/455a9950a73aa1a16627783a.html)。

## 体验

经过三个晚上的奋战之后，终于解决了各种问题之后，迎来了一台高性能高性价比的 Mac 系统。相比原先的 Mac mini 来说，性能有了质的提升：

- 各种应用，无论大小，瞬间打开，比如 Photoshop 在 3 秒内启动完成。
- 前端构建工具 Webpack 编译速度提升了几倍。
- 终于 Mac 可以使用上了 GTX 1070 这样强大的显卡，如果是 iMac 之类的得花费不低于 2 万才能达到相同的配置。

缺点就是耗电、噪音大，以及不像笔记本轻便。然而，笔记本并不总是体现出轻便的优势，实际生活中，家里使用的笔记本多长时间换一次位置呢，至少我只有搬家时候才会移动。像节假日回家或旅行时，可以带工作配的 Mac 笔记本就行。所以，我唯一遗憾的是为什么不早点儿配一台这样性能强大的台式机呢。
