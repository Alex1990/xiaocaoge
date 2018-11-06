---
title: "Charles 入门"
cover: ""
date: "2018-11-04"
category: "移动端"
tags:
  - "Charles"
  - "调试"
  - "代理"
  - "移动端"
---

Charles 是一款 HTTP 代理和调试工具，在 Web 开发过程便于查找问题，尤其是移动端方面。现在已经是跨平台的了，支持 Windows、MacOS 和 Linux 三大系统平台。另外，这是一款收费软件，50美刀，以前是30美刀，可以多台电脑使用同一个证书，这点儿比 Sketch 好多了。

## 下载与安装

访问官方[下载页面](https://www.charlesproxy.com/download/)，根据自己的操作系统选择合适的下载包，然后下载安装即可。

**下面的所有内容均按照 MacOS 版本书写**

### 权限

因为 Charles 是通过修改系统代理配置来实现请求拦截的，所以需要系统权限。

安装完成之后，打开即可使用，使用浏览器加载一个页面，Charles 界面大致如下显示：

![Charles interface](/images/getting-started-charles/charles-interface.png)

![Charles interface](/images/getting-started-charles/charles-squence.png)

前一张图将会把所有请求结果显示为如图中左侧的树状结构，右侧显示 HTTP 请求的具体头部、内容等信息。也可以切换成第二张图那样，将请求显示为按照请求发起时间排序的列表，便于查看最新的请求，底部显示请求的头部、内容等信息。

## 代理设置

通过菜单【Proxy】-【Proxy Settings】打开代理设置面板。可以配置代理端口，或者使用动态分配端口，解决与其他应用端口冲突问题。Charles 默认使用 HTTP 代理模式，也可以使用 Socks 代理模式。

**大多数 Charles 的配置面板都可以通过问号按钮点开一个帮助，会介绍当前配置面板的使用，可以通过这个了解不懂的配置项。也可以通过[官方文档](https://www.charlesproxy.com/documentation/configuration/)来查看具体的配置使用规则，如果文档没写或还是不清楚可以搜索下。通过这些基本上可以解决常用的使用问题。**

## HTTPS

默认情况下，Charles 虽然可以代理 HTTPS 请求，但是无法查看请求和响应的内容，因为是加密的。首先，需要安装一个根证书（Root Certificate），通过菜单【Help】-【SSL Proxying】-【Install Charles Root Certificate】安装证书，并且需要把根证书设置为信任（Always Trust）。然后，通过菜单【Proxy】-【SSL Proxying Settings】打开 SSL 代理设置面板，开启 SSL Proxying，在其 Location 列表里面添加 Host 为通配符`*`的配置，这样对所有域名都会开启 SSL 代理。确认，此后就可以查看 HTTPS 请求或响应内容了。Charles 对 HTTPS 代理解密流程可以参考[浅谈Charles抓取HTTPS原理](https://www.jianshu.com/p/405f9d76f8c4)。

### 移动端

Charles 的原理是通过启动一个 HTTP/SOCKS 代理服务器，然后配置系统网络代理，将所有应用的请求都通过 Charles 代理服务器与远端服务器交互，Charles 代理服务器可以查看请求，加解密 HTTPS，或者对请求内容做些其他更改。可以看到，启动 Charles 之后，MacOS 的代理配置会自动更改。

![MacOS Network Proxies](/images/getting-started-charles/macos-network-proxies.png)

移动端，或者说远程设备，可以通过配置系统代理将请求都转发到 Charles 代理服务器的方式实现请求代理与调试。首先，需要移动端与 Charles 电脑处于同一局域网内。然后配置移动端的 WiFi 代理为手动，iOS 点击无线局域网列表项的感叹号图标来配置网络，滑动到底部为 HTTP 代理配置，选择手动，并填写服务器和端口号，服务器为 Charles 电脑局域网分配的 IP，端口号默认 8888。Android 长按无线局域网列表项，出现网络配置页，所填内容与 iOS 相同。然后，移动端初次访问页面，Charles 会弹出是否允许设备连接的确认弹层，点击允许（Allow）即可。到此，Charles 就可以查看移动端的 HTTP(S) 请求了，但是 HTTPS 请求的内容仍然是加密的。

要想查看移动端的 HTTPS 请求内容，需要在移动端安装根证书，配置好移动端的 WiFi 代理后，再通过浏览器内访问 chls.pro/ssl 即可下载并安装证书。另外，还需设置证书信任，iOS 通过【通用】-【关于本机】-【证书信任设置】（底部）页面设置。此时就可以查看 HTTPS 请求的内容了。

### 访问控制设置

上一节讲到远程设备连接 Charles 时，会弹出是否允许设备连接的确认弹层，假如同一局域网有多台设备要连接的话，可能会比较麻烦，这种情况测试流程比较常见。此时，可以通过菜单【Proxy】-【Access Control Settings】面板来配置，使用子网格式配置某个 IP 段，比如 10.1.1.0/24 即可允许所有的 10.1.1.\* 地址访问。

## 生产环境调试

有时候需要验证一些更新（或前端静态资源，或后端接口）在生产环境上面的效果，在调试线上 bug 时候常用，此时需要把部分请求代理到本地或开发服务器，这时可以通过 Charles 的 Map Remote 来实现，如下图配置：

![Map Remote Settings](/images/getting-started-charles/map-remote-settings.png)

- 第一条规则将`www.example.com/`域名下的所有请求代理到`127.0.0.1:8080`，注意域名末尾的斜杠`/`不能少。
- 第二条规则将`www.example.com`域名下的 js 文件代理到`127.0.0.1:8080`。
- 第三条规则将`www.example.com/api/`路径下的请求代理到其 HTTPS 版本。

位于下面的规则覆盖上面的规则。

通过 Rewrite 功能（位于【Tools】-【Rewrite...】）可以实现请求或响应的修改，比如请求头的添加、修改、删除，还有请求内容的修改。除了简单的替换之外，还支持正则匹配与替换。

## 问题

- Charles 抓取不到 Chrome 的请求？

对于使用了 SwitchyOmega Chrome 插件的需要配置 SwitchyOmega 代理使用 Charles 代理地址，默认`127.0.0.1:8080`。

- HTTPS connect 方法请求总是失败？

通常出现在移动端应用（非浏览器）的请求当中，这是因为该应用使用了一种 [Certificate pinning](https://www.perimeterx.com/blog/certificate-pinning-on-mobile/) 的安全技术，可以暂时关掉 SSL Proxying 来绕过，网上说也可以通过一些复杂的步骤来绕过（暂时未尝试）。

## 参考

- [Charles documentation](https://www.charlesproxy.com/documentation/configuration/)
- [OSX/iOS 抓包工具 Charles 入门](https://www.jianshu.com/p/dbcf1ef87a63)
- [Charles 抓不到 Chrome 的包](https://www.jianshu.com/p/d107de695377)
