---
title: "Ubuntu 下安装 Windows 7"
cover: ""
date: "2014-08-14"
category: "Linux"
tags:
  - grub rescue
  - Ubuntu
  - windows7
---

由于要学习 Flash 头像上传组件制作，所以必须切换到 Windows 系统，但是目前的系统是 Ubuntu。在 Windows 下安装 Ubuntu 有经验，比较容易，但是反过来就得网上查一下怎么弄了，主要是 Windows 安装时会把 Ubuntu 的引导系统 grub 给覆盖。

系统现状：Debian 与 Ubuntu 14.04 双系统，Debian 是前一位离职人员使用的，我安装 Ubuntu 时没有把它删除。

由于没有删除 Debian，所以 boot 分区是它所在的分区（/sda1），然后我怎么改 Ubuntu 里面的 grub 配置，都没办法使 Ubuntu 成为开机启动项的第一项，我觉得和 boot 分区是 Debian 所在分区有关。当然，这是我在直接格式化 Debian 所在的分区之后才反应过来的，因为删除之后，重启直接进入了 grub rescue 模式。至于我为什么去格式化 Debian 分区，因为我要装 Win7，我一直修改 Ubuntu 里面的 grub，总是无法让 Ubuntu 成为启动项第一，心里烦了，反正 Debian 里面有什么与我无关，反正我也不知道删除它会怎么样。

至于如何从 grub rescue 模式正常进入系统，并修复 grub 引导，先把 Win7 装好再说，毕竟这是主要目的来着。

用光盘或 U 盘启动盘安装 Win7，就像刚组装好机器安装 Win7 那样。首先应该建立 NTFS 分区，现在我该庆幸当初留着 Debian 了，这样就可以把 Win7 装到它所占的分区了，当然应该先利用分区工具把 ext4 格式分区删除，然后重新建立 Win7 要用的 NTFS 主分区。如果我当初删了 Debian 的话，估计安装 Ubuntu 时会占满这个硬盘，而且能不分区尽量不分区，现在我到觉得应该分几个区比较好，而且分区不一定非要把整个硬盘用完，反正不弄视频之类的也用不了多大容量。建立 NTFS 分区时会重写 MBR，因此就不能再进入到 grub 了。

既然已经建立了 NTFS 分区，剩下就好办了，直接把 Win7 安装到里面就行了。安装完 Win7 之后使用 EasyBCD 工具给 Win7 的启动管理器（就是启动项菜单），添加进入到 Ubuntu 的选项，该工具很好用，直接“添加项目”，并选择 Linux 类型，找到 Ubuntu 所在的分区就可以了。然后重启，就会在 Win7 的启动项菜单里面看到新添加的进入到 Ubuntu 的条目，选择进入，然后就回到了 grub rescue 模式。

如何从 grub rescue 模式进入到 Ubuntu 呢？详细可参考此文：[grub rescue 救援模式的处理](http://blog.chinaunix.net/uid-22915173-id-229241.html)。

grub rescue 模式下，只有几个命令可用：`ls`、`set`、`insmod`、`root`、`prefix`。

执行以下命令：

```shell
grub rescue>set root=(hd0,msdos2) // 设定 grub 启动分区，Ubuntu 所在分区
grub rescue>set prefix=(hd0,msdos2)/boot/grub // 设定 grub 启动路径
grub rescue>set // 查看设置情况
grub rescue>insmod /boot/grub/i386-pc/normal.mod // 加载基本模块
grub rescue>normal // 进入正常模式，会出现 grub 的开机启动菜单，选择 ubuntu 进入
```

上面需要注意 normal.mod 模块位置，我的 Ubuntu 14.04 在 `grub/i386-pc/` 目录下，有些就在 `grub/` 目录下。

进入到 Ubuntu 之后，还要重新安装 grub 引导，更新 grub 配置才可以。执行以下命令：

```shell
grub-install /dev/sda
update-grub
```

OK，再次开机时 grub 启动项就会多一个 Windows 7 的选项了。有趣的是 grub 启动菜单选择 windows 7 进入到 Windows 启动菜单，而 Windows 启动菜单里面有前面添加的 Ubuntu 选项，然后可以回到 grub 启动菜单，然会无限轮回。
