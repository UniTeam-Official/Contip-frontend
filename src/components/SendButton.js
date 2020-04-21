import React, { Component } from "react";

class SendButton extends Component {
	render() {
		return (
			<button type="submit" value="Submit" className="primary" onClick={this.props.onClick} >{this.props.buttonName}</button>
		);
	}
}

export default SendButton;
