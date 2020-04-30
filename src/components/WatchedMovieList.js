import React, { Component } from "react";
import Movie from "./Movie";
import history from './history';
import TextInputField from "./TextInputField";
import RateButton from "./RateButton";

class WatchedMovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			ratings: [],
			movie_rating: "",
			loaded: false,
			placeholder: "Loading"
		};
	}

	handleRatingChange = event => {
		this.setState({
			movie_rating: event.target.value
		});
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
		fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/film/list`, options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					this.props.history.push("/login");
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
			// fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/rating/list`, options)
			// 	.then(response => {
			// 		console.log(response);
			// 		if (response.status > 400) {
			// 			//this.props.history.push("/login");
			// 			return this.setState(() => {
			// 				return { placeholder: "Something went wrong!" };
			// 			});
			// 		}
			// 		return response.json();
			// 	})
			// 	.then(ratings => {
			// 		console.log(ratings);
			// 		this.setState(() => {
			// 			return {
			// 				ratings,
			// 				loaded: true
			// 			};
			// 		});
			// 	});
	}

	render() {
		let films = <p></p>;
		if (this.state && typeof(this.state.data.results) != 'undefined' && this.state.data.results.length > 0){
			films = this.state.data.results.map(film => {
				return (
					<div>
						<p><Movie link={`/film/${film.id}`} title={film.title} image="https://avatarfiles.alphacoders.com/139/139764.jpg" desc='GET DESCRIPTION FROM IMDB' genre={film.genre.map(genre => {return(genre.name + '  ')})} /></p>
						<form>
							<div className="row gtr-uniform">
								<div id="text-input-field" className="col-6 col-12-xsmall">
									<TextInputField name={`rating${film.id}`} id={`rating${film.id}`} onChange={this.handleRatingChange} value={this.state.movie_rating} placeholder="Rating 0-100" />
								</div>
								<div className="col-12">
									<ul className="actions">
										<RateButton film_id={film.id} movie_rating={this.state.movie_rating} />
									</ul>
								</div>
							</div>
						</form>
					</div>
				);
			})
		}
		return (
			<div id="main">
				<div className="inner">
					<h1>Watched Movies</h1>
					{films}
				</div>
			</div>
		);
	}
}

export default WatchedMovieList;
