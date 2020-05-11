import React, { Component } from "react";

const STYLES = ["style1", "style2", "style3", "style4", "style5", "style6"];

class RecommendationFilm extends Component {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	render() {
        return(
            <article className={ STYLES[this.getRandomInt(0, 5)] }>
                <span className="image">
                    <img src={ this.props.image } alt="" />
                </span>
                <a href={ this.props.href }>
                    <h2>{ this.props.title }</h2>
                    <div className="content">
                        <p>Genre: { this.props.genre }</p>
                    </div>
                </a>
            </article>
        );
    }
}
export default RecommendationFilm;
