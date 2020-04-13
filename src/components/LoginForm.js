import React, { Component } from "react";
import PasswordInputField from "./PasswordInputFields";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

class LoginForm extends Component {
	handleSubmit(event) {
		alert("Submit handled")
		event.preventDefault()
	}
	render() {
		return (
			<div id="main">
				<div class="inner">
					<h1>Login Page</h1>
					<form method="post" onSubmit={this.handleSubmit}>
						<div class="row gtr-uniform">
							<div id="text-input-field" class="col-6 col-12-xsmall">
								<TextInputField />
								<PasswordInputField />
							</div>
							<div class="col-12">
								<ul class="actions">
									<li id="sendButton">
										<SendButton buttonName="Login" />
									</li>
								</ul>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoginForm;
