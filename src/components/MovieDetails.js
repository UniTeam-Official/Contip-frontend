
import React, { Component } from "react";
import { render } from "react-dom";

class MovieDetails extends Component {
  render() {
    return (
      <div class="content">
        <p>*{this.props.name}*<br />
          *Year*</p>
      </div>
    );
  }
}

export default MovieDetails;
