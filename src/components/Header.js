import React, { Component } from "react";
import { render } from "react-dom";
import DesktopNavBar from "./DesktoNavBar";
import TitleIcon from "./TitleIcon";

class Header extends Component {
  render() {
    return (
        <header id="header">
          <nav id="meny" class="meny">
            <DesktopNavBar />
          </nav>
          <a href="javascript:void(0);" class="icon" onclick="navBarFunc()">
            <i class="nav-button fa fa-bars"></i>
          </a>
          <div class="inner">
            <TitleIcon />
          </div>
        </header>
    );
  }
}

export default Header;
