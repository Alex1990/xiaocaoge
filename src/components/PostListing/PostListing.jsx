import React from "react";
import { Link } from "gatsby";
import moment from 'moment';
import "./PostListing.css";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className="wrapper post-list">
        {/* Your post list here. */
        postList.map((post, index) => (
          <article key={index}>
            <h1>
              <Link to={post.path} key={post.title}>
                {post.title}
              </Link>
            </h1>
            <div className="post-meta">
              <time datetime={post.date}>{moment(post.date).format('YYYY-MM-DD HH:mm')}</time>
            </div>
          </article>
        ))}
      </div>
    );
  }
}

export default PostListing;
