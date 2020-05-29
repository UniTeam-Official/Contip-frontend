import React from "react";


const MovieImageButton = ({ image, alt }) => {
	return (
		<span className="image left">
			<img src={ image } alt={ alt } />
		</span>
	);
}

export default MovieImageButton;