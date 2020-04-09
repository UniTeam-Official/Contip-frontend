import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import Copyrights from "./Copyrights";

class LoginPage extends Component {
  render() {
    return (
	<div>
	    <LoginHeader />
	    <LoginForm />
	    <Copyrights />
	</div>
    );
  }
}

export default LoginPage;
