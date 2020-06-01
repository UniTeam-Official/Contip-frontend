/* eslint-disable eqeqeq */
import fetch from 'cross-fetch';
import host from '../configs/hostConfig';
import * as types from '../constants/ActionTypes';

export const receiveFilmDetails = (filmData, loaded) => ({
    type: types.RECEIVE_FILM_DETAILS,
    filmData,
    loaded,
})

export const fetchFilmDetails = id => async dispatch => {
    const access_token = localStorage.getItem('jwt access');
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access_token }`
        }
    }

    const response = await fetch(`${ host }api/v1/app/film/detail/${ id }`, options);
    const filmData = await response.json();

    dispatch(fetchFilmTMDB(filmData.tmdb));
    dispatch(fetchIsInWatched(id));
    const loaded = true;
    return dispatch(receiveFilmDetails(filmData, loaded));
}

export const receiveFilmTMDB = (tmdbData, loaded) => ({
    type: types.RECEIVE_FILM_TMDB,
    tmdbData,
    loaded,
})

export const fetchFilmTMDB = tmdbId => async dispatch => {
    const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${ tmdbId }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options);
    const tmdbData = await response.json();
    const loaded = true;
    return dispatch(receiveFilmTMDB(tmdbData, loaded));
}

export const receiveIsInWatched = isInWatched => ({
    type: types.RECEIVE_IS_IN_WATCHED,
    isInWatched,
})

export const fetchIsInWatched = filmId => async dispatch => {
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
    const watchedFilms = await response.json();
    const isInWatched = Boolean(watchedFilms.watched_list.find(watchedFilmId => {
        return watchedFilmId == filmId;
    }));

    return dispatch(receiveIsInWatched(isInWatched));
}
