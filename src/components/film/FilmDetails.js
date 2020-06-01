/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import SendButton from "../button/SendButton";
import tmdb_logo from "../../images/tmdb.svg";

import { fetchFilmDetails } from "../../actions/filmDetails";
import { addToWatched, removeFromWatched } from '../../actions/watchedList';
import { connect } from 'react-redux';


class FilmDetails extends Component{
    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchFilmDetails(id));
    }

    handleAddToWatched = (event, addToast) => {
        const { dispatch, id } = this.props;
        dispatch(addToWatched(+id, addToast));
    }

    handleRemoveFromWatched = (event, addToast) => {
        const { dispatch, id } = this.props;
        dispatch(removeFromWatched(+id, addToast));
    }

    render() {
        const { filmData, tmdbData } = this.props;

        let film = <h1>Film page</h1>

        if (filmData.loaded && tmdbData.loaded) {
            let counter = 0;
            let genresArray = filmData.genre;

            let genres = genresArray.map(genre => {
                counter += 1;
                if (counter === genresArray.length) {
                    return(
                        <span key={ genre.id }>
                            { genre.name }
                        </span>
                    );
                } else {
                    return(
                        <span key={ genre.id }>
                            { genre.name }
                            <span>, </span>
                        </span>
                    );
                }
            });

            let buttonName = "Add to watched";
            let buttonHandler = this.handleAddToWatched;

            if (filmData.isInWatched) {
                buttonName = "Remove from watched";
                buttonHandler = this.handleRemoveFromWatched;
            }

            film = (
                <div className="info-box">
                    <div className="info-box-container clearfix">
                        <div className="col-sm-8 col-sm-push-4">
                            <div className="title-block">
                                <h1>
                                    { filmData.title }
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
                                                    <a className="no-border-btm" href={ `https://www.themoviedb.org/movie/${ filmData.tmdb }` }>
                                                        <img src={ tmdb_logo } alt="tmdb logo" />
                                                        <span>{ tmdbData.vote_average }</span>
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
                                                <span>{ tmdbData.release_date }</span>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Runtime
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <span>{ `${ tmdbData.runtime } minutes` }</span>
                                            </div>
                                        </div>     
                                    </div>
                                <hr />
                                <div>
                                    <p className="detail-infos-subheading">Synopsis</p>
                                    <p className="text-wrap-pre-line">
                                        <span>
                                            { tmdbData.overview }
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-sm-pull-8">
                            <div className="title-sidebar">
                                <aside>
                                    <div className="title-poster no-radius-btm">
                                        <img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + tmdbData.poster_path } alt={ filmData.title } />
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

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { filmData, tmdbData } = state;

    return {
        id,
        filmData,
        tmdbData,
    }
}

export default connect(mapStateToProps)(FilmDetails);
