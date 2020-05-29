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
            currentPassword: '',
            confirmPassword: '',
            deletePassword: '',
            genreList: [],
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
                    name: "email",
                    id: "email-change",
                    value: this.email,
                    onChange: this.handleInputChange,
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
                    name: "currentPassword",
                    id: "password-current-profile",
                    value: this.currentPassword,
                    onChange: this.handleInputChange,
                    placeholder: "Current Password",
                },

                {
                    type: "password",
                    name: "password",
                    id: "password-profile",
                    value: this.password,
                    onChange: this.handleInputChange,
                    placeholder: "New Password",
                },

                {
                    type: "password",
                    name: "confirmPassword",
                    id: "password-confirm-profile",
                    value: this.confirmPassword,
                    onChange: this.handleInputChange,
                    placeholder: "Confirm Your Password",
                },
            ],

            deleteInputList: [
                {
                    type: "password",
                    name: "deletePassword",
                    id: "password-delete-profile",
                    value: this.deletePassword,
                    onChange: this.handleInputChange,
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

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handlePreferenceSubmit = async (preferenceSubmitEvent, addToast) => {
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

        const response = await fetch(`${ host }api/v1/app/preferences/set/`, options);
        console.log(response);

        if (response.status != 200){
            addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
        }
        else {
            this.props.history.push("/profile/");
            addToast("Preferences changed successfully!", { appearance: 'success', autoDismiss: true, });
        }
    }

    handleLogOutSubmit = event => {
        event.preventDefault();
        localStorage.removeItem('jwt access');
        localStorage.removeItem('jwt refresh')
        this.props.history.push("/login/");
    }

    handleEmailSubmit = async (event, addToast) => {
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

        const response = await fetch(`${ host }api/v1/account/users/me/`, options);
        console.log(response);
        
        if (response.status != 200){
            addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
        }
        else {
            this.props.history.push("/profile/");
            addToast("Email changed successfully!", { appearance: 'success', autoDismiss: true, });
        }
    }

    handlePasswordSubmit = async (event, addToast) => {
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

            const response = await fetch(`${ host }api/v1/account/users/set_password/`, options);
            console.log(response);

            if (response.status != 204){
                addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
            }
            else {
                this.props.history.push("/login/");
            }
        }
        else {
            event.preventDefault();
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
        }
    }

    // TODO: rewrtite function to async/await after bug fixed
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

    async componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }

        let response = await fetch(`${ host }api/v1/app/genre/list/`, options);
        console.log(response);

        if (response.status > 400) {
            this.props.history.push("/login");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const genreList = await response.json();
        console.log(genreList);

        GENRES = Array.from(await genreList.map(genre => genre.id));

        this.setState(() => {
            return {
                genreList,
                loaded: true
            };
        });

        response = await fetch(`${ host }api/v1/app/preferences/set/`, options);
        console.log(response);

        if (response.status > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        let preferences = await response.json();
        preferences = preferences.genre_preference;

        preferences.forEach(preference => {
            this.setState(prevState => ({
                preferences: {
                  ...prevState.preferences,
                  [preference]: !prevState.preferences[preference],
                },
            }));
        });
        
        response = await fetch(`${ host }api/v1/account/users/me/`, options);
        console.log(response);

        if (response.status > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const userInfo = await response.json();
        console.log(userInfo);
        
        this.setState({
            userInfo,
            loaded: true
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
                                        {this.state.genreList.map(genre => {
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
                                            } else {
                                                return null;
                                            }
                                        })}
                                        {this.state.genreList.map(genre => {
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
                                            } else {
                                                return null;
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
                            <h4>Everything We Know About You</h4>
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
