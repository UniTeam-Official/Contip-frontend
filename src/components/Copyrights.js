import React, { Component } from "react";
import { render } from "react-dom";
import SocMediaBar from "./SocMediaBar";
import SuggestForm from "./SuggestForm";

class Copyrights extends Component {
	render() {
		return (
			<ul className="copyright">
				<li>&copy; ConTip, a UniTeam Product. All rights reserved</li><li>Original Design: <a href="http://html5up.net">HTML5 UP</a></li>
			</ul>
		);
	}
}

export default Copyrights;
