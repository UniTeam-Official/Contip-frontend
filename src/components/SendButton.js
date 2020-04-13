import React, { Component } from "react";

class SendButton extends Component {
	render() {
		return (
			<button type="submit" value="Submit" class="primary">{this.props.buttonName}</button>
		);
	}
}

export default SendButton;
