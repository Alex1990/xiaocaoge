---
title: "移动端 Web 开发远程调试指南"
cover: ""
date: "2019-02-04"
category: "前端"
tags:
  - "调试"
  - "移动端"
  - "远程调试"
---

这里移动端 Web 既包括在浏览器里面运行的网页，也包括使用 WebView 访问的网页。另外，远程调试既包括调试真机上面的网页，也包括使用 iOS/Android 模拟器里面运行的网页。

## 调试 iOS Safari 和 iOS WebViews

通常使用 macOS 的 Safari 远程调试 iOS Safari 网页和 iOS WebViews。此外，也可以使用 Chrome、Firefox 等来远程调试 iOS 网页，这样可以实现在 Windows、Linux 平台上面远程调试 iOS 网页。

### 使用 macOS Safari 远程调试 iOS

1. 首先打开 macOS Safari 开发者菜单：打开 Safari【偏好设置】-【高级】面板，然后勾选底部“在菜单栏显示开发者”选项；
2. 然后，依次点击 iOS 【设置】- 往下面滑动【Safari 浏览器】- 滑动到底部【高级】，启动“Web 检查器”；
3. 使用 USB 将手机连接到电脑，如果弹出“是否信任此电脑”对话框，就选择信任此电脑；
4. 使用 iOS Safari 打开一个网页，然后在 macOS Safari 开发者菜单里面出现“XXX 的 iPhone”（XXX 是你手机的名称），下一级菜单出现你 iOS Safari 正在打开的网页，然后选择，就可以启动 macOS Safari 的开发者工具了。可以如同调试桌面端网页一样，查看控制台输出、页面元素查看、网络请求、断点调试等。关于 macOS Safari 开发者工具的使用可以参考：[Safari Web Inspector Guide](https://support.apple.com/zh-cn/guide/safari-developer/welcome/mac)。

#### 使用 WiFi 连接电脑与手机

和上面步骤一样，只不过可以勾选【XXX 的 iPhone】下一级菜单里面的【通过网络连接】选项（该选项需要特定 Safari 版本以上才可以），并且保证电脑与手机处于同一局域网内，然后就可以断开 USB 连接，可以看到【XXX 的 iPhone】仍然存在，如同 USB 连接那样，可以正常调试。

#### 调试 iOS 模拟器里面的网页

如果是调试 iOS 模拟器里面的网页，则先打开 iOS 模拟器里面的网页，然后 macOS Safari 开发者菜单里面会出现你当前运行的模拟器，然后选择正在打开的网页就可以启动 Safari 开发者工具了。

### 使用 Chrome 远程调试 iOS

现在前端开发者使用 Chrome 开发者工具来调试网页已成主流，虽然各浏览器的开发者工具核心功能大同小异，但是细节方面体验会有差异，有些人可能偏好 Chrome 开发者工具。通过使用 [remotedebug-ios-webkit-adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) 工具可以实现 Chrome、Firefox、VS Code 等工具来远程调试 iOS 上面的网页。具体安装与配置可以参考 remotedebug-ios-webkit-adapter 的文档。另外，该工具不仅仅可以在 macOS 上面使用，还可以在 Windows 和 Linux 上面使用。

## 调试 Android 浏览器和 Android WebViews

通常就是使用 Chrome 来调试 Android 上面的页面，而且 Chrome 是跨平台的，因此在各个平台上面都可以调试 Android。

### 使用 Chrome 远程调试 Android

1. 首先启用开发者选项和调试：【设置】-【关于本机】-【开发者选项】，并启用里面的“USB 调试”;
2. 打开桌面 Chrome 开发者工具，点击右上角的菜单按钮（竖着三个点图标），然后【更多工具】-【远程设备】，打开远程设备标签页，或者在一个单独的标签页地址栏输入`chrome://inspect`；
3. 勾选“远程设备”标签页里面的“发现 USB 设备”；
4. 通过 USB 将手机与电脑连接，可能需要在手机上确认“允许 USB 调试”；
5. 此时可以在“远程设备”标签页看到已连接的手机；
6. 使用浏览器访问任一页面，“远程设备”标签页对应的手机会出现正在访问的页面标题与地址，点击其后面的“Inspect”按钮，启动该页面对应的开发者工具，就可以开始调试了。

调试 Android 模拟器里面的页面同理，只是不需要 USB 连接与手机上面的设置就可以直接在“远程设备”里面查看正在运行的模拟器及页面。

## TBS Studio

[TBS](https://x5.tencent.com/tbs/index.html) 是 Tencent Browser Service 简称，是腾讯开发的浏览服务，主要用于微信、QQ、QQ 浏览器等腾讯系应用。而 [TBS Studio](https://x5.tencent.com/guide/debug.html) 是专门用于远程调试基于 TBS 应用内页面的的工具。

其主要功能特性有：

1. 自动检测手机与 PC 的连接；
2. 自动检测网页是否可进行 Inspect 调试；
3. 自动引导开发者打开 Inspector 调试开关；
4. 一键开启 Inspector 调试，无需打开浏览器输入 URL，方便快捷；
5. 扩展X5内核独有 Inspect 选项，方便页面分析和优化；
6. 真机远程 Inspector 调试。

该工具只能调试 Android 上面的应用。

## spy-debugger

[spy-debugger](https://github.com/wuchangming/spy-debugger) 是一款基于 [weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/)、AnyProxy 等开发的移动端页面调试工具，可以调试 iOS 和 Android，浏览器和 WebViews。所以优势就是使用简单，使用范围广。但是 weinre 是早期使用的一款调试工具，已经停止开发和维护了。

## 网页内置调试工具

有时需要调试 WebView 里面的页面，但是使用桌面浏览器远程调试 WebView 里面的页面需要手机应用配置，假如该应用是第三方开发，可能并不可以使用桌面浏览器来调试。这时候，可以使用最简单的`alert`查看输出或者将输出写入的页面的某个元素里面，但是这种方法比较繁琐，降低调试效率。还可以借助一些网页内置调试工具，比如 [vConsole](https://github.com/Tencent/vConsole) 或 [eruda](https://github.com/liriliri/eruda)。这两款工具功能类似，支持查看页面元素、控制台、网络请求、查看网络存储等功能，其引入与基本功能使用可以参考官方文档。

与上面使用桌面端浏览器远程调试相比，这些工具存在一些劣势：

* 并不能查看所有网络请求，比如 WebSocket；
* 网络请求信息不丰富，比如请求大小、请求速度等；
* 不能断点调试。

因此，优先使用桌面端浏览器来远程调试，这些工具主要用来查看页面元素和控制台输出，网络请求可以使用专门的网络抓包代理工具。

## 网络抓包代理工具

虽然浏览器开发者工具通常都具有查看网络请求的功能，但是缺少一些更高级的功能，比如请求或响应内容替换、请求重定向到本地等。这时候可以使用专业的网络抓包代理工具，主要有 [Charles](https://www.charlesproxy.com/) 和 [Fiddler](https://www.telerik.com/fiddler)，两个工具目前都是跨平台的，支持 Windows、macOS 和 Linux。关于 Charles 的使用可以查看官网文档或我之前写的一篇文章[Charles 入门](https://xiaocaoge.com/getting-started-charles/)，而 Fiddler 我并没有使用过，可以查看其官方使用文档或自行搜索教程。

## 调试技巧

* 早期的 Android WebView 与自带浏览器渲染引擎版本是一样或接近的，可以通过自带浏览器调试；
* 使用 WebView 开发时，最好应用能提供开发者版本，并且提供打开任一页面的快捷功能，便于在应用内测试一些兼容性问题；
* 尽量使用桌面浏览器来调试，在解决一些 bug 时，依照代码执行流程来一步一步断点调试，二分法打断点来快速缩小排查范围；
* 搜索：自己经验、他人经验、搜索引擎、开源项目 issues 等。

## 参考

* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [Get Started with Remote Debugging Android Devices](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
* [Remote Debugging WebViews](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/webviews)
* [Chrome remote debugging over wifi](https://remysharp.com/2016/12/17/chrome-remote-debugging-over-wifi)
* [Safari Web Inspector Guide](https://support.apple.com/zh-cn/guide/safari-developer/welcome/mac)
* [(Wireless) Remote Debugging with Safari on iOS](https://silvantroxler.ch/2018/wireless-remote-debugging-with-safari-on-ios/)
* [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy)
* [remotedebug-ios-webkit-adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter)
