import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header"; 
import Main from "./Main";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
//import "../../templates/frontend/assets/css/main.css";

class App extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      data: [],
//      loaded: false,
//      placeholder: "Loading"
//    };
//  }

//  componentDidMount() {
//    fetch("api/v1/app/film/list/")
//      .then(response => {
//        if (response.status > 400) {
//          return this.setState(() => {
//            return { placeholder: "Something went wrong!" };
//          });
//        }
//        return response.json();
//      })
//      .then(data => {
//        this.setState(() => {
//          return {
//            data,
//            loaded: true
//          };
//        });
//      });
//  }

  render() {
    return (
      <div>
         <Header />
         <Main />
         <Footer />
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
