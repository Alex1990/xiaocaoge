import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import moment from "moment";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import Layout from "../layout";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./prism.css";
import "./post.css";

export default class PostTemplate extends React.Component {
  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: '0abf71976df95878c806',
      clientSecret: 'e90f8906919529f0c01b6b260fa384d26e2f7e90',
      repo: 'xiaocaoge',
      owner: 'Alex1990',
      admin: ['Alex1990'],
      id: window.location.pathname,
      distractionFreeMode: false,
    });
    gitalk.render('gitalkContainer');
    console.log(0)
  }

  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <Layout location={this.props.location}>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="wrapper">
          <div className="post-entry">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              发布于：<time dateTime={post.date}>{moment(post.date).format('YYYY-MM-DD')}</time>
            </div>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="post-meta">
              <PostTags tags={post.tags} />
            </div>
          </div>
          <div id="gitalkContainer"></div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
