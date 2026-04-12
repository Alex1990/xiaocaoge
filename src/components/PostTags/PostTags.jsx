import React, { Component } from "react";
import _ from "lodash";
import "./PostTags.css";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <a
              key={tag}
              className="post-tag"
              style={{ textDecoration: "none" }}
              href={`/tags/${_.kebabCase(tag)}/`}
            >
              {tag}
            </a>
          ))}
      </div>
    );
  }
}

export default PostTags;
