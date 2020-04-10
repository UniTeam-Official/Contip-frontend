import React, { Component } from "react";
import { render } from "react-dom";

class MovieImageButton extends Component {
  render() {
    return (
      <span class="image left">
        <img src={this.props.image} alt={this.props.alt} />
      </span>
    );
  }
}

export default MovieImageButton;