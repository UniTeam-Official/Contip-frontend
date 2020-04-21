import React, { Component } from "react";

class TitleIcon extends Component {
	render() {
		return (
			<a href="/" className="logo">
				<span className="symbol"><img src="images/logo.svg" alt="" /></span><span className="title">ConTip</span>
			</a>
		);
	}
}

export default TitleIcon;