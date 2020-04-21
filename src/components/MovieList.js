import React, { Component } from "react";

import RecommendationFilm from "./RecommendationFilm";

class MovieList extends Component {
	render() {
		return (
			<section className="tiles">
				<RecommendationFilm title="hello1" image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre="scientific fiction" year="1945" />
				<RecommendationFilm title="hello2" image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre="scientific fiction" year="1945" />
				<RecommendationFilm title="hello3" image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre="scientific fiction" year="1945" />
				<RecommendationFilm title="hello4" image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre="scientific fiction" year="1945" />
				<RecommendationFilm title="hello5" image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre="scientific fiction" year="1945" />
			</section>
		);
	}
}

export default MovieList;
