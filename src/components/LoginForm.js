import React, { Component } from "react";
import PasswordInputField from "./PasswordInputFields";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";

import history from './history';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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

    handleSubmit = async(event) => {
        event.preventDefault()
        let options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch('http://yyr3ll.pythonanywhere.com/api/v1/auth/login/', options);

        if (response.status==400)
            alert("Wrong credentials")
        else {

            const json = await response.json();
            
            localStorage.setItem('jwt', json.access);
            localStorage.setItem('refresh', json.refresh);
            
            this.props.history.push("/profile/");

        }

    }

    render() {
        return (
            <div id="main">
                <div className="inner">

                    <h1>Login Page</h1>
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="row gtr-uniform">
                            <div id="text-input-field" className="col-6 col-12-xsmall">
                                <TextInputField name="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                                <PasswordInputField name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                            </div>
                            <div className="col-12">
                                <ul className="actions">
                                    <li id="sendButton">
                                        <SendButton buttonName="Login" onClick={this.handleSubmit} />
                                    </li>
                                    <li>
                                        <a href="#">Forgot password?</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <h3><br />Dont have account? Create new one!</h3>
                    <ul className="actions">
                        <a href="/signup/">
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
