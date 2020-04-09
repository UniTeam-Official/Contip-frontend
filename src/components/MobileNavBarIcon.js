
import React, { Component } from "react";
import { render } from "react-dom";

class MobileNavBarIcon extends Component {
  render() {
    return (
        <a href="javascript:void(0);" class="icon" onclick="navBarFunc()">
            <i class="nav-button fa fa-bars"></i>
        </a>
    );
  }
}

export default MobileNavBarIcon;
