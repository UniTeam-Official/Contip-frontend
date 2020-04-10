import React, { Component } from "react";
import MovieTitle from "./MovieTitle";
import MovieDetails from "./MovieDetails";
import MovieImageButton from "./MovieImageButton";

class Movie extends Component {
  render() {
    return (
      <article id="film square" class="style1">
        <a href={this.props.link}>
          <MovieImageButton image={this.props.image} alt={this.props.title} />
          <MovieTitle title={this.props.title} />
          <MovieDetails year={this.props.year} desc={this.props.desc} />
        </a>
      </article>
    );
  }
}

export default Movie;
