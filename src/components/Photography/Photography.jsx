import React, { Component } from "react";
import _ from 'lodash';
import insertScript from 'micell/dom/insertScript';
import "./Photography.css";

class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this._cleanup = null;
  }
  componentDidMount() {
    const callbackName = 'photosCallback';
    const url = `https://alex1990.github.io/photos/dist/photos.js?_t=${Date.now()}`;
    const g = globalThis;
    let scriptEl;
    let timeoutId;

    const cleanup = () => {
      if (timeoutId) g.clearTimeout(timeoutId);
      timeoutId = null;
      if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
      if (g[callbackName]) {
        try {
          delete g[callbackName];
        } catch {
          g[callbackName] = undefined;
        }
      }
    };

    this._cleanup = cleanup;

    g[callbackName] = (data) => {
      cleanup();
      this.setState({ data });
    };

    scriptEl = insertScript(url, {
      onerror: () => {
        cleanup();
      },
    });

    timeoutId = g.setTimeout(() => {
      cleanup();
    }, 15000);
  }
  componentWillUnmount() {
    if (this._cleanup) this._cleanup();
  }
  render() {
    return (
      <div className="photography">
        <h1>
          摄影
        </h1>
        <div className="collection-list">
          {_.map(this.state.data, (datum) => {
            const {
              name,
              meta,
              images,
            } = datum;
            return (
              <div className="collection" key={name}>
                <h2>{meta.date}&nbsp;&nbsp;&nbsp;{meta.title}</h2>
                <ul className="image-list">
                  {_.map(images, (imageItem, index) => {
                    const {
                      src,
                      smallSrc,
                      smallWidth,
                      smallHeight,
                    } = imageItem;
                    return (
                      <li key={index}>
                        <a href={src} target="_blank" rel="noopener noreferrer">
                          <img
                            src={smallSrc}
                            alt={smallSrc}
                            width={smallWidth}
                            height={smallHeight}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Photography;
