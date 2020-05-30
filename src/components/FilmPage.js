/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendButton from "./SendButton";
import tmdb_logo from "../images/tmdb.svg";

import host from '../config';


class FilmPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            filmData: [],
            tmdb: [],
            loaded: false,
            loaded_tmdb: false,
            placeholder: "Loading",
            watched_films: [],
            isInWatched: false,
        };
    }

    handleAddToWatched = async (event, addToast) => {

        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        let response = await fetch(`${ host }api/v1/app/watched/set/`, options);
        console.log(response);

        if (response.status > 400) {
            //<Redirect to="/login" />
            this.props.history.push("/login/");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const watchedFilms = await response.json();
        console.log(watchedFilms);

        await watchedFilms.watched_list.push(this.state.filmData.id);

        const add_options = {
            method: "PUT",
            body: JSON.stringify({ "watched_list": watchedFilms.watched_list }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        response = await fetch(`${ host }api/v1/app/watched/set/`, add_options);
        console.log(response);

        addToast("Added to watched successfully!", { appearance: 'success', autoDismiss: true, });
        console.log(response);
        this.isInWatched();
    }

    handleDeleteFromWatched = async (event, addToast) => {

        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        let response = await fetch(`${ host }api/v1/app/watched/set/`, options);
        console.log(response);

        if (response.status > 400) {
            //<Redirect to="/login" />
            this.props.history.push("/login/");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const watchedFilms = await response.json();
        console.log(watchedFilms);
        const indexOfFilm = await watchedFilms.watched_list.indexOf(this.state.filmData.id);

        if (~indexOfFilm) {
            await watchedFilms.watched_list.splice(indexOfFilm, 1);
        }

        const add_options = {
            method: "PUT",
            body: JSON.stringify({ "watched_list": watchedFilms.watched_list }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        response = await fetch(`${ host }api/v1/app/watched/set/`, add_options);

        addToast("Deleted from watched successfully!", { appearance: 'success', autoDismiss: true, });
        console.log(response);
        this.isInWatched();
    }

    isInWatched = async () => {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        const response = await fetch(`${ host }api/v1/app/watched/set/`, options);
        console.log(response);

        if (response.status > 400) {
            //<Redirect to="/login" />
            this.props.history.push("/login/");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const watchedFilms = await response.json();
        console.log(watchedFilms);

        const isInWatched = Boolean(watchedFilms.watched_list.find(filmID => {
            return filmID == this.state.filmData.id;
        }));
        
        this.setState({
            isInWatched,
        });
    }

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
        
        const response = await fetch(`${ host }api/v1/app/film/detail/${ this.props.match.params.id }`, options);
        console.log(response);

        if (response.status > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const filmData = await response.json();
        console.log(filmData);

        this.isInWatched();
        this.setState(() => {
            return {
                filmData,
                loaded: true
            };
        });
    }

    async loadTMDB() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/${ this.state.filmData.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options);
        console.log(response);

        if (response.status > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const tmdb = await response.json();
        console.log(tmdb);

        this.setState(() => {
            return {
                tmdb,
                loaded_tmdb: true
            };
        });
    }

    render() {
        let film = <h1>Film page</h1>

        if (this.state && this.state.loaded && this.state.loaded_tmdb) {
            let counter = 0;
            let genresArray = this.state.filmData.genre;

            let genres = genresArray.map(genre => {
                counter += 1;
                if (counter === genresArray.length) {
                    return(
                        <span>
                            { genre.name }
                        </span>
                    );
                } else {
                    return(
                        <span>
                            { genre.name }
                            <span>, </span>
                        </span>
                    );
                }
            });

            let buttonName = "Add to watched";
            let buttonHandler = this.handleAddToWatched;

            if (this.state.isInWatched) {
                buttonName = "Remove from watched";
                buttonHandler = this.handleDeleteFromWatched;
            }

            film = (
                <div className="info-box">
                    <div className="info-box-container clearfix">
                        <div className="col-sm-8 col-sm-push-4">
                            <div className="title-block">
                                <h1>
                                    { this.state.filmData.title }
                                </h1>
                            </div>
                            <div className="detail-infos">
                                <hr />
                                    <div className="detail-infos-detail">
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Rating
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <div className="title-card-rating">
                                                    <a className="no-border-btm" href={ `https://www.themoviedb.org/movie/${ this.state.filmData.tmdb }` }>
                                                        <img src={ tmdb_logo } alt="tmdb logo" />
                                                        <span>{ this.state.tmdb.vote_average }</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Genres
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                { genres }
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Release date
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <span>{ this.state.tmdb.release_date }</span>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Runtime
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <span>{ `${ this.state.tmdb.runtime } minutes` }</span>
                                            </div>
                                        </div>     
                                    </div>
                                <hr />
                                <div>
                                    <p className="detail-infos-subheading">Synopsis</p>
                                    <p className="text-wrap-pre-line">
                                        <span>
                                            { this.state.tmdb.overview }
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-sm-pull-8">
                            <div className="title-sidebar">
                                <aside>
                                    <div className="title-poster no-radius-btm">
                                        <img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.state.filmData.title } />
                                    </div>
                                </aside>
                            </div>
                            <div className="title-sidebar-button no-radius-top">
                                <SendButton buttonName={ buttonName } onSubmit={ buttonHandler } />
                            </div>
                        </div>
                    </div>
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
                    <div className="inner">
                        { film }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default FilmPage;
