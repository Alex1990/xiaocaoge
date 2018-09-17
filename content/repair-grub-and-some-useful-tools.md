---
title: "修复 grub 及相关工具"
cover: ""
date: "2014-08-14"
category: "Linux"
tags:
  - grub
  - Ubuntu
  - 系统引导
---

今天在升级 Ubuntu 时，到 grub 处卡住了，自带的升级管理器窗口变黑了，一直没有反应，然后我强制关闭了，重启之后发现杯具了。进入了 grub rescue 模式，说是 “crypto.mod” 未找到。我装的双系统，另外一个是 Windows7，由于 Windows7 要靠 grub 引导，自然也进不去了。

想着先利用分区工具修复 Windows7 的 MBR（到最后发现这个思路走远了），然后从网上或同事那里弄一个 crypto.mod 放进去试试。但是，发现U盘启动盘不见了，应该没带，只好向同事借了一个，里面还没有我需要的工具，只是一个 CentOS 安装盘。由于我不会在 Linux 下面制作启动盘，只好借了一位同事的 Windows 电脑，是利用U启动这款软件来制作的，功能挺全，就是有点大，300多M。很快我就制作好了，并利用里面的图形分区工具 DiskGenius 重新安装了 MBR，从而可以进入 Windows7 系统了。

我一开始是想从网上下载 crypto.mod 的，但是只有源代码，我想下载一个 minGW 来编译一下，但是我怕编译后的文件不能用于 Linux 系统下（话说到底能用吗），然后从同事那里复制了一个。哦，说明一下，上周我装双系统 Windows7 时，已经知道了 Ext2Fsd 这款工具可以让 Windows 系统读写 Linux 的 Ext2/3/4 分区，通过设置就可以像操作 Windows 分区那样操作 Linux 下的分区（另外一款相似工具 Ext2explore 在我的电脑上只能读，不能写，而且界面类似于很多 FTP 工具那样的，我是不大喜欢）。这样我就可以把 crypto.mod 拷贝到 Ubuntu 中了。

重启电脑，这次倒是没有进入 grub rescue 模式，反而进入了 grub4dos，当时我就晕了，这个 grub4dos 是什么工具呢？这个当然百度一下就知道了，grub4dos 是一个系统引导软件，grub 的分支，这个看名字也能猜出和 grub 有关系。然后我就根据网上查到的在 grub4dos 里面设置 root、kernel、initrd，然后执行 boot 命令，我没有期望这样就能进入 Ubuntu，当然它确实也没进去。因为某种原因失败了，然后进入到了 busybox 里面，并且提示可以执行几十个常见的 Linux 命令。经搜索知道了 busybox 是一个集成了一百多个常用 Linux 命令及一些常用工具的迷你版 Linux，在嵌入式开发中很常用。当然我也试着搜索“ubuntu busybox”，“busybox 引导 Ubuntu”，“busybox 安装 grub”，但是打开几个网页没有找到想要的结果，试了几个 StackOverflow 上面的回答，但是因为问题不完全一样中途失败了。

另外 SO 上面也说了第一选择是利用 Ubuntu 的 Live CD 版来修复该问题，而我考虑到本地硬盘没有，Ubuntu 体积大，公司网络下载慢，所以就把这个作为最后的尝试了。当然经过上面的一系列折腾、失败，时间也从早上九点到了下午三点左右了，我这一天啥都没干呢，就为了修复 grub 升级失败。更悲催的是下载 Ubuntu 的速度慢的超出我的预料，我是从官网下的，无论是直接下，还是通过 goagent 代理下，都只有 20KB 的均速，经常下了快 100M 时就变成 0 了。看来还是自己电脑里有才是王道，网络不可靠，我只好下载 1.5G 的 Ubuntu Kylin 了，经过一个多小时下载好了。

然后就是做一个 Ubuntu Kylin 的 Live USB 版，毕竟这年头光盘少啊。经过查询有好几款工具都可以制作：LinuxLive USB Creator，Unetbootin，grub4dos 等，见此文[U盘启动 Ubuntu 的 Live USB](http://www.360doc.com/content/12/1109/10/5698935_246765552.shtml)。原来 grub4dos 也可以制作啊，但是操作可能复杂，最后我选择了简单的 LinuxLive USB Creator。从官网下载软件后，按照软件操作步骤即可，非常简单，需要注意的是有一步是要选择固定系统模式的大小，这一步保持默认的 0 就可以了，结果我选择了2040M，这样最后一步应该是对这个 2040M 的空间特殊处理了，费了较长时间。U盘毕竟不是 USB 3.0 的，写入1.5G 也要好长时间呢，还好顺利地制作了 Ubuntu Kylin 的 Live USB 版。

现在可以重启电脑，进入 Live Ubuntu Kylin 系统中了，加载确实比硬盘安装慢多了。进入系统之后，需要重新安装 grub，详请可参考 [LiveCD 安装 Ubuntu 开机引导 grub](http://blog.csdn.net/haoyunsheng_1201/article/details/7266941)。关键的步骤：

```shell
sudo -i
mkdir /media/tempdir
mount /dev/sda2 /media/tempdir
grub-install --root-directory=/media/tempdir /dev/sda
```

然后，重启就可以进入到 grub 启动菜单了，如果启动菜单里面没有 windows，则需要进入到 Ubuntu 中，并执行下面命令就可以了。

```shell
sudo update-grub2
```

修复完之后，已经快下班了，用了半天多时间，最后发现其实只要有 LiveCD 或 LiveUSB 版的 Ubuntu 就可以在十分钟内搞定了，而我偏偏绕了很大一个圈子。看来修复系统这事，必须准备齐全工具才行，可以节省非常多的时间。比如这次的问题，我最理想的情况是有个 LiveUSB 版的 Ubuntu，次一点自己或别人硬盘里面存着 Ubuntu ISO 文件，再次一点针对 Windows 系统的 U盘启动盘得有个吧。就当这些都没有，网速够快也可以吧，偏偏所有这些都没有，而我当时也不知道 Live 版是最简单直接的修复方式，所有这些结合就导致我今天花费近一天时间。
