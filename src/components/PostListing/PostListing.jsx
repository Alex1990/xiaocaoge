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
    let year;

    return (
      <div className="wrapper post-list">
        {/* Your post list here. */
        postList.map((post, index) => {
          const postYear = moment(post.date).year();
          const article = (
            <article key={index}>
              <h1>
                <Link to={post.path} key={post.title}>
                  {post.title}
                </Link>
              </h1>
              <div className="post-meta">
                <time dateTime={post.date}>{moment(post.date).format('YYYY-MM-DD')}</time>
              </div>
            </article>
          );
          if (year !== postYear) {
            year = postYear;
            return (
              <React.Fragment key={index}>
                <div className="year-label">&#8727; {postYear} &#8727;</div>
                {article}
              </React.Fragment>
            );
          }
          return article;
        })}
      </div>
    );
  }
}

export default PostListing;
