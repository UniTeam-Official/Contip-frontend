import React from "react";
import Header from "./Header";
import WatchedFilmList from "./WatchedFilmList";
import Footer from "./Footer";


const WatchedFilmsPage = ({ history }) => {
    return (
        <div id="wrapper">
            <Header />
            <WatchedFilmList history={ history } />
            <Footer />
        </div>
    );
}

export default WatchedFilmsPage;
