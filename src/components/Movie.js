import React, { Component } from "react";
import MovieDetails from "./MovieDetails";
import MovieImageButton from "./MovieImageButton";
import RateButton from "./RateButton";
import TextInputField from "./TextInputField";

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_rating: ""
		};
	}

	handleRatingChange = event => {
		this.setState({
			movie_rating: event.target.value
		});
	}

	render() {
		return (
			<p>
				<article id="film square" className="style1">
					<a href={ this.props.link }>
						<MovieImageButton image={ this.props.image } alt={ this.props.title } />
						<h2>{ this.props.title }</h2>
					</a>
					<MovieDetails genres={ this.props.genre } desc={ this.props.desc } />
				</article>
				<form>
					<div className="row gtr-uniform">
						<div id="text-input-field" className="col-6 col-12-xsmall">
							<TextInputField name={`rating${ this.props.film_id }`} id={`rating${ this.props.film_id }`} onChange={ this.handleRatingChange } value={ this.state.movie_rating } placeholder="Rating 0-100" />
						</div>
						<div className="col-12">
							<ul className="actions">
								<RateButton film_id={ this.props.film_id } movie_rating={ this.state.movie_rating } />
							</ul>
						</div>
					</div>
				</form>
			</p>
		);
	}
}

export default Movie;
