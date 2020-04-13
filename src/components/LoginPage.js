import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
	render() {
		return (
			<div id="wrapper">
				<LoginHeader />
				<LoginForm />
			</div>
		);
	}
}

export default LoginPage;
