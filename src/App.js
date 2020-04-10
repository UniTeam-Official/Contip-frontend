import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import WatchedMoviesPage from "./components/WatchedMoviesPage";
import "./assets/css/main.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login/" component={LoginPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route exact path="/" component={MainPage} />
        <Route path="/watched/" component={WatchedMoviesPage} />
      </Router>
    );
  }
}

export default App;
