import React, { Component } from "react";
import MovieDetails from "./MovieDetails";
import MovieImageButton from "./MovieImageButton";

class Movie extends Component {
	render() {
		return (
			<article id="film square" className="style1">
				<a href={this.props.link}>
					<MovieImageButton image={this.props.image} alt={this.props.title} />
					<h2>{this.props.title}</h2>
					<MovieDetails genre={this.props.genre} desc={this.props.desc} />
				</a>
			</article>
		);
	}
}

export default Movie;
