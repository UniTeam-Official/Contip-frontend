import React, { Component } from "react";
import Checkbox from "./Checkbox";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";
import InfoText from "./InfoText";
import WelcomeText from "./WelcomeText";

import host from '../config';


let GENRES = [];

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            deletePassword: '',
            data: [],
            userInfo: [],
            loaded: false,
            placeholder: "Loading",

            preferences: GENRES.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),

            emailInputList: [
                {
                    type: "email",
                    name: "email-change",
                    id: "email-change",
                    value: this.email,
                    onChange: this.handleEmailChange,
                    placeholder: "New email",
                },

                {
                    type: "password",
                    name: "password-email-change",
                    id: "password-email-change",
                    placeholder: "Enter Password To Confirm",
                },
            ],


            passwordInputList: [
                {
                    type: "password",
                    name: "password-profile",
                    id: "password-profile",
                    value: this.password,
                    onChange: this.handlePasswordChange,
                    placeholder: "New Password",
                },

                {
                    type: "password",
                    name: "password-confirm-profile",
                    id: "password-confirm-profile",
                    value: this.confirmPassword,
                    onChange: this.handleConfirmPasswordChange,
                    placeholder: "Confirm Your Password",
                },
            ],

            deleteInputList: [
                {
                    type: "password",
                    name: "password-delete-profile",
                    id: "password-delete-profile",
                    value: this.deletePassword,
                    onChange: this.handleDeletePasswordChange,
                    placeholder: "Password",
                },
            ],
        };
    }

    handlePreferenceChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            preferences: {
              ...prevState.preferences,
              [name]: !prevState.preferences[name],
            },
        }));
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

    handlePreferenceSubmit = (preferenceSubmitEvent, addToast) => {
        preferenceSubmitEvent.preventDefault();

        const selectedPreferences = (Object
            .keys(this.state.preferences)
            .filter(option => this.state.preferences[option])
        );

        console.log(`selectedPreferences: ${selectedPreferences}`);

        // Update user genres
        const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "PUT",
            body: JSON.stringify({ genre_preference: selectedPreferences }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/preferences/set/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });

                }
                else {
                    this.props.history.push("/profile/");
                    addToast("Preferences changed successfully!", { appearance: 'success', autoDismiss: true, });
                }
                return res.json();
            });
    }

    handleLogOutSubmit = event => {
        event.preventDefault();
        localStorage.removeItem('jwt access');
        localStorage.removeItem('jwt refresh')
        this.props.history.push("/login/");
    }

    handleEmailSubmit = (event, addToast) => {
        event.preventDefault();
        // Update user email
		const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "PATCH",
            body: JSON.stringify({ email: this.state.email }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/account/users/me/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/profile/");
                    addToast("Email changed successfully!", { appearance: 'success', autoDismiss: true, });
                }
                return res.json();
            });
    }

    handlePasswordSubmit = (event, addToast) => {
        if (this.state.password == this.state.confirmPassword) {
            event.preventDefault();
            // Update user password
            const access_token = localStorage.getItem('jwt access');
            let options = {
                method: "POST",
                body: JSON.stringify({ new_password: this.state.password, re_new_password: this.state.confirmPassword, current_password: this.state.currentPassword }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${ access_token }`
                }
            }
            fetch(`${ host }api/v1/account/users/set_password/`, options)
                .then(res => {
                    console.log(res);
                    if (res.status != 204){
                        addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                    }
                    else {
                        this.props.history.push("/login/");
                    }
                    return res.json();
                });
        }
        else {
            event.preventDefault();
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
        }
    }

    handleDeleteProfile = (event, addToast) => {
        addToast("Profile deletion request submitted!", { appearance: 'info', autoDismiss: true, });
        // Delete user
        const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "DELETE",
            body: JSON.stringify({ current_password: this.state.deletePassword }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${ host }api/v1/account/users/me/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 204){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/signup/");
                }
                return res.json();
            });
    }

    componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }

        fetch(`${ host }api/v1/app/genre/list/`, options)
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

                GENRES = Array.from(data.map(genre => genre.id));

                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
        fetch(`${ host }api/v1/app/preferences/set/`, options)
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
                preferences = preferences.genre_preference;
                
                preferences.forEach(preference => {
                    this.setState(prevState => ({
                        preferences: {
                          ...prevState.preferences,
                          [preference]: !prevState.preferences[preference],
                        },
                    }));
                });
            });
        fetch(`${ host }api/v1/account/users/me/`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(userInfo => {
                console.log(userInfo);
                this.setState(() => {
                    return {
                        userInfo,
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
                    <section className="profile-section">
                        <WelcomeText username={ this.state.userInfo.username } />

                        <div>
                            {/* PREFERENCES */}

                            <form method="post" action="#">
                                <div>
                                    <div className="row gtr-uniform">
                                    <div className="col-6 col-12-small preferences">
                                        <h4>Here's Your Favourite Stuff<br/>Change It Up If You Want</h4>
                                        {this.state.data.map(genre => {
                                            if (this.state.preferences[genre.id]) {
                                                let genreName = "genre" + genre.id;
                                                return (
                                                    <Checkbox
                                                        id={ genreName }
                                                        name={ genre.id }
                                                        text={ genre.name }
                                                        isSelected={ this.state.preferences[genre.id] }
                                                        className="preferences-checkbox"
                                                        onCheckboxChange={ this.handlePreferenceChange.bind(this) } />
                                                );
                                            }
                                        })}
                                        {this.state.data.map(genre => {
                                            if (!this.state.preferences[genre.id]) {
                                                let genreName = "genre" + genre.id;
                                                return (
                                                    <Checkbox
                                                        id={ genreName }
                                                        name={ genre.id }
                                                        text={ genre.name }
                                                        isSelected={ this.state.preferences[genre.id] }
                                                        className="preferences-checkbox"
                                                        onCheckboxChange={ this.handlePreferenceChange.bind(this) } />
                                                );
                                            }
                                        })}
                                    </div>
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li id="sendButton">
                                                    <SendButton buttonName="Submit" onSubmit={ this.handlePreferenceSubmit } toastMessage="Preferences saved successfully" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="user-info">
                            <h4>Everything We Know About You:</h4>
                            <InfoText username={ this.state.userInfo.username } email={ this.state.userInfo.email } />
                            <SendButton buttonName="Log Out" onSubmit={ this.handleLogOutSubmit } toastMessage="Log out completed successfully" />
                        </div>

                        <div>
                            {/* CHANGE EMAIL */}

                            <form method="post" action="#">
                                <div>
                                    <div className="row gtr-uniform">
                                        <div id="text-input-field" className="col-6 col-12-xsmall">
                                            <h3>Change Email</h3>
                                            <TextInputField textInputList={ this.state.emailInputList } />
                                        </div>
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li id="sendButton">
                                                    <SendButton buttonName="Change!" onSubmit={ this.handleEmailSubmit } toastMessage="Email changed successfully" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div>
                            {/* CHANGE PASS */}

                            <form method="post" action="#">
                                <div>
                                    <div className="row gtr-uniform">
                                        <div className="col-6 col-12-xsmall">
                                            <h3>Change Password</h3>
                                            {/*<PasswordInputField name="profile_current_password" id="profile_current_password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} placeholder="Current Password" />*/}
                                            <TextInputField textInputList={ this.state.passwordInputList } />
                                        </div>
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li id="sendButton">
                                                    <SendButton buttonName="Change!" onSubmit={ this.handlePasswordSubmit } toastMessage="Password changed successfully" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* DELETE ACCOUNT */}

                        <div>
                            <h3>Wanna Leave Us? Ah, We Will Miss You!</h3>
                            <form method="post" action="#">
                                <div className="row gtr-uniform">
                                    <div className="col-6 col-12-xsmall">
                                        <TextInputField textInputList={ this.state.deleteInputList } />
                                    </div>
                                </div>
                                <div className="row">
                                    <SendButton id="DeleteProfileButton" buttonName="Delete" onSubmit={ this.handleDeleteProfile } />
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default ProfileForm;
