---
title: "暗黑模式（Dark Mode）实战"
cover: ""
date: "2022-07-15"
category: "CSS"
tags:
  - CSS
  - 主题
  - 暗黑模式
---

**暗黑模式（Dark Mode）**，有时也称为**暗黑主题（Dark Theme）**，是指界面的主要区域使用暗色系的设计。随着近几年各种主流操作系统的支持和推进，很多 UI 组件库、应用或网站都已经支持了暗黑模式，而且，越来越成为网站或应用的必选项。本文主要介绍暗黑模式在前端方面的应用，当然，除了代码部分，其他知识是普遍适用的。

## 暗黑模式的好处

### 减少暗光条件下对眼睛刺激

随着手机等移动电子设备普及，夜晚观看屏幕的时长越来越长了，通过暗黑模式可减少亮光对眼睛刺激导致的眼睛疲劳。

### 省电

特别是 OLED 屏幕，通过关闭黑色像素的发光达到减少电量消耗，从而使设备使用时间更长。

### 吸引暗黑系爱好者

不能的人可能有不同颜色偏好，而暗黑模式可以吸引暗色主题爱好者，比如我自己。

## 配色方案（Color Scheme）

无论是 Material Design 还是其他的设计规范，都推荐使用的颜色数量尽量节制。这样做，既方便设计，也会减少颜色不一致对用户带来的困扰。

下面是一份应用核心颜色清单：

* **主色（Primary color）**：主要是 Logo、重要按钮使用。
* **次级色（Secondary color）**：不一定是必须的，主要是一些特别的地方使用。
* **背景色（Background color）**：顾名思义。
* **文本色（Text color）**：主体文本内容字体颜色。
* **次级文本色（Text secondary color）**：主要是表单提示、描述文本等字体颜色。
* **第三级文本色（Text tertiary color）**：主要是禁用状态文本或非常不重要文本等字体颜色。
* **链接色（Link color）**：超链接颜色，有时采用主色。
* **边框色（Border color）**：各种边框颜色，有时采用第三级文本色。
* **成功色（Success color）**：成功状态颜色。
* **失败色（Error color）**：失败状态颜色。
* **警告色（Warning color）**：警告状态颜色。
* **通知色（Info color)**：通知或普通信息状态颜色。

### 另外，还有一些特殊情况

#### 白色

比如主色按钮的文本色通常使用纯白色，而在暗黑模式下可能不会使用纯白色，这种颜色无法归类到上面的颜色清单里面。

这里提供一种解决方案，定义 10% 到 100% 亮度的主色，这样 100% 亮度就是纯白色，90% 亮度可以暗黑模式下使用，另外比主色亮度低的还可以作为特殊情况下的背景。

#### 浅灰色

比如某些区块可能使用，这里提供一种解决方案，定义不透明度 10% 到 100% 的`rgb(128,128,128)`颜色，这样不透明度 10% 时，在白色背景上面是浅灰色，在黑色背景上面是比黑色背景稍浅的黑色。

#### 代码片段

作为程序员，基本上必用代码片段了，会选用各种炫酷的语法高亮主题，对于这种情况，应该特殊处理，比如可以设计两套主题，不能归到上面的颜色清单。

## 注意事项

### 是否让用户选择哪种主题

* **为用户提供选择机会**：Material Design 推荐使用这种方式，可以在导航菜单或者应用设置里面提供，这也是目前大部分网站或应用的方式。**需要注意的是，有些提供了两种选项（Light 和 Dark），有些额外提供了一种“跟随系统”的选项，个人推荐这一种方式**。
* **始终跟随系统**：苹果的 HIG 推荐这种，好处在于不用让用户一个一个应用切换。

### 背景色尽量避免使用纯黑色

纯黑色背景对眼睛刺激比较强，而且无法表现阴影效果。Material Design 推荐使用`#121212`颜色，实际使用中也会偏黑，可以根据情况选择亮一点儿的，比如`#222222`。另外，除了黑色，也可以选取带有一点儿颜色的黑色，比如通过降低主色亮度生成的颜色。

一个另外情况就是穿戴设备，比如智能手表还是应该使用纯黑色，因为可以达到最大化节能，智能手表对于常亮功能也有需求。

### 前景色亮度要降低

降低前景色，减少对眼睛的刺激。

### 对比度

无论任务模式，都需要注意文本等颜色对比度，[WCAG](https://www.w3.org/TR/WCAG21/)规范对此有规定，太低的对比度会降低可读性，也使眼睛更容易疲劳。

对于网站页面，Chrome 调试工具的选择元素工具会提供当前元素文本色对比度。

### 饱和度

暗黑模式通常也需要降低颜色的饱和度，这也是为了增强对比度。

### 图片

* 考虑使用背景色透明图片，而非纯白色图片；
* 考虑为不同主题设计不同图片；
* 考虑降低图片的亮度。
* 如果图片颜色还原很重要，还是不要做审核变更；

## 前端实战

### 媒体查询`prefers-color-scheme: dark`

使用媒体查询`prefers-color-scheme: dark`可以设置在系统为暗黑模式时生效的 CSS，该特性兼容主流现代浏览器，可[点击查看](https://caniuse.com/prefers-color-scheme)。

> 可以通过这个媒体查询，为一个特殊的元素设置样式，并使用 JS 查询该样式，从而可以探测当前系统正在应用的模式/主题。

### CSS 变量

可以将配色方案设置为 [CSS 变量](https://caniuse.com/css-variables)，然后使用，并且方便修改。

另外，就是上面特殊情况提到的定义不同亮度的主色或不同透明度的灰色，可以使用 CSS 变量定义，比如下面代码

> 当然，也可以只定义部分亮度或不透明度的颜色。

```css
:root {
  --primary-color-h: 200;
  --primary-color-s: 100%;
  --primary-color: hsl(var(--primary-color-h), var(--primary-color-s), 50%);
  --primary-color-10: hsl(var(--primary-color-h), var(--primary-color-s), 10%);
  --primary-color-20: hsl(var(--primary-color-h), var(--primary-color-s), 20%);
  --primary-color-30: hsl(var(--primary-color-h), var(--primary-color-s), 30%);
  --primary-color-40: hsl(var(--primary-color-h), var(--primary-color-s), 40%);
  --primary-color-50: hsl(var(--primary-color-h), var(--primary-color-s), 50%);
  --primary-color-60: hsl(var(--primary-color-h), var(--primary-color-s), 60%);
  --primary-color-70: hsl(var(--primary-color-h), var(--primary-color-s), 70%);
  --primary-color-80: hsl(var(--primary-color-h), var(--primary-color-s), 80%);
  --primary-color-90: hsl(var(--primary-color-h), var(--primary-color-s), 90%);
  --primary-color-100: hsl(var(--primary-color-h), var(--primary-color-s), 100%);

  --grey-r: 128;
  --grey-g: 128;
  --grey-b: 128;
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), 1);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .9);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .8);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .7);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .6);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .5);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .4);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .3);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .2);
  --grey: rgba(var(--grey-r), var(--grey-g), var(--grey-b), .1);
}
```

### 使用`filter`降低图片亮度或元素饱和度。

```css
/* 降低亮度 */
filter: brightness(0.9);
/* 降低饱和度 */
filter: saturate(0.9);
```

## 相关链接

* [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)
* [Apple Human Interface Guidelines Dark Mode](https://developer.apple.com/design/human-interface-guidelines/foundations/dark-mode)
* [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
* [Dynamically change color to lighter or darker by percentage CSS](https://stackoverflow.com/questions/1625681/dynamically-change-color-to-lighter-or-darker-by-percentage-css)