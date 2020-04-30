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
            genres: {},
            email: '',
            password: '',
            confirmPassword: '',
            deletePassword: '',
            data: [],
            preferences: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    handleGenreChange = event => {
        const genre = event.target.name;
        this.state.genres[genre] = !this.state.genres[genre];
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
    handleCurrentPasswordChange = event => {
        this.setState({
            currentPassword: event.target.value
        })
    }
    handleDeletePasswordChange = event => {
        this.setState({
            deletePassword: event.target.value
        })
    }
    handleGenreSubmit = event => {
        alert("Genre change submitted!");
        event.preventDefault();
        // Update user genres
        const access_token = localStorage.getItem('jwt access');
        const prefs = [];
        for (const key of Object.keys(this.state.genres)) {
            if (this.state.genres[key]) {
                prefs.push(parseInt(key.substring(5, 10)));
            }
        }
        let options = {
            method: "PUT",
            body: JSON.stringify({genre_preference: prefs}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
        fetch('http://yyr3ll.pythonanywhere.com/api/v1/app/preferences/set/', options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    alert("Something went wrong");
                }
                else {
                    this.props.history.push("/profile/");
                }
                return res.json();
            });
    }
    handleEmailSubmit = event => {
        alert("Email change submitted!");
        event.preventDefault();
        // Update user email
		const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "PATCH",
            body: JSON.stringify({email: this.state.email}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
        fetch('http://yyr3ll.pythonanywhere.com/api/v1/account/users/me/', options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    alert("Something went wrong");
                }
                else {
                    this.props.history.push("/profile/");
                }
                return res.json();
            });
    }
    handlePasswordSubmit = event => {
        if (this.state.password == this.state.confirmPassword) {
            alert("Password change submitted!");
            event.preventDefault();
            // Update user password
            const access_token = localStorage.getItem('jwt access');
            let options = {
                method: "POST",
                body: JSON.stringify({new_password: this.state.password, re_new_password: this.state.confirmPassword, current_password: this.state.currentPassword}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            }
            fetch('http://yyr3ll.pythonanywhere.com/api/v1/account/users/set_password/', options)
                .then(res => {
                    console.log(res);
                    if (res.status != 204){
                        alert("Something went wrong");
                    }
                    else {
                        this.props.history.push("/login/");
                    }
                    return res.json();
                });
        }
        else {
            alert("Passwords do not match!");
            event.preventDefault();
        }
    }
    handleDeleteProfile = event => {
        alert("Profile deletion request submitted!");
        // Delete user
        const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "DELETE",
            body: JSON.stringify({current_password: this.state.deletePassword}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access_token}`
            }
        }
        fetch('http://yyr3ll.pythonanywhere.com/api/v1/account/users/me/', options)
            .then(res => {
                console.log(res);
                if (res.status != 204){
                    alert("Something went wrong");
                }
                else {
                    this.props.history.push("/signup/");
                }
                return res.json();
            });
    }

    setGenres() {
        for (const genre of this.state.data) {
            this.state.genres["genre"+genre.id] = (genre.id in this.state.preferences.genre_preference);
        }
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
        fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/preferences/set/", options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(preferences => {
                console.log(preferences);
                this.setState(() => {
                    return {
                        preferences
                    };
                });
                this.setGenres();
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
                                    <h4>Checkboxes that SHOULD be checked: {this.state.preferences["genre_preference"]}</h4>
                                    {this.state.data.map(genre => {
                                        let genre_name = "genre" + genre.id;
                                        return (
                                            <Checkbox name={genre_name} text={genre.name} checked={this.state.genres[genre_name]} onChange={this.handleGenreChange.bind(this)} />
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
                                    <PasswordInputField name="profile_current_password" id="profile_current_password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} placeholder="Current Password" />
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
                        <form method="post" action="#">
                        <div className="row gtr-uniform">
                            <div className="col-6 col-12-xsmall">
                                <PasswordInputField name="profile_delete_password" id="profile_delete_password" value={this.state.deletePassword} onChange={this.handleDeletePasswordChange} placeholder="Password" />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <DeleteProfileButton buttonName="Delete" onClick={this.handleDeleteProfile} />
                        </div>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}

export default ProfileForm;
