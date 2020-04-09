import React, { Component } from "react";
import { render } from "react-dom";

class MovieImageButton extends Component {
  render() {
    return (
      <span class="image">
        <img src="images/pic01.jpg" alt="" />
      </span>
    );
  }
}

export default MovieImageButton;