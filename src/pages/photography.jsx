import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Photograpy from "../components/Photograpy/Photograpy";
import config from "../../data/SiteConfig";

class PhotograpyPage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="photography-container">
          <Helmet title={`Photograpy | ${config.siteTitle}`} />
          <div className="wrapper">
            <Photograpy />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PhotograpyPage;
