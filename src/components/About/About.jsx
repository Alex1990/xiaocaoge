import React, { Component } from "react";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div className="about">
        <h1>
          关于
        </h1>
        <p>河北邯郸人，2008~2012年就读于武汉科技大学工商管理专业，2012~2013年自学前端，遂成为一名码农。</p>
        <h2>兴趣爱好</h2>
        <ul>
          <li>书籍：兴趣广泛，数学、历史、传记、政治、科普、设计、理财等。</li>
          <li>音乐：随年龄、经历、心境而变，周杰伦、陈奕迅、Eminem、轻音乐。</li>
          <li>电影：黑客帝国、让子弹飞、功夫、指环王、机器人总动员、蝙蝠侠。</li>
          <li>游戏：Dota2、饥荒、纪念碑谷。</li>
          <li>运动：乒乓球、羽毛球。</li>
        </ul>
        <h2>社交网站</h2>
        <ul>
          <li>
            微博：<a href="https://www.weibo.com/u/1660160490">-_小曹哥_-</a>
          </li>
          <li>
            Twitter: <a href="https://twitter.com/AlexChaoHere">Alex Chao</a>
          </li>
          <li>
            Github: <a href="https://github.com/Alex1990">Alex Chao</a>
          </li>
          <li>
            豆瓣：<a href="https://www.douban.com/people/xiaocaoge/">小曹哥</a>
          </li>
        </ul>
        <h2>隐私说明</h2>
        <p>本网站未使用任何 Cookie 跟踪标记，但使用第三方服务谷歌统计、Netlify、Github可能会跟踪您的浏览器、地理位置等信息。</p>
        <h2>版权说明</h2>
        <p>本网站所有内容均为原创文章，如需转载请标明来源。</p>
        <h2>建站历程</h2>
        <ul>
          <li>2018年9月17日，使用 Gatsby 替换 Hexo，更换主题，内容托管在 Netlify，图片托管在 Github。</li>
          <li>2015年5月13日，使用 Hexo 静态内容生成器替换 WordPress，内容托管到 Github Pages。</li>
          <li>2013年12月17日，使用 xiaocaoge.com 域名。</li>
          <li>2012年11月11日，开通 alex1990.com 域名，使用 homezz 虚拟主机，WordPress 博客系统。</li>
        </ul>
        <p>
          在此过程中，写过几个自用的博客主题&nbsp; 
          <a href="https://github.com/Alex1990/flatlog">Flatlog</a>
          &nbsp;(WordPress)、
          <a href="https://github.com/Alex1990/subtle-fixed">Subtle Fixed</a>
          &nbsp;(WordPress)、
          <a href="https://github.com/Alex1990/hexo-theme-nicety">hexo-theme-nicety</a>
          ，不过大都设计欠佳，最终回归目前简洁的主题。
        </p>
      </div>
    );
  }
}

export default About;
