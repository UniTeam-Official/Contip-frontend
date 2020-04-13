import React, { Component } from "react";

class MovieTitle extends Component {
	render() {
		return (
			<h2>{this.props.title}</h2>
		);
	}
}

export default MovieTitle;