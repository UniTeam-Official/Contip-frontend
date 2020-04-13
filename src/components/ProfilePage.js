import React, { Component } from "react";
import Header from "./Header";
import ProfileForm from "./ProfileForm";
import Footer from "./Footer";

class ProfilePage extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<ProfileForm />
				<Footer />
			</div>
		);
	}
}

export default ProfilePage;
