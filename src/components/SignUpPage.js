import React, { Component } from "react";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

import host from '../config';


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            re_password: '',

            textInputList: [
                {
                    type: "text",
                    name: "username-registration",
                    id: "username-registration",
                    value: this.username,
                    onChange: this.handleUsernameChange,
                    placeholder: "Username",
                },

                {
                    type: "email",
                    name: "email-registration",
                    id: "email-registration",
                    value: this.email,
                    onChange: this.handleEmailChange,
                    placeholder: "Email",
                },

                {
                    type: "password",
                    name: "password-registration",
                    id: "password-registration",
                    value: this.password,
                    onChange: this.handlePasswordChange,
                    placeholder: "Password",
                },

                {
                    type: "password",
                    name: "password-confirm-registration",
                    id: "password-confirm-registration",
                    value: this.re_password,
                    onChange: this.handleConfirmPasswordChange,
                    placeholder: "Confirm Your Password",
                },
            ],
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
            re_password: event.target.value
        })
    }
    
    handleBirthDateChange = event => {
        this.setState({
            birthDate: event.target.value
        })
    }

    handleSubmit = (event, addToast) => {
        if (this.state.password == this.state.re_password) {
        event.preventDefault();
        // Authenticate User
        let options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch('http://yyr3ll.pythonanywhere.com/api/v1/account/users/', options)
            .then(res => {
                console.log(res);
                if (res.status != 201){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/login/");
                }
                return res.json();
            });
        }
    }

    handleSubmit = (event, addToast) => {
        if (this.state.password == this.state.re_password) {
            event.preventDefault();
            // Authenticate User
            let options = {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(`${host}api/v1/account/users/`, options)
                .then(res => {
                    console.log(res);
                    if (res.status != 201) {
                        addToast("Incorrect email entered!", { appearance: 'error', autoDismiss: true, });
                    }
                    else {
                        this.props.history.push("/login/");
                    }
                    return res.json();
                });
        } else {
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
            event.preventDefault();
        }


    }
    render() {
        return (
            <div id="wrapper">
                <div id="main">
                    <div className="inner">
                        <h1>Register</h1>
                        <section>
                            <form method="post" className="login-form" action="#">
                                <div className="row gtr-uniform">
                                    <div className="col-6 col-12-xsmall">
                                        <TextInputField textInputList={ this.state.textInputList } />
                                        <br />
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li><SendButton buttonName="Sign Up" onSubmit={ this.handleSubmit } /></li>
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
