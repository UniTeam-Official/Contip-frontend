import React, { Component } from "react";

class SocMediaBar extends Component {
	render() {
		return (
			<section>
				<h2>Follow</h2>
				<ul id="media_icons" class="icons">
					<li id="media_icon"><a href="#" class="icon brands style2 fa-twitter"><span class="label">Twitter</span></a></li>
					<li id="media_icon"><a href="#" class="icon brands style2 fa-facebook-f"><span class="label">Facebook</span></a></li>
					<li id="media_icon"><a href="#" class="icon brands style2 fa-instagram"><span class="label">Instagram</span></a></li>
					<li id="media_icon"><a href="#" class="icon solid style2 fa-phone"><span class="label">Phone</span></a></li>
					<li id="media_icon"><a href="#" class="icon solid style2 fa-envelope"><span class="label">Email</span></a></li>
				</ul>
			</section>
		);
	}
}

export default SocMediaBar;