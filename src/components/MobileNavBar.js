
import React, { Component } from "react";
import { render } from "react-dom";

class MobileNavBar extends Component {
  render() {
    return (
      <ul id="mobile_menu">
				<li id="mobile_navbarbutton"><a href="search.html">Search</a></li>
				<li id="mobile_navbarbutton"><a href="index.html">Recommendations</a></li>
				<li id="mobile_navbarbutton"><a href="profile.html">Profile</a></li>
				<li id="mobile_navbarbutton"><a href="watched.html">Seen Movies</a></li>
				<li id="mobile_navbarbutton"><a href="login.html">Log Out</a></li>
			</ul>
    );
  }
}

export default MobileNavBar;
