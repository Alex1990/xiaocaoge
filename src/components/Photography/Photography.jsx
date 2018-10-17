import React, { Component } from "react";
import _ from 'lodash';
import jsonp from 'jsonp';
import "./Photography.css";

class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    jsonp(`https://alex1990.github.io/photos/dist/photos.js?_t=${Date.now()}`, {
      name: 'photosCallback',
    }, (err, data) => {
      if (!err) {
        this.setState({ data });
      }
    });
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
