import React, { Component } from "react";
import RecommendationHeader from "./RecommendationHeader";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";

class Main extends Component {
  render() {
    return (
      <div class="inner">
        <Header />
        <RecommendationHeader />
        <MovieList />
        <Footer />
      </div>
    );
  }
}

export default Main;