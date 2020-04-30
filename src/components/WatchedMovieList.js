import React, { Component } from "react";
import Movie from "./Movie";
import history from './history';

class WatchedMovieList extends Component {
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
	}

	render() {
		let films = <li></li>;
		if (this.state && typeof(this.state.data.results) != 'undefined' && this.state.data.results.length > 0){
			films = this.state.data.results.map(film => {
				return (
					<li><Movie link={`/film/${film.id}`} title={film.title} image="https://avatarfiles.alphacoders.com/139/139764.jpg" desc='GET DESCRIPTION FROM IMDB' genre={film.genre.map(genre => {return(genre.name + '  ')})} /></li>
				);
			})
		}
		return (
			<div id="main">
				<div className="inner">
					<h1>Watched Movies</h1>
					<ul>
						{films}
					</ul>
				</div>
			</div>
		);
	}
}

export default WatchedMovieList;
