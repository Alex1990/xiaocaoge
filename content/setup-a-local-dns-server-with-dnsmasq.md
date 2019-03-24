---
title: "使用 dnsmasq 设置一个本地 DNS 服务器"
cover: ""
date: "2019-03-24 22:00"
category: "网络"
tags:
  - "DNS"
  - "DNS Server"
  - "dnsmasq"
---

在程序开发过程当中，有时会碰到需要自定义子域名解析，比如把`*.example.com`的所有请求转发到本地开发服务器。由于`/etc/hosts`配置并不支持通配符（`*`），所以需要自己设置一个本地 DNS 服务器。

[dnsmasq](https://en.wikipedia.org/wiki/Dnsmasq) 是一个轻量级的，支持 DNS 转发、DHCP 等功能的 DNS 服务器软件，可以运行在 Linux、macOS 平台。

**下面内容以 macOS 平台为例，Linux 版本使用“dnsmasq ubuntu”之类关键词搜索可以得到很多相关文章。**

## 安装

使用 [Homebrew](https://brew.sh/) 安装：

```sh
brew install dnsmasq
```

## 配置

* 在目录`$(brew --prefix)/etc`当中创建一个`dnsmasq.conf`文件（如果已存在就不用创建）。

```sh
mkdir -p $(brew --prefix)/etc/
touch $(brew --prefix)/etc/dnsmasq.conf
```

* 在`dnsmasq.conf`文件中追加以下内容：

```
# 下面配置表示所有以`example.com`为后缀的域名（包括`example.com`）都解析到`127.0.0.1`
# 你还可以解析其他任意后缀，比如`address=/dev/127.0.0.1`将所有`dev`域名解析到`127.0.0.1`
address=/example.com/127.0.0.1
# 使用 DNS 默认端口号 53
port=53
```

* 创建一个 [DNS 解析器（dns resolver）](https://icannwiki.org/Domain_Name_Resolvers)

```sh
sudo mkdir /etc/resolver
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/example.com'
```

* 启动

```sh
sudo /usr/local/opt/dnsmasq/sbin/dnsmasq -C /usr/local/etc/dnsmasq.conf
```

* 也可以设置为开机启动

```sh
sudo brew services start dnsmasq
```

* 使用`ping`测试

```sh
ping example.com
ping 1.example.com
```

可以看到类似下面的结果（来源于地址`127.0.0.1`）：

```
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.016 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.031 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.087 ms
...
```

## 相关资源

* [/usr/local/opt/dnsmasq/sbin/dnsmasq --keep-in-foreground -C /usr/local/etc/dnsmasq.con](https://medium.com/@kharysharpe/automatic-local-domains-setting-up-dnsmasq-for-macos-high-sierra-using-homebrew-caf767157e43)
* [dnsmasq man page](http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
