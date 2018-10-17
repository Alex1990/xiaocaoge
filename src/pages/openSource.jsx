import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import OpenSource from "../components/OpenSource/OpenSource";
import config from "../../data/SiteConfig";

class OpenSourcePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="open-source-container">
          <Helmet title={`OpenSource | ${config.siteTitle}`} />
          <SEO />
          <div className="wrapper">
            <OpenSource />
          </div>
        </div>
      </Layout>
    );
  }
}

export default OpenSourcePage;
