import React, { Component } from "react";

class NavBar extends Component {
	render() {
		return (
			<ul id="desktop_menu">
				<li id="desktop_navbarbutton"><a href="search">Search</a></li>
				<li id="desktop_navbarbutton"><a href="/">Recommendations</a></li>
				<li id="desktop_navbarbutton"><a href="profile">Profile</a></li>
				<li id="desktop_navbarbutton"><a href="watched">Watched Movies</a></li>
				<li id="desktop_navbarbutton"><a href="login">Log Out</a></li>
			</ul>
		);
	}
}

export default NavBar;
