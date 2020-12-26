---
title: "树莓派入门"
cover: ""
date: "2020-12-26"
category: "硬件"
tags:
  - 树莓派
---

多年以前有尝试树莓派的想法，然后知乎阅读过一些高赞回答，比如[“「树莓派」是什么？普通人怎么玩？"](https://www.zhihu.com/question/20859055)、["能用树莓派干些什么有趣的事情？"](https://www.zhihu.com/question/32163206)、[“树莓派能用来干什么?”](https://www.zhihu.com/question/22741805)。这些答案当中列举的作用有：

* 个人网站
* Git 服务器
* BT 下载
* 家庭 NAS
* 私有云服务 ownCloud
* 智能音箱
* 集成测试
* 路由器
* 垃圾分类检测
* 智能小车
* 无人机
* 等等

但是，我基本上都用不上，或者没时间玩，或者有替代品，我希望能对工作或学习有实际的作用，并且没有其他替代品，然后就打消了尝试树莓派的想法。

## 购买树莓派

直到今年生日，朋友 S 赠送了一个[树莓派4B](https://union-click.jd.com/jdc?e=&p=AyIGZRtZEQESDlccUxUyFgBQE14TABsFVRtrUV1KWQorAlBHU0VeBUVNR0ZbSkdETlcNVQtHRVNSUVNLXANBRA1XB14DS10cQQVYD21XHgNSHlMQBBAOVxtbJUIVXFBGDnVqclcJS1p3dHpPDFgibVQeC2UaaxUDEwVVHV8VChI3ZRtcJUN8B1waXREKIgZlG1wUCxoPUBJeFAUWAmUcWxwyxrnPzOK1YGE3ZStYJTIiB2UYa1dsEAcCSQgcBxRTBRJbEAMUAQZLWB1VQlJSElISURFUUEhrFwMTA1w%3D)，有 4G 内存。然后打算玩一下的时候，发现没有 SD 卡、显示器连接线、网线，也就懒得去折腾了。

就这样，又过了半年左右，出现过好几次使用手机看网页或者视频时，因为服务器在国外所以速度很慢或根本无法观看的情况。当然，都是正常健康向上的内容，比如阅读 Swift 官方技术文档，又比如观看油管上面的教程视频，对于小众领域，油管上面的教程视频要丰富的多，应当充分利用好国内外资源。这时，我想，是时候该树莓派登场了，因为树莓派有无法替代的综合优势：

* **成本低，只需五六百**
* **7x24 小时运行，且稳定可靠**
* **无噪音**
* **自己拥有完全控制权限**

这几项的结合是其他产品无法替代的，比如云服务器可以 7x24 小时运行，但是成本高、带宽小，自己并没有完全控制权限；又比如自己日用电脑，无法 7x24 小时运行，可能有噪音，费电。

于是，我从京东购买了[树莓派64GB基础配件包](https://union-click.jd.com/jdc?e=&p=AyIGZRtZEQESDlccUxUyFQ9QGlsVBxsFUhJrUV1KWQorAlBHU0VeBUVNR0ZbSkdETlcNVQtHRVNSUVNLXANBRA1XB14DS10cQQVYD21XHgBdHloVAhcOVxxSJURiXSx%2BJA9GcFEdfQ5wamp4Bm8lV3IeC2UaaxUDEwVVHV8VChI3ZRtcJUN8B1waXREKIgZlG1wUCxoPUB1TEgATDmUcWxwyxrnPzOK1YGE3ZStYJTIiB2UYa1dsF1AGGQ5CURdXV08PEAVBBwZPCBdRGwBUSQ4SVhNTVR5rFwMTA1w%3D)，价格 199 元，包括下面 7 个配件：

* Type-C 接口电源
* 官方外壳
* 散热片
* micro-HDMI 线
* 网线
* 64G SD 存储卡
* 读卡器

## 安装树莓派操作系统

购买的 SD 卡里面已经预装了操作系统，所以无需重复安装了，不过我还是自己安装了一遍，非常简单，从官网下载[操作系统镜像安装工具](https://www.raspberrypi.org/software/)即可。安装好这个工具之后，插入 SD 卡，然后可以选择要安装的操作系统以及安装树莓派操作系统的 SD 卡，点击开始即可。因为我不打算连接显示器，所以安装的是 Lite 版本。

**树莓派官网及资源下载需要开启代理，请自行解决，或者到[树莓派实验室](https://shumeipai.nxez.com/download)下载**

**其实，[树莓派官网文档](https://www.raspberrypi.org/documentation/)已经包含比较详细的教程了，包括安装、配置、编程等。**

## SSH 远程连接

因为我不想使用树莓派连接显示器、键盘、鼠标等一堆东西，所以需要一开机就可以使用 ssh 登录上去，下面是主要步骤：

* SD 卡插入到读卡器里面，读卡器插入电脑 USB 上面，可以看到磁盘列表多了一个`boot`
* 在这个`boot`里面创建一个空文件，名称是`ssh`
* 然后将 SD 卡插回树莓派当中，将树莓派网线接入到路由器上面，接通电源，会有红灯亮起
* 进入路由器后台页面，查看已连接设备列表，可以看到树莓派分配的 IP 内网 IP 地址，比如是`192.168.0.2`
* 然后使用命令`ssh pi@192.168.0.2`连接，遇到询问`yes/no`，输入`yes`，默认密码是`raspberry`
* 如果成功会出现下面输出：

```txt
Linux raspberrypi 5.4.79-v7l+ #1373 SMP Mon Nov 23 13:27:40 GMT 2020 armv7l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sat Dec 26 13:38:59 2020 from 192.168.10.103
-bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
manpath: can't set the locale; make sure $LC_* and $LANG are correct
pi@raspberrypi:~ $ 
```

### 修改默认密码

使用默认密码连接非常不安全，需要修改，经过查询得知下面命令

```sh
# 设置 root 用户密码
sudo passwd root

# 设置 pi 用户密码，直接使用下面命令报错，需要先设置 root 密码
sudo passwd pi
```

### 使用基于 SSH Keys 认证连接

每次连接输入密码很麻烦，而且也不如 SSH Keys 安全。首先检查自己电脑用户是否存在 ssh keys，即`~/.ssh/`目录是否有类似`id_xxx`和`id_xxx.pub`文件，如果没有，可以通过下面命令生成。

```sh
# 生成基于 ed25519 算法的密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 输出公钥内容
cat ~/.ssh/id_ed25519.pub
```

将公钥内容复制到树莓派`~/.ssh/authorized_keys`文件当中。

此时可以通过下面命令验证是否设置成功：

```sh
# 退出
logout
# 连接
ssh pi@192.168.0.2
```

如果直接连接进入，则表示设置成功。

## 安装应用

树莓派官网操作系统是基于 Debian 的系统，使用`apt`工具来管理包/应用的安装。

### 更换国内镜像源

官网源速度比较慢，可以使用中科大镜像源：

```sh
# 备份原配置文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo cp /etc/apt/sources.list.d/raspi.list /etc/apt/sources.list.d/raspi.list.bak

# 替换第一行为 deb http://mirrors.ustc.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi
sudo vi /etc/apt/sources.list

# 替换第一行为 deb http://mirrors.ustc.edu.cn/archive.raspberrypi.org/debian/ stretch main ui
sudo vi /etc/apt/sources.list.d/raspi.list

# 同步更新
sudo apt-get update
```

Lite 版本操作系统不带`git`，通过下面命令安装

```sh
sudo apt install git
```

## 文件传递

把电脑文件传到树莓派上或者反过来的需求是比较常见的，方式和工具也有很多，比如 SFTP 和 rsync：

### SFTP

因为前面已经配置好了 SSH Keys，所以可以通过下面命令直接连接树莓派：

```sh
sftp pi@192.168.0.2
# 连接成功
Connected to 192.168.0.2.
# 输入 help 可以查看帮助
sftp> help
```

树莓派系统默认已启动 SFTP 服务，而我使用的 macOS 也自带 SFTP 命令（客户端），所以无需额外安装任何东西，直接连接即可。

### rsync

SFTP 对于多个文件，乃至整个目录的同步还不太方便，此时可以使用`rsync`命令，`rsync`命令非常强大，有很多参数，比如复制整个目录：

```sh
# 注意 source/ 最后面的斜线，表示复制 source 目录内容到 /home/pi/destination
# 如果不加斜线，则会复制后文件结构是 /home/pi/destination/source
rsync -av source/ pi@192.168.10.102:/home/pi/destination
```

## 相关链接

* [（国内）树莓派实验室](https://shumeipai.nxez.com/)
* [树莓派官网](https://www.raspberrypi.org)
* [树莓派官方文档](https://www.raspberrypi.org/documentation/)
* [安装工具下载](https://www.raspberrypi.org/software/)
* [操作系统下载](https://www.raspberrypi.org/software/operating-systems/)
* [远程连接](https://www.raspberrypi.org/documentation/remote-access/)
* [使用 SSH Keys](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)
* [配置系统](https://www.raspberrypi.org/documentation/configuration/)
* [配置 WiFi 连接](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
* [安全性](https://www.raspberrypi.org/documentation/configuration/security.md)
* [树莓派更换国内源](https://blog.csdn.net/weixin_43336281/article/details/97373288)
* [文件同步 SFTP](https://www.raspberrypi.org/documentation/remote-access/ssh/sftp.md)
* [rsync 用法教程](http://www.ruanyifeng.com/blog/2020/08/rsync.html)
