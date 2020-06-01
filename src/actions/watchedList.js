import fetch from 'cross-fetch';
import host from '../configs/hostConfig';
import { fetchIsInWatched } from './filmDetails';

export const addToWatched = (filmId, addToast) => async dispatch => {
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
    const watchedFilms = await response.json();
    await watchedFilms.watched_list.push(filmId);

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
    addToast("Added to watched successfully!", { appearance: 'success', autoDismiss: true, });
    dispatch(fetchIsInWatched(filmId));
}

export const removeFromWatched = (filmId, addToast) => async dispatch => {
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
    const watchedFilms = await response.json();
    const indexOfFilm = await watchedFilms.watched_list.indexOf(filmId);

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
    dispatch(fetchIsInWatched(filmId));
}
