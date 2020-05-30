import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecommendPage from "./components/film/RecommendPage";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/profile/ProfilePage";
import WatchedFilmsPage from "./components/film/WatchedFilmsPage";
import SearchPage from "./components/search/SearchPage";
import SignUpPage from "./components/auth/SignUpPage";
import FilmDetails from "./components/film/FilmDetails";
import "./assets/css/main.css";
import history from './history';

class App extends Component {
    render() {
        return (
            <Router history={ history }>
                <Route path="/login/" component={ LoginPage } />
                <Route path="/signup/" component={ SignUpPage } />
                <Route path="/profile/" component={ ProfilePage } />
                <Route exact path="/" component={ RecommendPage } />
                <Route path="/watched/" component={ WatchedFilmsPage } />
                <Route path="/search/" component={ SearchPage } />
                <Route path="/film/:id" component={ FilmDetails } />
            </Router>
        );
    }
}

export default App;
