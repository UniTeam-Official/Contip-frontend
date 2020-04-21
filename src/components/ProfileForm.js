import React, { Component } from "react";
import Checkbox from "./Checkbox";
import SendButton from "./SendButton";
import DeleteProfileButton from "./DeleteProfileButton";
import InfoText from "./InfoText";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
		const token = localStorage.getItem('jwt');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${token}`
            }
        }
        fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/genre/list/", options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
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
                                            <SendButton buttonName="Submit" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>

                        {/* CHANGE EMAIL */}
                        
                        <h3>Change Email</h3> <form method="post" action="#"> <div className="row gtr-uniform">
                            <div id="text-input-field" className="col-6 col-12-xsmall">
                                <input type="email" name="profile_email" id="profile_email" placeholder="New Email" />
                            </div>
                            <div className="col-12">
                                <ul className="actions">
                                    <li id="sendButton">
                                        <SendButton buttonName="Submit" />
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
                                    <input type="password" name="profile_password" id="profile_password" placeholder="New Password" />
                                    <input type="password" name="profile_confirm_password" id="profile_confirm_password" placeholder="Confirm New Password" />
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li id="sendButton">
                                            <SendButton buttonName="Submit" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <DeleteProfileButton buttonName="Delete" />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default ProfilePage;