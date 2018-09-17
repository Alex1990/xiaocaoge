import React, { Component } from "react";
import { Link } from "gatsby";
import "./Footer.css";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const { copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className="footer">
        <p className="copyright">{copyright}</p>
      </footer>
    );
  }
}

export default Footer;
