import React, { Component } from "react";
import WatchedFilmSummary from "../film/WatchedFilmSummary";

import host from '../../config';


class WatchedFilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    get_films = async (film_ids, options) => {

        /* 
            Functions that makes get requests simultaneously and returns films data
        */

        let fetches = [];
        let jsones = [];

        let responses;
        let data;

        // Getting responses
        for (const id of film_ids.watched_list) {
            fetches.push(fetch(`${ host }api/v1/app/film/detail/${ id }/`, options));
            console.log(id);
        }

        try {
            responses = await Promise.all(fetches);
        }
        catch (err) {
            console.log(err);
        };

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
                'Authorization': `JWT ${ access_token }`
            }
        }

        console.log(this.host);
        // Getting film ids
        const response = await fetch(`${ host }api/v1/app/watched/set/`, options);

        // If 401 then login
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
        let filmsOnPageAmount = 0;
        let films = <span></span>;
        let emptyWatchlistInfo = (
            <div>
                <h2>There is nothing here</h2>
                <p><strong>but you can improve it =)</strong></p>
            </div>
        );

        if (this.state && typeof (this.state.data) != 'undefined' && this.state.data.length > 0) {
            films = this.state.data.map(film => {
                if (filmsOnPageAmount < 12) {
                    filmsOnPageAmount++;
                    return (
                        <WatchedFilmSummary film_id={ film.id } tmdb={ film.tmdb } link={ `/film/${ film.id }` } title={ film.title } desc='GET DESCRIPTION FROM IMDB' genre={film.genre.map(genre => { return (genre.name + '  ') })} key={ film.id } />
                    );
                } else {
                    return null;
                }
            });

            emptyWatchlistInfo = <span></span>
        }

        return (
            <div id="main">
                <div className="inner">
                    <h1>Watched Movies</h1>
                    { emptyWatchlistInfo }
                    <div className="watchlist">
                        <div className="watchlist-row">
                            { films }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WatchedFilmList;
