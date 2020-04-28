import React, { Component } from "react";
import Checkbox from "./Checkbox";
import PasswordInputField from "./PasswordInputFields";
import SendButton from "./SendButton";
import DeleteProfileButton from "./DeleteProfileButton";
import InfoText from "./InfoText";
import history from './history';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
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
    handleGenreSubmit = event => {
        alert("Genre change submitted!");
        event.preventDefault();
    }
    handleEmailSubmit = event => {
        alert("Email change submitted!");
        event.preventDefault();
    }
    handlePasswordSubmit = event => {
        if (this.state.password == this.state.confirmPassword) {
            alert("Password change submitted!");
            event.preventDefault();
        }
        else {
            alert("Passwords do not match!");
            event.preventDefault();
        }
    }
    handleDeleteProfile = event => {
        alert("Profile deletion request submitted!");
    }

    componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
        fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/genre/list/", options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    this.props.history.push("/login");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <div id="main">
                <div className="inner">
                    <h1>My Profile</h1>
                    <section>
                        <h2>User Info</h2>
                        <InfoText />
                        <h2>Change Profile</h2>
                        <h3>Change Favorite Genres</h3>

                        {/* GENRES */}

                        <form method="post" action="#">
                            <div className="row gtr-uniform">
                                <div className="col-6 col-12-small">
                                    {this.state.data.map(genre => {
                                        let genre_name = "genre" + genre.id;
                                        return (
                                            <Checkbox name={genre_name} text={genre.name} checked="false" />
                                        );
                                    })}
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li id="sendButton">
                                            <SendButton buttonName="Submit" onClick={this.handleGenreSubmit} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>

                        {/* CHANGE EMAIL */}

                        <h3>Change Email</h3> <form method="post" action="#"> <div className="row gtr-uniform">
                            <div id="text-input-field" className="col-6 col-12-xsmall">
                                <input type="email" name="profile_email" id="profile_email" value={this.state.email} onChange={this.handleEmailChange} placeholder="New Email" />
                            </div>
                            <div className="col-12">
                                <ul className="actions">
                                    <li id="sendButton">
                                        <SendButton buttonName="Submit" onClick={this.handleEmailSubmit} />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* CHANGE PASS */}

                        </form>
                        <h3>Change Password</h3>
                        <form method="post" action="#">
                            <div className="row gtr-uniform">
                                <div className="col-6 col-12-xsmall">
                                    <PasswordInputField name="profile_password" id="profile_password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="New Password" />
                                    <PasswordInputField name="profile_confirm_password" id="profile_confirm_password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} placeholder="Confirm New Password" />
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li id="sendButton">
                                            <SendButton buttonName="Submit" onClick={this.handlePasswordSubmit} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <DeleteProfileButton buttonName="Delete" onClick={this.handleDeleteProfile} />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default ProfileForm;
