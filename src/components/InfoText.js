
import React, { Component } from "react";
import { render } from "react-dom";

class InfoText extends Component {
  render() {
    return (
      <div>
      <p>Username: </p>
      <p>Email: </p>
      <p>Full name: </p>
      <p>Last login: </p>
      </div>
    );
  }
}

export default InfoText;
