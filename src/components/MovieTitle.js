
import React, { Component } from "react";
import { render } from "react-dom";

class MovieTitle extends Component {
  render() {
    return (
      <h2>{this.props.title}</h2>
    );
  }
}

export default MovieTitle;