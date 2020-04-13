import React, { Component } from "react";
import NavBar from "./NavBar";
import TitleIcon from "./TitleIcon";

class Header extends Component {
	navBarFunc() {
		var x = document.getElementById("meny");
		if (x.className === "meny") {
			x.className += "-responsive";
		} else {
			x.className = "meny";
		}
	}
	render() {
		return (
			<header id="header">
				<nav id="meny" class="meny">
					<NavBar />
				</nav>
				<a href="#" class="icon" onClick={this.navBarFunc}>
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
