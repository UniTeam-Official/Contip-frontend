import React, { Component } from "react";
import RecommendationHeader from "./RecommendationHeader";
import MovieList from "./MovieList";

class Main extends Component {
  render() {
    return (
      <div id = "main">
        <div class="inner">
          <RecommendationHeader />
          <MovieList />
        </div>
      </div>
    );
  }
}

export default Main;