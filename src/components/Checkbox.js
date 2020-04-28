import React, { Component } from "react";
import { render } from "react-dom";

class Checkbox extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={{ display: "inline-block" }}>
				<input id={this.props.name} type="checkbox" name={this.props.name} defaultChecked={this.props.checked} onClick={this.props.onChange} />
				<label for={this.props.name}>{this.props.text}</label>
			</div>
		);
	}
}

export default Checkbox;
