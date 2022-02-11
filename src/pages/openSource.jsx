import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import OpenSource from "../components/OpenSource/OpenSource";
import Footer from "../components/Footer/Footer";
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
          <Footer config={config} />
        </div>
      </Layout>
    );
  }
}

export default OpenSourcePage;
