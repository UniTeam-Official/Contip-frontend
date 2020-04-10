import React, { Component } from "react";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";

class MainPage extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default MainPage;