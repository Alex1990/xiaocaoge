---
title: "ID与Class命名规范"
cover: ""
date: "2013-04-19"
category: "前端"
tags:
  - Class
  - CSS
  - ID
  - 命名
  - 命名规范
---

一直很头痛ID与Class的命名，ID还好说，页面整体划分的几个区域用用，但Class的命名，各家有各家的规范，这与网站页面的结构有些关系。不过Class命名还是有好多词语或其缩写是相似的，可以参考同类型的网站。另外ID与Class的选择问题，除了与后台交互以及JavaScript使用选择ID，其他通常选择Class。

## 1. 常用（通用）命名

* container/wrapper/pagebody： 一般指整个页面，最外层的div
* header：页面头部区域
* footer：页脚区域
* content：页面除头部和页脚之外区域
* logo：网站标题或logo区域
* nav/mainnav/menu/topnav：主导航栏
* subnav：二级导航，
* dropmenu：下拉菜单
* main：主内容区域，其他词语有maincontent
* sidebar：侧栏区域，其他词语aside、side，若是侧边导航菜单还可能是sidenav，sidemenu
* search/search-box：搜索
* button/btn：按钮
* search-btn：搜索按钮
* keyword：搜索关键字
* tab：标签页
* list：列表类，如文章列表，图片列表
* column/col：某一竖条区域或栏目
* panel：某一栏目
* title：标题
* text：文本
* register/reg：注册
* login：登录
* comment/cmt：评论区域
* article：文章
* gallery：图片库
* hot：热点
* tips：提示
* error：错误
* copyright：版权声明
* sitemap：网站地图
* about：关于
* arrow/arr：箭头
* tag：标签
* banner：广告
* icon/ico：图标
* note：注意
* vote：投票

实际命名通常是组合命名，指明标签的结构、功能、语义等，但不应该利用具体的样式命名。

## 2. 命名书写格式

常见的格式有：连接符（search-btn）、下划线、全小（searchbox）、小驼峰（searchBox）。

现在用得多广泛的还是第一种使用连接符，易读、书写方便。

最后附一份网页设计规范：

[http://wenku.baidu.com/view/7a16b12db4daa58da0114a3d.html](http://wenku.baidu.com/view/7a16b12db4daa58da0114a3d.html "Web网页设计规范")
