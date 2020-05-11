/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendButton from "./SendButton";

class FilmPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			tmdb: [],
			loaded: false,
			loaded_tmdb: false,
			placeholder: "Loading",
            watched_films: [],
		};
	}

    handleAddToWatched = () => {

        const access_token = localStorage.getItem('jwt access');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
			}
		}
		fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/watched/set/`, options)
            	.then(response => {
				return response.json();
			})
			.then(watched_films => {


                watched_films.watched_list.push(this.state.data.id);

				this.setState({ watched_films: watched_films.watched_list });

                console.log("Modified list (for DEBUG ) " + this.state.watched_films);
                
                const add_options = {
                    method: "PUT",
                    body: JSON.stringify({ "watched_list": watched_films.watched_list }),
        			headers: {
        				'Accept': 'application/json',
        				'Content-Type': 'application/json',
        				'Authorization': `JWT ${access_token}`
        			}
                }


                fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/watched/set/`, add_options)
        			.then(response => {
        				console.log(response);
        				return response.json();
        			})
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
		fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/film/detail/${ this.props.match.params.id }`, options)
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

	loadTMDB() {
		const access_token = localStorage.getItem('jwt access');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
			}
		}
		fetch(`https://api.themoviedb.org/3/movie/${ this.state.data.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(tmdb => {
				console.log(tmdb);
				this.setState(() => {
					return {
						tmdb,
						loaded_tmdb: true
					};
				});
			});
	}

	render(){
		let movie = (
			<div className="inner">
				<h1 id="main-film-title">TITLE</h1>
				<span id="main-film-image" className="image main"><img src="image" alt="IMAGE" /></span>
				<a href='/'>IMDB Link</a>
				<h3>Film description:</h3>
				<p id="film-description">DESCRIPTION</p>
			</div>
		);

		if(this.state && this.state.loaded && this.state.loaded_tmdb) {
			movie = (
				<div className="inner">
					<h1 id="main-film-title">{ this.state.data.title }</h1>
					<span id="main-film-image" className="image left"><img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt="GET IMAGE FROM IMDB" /></span>
					<h3>Film description:</h3>
					<p id="film-description">{ this.state.tmdb.overview }</p>
					<h3>Genres: </h3>
					<p>
						{ this.state.data.genre.map(genre => { return(genre.name + "  ") }) }
					</p>
					<h3>Release Date: </h3>
					<p>{ this.state.tmdb.release_date }</p>
					<h3>Runtime: </h3>
					<p>{ this.state.tmdb.runtime } minutes</p>
					<h3><a href={`https://www.imdb.com/title/tt0${ this.state.data.imdb }`}>IMDB Link</a></h3>
					<SendButton buttonName="Add to watched" onClick={ this.handleAddToWatched } />
				</div>
			);
		}

		if (this.state.loaded && !this.state.loaded_tmdb) {
			this.loadTMDB();
		}
		return(
			<div id="wrapper">
				<Header />
				<div id="main">
					{movie}
				</div>
				<Footer />
			</div>
		)
	}
}

export default FilmPage;
