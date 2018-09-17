import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let image;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      image = postMeta.cover;
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }

    image = urljoin(config.siteUrl, config.pathPrefix, image);

    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
