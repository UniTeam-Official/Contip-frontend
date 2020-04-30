import React, { Component } from "react";

class Checkbox extends Component {
	constructor(props) {
		super(props);
    this.state = { checked: this.props.checked == "true" }
		this.handleCheck = this.handleCheck.bind(this);
	}
	handleCheck(e) {
		if (this.props.writable) {
			this.setState({
				checked: e.target.checked,
			})
		} else {
			this.setState({
				checked: false,
			})
		}

		if (!this.props.name.toLowerCase().includes('sorting')) {
			// replace all leading non-digits with nothing
			this.props.handleCheckbox(this.props.name.replace( /^\D+/g, ''), !this.state.checked);
		} else {
			this.props.handleCheckbox(this.props.name, !this.state.checked);
		}
	}
	render() {
		return (
			<div style={{ display: "inline-block" }}>
        <input id={ this.props.name } type="checkbox" name={ this.props.name } checked={ this.state.checked } onChange={ this.handleCheck } />
				<label for={ this.props.name }>{ this.props.text }</label>
			</div>
		);
	}
}

export default Checkbox;
