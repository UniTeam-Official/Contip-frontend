import React, { Component } from "react";
import { render } from "react-dom";
import SocMediaBar from "./SocMediaBar";

class SuggestForm extends Component {
  render() {
    return (
      <section>
        <h2>You Think We Don't Know That One Unique, Artistic, Extraordinary Movie?<br />Recommend It To Us!</h2>
        <form method="post" action="#">
          <div class="fields">
            <div class="field half">
              <input type="text" name="footer_name" id="footer_name_input_field" placeholder="Movie We Have To Check Out!" />
            </div>
            <div class="field half">
              <input type="email" name="footer_email" id="footer_email_input_field" placeholder="How Much Will We Like It/10?" />
            </div>
            <div class="field">
              <textarea name="footer_message" id="footer_message_input_field" placeholder="Imdb Link"></textarea>
            </div>
          </div>
          <ul class="actions">
            <li><input type="submit" id="footer_send_button" value="Send" class="primary" /></li>
          </ul>
        </form>
      </section>
    );
  }
}

export default SuggestForm;