---
title: "WebView JS SDK 设计"
cover: ""
date: "2021-03-14"
category: "前端"
tags:
  - WebView
  - SDK
  - 接口
---

现如今，大部分互联网公司多多少少都有些移动端项目，主要都是原生语言开发，但是也有一些页面使用 WebView 来开发。WebView 对于性能要求不高时比较适用，天然跨平台，开发效率高，可维护性强。在实际的项目当中，往往需要 WebView 与原生应用通信，然而因为没有统一的标准规范，导致各公司原生应用提供的接口千差万别，iOS 和 Android 也不同。更糟糕的是，iOS 和 Android 提供了两套接口，但是没有人意识到需要封装一个所有项目可用的 JS SDK，都是直接调用 iOS 和 Android 提供的接口，这严重降低了开发效率。

本文总结以往项目经验，并参考其他资源，说明一个典型的 WebView JS SDK 应该提供哪些接口。

## 用户代理字符串 UserAgent

WebView 的用户代理字符串最好添加上应用标记，以便其他地方识别。

## 授权机制

进入 WebView 页面之前用户往往已经在原生应用当中登录了，这时需要将登录信息传递给 WebView 页面，有多种方式：

* 通过页面 URL 查询参数传递；
* 通过写入 WebView cookie 传递。

## 路由控制

WebView 内页面路由和浏览器当中一样，无需特别说明，这里主要是 WebView 页面跳转到原生页面：一种情况是调用 JS SDK 提供的方法跳转到指定原生页面；另一种情况是点击 WebView 页面的左侧返回按钮，当前 WebView 页面是进入 WebView 的第一个页面，此时最好可以自动返回跳转到当前页面的原生页面。

## 设置导航栏

导航栏 UI 包括：左侧按钮、中间标题、右侧按钮（可选）、背景。

```ts
interface NavigationBarButton {
  // 名称用于处理多个按钮时区分
  name: string;
  // 导航栏按钮图标，图标名称或者一个图片 URL
  icon: string;
  // 导航栏按钮文本
  text?: string;
}

interface NavigationBarOptions {
  // 导航栏背景色
  backgroundColor?: string;
  // 导航栏前景色
  foregroundColor?: string;
  // 左侧按钮图标，图标名称或者一个图片 URL，默认是返回按钮
  leftIcon?: string;
  // 左侧按钮文本
  leftText?: string;
  // 中间标题文本
  title: string;
  // 标题大小
  titleSize?: number;
  // 右侧按钮组
  rightButtons?: NavigationBarButton[];
}

setNavigationBar(options: NavigationBarOptions)
```

## 导航栏按钮事件

事件风格有两种，可以选择其中一种，保证整个 SDK 风格统一。

* 所有事件使用单独的`onEventName(listener)`方法，下面都使用此种风格；
* 所有事件都使用同一`on('eventName', listener)`方法来绑定。

### 左侧按钮点击事件

```ts
onLeftTap(listener: () => void)
```

### 右侧按钮点击事件

监听回调函数接收一个`name`参数，用于区分具体点击的哪个右侧按钮。

```ts
onRightTap(listener: (name: string) => void)
```

## 创建新 WebView

用于创建一个新 WebView，并加载指定页面。

```ts
createWebView(url: string)
```
## 关闭当前 WebView

```ts
closeWebView()
```

## 跳转到原生页面

被跳转的页面推荐支持 [Scheme URL](https://sspai.com/post/31500)。

```ts
go(url: string)
```

## 配置社交分享

社交分享几乎是每个应用都支持的功能，其中可选的社交应用列表也可以定制，下面是统一分享内容，对所有默认社交应用都生效。

```ts
interface SocialShareOptions {
  title: string;
  image: string;
  description?: string;
  url?: string;
}

setSocialShare(options: SocialShareOptions)
```

## 应用从前台切换到后台

该事件的一个使用场景是数据统计，比如统计当前页面阅读时间。

```ts
onForegroundToBackground(listener: () => void)
```

## 应用从后台切换到前台

该事件的一个使用场景是数据统计，比如统计当前页面阅读时间。

```ts
onBackgroundToForeground(listener: () => void)
```

## 集成微信 JSBridge

部分 WebView 页面同样需要在微信当中浏览，此时可以集成微信官方的 JSBridge，提供统一的 JS SDK，当然最常用的两个就是导航栏设置和分享设置。

## 更多接口

除了上面最常用的接口之外，也可以根据业务需求，将原生应用的能力暴露出来，比如上传图片、录音、扫一扫、网络信息等。

## 相关链接

* [微信 JS SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)