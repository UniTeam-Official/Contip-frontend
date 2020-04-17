import React, { Component } from "react";
import PasswordInputField from "./PasswordInputFields";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

class SignUpPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      birthDate: ''
    }
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }
  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }
  handleConfirmPasswordChange = event => {
    this.setState({
      confirmPassword: event.target.value
    })
  }
  handleBirthDateChange = event => {
    this.setState({
      birthDate: event.target.value
    })
  }
  handleSubmit = event => {
    if (this.state.password == this.state.confirmPassword) {
      alert('Success! Authenticate me!');
      event.preventDefault();
      // Authenticate User
    }
    else {
      alert('Error: Passwords do not match.');
      event.preventDefault();
    }
  }
  render(){
    return(
      <div id="wrapper">
        <div id="main">
          <div class="inner">
            <h1>Register</h1>
            <section>
              <form method="post" action="#">
                <div class="row gtr-uniform">
                  <div class="col-6 col-12-xsmall">
                    <TextInputField name="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                    <input type="email" name="demo-email" id="demo-email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
                    <TextInputField name="birth-date" id="birth-date" value={this.state.birthDate} onChange={this.handleBirthDateChange} placeholder="Date of Birth(DD-MM-YYYY)" />
                    <PasswordInputField name="demo-password" id="demo-password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                    <PasswordInputField name="confirm-password" id="confirm-password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Your Password" />
                    <br />
                    {/* <h3>Choose Your Favorite Genres</h3>
                    <form method="post" action="#">
                      <div class="row gtr-uniform">
                        <div class="col-6 col-12-small">
                          <Checkbox name="genre_name" text="genre.name" checked="false" />
                          <br></br>
                          <br></br>
                        </div>
                      </div>
                    </form> */}
                    <div class="col-12">
                      <ul class="actions">
                        <li><SendButton buttonName="Sign Up" onClick={this.handleSubmit} /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}


export default SignUpPage;
