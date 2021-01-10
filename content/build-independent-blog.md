---
title: "搭建独立博客历程——域名、主机和域名解析"
cover: ""
date: "2013-01-03"
category: "个人博客"
tags:
  - wordpress
  - 搭建博客
---

老早就想建立一个独立博客了，只是一直决心未下，一直拖到2012年11月11日这天才进行注册域名和购买主机空间。之前也看了一些这方面的文章，心中也简单地筹划过自己的博客，主要是域名、主机、博客平台、博客方向等。下面是我搭建博客的具体的流程：

**域名：**后缀.com吧，这个用的最多，当然其他的.net，.info，也有不少博客用。至于域名，一开始想注册xiaocaoge，谁知10月份被抢注了，然后就换成了alex1990。曾在[月光博客](http://www.williamlong.info "月光博客")中看到一篇文章说.cn的域名由于是国内管理，而且必须备案才可以用，监管比较严，所以不做考虑。

**域名注册商：**之前也了解到Godaddy是世界著名的域名注册商之一，那就选它吧。正好此时，一个朋友Kyle告诉我注册时用Godaddy的优惠码可以便宜不少钱。我便在网上狂开网页搜索Godaddy注册与优惠码方面的文章，最后以50多RMB买了一年期限。实际上这个价钱和在国内的域名注册商差不多。而后又查询了Whois保护方面的信息，觉得一来服务价格不菲，二来我这个博客也没太大必要保护注册信息。

**主机服务商：**幸好我上面那位朋友Kyle告诉我还有Homezz这类型的小主机服务商，价格比国内万网、西部数据，或者国外的 Godaddy、Bluehost 等便宜不少。我试了试他博客的网速还挺快的，而且还可以按月付费，也便决定就用Homezz的虚拟主机了。

**域名解析设置：**我对此一无所知，而且我现在还不打算搞懂这些，尽管网上文章也很多。好在Kyle一步步告诉我怎么设置：第一，注册一个DNS服务商，他推荐我选DNSPod，当然 Godaddy也提供此服务。第二，就是在 Godaddy，将DNSPod得到的两个记录值（主机服务器名）填写到Domain下的Nameserver中。第三在DNSPod中设置域名的A记录与CName，说实话我不知道这是什么玩意。

**安装Wordpress**：号称5分钟安装，确实安装很简单。只需照着网上的教程和Wordpress的引导就可以完成了。不过装完之后才发现，个人博客搭建才开始，还要对 Wordpress 进行基本信息、主题、插件、分类目录、固定链接、菜单、小工具等各方面的设置。而这些设置，别说50分钟，就是500分钟也就热热身。

需要说明的是Godaddy、Homezz、DNSPod这些又给我增添了三个账号密码，安装Wordpress也多出了两个用户名和密码，估计此刻我已经忘了一些账户的密码了吧，不过大都提供了密码重置功能。

<span style="color: #808080;">ps：要是某些特定的网站（比如可能只访问一次的，或者隔很长时间才访问一次的，别说你密码，账户名都忘了）提供一次性的动态密码就好了，或许可以弄个终极动态密码口令，适用于游戏、网站登录、重要数据验证等。不过，对于安全与加解密这方面着实不懂。</span>