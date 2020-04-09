import React, { Component } from "react";
import Checkbox from "./Checkbox";
import SendButton from "./SendButton";
import ActionButton from "./ActionButton";

class ProfilePage extends Component {
  render() {
    return (
	<div id="main">
	    <div class="inner">
		<h1>My Profile</h1>
		<section>
		    <h2>User Info</h2>
		    <p id="info-text">Username: </p>
		    <p id="info-text">Email: </p>
		    <p id="info-text">Full name: </p>
		    <p id="info-text">Last login: </p>
		    <h2>Change Profile</h2>
		    <h3>Change Favorite Genres</h3>
		    <form method="post" action="#">
			<div class="row gtr-uniform">
			    <div class="col-6 col-12-small">
				<Checkbox />
				<Checkbox />
				<Checkbox />
				<Checkbox />
				<Checkbox />
				<Checkbox />
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
				<input type="email" name="demo-email" id="demo-email" value="" placeholder="New Email" />
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
				<input type="password" name="demo-password" id="demo-password" value="" placeholder="New Password" />
				<input type="password" name="confirm-password" id="confirm-password" value="" placeholder="Confirm New Password" />
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
			<ActionButton />
		    </div>
		</section>
	    </div>
	</div>
    );
  }
}

export default ProfilePage;
