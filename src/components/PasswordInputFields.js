
import React, { Component } from "react";
import { render } from "react-dom";

class PasswordInputField extends Component {
  render() {
    return (
	<input type="password" name="user-password" id="password" placeholder="Your Password" />
    );
  }
}

export default PasswordInputField;
