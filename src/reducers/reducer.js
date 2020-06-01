/* eslint-disable default-case */
import { combineReducers } from 'redux'
import produce from "immer";

import {
    RECEIVE_FILM_DETAILS,
    RECEIVE_FILM_TMDB,
    RECEIVE_IS_IN_WATCHED,
} from '../constants/ActionTypes';

const initFilmDataState = {
    title: "",
    genre: [],
    tmdbId: "",
    isInWatched: false,
    loaded: false,
}

const filmData = (state = initFilmDataState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case RECEIVE_FILM_DETAILS:
                draft.title = action.filmData.title;
                draft.genre = action.filmData.genre;
                draft.tmdbId = action.filmData.tmdb;
                draft.loaded = action.loaded;
                break;
            case RECEIVE_IS_IN_WATCHED:
                draft.isInWatched = isInWatched(draft.isInWatched, action);
                break;
        }
    })


const initTmdbDataState = {
    vote_average: "",
    release_date: "",
    runtime: "",
    overview: "",
    poster_path: "",
    loaded: false,
}

const tmdbData = (state = initTmdbDataState, action) =>
    produce(state, draft => {
        switch(action.type) {
            case RECEIVE_FILM_TMDB:
                draft.vote_average = action.tmdbData.vote_average;
                draft.release_date = action.tmdbData.release_date;
                draft.runtime = action.tmdbData.runtime;
                draft.overview = action.tmdbData.overview;
                draft.poster_path = action.tmdbData.poster_path;
                draft.loaded = action.loaded;
                break;
        }
    })


const isInWatched = (state, action) => {
    switch(action.type) {
        case RECEIVE_IS_IN_WATCHED:
            return action.isInWatched;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    filmData,
    tmdbData,
})

export default rootReducer;
