import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import WatchedMoviesPage from "./components/WatchedMoviesPage";
import SearchPage from "./components/SearchPage";
import SignUpPage from "./components/SignUpPage";
import FilmPage from "./components/FilmPage";
import "./assets/css/main.css";
import history from './components/history';

class App extends Component {
    render() {
        return (
            <Router history={ history }>
                <Route path="/login/" component={ LoginPage } />
                <Route path="/signup/" component={ SignUpPage } />
                <Route path="/profile/" component={ ProfilePage } />
                <Route exact path="/" component={ MainPage } />
                <Route path="/watched/" component={ WatchedMoviesPage } />
                <Route path="/search/" component={ SearchPage } />
                <Route path="/film/:id" component={ FilmPage } />
            </Router>
        );
    }
}

export default App;
