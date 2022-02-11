import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";

class AboutPage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="about-container">
          <Helmet title={`About | ${config.siteTitle}`} />
          <SEO />
          <div className="wrapper">
            <About />
          </div>
          <Footer config={config} />
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
