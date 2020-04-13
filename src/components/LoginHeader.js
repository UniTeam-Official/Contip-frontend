import React, { Component } from "react";
import TitleIcon from "./TitleIcon";

class LoginHeader extends Component {
	render() {
		return (
			<header id="header">
				<div class="inner">
					<TitleIcon />
				</div>
			</header>
		);
	}
}

export default LoginHeader;

