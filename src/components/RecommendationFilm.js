import React, { Component } from "react";

class RecommendationFilm extends Component {
	render() {
        return(
            <article className="style1">
                <span className="image">
                    <img src={this.props.image} alt="" />
                </span>
                <a href={this.props.href}>
                    <h2>{this.props.title}</h2>
                    <div className="content">
                        <p>Genre: {this.props.genre}</p>
                    </div>
                </a>
            </article>
        );
    }
}
export default RecommendationFilm;
