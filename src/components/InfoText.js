
import React, { Component } from "react";
import { render } from "react-dom";

class InfoText extends Component {
  render() {
    return (
      <div>
        <p>Username: {this.props.username} </p>
        <p>Email: {this.props.email} </p>
        <p>Full name: {this.props.fullname} </p>
        <p>Last login: {this.props.lastlogin} </p>
      </div>
    );
  }
}

export default InfoText;
