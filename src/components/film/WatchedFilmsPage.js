import React from "react";
import Header from "../layout/header/Header";
import WatchedFilmList from "../film/WatchedFilmList";
import Footer from "../layout/footer/Footer";


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
