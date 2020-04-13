import React, { Component } from "react";
import SocMediaBar from "./SocMediaBar";
import SuggestForm from "./SuggestForm";
import Copyrights from "./Copyrights";

class Footer extends Component {
	render() {
		return (
			<footer id="footer">
				<div class="inner">
					<SuggestForm />
					<SocMediaBar />
					<Copyrights />
				</div>
			</footer>
		);
	}
}

export default Footer;