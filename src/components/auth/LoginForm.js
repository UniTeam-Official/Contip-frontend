/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import TextInputField from "../input/TextInputField";
import SendButton from "../button/SendButton";

import host from '../../configs/hostConfig';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            textInputList: [
                {
                    type: "text",
                    name: "username",
                    id: "username-login",
                    value: this.username,
                    onChange: this.handleInputChange,
                    placeholder: "Username",
                },

                {
                    type: "password",
                    name: "password",
                    id: "password-login",
                    value: this.password,
                    onChange: this.handleInputChange,
                    placeholder: "Password",
                },
            ],
        }
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = async (event, addToast) => {
        localStorage.clear();
        event.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        let response = await fetch(`${ host }api/v1/auth/login/`, options);
        console.log(response);

        let loginData = false;

        if (response.status != 200){
            addToast("Wrong credentials!", { appearance: 'error', autoDismiss: true, });
        } else {
            loginData = await response.json();
        }

        if (loginData) {
            console.log(loginData);
            localStorage.setItem('jwt access', loginData.access);
            localStorage.setItem('jwt refresh', loginData.refresh);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div id="main">
                <div className="inner">

                    <h1>Login Page</h1>
                    <form method="post" className="login-form" onSubmit={ this.handleSubmit }>
                        <div className="row gtr-uniform">
                            <div id="text-input-field" className="col-6 col-12-xsmall">
                                <TextInputField textInputList={ this.state.textInputList } />
                            </div>
                            <div className="col-12">
                                <ul className="actions">
                                    <li id="sendButton">
                                        <SendButton buttonName="Login" onSubmit={ this.handleSubmit } />
                                    </li>
                                    <li className="forgot-password">
                                        <a href="#">Forgot password?</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <h3><br />Dont have account? Create new one!</h3>
                    <ul className="actions">
                        <a className="no-border-btm" href="/signup/">
                            <li id="sendButton">
                                <SendButton buttonName="Sign Up" />
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        );
    }
}

export default LoginForm;
