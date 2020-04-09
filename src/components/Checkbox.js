import React, { Component } from "react";
import { render } from "react-dom";

class Checkbox extends Component {
  render() {
    return (
	<div>
	  <input id="checkbox" type="checkbox" name="genre1" />
	  <label for="genre1">First Genre</label>
	</div>
    );
  }
}

export default Checkbox;
