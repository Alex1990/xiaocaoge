---
title: "响应式图片"
cover: ""
date: "2014-04-22"
category: "前端"
tags:
  - Responsive
  - 响应式
  - 响应式图片
---

从定宽布局转向响应式布局的过程中，要想把PC端显示的内容显示在小屏幕的手机或平板上，首先也是最基本的就是采用流式布局，而图片的显示需要加下面一行代码：

```css
img { max-width: 100%; }
```

这样图片最大宽度就不会超过小屏幕设备浏览器的宽度，但是把大图片在小屏幕设备上显示会带来额外的带宽消耗。尤其是现今移动端网络速度慢于PC端，且速度上下浮动太大，慢的是2.5G网络，快的是4G，又会经常从WiFI切换到2.5G或3G。而且对于大部分网站，图片的流量会占一半以上，因此缩减图片大小，节省带宽成为响应式图片的一大挑战。幸而开源社区已经有了很多响应式图片解决方案，但是要注意并没有完美的方案，要根据具体需要来选择合适的方案。

## adaptive-images

官网：[http://adaptive-images.com/](http://adaptive-images.com/)

这是一个服务端解决方案，优点：一是不用更改现有的HTML标签结构，因此可快捷地应用于过去的项目；二是对于任何图片，包括JS添加的，都会起作用，即图片宽度不会大于浏览器宽度，三是由于其采用服务端解决方案，兼容性很广。

但是，其缺点也是明显的：首先，其依赖Cookie和JS，这导致一些禁用或不能使用Cookie和JS的浏览器不能使用。然后是其对所有图片都起作用，这不适用于那些需要加载大图片的情形；再次，这是一个PHP解决方案，虽然也有Net方案，但还远不够用；最后，不适用于CDN，因为图片都是针对特定设备即时生成的（我觉得可以修改后端代码做到，但是我不会啊）。

## picturefill

官网：[http://scottjehl.github.io/picturefill/](http://scottjehl.github.io/picturefill/)

这是picture元素的一个polyfill，picture元素目前还没有任何浏览器实现。不过对于少量的图片，采用picturefill还是非常合适的。picturefill可以只应用于特定的图片，可以解决”Art Direction”问题，可以应用于CDN。同时应用picturefill也有些条件或限制，需要添加额外的标签，需要不同尺寸的图片，需要支持media query（可以采用[matchMedia](https://github.com/paulirish/matchMedia.js)）。

## responsive-images.js

官网：[https://github.com/kvendrik/responsive-images.js](https://github.com/kvendrik/responsive-images.js)

这个与picturefill类似，不过它不依赖media query，而是通过JS检测浏览器的可见视口宽度来决定选择合适的图片，因此其兼容性很广，所有的主流浏览器。同时也不需要额外的标签，而是需要额外的属性，但是它不支持JS添加的图片，至少目前还不支持。

## 其他

此外还有很多其他的解决方案，如拥有速度检测的foresight.js、第三方服务的src.sencha.io等等，这里有一份目前响应式图片解决方案列表：[Responsive Images Chart](https://docs.google.com/spreadsheet/ccc?key=0Al0lI17fOl9DdDgxTFVoRzFpV3VCdHk2NTBmdVI2OXc#gid=0)。

相对于缩减图片大小，节省带宽的要求，我觉得Art Direction是一个更难解决或者说更麻烦的问题。Art Direction其实就是移动端与PC端是不同的图片，这增加了工作量。而且我认为响应式设计相对于为移动端专门设计网站，工作量减少的并不多，且没有专门的移动端网站要完美，毕竟屏幕大小所造成的布局以及移动与PC端网速的差别都是很大的。对于中大型互联网公司，我始终认为专门设计移动端网站才是合适的。

## 参考资源

Choosing A Responsive Image Solution: [http://www.smashingmagazine.com/2013/07/08/choosing-a-responsive-image-solution-2/](http://www.smashingmagazine.com/2013/07/08/choosing-a-responsive-image-solution-2/)
