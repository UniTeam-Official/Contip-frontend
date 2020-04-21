import React, { Component } from "react";

class DeleteProfileButton extends Component {
	render() {
		return (
			<div className="col-6 col-12-medium">
				<ul className="actions stacked">
					{/* <li><a href="#" className="button small fit">Delete Account</a></li> */}
					<li id="DeleteProfileButton"><a href="#" className="button small fit" onClick={this.props.onClick} >Delete Account</a></li>
				</ul>
			</div>
		);
	}
}

export default DeleteProfileButton;
