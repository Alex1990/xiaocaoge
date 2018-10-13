import React, { Component } from "react";
import classNames from 'classnames';
import { Link } from "gatsby";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpened: false,
    };
  }

  handleNavToggleClick = () => {
    this.setState({ navOpened: !this.state.navOpened });
  }

  render() {
    const { config } = this.props;
    const { navOpened } = this.state;
    const cls = classNames({
      header: 1,
      'nav-opened': navOpened,
    });
    return (
      <header className={cls}>
        <div className="header-wrapper">
          <div className="logo">
            <Link to="/">
              <img src={config.siteLogo} alt="Site logo" />
            </Link>
          </div>
          <div className="nav-container">
            <button
              className="nav-toggle"
              htmltype="button"
              onClick={this.handleNavToggleClick}
            >
              &equiv;
            </button>
            <nav className="nav">
              <ul>
                <li>
                  <Link to="/">Blog</Link>
                </li>
                <li>
                  <Link to="/photography">Photography</Link>
                </li>
                <li>
                  <Link to="/open-souce">Open Source</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* <div className="search-container"></div> */}
        </div>
      </header>
    );
  }
}

export default Header;
