import React, { Component } from "react";
import TitleIcon from "./TitleIcon";

class LoginHeader extends Component {
	render() {
		return (
			<header id="header">
				<div className="inner">
					<TitleIcon />
				</div>
			</header>
		);
	}
}

export default LoginHeader;

