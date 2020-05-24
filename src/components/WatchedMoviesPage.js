import React from "react";
import Header from "./Header";
import WatchedMovieList from "./WatchedMovieList";
import Footer from "./Footer";


const WatchedMoviesPage = ({ history }) => {
    return (
        <div id="wrapper">
            <Header />
            <WatchedMovieList history={ history } />
            <Footer />
        </div>
    );
}

export default WatchedMoviesPage;
