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

    handleSubmit = event => {
        event.preventDefault()
        let options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch('http://yyr3ll.pythonanywhere.com/api/v1/auth/login/', options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    alert("wrong credentials");
                    return {username: '',password: ''};
                }
                return res.json();

            })
            .then(data => {    
                console.log(data);
                localStorage.setItem('jwt', data.token);
                this.props.history.push("/profile/");
            });



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
