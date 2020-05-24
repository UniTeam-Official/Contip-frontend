import React, { Component } from "react";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

import host from '../config';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            textInputList: [
                {
                    type: "text",
                    name: "username-login",
                    id: "username-login",
                    value: this.username,
                    onChange: this.handleUsernameChange,
                    placeholder: "Username",
                },

                {
                    type: "password",
                    name: "password-login",
                    id: "password-login",
                    value: this.password,
                    onChange: this.handlePasswordChange,
                    placeholder: "Password",
                },
            ],
        }
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (event, addToast) => {
        localStorage.clear();
        event.preventDefault()
        let options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(`${host}api/v1/auth/login/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    addToast("Wrong credentials!", { appearance: 'error', autoDismiss: true, });
                    return false;
                }
                return res.json();


            })
            .then(data => {
                if(data){
                    console.log(data);
                    localStorage.setItem('jwt access', data.access);
                    localStorage.setItem('jwt refresh', data.refresh);
                    this.props.history.push("/");
                }
            });



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
