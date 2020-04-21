import React, { Component } from "react";
import RecommendationHeader from "./RecommendationHeader";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";

class MainPage extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<div id="main">
					<div className="inner">
						<RecommendationHeader />
						<MovieList />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default MainPage;
