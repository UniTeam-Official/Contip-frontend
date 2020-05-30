/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Navbar from "./Navbar";
import TitleIcon from "./TitleIcon";
import { navBarFunc } from "../assets/js/navbar";

const Header = ({ className }) => {
	return (
		<header id="header" className={ className }>
			<div className="header-inner">
				<div className="navbar">
					<TitleIcon className="logo"/>
					<nav id="meny" className="meny">
						<Navbar />
					</nav>
					<a className="icon no-border-btm" onClick={ navBarFunc }>
						<i className="nav-button fa fa-bars"></i>
					</a>
				</div>
			</div>
		</header>
	);
}

export default Header;
