import React, { Component } from "react";
import PasswordInputField from "./PasswordInputFields";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

class LoginForm extends Component {
  render() {
    return (
      <div id="main">
        <div class="inner">
          <TextInputField />
          <PasswordInputField />
          <SendButton />
        </div>
      </div>
    );
  }
}

export default LoginForm;
