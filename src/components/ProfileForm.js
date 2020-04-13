import React, { Component } from "react";
import Checkbox from "./Checkbox";
import SendButton from "./SendButton";
import DeleteProfileButton from "./DeleteProfileButton";
import InfoText from "./InfoText";

class ProfilePage extends Component {
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
              <Checkbox name="genre1" checked="false" />
              <label for="genre1">First Genre</label>
              <Checkbox name="genre2" checked="true" />
              <label for="genre2">Second Genre</label>
              <Checkbox name="genre3" checked="false" />
              <label for="genre3">Third Genre</label>
              <Checkbox name="genre4" checked="true" />
              <label for="genre4">Fourth Genre</label>
              <Checkbox name="genre5" checked="false" />
              <label for="genre5">Fifth Genre</label>
              <Checkbox name="genre6" checked="true" />
              <label for="genre6">Sixth Genre</label>
            </div>
            <div class="col-12">
              <ul class="actions">
                <li id="sendButton">
                  <SendButton buttonName="Submit" />
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
                    <SendButton buttonName="Submit" />
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
                  <SendButton buttonName="Submit" />
                </li>
              </ul>
            </div>
          </div>
        </form>
        <div class="row">
          <DeleteProfileButton buttonName="Delete" />
        </div>
      </section>
    </div>
  </div>
  );
  }
}

export default ProfilePage;
