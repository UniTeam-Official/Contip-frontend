import React, { Component } from "react";


class RecommendationHeader extends Component {
    render() {
        const { heading, subheading } = this.props;

        return (
            <header>
                <h1>{ heading }</h1>
                <p><strong>{ subheading }</strong></p>
            </header>
            // <header>
            //     <h1>Specially For You...</h1>
            //     <p><strong>...we sat down and watched thousands of movies, just to find six special ones that you should definitely check out this week </strong></p>
            // </header>
            // <header>
            //     <h1>Looking For Something?</h1>
            //     <p><strong>Here you can look up something definitely special for your evening</strong></p>
            // </header>
        );
    }
}

export default RecommendationHeader;
