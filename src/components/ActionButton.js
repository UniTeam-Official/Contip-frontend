
import React, { Component } from "react";
import { render } from "react-dom";

class ActionButton extends Component {
  render() {
    return (
	<div class="col-6 col-12-medium">
	    <ul class="actions stacked">
		<li><a href="#" class="button small fit">Delete Account</a></li>
		<li id="actionButton"><a href="#" class="button small fit">Delete Account</a></li>
	    </ul>
	</div>
    );
  }
}

export default ActionButton;
