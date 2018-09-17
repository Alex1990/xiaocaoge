---
title: "图标解决方案: CSS Sprites, DataURI和@font-face"
cover: ""
date: "2014-04-14"
category: "前端"
tags:
  - CSS Sprites
  - DataURI
  - font-face
---

很多网站都需要用到小的图标，而且不止一个，会用很多个。最先接触到（也是最早出现的）的一种解决方案是CSS Sprites，把所有图标都合并成一张大图。后来又了解了DataURI这种把图片编码成字符的方法，接着是现在大行其道的@font-face方法，将常用的图标都制作成字体。三种方法的共同点是都能减少请求数，从而提高页面加载速度，同时又各有优劣：

## CSS Sprites

CSS Sprites历史悠久，大概在2004年之前就出现了，Dave Shea 在[这篇文章](http://alistapart.com/article/sprites)中提出了CSS Sprites这种技术。至于怎么应用这种技术，可以谷歌，也可以参考这两篇文章：[谈谈CSS Sprites技术及其优化](http://udc.weibo.com/2012/05/%E8%B0%88%E8%B0%88css-sprites%E6%8A%80%E6%9C%AF%E5%8F%8A%E5%85%B6%E4%BC%98%E5%8C%96/)和[CSS Sprites: What They Are, Why They’re Cool, And How to Use Them](http://css-tricks.com/css-sprites/)。

由于早期的浏览器并发请求数不超过2个，而减少请求数作为性能优化的第一规则，CSS Sprites也是成为了很多网站性能优化规则中的一条。由于IE6不支持PNG32透明，所以要不用GIF图片，要不就得让IE6支持PNG32透明，PNG32可以支持更丰富的色彩。除了IE6这点，其他的几乎所有平台的所有浏览器（当然不包括只能看文字的浏览器，以及非常古老的）都支持这种技术。因此色彩丰富与兼容性极佳是这种技术的突出优势。

当然，由于需要把所有小图片合并成一张大图，尤其需要知道每一个小图在大图上的坐标，以便写CSS，从而使得开发时间延长。通过将小图放到固定的网格中，再加上有很多辅助或者自动化生成CSS Sprites的工具可以大大缩短开发时间。小图在大图上的位置是死的，通常都是相关的放到一起，成为一组，而到后期如果要增加图片那么只能增加到最后面，然后邻近的图片变得不相关，位置越来越混乱，增加了维护难度。另外，图片的尺寸也是固定的，要改变大小，位置又受影响，而且也不能利用background-size来调整图片大小，所以前期的规划很重要。

**优势：**

* 减少请求数
* 可以是任意的图标，也即任何色彩
* 兼容性极好，IE6+及其他现代浏览器，包括移动端

**劣势：**

* 增加开发时间
* 增加维护成本
* 图片尺寸固定

**工具：**

* SpriteCow: [http://www.spritecow.com/](http://www.spritecow.com/)
* SpritePad: [http://wearekiss.com/spritepad](http://wearekiss.com/spritepad)
* CSS Sprite Generator: [http://spritegen.website-performance.org/](http://spritegen.website-performance.org/)

## DataURI

DataURI是利用Base64编码规范将图片转换成文本字符，不仅是图片，还可以编码JS、CSS、HTML等文件。通过将图标文件编码成文本字符，从而可以直接写在HTML/CSS文件里面，不会增加任何多余的请求。

但是DataURI的劣势也是很明显的，首先不支持IE6/7，这对于国内某些非要支持IE6的网站不可接受，至于IE8的32KB限制，我认为不能算劣势，通常一个小图标不会大于32KB。而采用Base64编码后的字符串大小要比原图片大5-10%左右，这还是经过Gzip压缩之后的。每次加载之后都需要浏览器将文本字符解码为图片，增加了客户端CPU消耗。由于每次都需要解码从而阻塞了CSS渲染，可以通过分离出一个专用的CSS文件，不过那就需要增加一个请求，那样与CSS Sprites相比没有了任何优势，也因此，在实践中不推荐这种方法。需要注意的是通过缓存CSS可以来达到缓存的目的。

**优势：**

* 不增加请求数

**劣势：**

* 通常比图片要大不到10%
* 每次加载页面都需要解码
* 不支持IE6/7，IE8最大支持32KB，来自[Can I use Data URIs](http://caniuse.com/datauri)
* 难于维护

**工具：**

* Image to Dat URI Convertor: [http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/](http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/)
* Convert Images to base64: [http://webcodertools.com/imagetobase64converter](http://webcodertools.com/imagetobase64converter)

## @font-face

这种采用@font-face技术的的方法被称为font icons，似乎是伴随着HTML5、CSS3、Bootstrap以及扁平化设计趋势流行开来的。相对于前两种技术，最显著的优势就是大小与颜色设置非常便利，不必再用Photoshop等图片工具了，大大加快开发进程和降低门槛。但也伴随着最大的劣势，图标的颜色只能为单色，虽然可以通过CSS渐变、背景色或者font layering等技术稍微丰富下色彩，却仍旧弥补不了这天生的缺陷。好在是现在越来越注重内容，扁平化也大行其道，曾经的炫丽被不断抛弃，这很大程度上掩盖了色彩单一的缺陷，突出了其优势。

至于兼容性，除了一些旧的或残的手机浏览器之外，能兼容IE6+及其他现代浏览器。哦，还有一个劣势，一般限于通用型的图标，如箭头、主页、搜索等几百个，其他要定制图标的话开发成本比较大，还不如采用CSS Sprites技术呢。

**优势：**

* 减少请求数
* 可以兼容至IE6+及其他现代浏览器，几乎所有移动端浏览器，[参考](http://caniuse.com/fontface)
* 大小、颜色的设置像操作字体般简单快捷
* 体积通常比图片小

**劣势：**

* 只能单一色彩（font layering可以多种颜色，但兼容性难以保证）
* 一般限于通用型图标
* 不兼容旧的手机浏览器：Opera mini，Android 2.1，Windows Phone 7.5-7.8
* 在手机上可能与系统字体冲突

**工具：**

* Font Awesome Icons: [http://fortawesome.github.io/Font-Awesome/icons/](http://fortawesome.github.io/Font-Awesome/icons/)
* Fontello: [http://fontello.com/](http://fontello.com/)
* Fontsquirrel: [http://www.fontsquirrel.com/tools/webfont-generator](http://www.fontsquirrel.com/tools/webfont-generator)

## 其他

当然还有其他的解决方案，比如SVG Sprites、HTML实体符号、纯CSS图标。只是纯CSS图标只能兼容最新的浏览器，对IE8及IE8以下不兼容。而HTML实体符号的显示效果很不理想，图标有点丑，且种类很少。至于SVG Sprites，还没有尝试过，[这篇文章](http://ianfeather.co.uk/ten-reasons-we-switched-from-an-icon-font-to-svg/)说比@font-face方法要有优势，可以尝试一下。

## 参考资源

* CSS Sprites Sheets: [http://goo.gl/mVQ6AC](http://goo.gl/mVQ6AC)
* The New Bulletproof @Font-face Syntax: [http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax](http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax)
* Bulletproof Accessible Font Icons: [http://filamentgroup.com/lab/bulletproof_icon_fonts/](http://filamentgroup.com/lab/bulletproof_icon_fonts/)
* Image Sprites Or Data URI?...: [http://benfrain.com/image-sprites-data-uris-icon-fonts-v-svgs/](http://benfrain.com/image-sprites-data-uris-icon-fonts-v-svgs/)
