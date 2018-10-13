import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Photography from "../components/Photography/Photography";
import config from "../../data/SiteConfig";

class PhotographyPage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="photography-container">
          <Helmet title={`Photography | ${config.siteTitle}`} />
          <div className="wrapper">
            <Photography />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PhotographyPage;
