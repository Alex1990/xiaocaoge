---
title: "电脑文件管理"
cover: ""
date: "2014-04-02"
category: "知识管理"
tags:
  - 文件管理
  - 文件结构
---

随着文件，尤其是新领域文件越来越多，发现电脑里面的文件又乱了，出现了很多操作不便的问题：找个文件要打开好几层文件夹，还不一定在；文件到底该放哪个文件夹，越来越随意了。是时候重新整理下混乱的文件了。

## 首先，分析文件来源

文件的来源无非两种：本地与外部。本地主要就是各种新建、复制、剪切等产生的文件，而外部包括下载的、传送的、其他存储器拷贝的。

### 本地

* 文档 (doc/ppt/xls/pdf/txt) ：其中office三剑客几乎没用过了，pdf做简历，txt主要记录小的技术点，其他的笔记主要用evernote
* 源码 (html/css/js/php/less) ：主要就是编辑器notepad++或sublime产生的
* 图片 (jpg/png/gif/psd) ：来源主要是iSee图片编辑器、Photoshop、FSCapture或QQ截图工具
* 音频：少量的HTML5测试用的多种格式音频，经过格式工厂转换得来
* 视频：少量的HTML5测试用的多种格式视频，经过格式转换工具转换得来
* 压缩文件：通常用在QQ传送或微云上，然后应该删除本地的

### 外部

* 文档 (doc/ppt/xls/pdf/txt) ：主要就是百度文库、QQ传送、Slideshare或其他网站
* 源码 (html/css/js/php) ：第一来源是github，其他主要是各开放源码官网，下载工具要么是Chrome，要么就是git之类的客户端吧
* 图片：几乎全是浏览器下载的，网站主要有Google Image、百度图片、deviantart、站酷、dribbble、iconfinder等，另外有少量的是手机的照片、手机的截图等通过QQ文件管理器传送
* 软件：常用的软件通过腾讯管家之类下载，Web开发相关软件通过官网下载
* PS资源：主要就是笔刷、形状、渐变等资源，大部分都是在deviantart或站酷下载的
* 音频：酷狗下载的歌曲
* 视频：几部电影和测试用的视频文件
* 压缩文件：压缩文件只是传输用的，解压之后就删除了
* 字体文件：暂时很少用到吧

## 分析文件类别

突然发现文件分本地与外部意义并不大，应该以类型分更有助于管理，包括文档、图片、源码、软件等。现阶段，源码和图片急需管理：

### 源码

源码清单包括：

* W3School与基础的前端书籍练习与附带源码，主要来自于入门时
* HTML5、CSS3、响应式设计等基础知识点练习或测试，会来自于MDN、CSS-Tricks、Stackoverflow、Google出的文章、即兴测试等
* 类库或插件的源码，版本管理，常用类库的个别测试尽量使用公共CDN
* 前端类库的入门学习，比如jQuery、Bootstrap、jQuery Mobile等
* 前端小库或插件的学习，比如normalize.css、Respond.js、Modernizr、jQuery plugins、lazyload、swipe、responsive-nav、mediaelement等等，将来会达到数百个，而且考虑版本问题，其中有很多要在移动端测试，这些源码大多从github下载
* 基础技术的兼容性测试，跨平台，跨终端
* 自己练习写的功能组件
* 工作或自己的项目文件
* 各种小技术或问题点的总结，写在csstips.txt、jstips.txt、phptips.txt等文本文件中
* 与html、css或js有关的pdf或ppt文档，集中在一起管理
* 下载的电子版书籍，单独放文件夹即可
* 后端源码
* 其他语言

### 图片

图片清单

* 图标文件，来自于iconfinder、站酷、自己制作等
* 壁纸文件，大尺寸图片，可供测试用，分PC端与移动端
* 个人相册，博客logo、照片等
* 截图文件，来自于QQ截图或FSCapture
* 设计素材，纹理、各种事物素材
* 各种类别图片，如自然美景、创意、动物、植物、人物等
* 设计图，网站设计、UI设计、logo设计等，设计图的标注文件
* 字体特效，最好分文件夹建，包括相应的素材文件
* 工作项目，包含相应的icon、设计图等
* 表情图片，虽然极少

目测当前电脑里的文件，源码与图片文件最多，源码主要来自于编辑器或github，而图片主要来自于Google、百度、deviantart等浏览器下载。浏览器或下载软件下载的所有文件，我都放在了D盘的Downloads文件夹里，里面各种类型的文档都有，所以这是一个使用频繁的文件夹。另外三类使用频繁的文件夹为：htdocs、各技术分类对应文件夹及Pictures。htdocs为本地服务器根目录，主要用途为全栈练习、移动端测试、跨浏览器测试（在虚拟机系统中访问）。各技术分类对应文件夹包括HTML、CSS、JS、PHP、Web，为了便于访问将其直接建立在D盘下，将来可能会增加NodeJS、C等。Pictures文件夹存放图片文件。

目前的存在的问题及解决方法有：

* js类库：存在于多处，Downloads、JS/jsplugin、Web、htdocs/jsplugin。应该将类库、源码等放在htdocs文件夹下，从而方便在移动端调试和集中管理。所有下载的js类库放于一处，好像本地CDN一样，并在htdocs文件夹下建一个连接到这个CDN文件夹的junction连接。而对于小的插件，不必这样，使用时直接复制一份。
* 图片文件：既存在于D盘下Pictures文件夹，又存在于Downloads文件夹下的Pictures文件夹，应该合并成一个（通过junction连接）。
* 同步策略：所有这些与工作或学习有关的文件夹（htdocs、Downloads、CSS、JS等）其实都是junction连接，真正的文件夹存在于DBank的同步盘中，从而可以实现这些文件夹的同步。
* 文件的查找：可以通过everything来快速查找，很快速方便。
* 源码文件夹结构与规划：主要是HTML、CSS、JS、PHP这些文件夹。

现在的文件夹结构如下图，虚线框的代表junction链接

[![电脑文件管理](http://www.xiaocaoge.com/uploads/2014/04/电脑文件管理.png)](http://www.xiaocaoge.com/uploads/2014/04/电脑文件管理.png)
