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

    get_films = async (film_ids, options) => {

        /* 
            Functions that makes get requests simultaneously and returns films data
        */
       
        let fetches = [];
        let jsones = [];

        let responses;
        let data;

        // GETTING RESPONSES
        for (const id of film_ids.watched_list) {
            fetches.push(fetch(`${host}api/v1/app/film/detail/${id}/`, options));
            console.log(id);
        }

        try {
            responses = await Promise.all(fetches);
        }
        catch (err) {
            console.log(err);
        };

        //
        for (const response of responses) {
            jsones.push(response.json());
        }

        try {
            data = await Promise.all(jsones);
        }
        catch (err) {
            console.log(err);
        };

        return data;
    };

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

        console.log(this.host);
        // GETTINGS FILM IDS
        const response = await fetch(`${host}api/v1/app/watched/set/`, options);

        // IF 401 THEN LOGIN
        if (response.status === 401) {
            this.props.history.push("/login");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const film_ids = await response.json();

        let data = await this.get_films(film_ids, options);

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
        if (this.state && typeof (this.state.data) != 'undefined' && this.state.data.length > 0) {
            films = this.state.data.map(film => {
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
