---
title: 新台式主机体验
cover: ""
date: 2023-11-16
category: 硬件
tags:
  - 硬件
  - 电脑
  - Windows 11
---

一年多以前想体验 Windows 11 系统，无奈因为 CPU 是 i7-7700K 无法升级，于是一颗换主机的心就种下了。说来旧主机已经使用了差不多 6 年了，各种配件都已经跟不上了，性能估计最多与现代的 2000 元主机相当。虽然想换，但是也不是特别急迫，所以从去年看到今天，从年初看到年末，终于趁着双十一，价格相比年初大概优惠了 600 块, 10% 以上，就入手了。

## 配置清单

* CPU：i5-13600KF  1999元
* 主板：华硕 TUF GAMING B760M-PLUS WIFI 重炮手  1249元
* 内存：英睿达 DDR5 5600 16Gx2  628元
* 固态：致钛长江存储 1TB TiPlus7100  449元
* 电源：长城额定750W X7金牌全模  399元
* 机箱：华硕冰立方 冰晶黑 AP201  386元
* 散热器：九州风神 玄冰500风冷  119元

顺带买了个耳机，总价大概 5000 多，显卡和外设都使用之前的，而且现在 N 卡太贵了。

## 装机

这次的装机相比上次不太顺利，从下午 4 点一直持续到晚上 10 点，当然中间吃饭和休息了一段时间。不顺利的原因主要是自己很久没有装机了，对于各个配件接口、螺丝等都忘记了，都是边看说明书边组装。而配件的说明书有些步骤不详细，生怕装错，所以又网上查视频学习。

确实从视频当中学到了一些，发现之前的装机步骤是错的，总是先把主板装到机箱上面再装 CPU，这次大概明确了装机顺序：

* 电源装到机箱上面
* 把 SSD 装到主板上面
* CPU 装到主板上面
* 主板装到机箱上面
* 将电源的线、机箱的 IO 线与主板连接，注意背部走线
* 将散热风扇装到机箱上面，装底座，涂硅脂，装散热铜管，装风扇，连接电源线
* 装内存条
* 装显卡
* 点亮机器
* 封闭机箱

因为装机时直接时蹲着装到，导致大腿后侧肌肉后来疼了两天，以后至少得弄一个板凳了。

## U盘启用盘

之前都是使用国产的工具制作，但是总是附加很多东西，而且也不太相信安全性，所以这次找了一款开源的工具：[Ventoy](https://www.ventoy.net/cn/index.html)。发现真的很简单，很纯净，可以点击前面的链接查看官网介绍和使用教程。

* 你只需要把 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件直接拷贝到U盘里面就可以启动了，无需其他操作
* 你可以一次性拷贝很多个不同类型的镜像文件，Ventoy 会在启动时显示一个菜单来供你进行选择
* 你还可以在 Ventoy 的界面中直接浏览并启动本地硬盘中的 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件。
* Ventoy 安装之后，同一个U盘可以同时支持 x86 Legacy BIOS、IA32 UEFI、x86_64 UEFI、ARM64 UEFI 和 MIPS64EL UEFI 模式，同时还不影响U盘的日常使用。
* Ventoy 支持大部分常见类型的操作系统 （Windows/WinPE/Linux/ChromeOS/Unix/VMware/Xen ...）

不足就是不支持 macOS 系统，不过 macOS 系统的安装盘一般使用其他工具。

## Windows 11 Pro

因为我作为开发者，不太愿意安装 Windows 11 Home 版本，总是担心以后万一用到什么功能的话就需要重装操作系统。而且我去微软官方网站始终没有找到针对个人的 Pro 版本购买入口，于是就寻求万能的淘宝解决了序列号问题。

## 新主机新系统

对于新主机感受就是，一切都变快了，使用无所顾忌。但是，这次早已经没有跑个分的热情了，因为跑或不跑，性能也就这样了。摩尔定律到头的结论很多年前不断传出，但是最近几年发现，电脑的各种核心配件的性能仍然在快速发展。

对于新系统除了早已预期的界面交互改变之外，还需要花时间探索。

## 数据迁移

这里数据不仅仅包括办公文档、代码、音视频等数据，也包括软件列表、软件配置等一切新系统不附带的，和个人相关的数据。

* 软件：大部分常用软件都是通过腾讯软件管家下载安装，开发相关软件从官网下载安装。
* 账号密码：网站的使用了浏览器的同步功能，软件全部手动登录一遍。
* 其他数据：通过 PSSD 移动硬盘拷贝解决。