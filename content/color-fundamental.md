---
title: "颜色基础"
cover: ""
date: "2016-12-14"
category: "设计"
tags:
  - 颜色
  - 颜色基础
  - color
---

颜色作为设计当中的基本元素，一些人会懂得一些零散的知识点，但是没有系统的了解一些颜色相关的基本概念，而这些基本概念不仅仅对设计师至关重要，对于 Web 前端也是很有帮助。

## 基本概念

### 原色 Primary color

原色是指不能通过其他颜色的混合调配而得出的“基本色”，通过调节一组原色中的各原色组成比例可以合成任一颜色。需要注意，原色不是光的基本属性，而是生物的视觉系统相关的概念。

### 相加色 Additive color

相加色是指通过混合不同颜色的光产生的颜色。在加色系统中，红（Red）、绿（Green）、蓝（Blue）是最常见的三原色。

![红、绿、蓝光三原色](https://cdn.rawgit.com/Alex1990/xiaocaoge/gh-pages/images/color-fundamental/additive-color.svg)

### 相减色 Subtractive color

相减色是通过混合不同的染料、墨水、色素或其他染色剂得到的颜色，其原理是某种颜色的颜料吸收了一些波长的光，剩下未吸收的波长的光组合成的颜色即为该颜料的颜色。在减色系统中，青（Cyan）、品红（Magenta）和黄（Yellow）是常见的三原色。

![青、品红、黄颜料三原色](https://cdn.rawgit.com/Alex1990/xiaocaoge/gh-pages/images/color-fundamental/subtractive-color.svg)

### 次生色 Secondary color

次生色是指通过混色相同比例的两种原色得到的颜色。

#### 加色法次生色 Additive secondary color

RGB 颜色模型的次生色为：青、品红、黄。

![加色法次生色](https://cdn.rawgit.com/Alex1990/xiaocaoge/gh-pages/images/color-fundamental/secondary-additive-color.svg)

#### 减色法次生色 Subtractive secondary color

CMYK 颜色模型的次生色为：红、绿、蓝。

![减色法次生色](https://cdn.rawgit.com/Alex1990/xiaocaoge/gh-pages/images/color-fundamental/secondary-subtractive-color.svg)

### 色环 Color wheel

色环是指围绕一个圆环的一组颜色的展示方式，可以用来表示原色、次生色、三次色之间的关系。

![十二色环](https://cdn.rawgit.com/Alex1990/xiaocaoge/gh-pages/images/color-fundamental/color-wheel.svg)

### 像素 Pixel

像素是指组成栅格图片的物理点或者显示屏的最小显示单元。

### 颜色深度 Color depth

颜色深度通常指用于表示一个像素的颜色所需的比特位数。

## 颜色模型

颜色模型是一种用来描述颜色如何被表示为多元数值的抽象数学模型，通常使用三个或四个数值来表示。常见的颜色模型有 RGB、HSL、CMYK、CIE Lab 等。

### RGB

RGB 颜色模型是加色模型（addtive color model）的一种，使用红、绿、蓝来相加得到一组颜色。该模型的名称就来源于三原色：红（Red）、绿（Green）、蓝（Blue）。

比较常用的 RGB 颜色深度是 24 位，组成一个像素的 RGB 颜色单元各占 8 位，总共可显示 2^24 = 16777216 种颜色。

#### Hex triplet

十六进制三元组是一种使用六位十六进制数字（0-9、A-F），即三个字节来表示 RGB 颜色的一种写法，常见于 Web 编程。其中：

- 前两位表示红色
- 中间两位表示绿色
- 后面两位表示蓝色

比如`#ffaa00`，还可以简写为`#fa0`。

#### RGBA

RGBA 表示 Red、Green、Blue、Alpha，是在 RGB 的基础上增加了 Alpha 通道（alpha channel），可以表示透明度。

### HSL 和 HSV

HSL 表示 Hue（色相）、Saturation（饱和度）、Lightnes/Luminosity（亮度/明度），也常被称为 HLS。HSV 是英文单词 Hue、Saturation、Value 的首字母缩写，也常常被称为 HSB（B 表示 Brightness）。HSL 和 HSV 在取色器（color pickers）当中很常用，相对于 RGB 来说，更符合人类直觉。

#### HSLA

和 RGBA 类似，HSLA 是在 HSL 基础上多了一个透明通道，可以表示颜色的透明度。

### CMYK

CMYK 表示 Cyan（青）、Magenta（品红）、Yellow（黄）和 Black（黑）。CMYK 颜色模型是一种减色模型（subtractive color model），用于颜色打印。

### Lab

Lab 颜色模型通常是指 CIELAB，也被写成_L\*a\*b\*_。

## 颜色维度 Color dimension

### 色相 Hue

色相是颜色的重要属性之一，人眼所感受到的颜色，比如红色、绿色、蓝色、黄色，色相独立于亮度和饱和度。

### 彩度 Colorfulness

色彩的鲜艳程度。

### 饱和度 Saturation

彩度相对于明度的变化程度。

### 亮度 Brightness

亮度表示光源的强度。

### 明度 Lightness

明度指视觉感受到的明暗程度，不仅取决于光线强弱，还取决于物体表面的反射系数。

### 浅色和深色 Tints and shades

浅色由一种颜色和白色混合而成，会增加明度；深色由一种颜色和黑色混合而成，会降低明度。

### 灰度 Grayscale

指彩色使用黑白色表示时，其颜色强度，灰度范围一般 0 到 255，白色为 255，黑色为 0。

## 色温 Color temperature

色温是一个用于定义光源颜色的物理量，即把某个[黑体](https://en.wikipedia.org/wiki/Black-body_radiation)加热到其发射的光的色相与某个光源所发射的光的色相相同时，这时的黑体温度温度称为该光源的颜色温度，简称色温。单位用 K 表示。

色温高于 5000K 时被称为冷色（cool colors），低于 3000K 时被称为暖色（warn colors）。这种定义只是心理学上的定义。

### 暖色 Warm color

对于大多数人来说，红色、橙色、黄色等色系给人温暖的感觉，故而称之为暖色调。

### 冷色 Cool color

冷色调主要包括蓝色、绿色、紫色，给人清凉的感觉。

## 颜色选择器 Color picker

一种用来选取颜色的工具，也被称为“拾色器”，通常见于图像编辑软件，比如 Photoshop、Office 套件等。通常颜色选择器支持多种颜色模型来设置颜色。

## 相关 JavaScript 包

前端开发颜色相关的 JS 包并不是很丰富，也不是很常用，用得最多的可能就是颜色选择器。

- [jquery-color](https://github.com/jquery/jquery-color)：一个 jQuery 插件，用于支持颜色操作和动画。
- [color](https://github.com/Qix-/color)：颜色操作和转换。
- [TinyColor](https://github.com/bgrins/TinyColor)：颜色操作和转换。
- [spectrum](https://github.com/bgrins/spectrum)：一款空能丰富的颜色选择器，曾经 Chrome、Firefox 和 Safari 的开发者工具里面就是用的这款。
- [react-color](https://github.com/casesandberg/react-color)：取自 Photoshop、Sketch、Chrome、Github、Twitter 等地方的颜色选择器，功能很强大。
- [randomColor](https://github.com/davidmerfield/randomColor)：生成一组有吸引力的颜色，方法值得参考。
- [chalk](https://github.com/chalk/chalk)：用于命令行程序的文本颜色格式化。

## 总结

维基百科页面最下面的知识总结可以快速了解某一个知识体系，比如[Primary color](https://en.wikipedia.org/wiki/Primary_color)页面，会给出颜色相关的链接。然而对于颜色维度的一些基本概念，发现直观上能理解个大概，但是准确的定义却没有。我自己也只是通过颜色选择器的 HSL 模式来了解 Hue、Saturation、Lightness 这些概念。

## 参考

- [Primary color](https://en.wikipedia.org/wiki/Primary_color)
- [Additive color](https://en.wikipedia.org/wiki/Additive_color)
- [Subtractive color](https://en.wikipedia.org/wiki/Subtractive_color)
- [Secondary color](https://en.wikipedia.org/wiki/Secondary_color)
- [Color model](https://en.wikipedia.org/wiki/Color_model)
- [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model)
- [RGBA color space](https://en.wikipedia.org/wiki/RGBA_color_space)
- [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
- [CMYK color model](https://en.wikipedia.org/wiki/CMYK_color_model)
- [Lab color space](https://en.wikipedia.org/wiki/Lab_color_space)
- [Color temperature](https://en.wikipedia.org/wiki/Color_temperature)
