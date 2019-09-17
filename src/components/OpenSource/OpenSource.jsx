import React, { Component } from "react";
import "./OpenSource.css";

class OpenSource extends Component {
  render() {
    return (
      <div className="open-source">
        <h1>
          开源项目
        </h1>
        <ul>
          <li>
            <a href="https://micell.org">micell</a>
            : A collection of functions for web development.
          </li>
          <li>
            <a href="https://github.com/Alex1990/tiny-cookie">tiny-cookie</a>
            : A tiny cookie manipulation plugin for the browser.
          </li>
          <li>
            <a href="https://github.com/Alex1990/tiny-oss">tiny-oss</a>
            : A tiny aliyun oss sdk for browser.
          </li>
          <li>
            <a href="https://github.com/Alex1990/obito">obito</a>
            : A cli to sync npm package(s) to cloud storage, such as AWS S3, Aliyun OSS.
          </li>
          <li>
            <a href="https://goproxy.io">goproxy.io</a>
            : The goproxy.io website source code.
          </li>
          <li>
            <a href="https://github.com/Alex1990/autoresize-textarea">autoresize-textarea</a>
            : <b>[Deprecated]</b> A jQuery (optional) plugin can automatically resize the textarea's height.
          </li>
        </ul>
      </div>
    );
  }
}

export default OpenSource;
