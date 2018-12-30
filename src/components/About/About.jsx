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
        <p>其他社交网站：</p>
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
      </div>
    );
  }
}

export default About;
