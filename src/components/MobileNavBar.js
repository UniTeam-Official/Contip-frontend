
import React, { Component } from "react";
import { render } from "react-dom";

class MobileNavBar extends Component {
  render() {
    return (
      <ul id="mobile_menu">
				<li id="mobile_navbarbutton"><a href="search">Search</a></li>
				<li id="mobile_navbarbutton"><a href="/">Recommendations</a></li>
				<li id="mobile_navbarbutton"><a href="profile">Profile</a></li>
				<li id="mobile_navbarbutton"><a href="watched">Seen Movies</a></li>
				<li id="mobile_navbarbutton"><a href="login">Log Out</a></li>
			</ul>
    );
  }
}

export default MobileNavBar;
