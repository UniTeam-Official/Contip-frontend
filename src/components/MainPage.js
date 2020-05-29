import React from "react";
import Headline from "./Headline";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";


const MainPage = ({ history }) => {
    return (
        <div id="wrapper">
            <Header />
            <div id="main">
                <div className="inner">
                    <Headline
                        heading = "Specially For You..."
                        subheading = "...we sat down and watched thousands of movies, just to find six special ones that you should definitely check out this week" />
                    <MovieList history={ history } />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
