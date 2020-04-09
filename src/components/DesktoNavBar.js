import React, { Component } from "react";

class DesktopNavBar extends Component {
  render() {
    return (
        <ul id="desktop_menu">
          <li id="desktop_navbarbutton"><a href="generic.html">Search</a></li>
          <li id="desktop_navbarbutton"><a href="index.html">Recommendations</a></li>
          <li id="desktop_navbarbutton"><a href="profile.html">Profile</a></li>
          <li id="desktop_navbarbutton"><a href="watched.html">Seen Movies</a></li>
          <li id="desktop_navbarbutton"><a href="login.html">Log Out</a></li>
        </ul>
    );
  }
}

export default DesktopNavBar;
