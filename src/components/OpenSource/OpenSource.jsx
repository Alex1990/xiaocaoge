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
            <a href="https://github.com/Alex1990/tiny-cookie">tiny-cookie</a>: A tiny cookie manipulation plugin for the browser.
          </li>
          <li>
            <a href="https://github.com/Alex1990/autoresize-textarea">autoresize-textarea</a>: A jQuery (optional) plugin can automatically resize the textarea's height.
          </li>
        </ul>
      </div>
    );
  }
}

export default OpenSource;
