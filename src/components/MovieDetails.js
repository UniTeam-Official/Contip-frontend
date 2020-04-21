import React, { Component } from "react";

class MovieDetails extends Component {
	render() {
		return (
			<div className="content">
				<h3> Description: </h3>
				<p>{this.props.desc}</p>
				<h3> Year of release: </h3>
				<p>{this.props.year}</p>
			</div>
		);
	}
}

export default MovieDetails;
