import React, { Component } from "react";
import Header from "./Header";
import WatchedMovieList from "./WatchedMovieList";
import Footer from "./Footer";
import history from './history';

class WatchedMoviesPage extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<WatchedMovieList  history={this.props.history}/>
				<Footer />
			</div>
		);
	}
}

export default WatchedMoviesPage;
