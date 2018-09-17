---
title: "一个简单的图片播放（jQuery版）"
cover: ""
date: "2013-05-07"
category: "前端"
tags:
  - slideshow
  - 图片轮播
  - 焦点图
---

通过Jqurey只需要几行代码就可以实现最简单的图片循环播放，非常容易实现。

### 基础版

HTML:

    <div id="slideshow">
        <img src="images/1.jpg" alt="" />
        <img src="images/2.jpg" alt="" />
        <img src="images/3.jpg" alt="" />
    </div>

CSS:

    #slideshow {
        position: relative;
        width: 512px;
        height: 384px;
        overflow: hidden;
    }
    #slideshow img {
        position: absolute;
        top: 0;
        left: 0;
        width: 512px; /* 统一图片宽度 */
        z-index:1;
    }
    #slideshow img.active {
        z-index: 3; /* 当前图片处于最前（上）层 */
    }

1. 从第一张播放到第N（N=3）张

先导入jquery.js，然后添加以下代码：

    function slideSwitch(){
        var $active = $('#slideshow img.active');
        var $next =  $active.next();

        $next.addClass('active')
        $active.removeClass('active');
    }

    $(function(){
        setInterval(slideSwitch, 3000);
    }

2. 从第N（N=3）张到第一张

首先有一个判断当前显示图片是否为第N张，也就是最后一张的语句，若为最后一张，则设置下一张为第一张，则$next改成如下：

    var $next = $active.next().length ? $active.next() : $('#slideshow img:first');

至此实现了一个最简单的图片轮播效果。

### 加入渐变切换效果

通过改变图片的透明度即可实现，而且Jqurey可以兼容IE6。实现思路就是先让当前显示图片不透明度为0，然后逐渐增加到100，代码如下

    function slideSwitch(){
        var $active = $('#slideshow img.active');
        var $next = $active.next().length ? $active.next() : $('#slideshow img:first');

        $next.css({opacity: 0}
        .addClass('active')
        .animate({opacity: 1}, 1000, function(){
            $active.removeClass('active');
        });
    }

    $(function(){
        setInterval(slideSwitch, 3000);
    }

然后会发现从最后一张切换到第一张时没有渐变效果，突然就跳到第一张，其过程见下图所示，第一和第三张都具有类active时（z-index相同），因第三张在文档流的后面，会在第一张上面。
[![1893763643409314700](/uploads/2013/02/1893763643409314700.jpg)](/uploads/2013/02/1893763643409314700.jpg)
因此在第一张设置不透明度为0之前可以使第三张z-index减小，从而在第一张下面，但又必须大于第二张的，这里添加一个类last-active，并设置其z-index为2。这样第一张从透明逐渐出现时就可以看的着了，示意图如下：
[![1672805786691448946](/uploads/2013/02/1672805786691448946.png)](/uploads/2013/02/1672805786691448946.png)
完整的代码如下

CSS:

    #slideshow img.last-active {
        z-index: 2;
    }


JavaScript:

    function slideSwitch(){
        var $active = $('#slideshow img.active');
        var $next = $active.next().length ? $active.next() : $('#slideshow img:first');
        $active.addClass('last-active');
        $next.css({opacity: 0.0})
            .addClass('active')
            .animate({opacity: 1.0}, 1000, function(){
                $active.removeClass('active last-active');
            });
        }
    }

    $(function(){
        setInterval(slideSwitch, 3000);
    });

### 加入鼠标悬停效果

即鼠标悬浮在图片上面时，图片停止切换，移开之后有恢复自动切换。停止切换，显然可以通过clearInterval()方法，而鼠标移开之后再次调用setInterval(slideSwitch, 3000)即可，代码如下：

    $(function(){
        var clear = setInterval(slideSwitch, 3000);
        $('#slideshow img').hover(
        function(){
            clearInterval(clear);
        },
        function(){
            clear = setInterval(slideSwitch, 3000);
        });
    });

### 加入编号按钮

加入对应每张图片的编号按钮，通过一个列表实现，并且在鼠标悬停在按钮上面时，显示对应图片，且图片停止切换；移开鼠标之后，图标恢复自动切换。本质上同上一个效果相似，除了要利用CSS设置列表的样式之外。代码如下：

HTML:

    <div id="slideshow">
        <ul id="slide-list">
            <li id="0">1</li>
            <li id="1">2</li>
            <li id="2">3</li>
        </ul>
        <img src="images/1.jpg" alt="" />
        <img src="images/2.jpg" alt="" />
        <img src="images/3.jpg" alt="" />
    </div>

CSS:

    #slide-list {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 50px;
        bottom: 50px;
        z-index: 4;
    }
    #slide-list li {
        float: left;
        display: inline-block;
        margin: 0 3px;
        padding: 3px;
        width: 1em;
        font: 16px/1 Arial, sans-serif;
        text-align: center;
        vertical-align: baseline;
        color: #fff;
        background: #555;
        cursor: pointer;
    }
    #slide-list li:hover,
    #slide-list li.hover {
        background: #888;
    }

JavaScript:

    function slideSwitch(){
        var $active = $('#slideshow img.active');
        var $next = $active.next().length ? $active.next() : $('#slideshow img:first');
        $active.addClass('last-active');
        $next.css({opacity: 0.0})
            .addClass('active')
            .animate({opacity: 1.0}, 1000, function(){
                $('#slide-list li').eq($next.index('#slideshow img'))
                    .addClass('hover')
                    .siblings().removeClass('hover');
                $active.removeClass('active last-active');
            });
     }

    $(function(){
        var clear = setInterval(slideSwitch, 3000);

        $('#slideshow img').hover(function(){
             clearInterval(clear);
        },function(){
            clear = setInterval(slideSwitch, 3000);
        });

        $('#slide-list li').hover(function(){
            clearInterval(clear);
            $(this).addClass('hover');
            $('#slideshow img').eq($(this).attr('id'))
                .addClass('active last-active')
                .siblings().removeClass('active last-active');
        }, function(){
            $(this).removeClass('hover');
            clear = setInterval(slideSwitch, 3000);
        });
    });

**最终DEMO：**[Simple Slideshow](/demo/Simple-Slideshow/Simple-Slideshow.html)

**源代码下载：**[simple slideshow](/demo/Simple-Slideshow.zip)

(兼容IE6-IE8，Chrome, Firefox, Safari, Opera)
