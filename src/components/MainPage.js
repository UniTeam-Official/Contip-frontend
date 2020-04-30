import React, { Component } from "react";
import RecommendationHeader from "./RecommendationHeader";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import history from './history';

class MainPage extends Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<div id="main">
					<div className="inner">
						<RecommendationHeader />
						<MovieList history={this.props.history}/>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default MainPage;
