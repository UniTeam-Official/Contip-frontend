import React from "react";


const Headline = ({ heading, subheading }) => {
    return (
        <header>
            <h1>{ heading }</h1>
            <p><strong>{ subheading }</strong></p>
        </header>
    );
}

export default Headline;
