import React, { Component } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import Footer from "./Footer";

class WatchedMovies extends Component {
  render() {
    return (
	<div>
	    <Header />
	    <MovieList />
	    <Footer />
	</div>
    );
  }
}

export default ProfilePage;
