import React, { Component } from "react";

class RecommendationFilm extends Component {
	render() {
        return(
            <article class="style1">
                <span class="image">
                    <img src={this.props.image} alt="" />
                </span>
                <a href="/">
                    <h2>{this.props.title}</h2>
                    <div class="content">
                        <p>Genre: {this.props.genre}<br />Year: {this.props.year}</p>
                    </div>
                </a>
            </article>
        );
    }
}
export default RecommendationFilm;
