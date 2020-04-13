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
	fetch("http://localhost:8000/api/v1/app/genre/list/")
	    .then(response => {
		if (response.status > 400) {
		    return this.setState(() => {
			return { placeholder: "Something went wrong!" };
		    });
		}
		return response.json();
	    })
	    .then(data => {
		this.setState(() => {
		    console.log(data);
		    console.log("HUUUUUUUUUUUUUUUUUUUUUUi");
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
	    <div class="inner">
	      <h1>My Profile</h1>
	      <section>
		<h2>User Info</h2>
		<InfoText username="Storn" email="storn@lpnu.edu.ua" fullname="Yaroslav Mokryk" lastlogin="2020.04.10 17:48" />
		<h2>Change Profile</h2>
		<h3>Change Favorite Genres</h3>
		<form method="post" action="#">
		  <div class="row gtr-uniform">
		    <div class="col-6 col-12-small">
			{this.state.data.map(genre => {
			    return (
				<Checkbox name="genre1" text={genre.name} checked="false" />
			    );
			})}
		    </div>
		    <div class="col-12">
		      <ul class="actions">
			<li id="sendButton">
			  <SendButton />
			</li>
		      </ul>
		    </div>
		  </div>
		</form>
		<h3>Change Email</h3>
		<form method="post" action="#">
		  <div class="row gtr-uniform">
		      <div id="text-input-field" class="col-6 col-12-xsmall">
			<input type="email" name="profile_email" id="profile_email" placeholder="New Email" />
		      </div>
		      <div class="col-12">
			<ul class="actions">
			  <li id="sendButton">
			    <SendButton />
			  </li>
			</ul>
		      </div>
		  </div>
		</form>
		<h3>Change Password</h3>
		<form method="post" action="#">
		  <div class="row gtr-uniform">
		    <div class="col-6 col-12-xsmall">
		      <input type="password" name="profile_password" id="profile_password" placeholder="New Password" />
		      <input type="password" name="profile_confirm_password" id="profile_confirm_password" placeholder="Confirm New Password" />
		    </div>
		    <div class="col-12">
		      <ul class="actions">
			<li id="sendButton">
			  <SendButton />
			</li>
		      </ul>
		    </div>
		  </div>
		</form>
		<div class="row">
		  <DeleteProfileButton />
		</div>
	      </section>
	    </div>
	  </div>
      );
  }
}

export default ProfilePage;
