import React, { Component } from "react";

import MovieTitle from "./MovieTitle";

class RecommendationFilm extends Component {
	render() {
        return(
            <article class="style1">
                <span class="image">
                    <img src={this.props.image} alt="" />
                </span>
                <a href="/">

                    <MovieTitle title={this.props.title}/>
                    <div class="content">
                        <p>Genre: {this.props.genre}<br />Year: {this.props.year}</p>
                    </div>
                </a>
            </article>
        );
    }
}
export default RecommendationFilm;
