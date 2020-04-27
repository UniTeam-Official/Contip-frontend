import React, { Component } from "react";

import RecommendationFilm from "./RecommendationFilm";

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		};
	}

	componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
			}
		}
		fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/film/list/", options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState(() => {
					return {
						data,
						loaded: true
					};
				});
			});
	}

	render() {
		let films = <span></span>;
		if (this.state && typeof(this.state.data.results) != 'undefined' && this.state.data.results.length > 0){
			films = this.state.data.results.map(film => {
				return (
					<RecommendationFilm href={`/film/${film.id}`} title={film.title} image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre={film.genre.map(genre => {return(genre.name + '  ')})} />
				);
			})
		}
		return (
			<section className="tiles">
				{films}
			</section>
		);
	}
}

export default MovieList;
