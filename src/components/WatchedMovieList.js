import React, { Component } from "react";
import Movie from "./Movie";
import history from './history';
import host from '../config';

class WatchedMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
        for (var i = 0; i <= 100; i++) {
            this.setState(prevState => ({
                movie_ratings: { ...prevState.movie_ratings, [i]: "" }
            }));
        }
    }

    async componentDidMount() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access_token}`
            }
        }

        console.log(host);
        // Gettings list of watched films from the server
        const response = await fetch(`${host}api/v1/app/watched/set/`, options);

        // Force user to login if some kind of 400-like http codes returns
        if (response.status === 401) {
            this.props.history.push("/login");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }
        
        const films_id = await response.json();
        console.log(films_id);
        
        const data = [];

        for (const id of films_id.watched_list) {
            let response = await fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/film/detail/${id}/`, options); 
            console.log(response)
            let json = await response.json();
            console.log(json);
            data.push(json);
        }

        this.setState(() => {
            return {
                data,
                loaded: true
            }
        });
    }

    render() {
        let moviesOnPageAmount = 0;
        let films = <p></p>;
        if (this.state && typeof (this.state.data.watched_list) != 'undefined' && this.state.data.watched_list.length > 0) {
            films = this.state.data.watched_list.map(film => {
                if (moviesOnPageAmount < 12) {
                    moviesOnPageAmount++;
                    return (
                        <div>
                            <p><Movie film_id={film.id} link={`/film/${film.id}`} title={film.title} image="https://avatarfiles.alphacoders.com/139/139764.jpg" desc='GET DESCRIPTION FROM IMDB' genre={film.genre.map(genre => { return (genre.name + '  ') })} /></p>
                        </div>
                    );
                }
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
