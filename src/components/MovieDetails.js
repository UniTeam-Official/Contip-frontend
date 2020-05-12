import React, { Component } from "react";


class MovieDetails extends Component {
    render() {
        return (
            <div className="content">
                {/*<h3> Description: </h3>
                <p>{this.props.desc}</p>*/}
                <h3> Genres: </h3>
                <p>{this.props.genre}</p>
            </div>
        );
    }
}

export default MovieDetails;
