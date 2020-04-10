
import React, { Component } from "react";
import { render } from "react-dom";

class MovieDetails extends Component {
  render() {
    return (
      <div class="content">
        <h3> Description: </h3>
        <p>{this.props.desc}</p>
        <h3> Year of release: </h3>
        <p>{this.props.year}</p>
      </div>
    );
  }
}

export default MovieDetails;
