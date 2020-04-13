import React, { Component } from "react";
import Header from "./Header";
import WatchedMovieList from "./WatchedMovieList";
import Footer from "./Footer";

class WatchedMoviesPage extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<WatchedMovieList />
				<Footer />
			</div>
		);
	}
}

export default WatchedMoviesPage;
