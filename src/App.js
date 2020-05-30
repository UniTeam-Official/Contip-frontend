import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecommendPage from "./components/RecommendPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import WatchedFilmsPage from "./components/WatchedFilmsPage";
import SearchPage from "./components/SearchPage";
import SignUpPage from "./components/SignUpPage";
import FilmPage from "./components/FilmPage";
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
                <Route path="/film/:id" component={ FilmPage } />
            </Router>
        );
    }
}

export default App;
