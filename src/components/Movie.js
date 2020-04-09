import React, { Component } from "react";
import MovieTitle from "./MovieTitle";
import MovieDetails from "./MovieDetails";
import MovieImageButton from "./MovieImageButton";

class Movie extends Component {
  render() {
    return (
      <article id="film square" class="style1">
        <MovieImageButton />
        <a href="film_page.html">
          <MovieTitle />
          <MovieDetails name="fuck you"/>
        </a>
      </article>
    );
  }
}

export default Movie;
