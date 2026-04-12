import React, { Component } from "react";
import classNames from 'classnames';
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
            <a href="/">
              <img src={config.siteLogo} alt="Site logo" title={config.siteTitle} />
            </a>
          </div>
          <div className="nav-container">
            <button
              className="nav-toggle"
              type="button"
              onClick={this.handleNavToggleClick}
            >
              &equiv;
            </button>
            <nav className="nav">
              <ul>
                <li>
                  <a href="/">文章</a>
                </li>
                <li>
                  <a href="/openSource/">开源</a>
                </li>
                {/* <li>
                  <a href="https://onetool.net" target="_blank" rel="noopener noreferrer">在线小工具</a>
                </li> */}
                <li>
                  <a href="/about/">关于</a>
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
