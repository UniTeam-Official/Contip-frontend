import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
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
				<Route exact path="/" component={Main} />
				<Route path="/watched/" component={WatchedMoviesPage} />
				<Route path="/profile/" component={ProfilePage} />
			</Router>
		);
	}
}

export default App;
