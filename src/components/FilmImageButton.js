import React from "react";


const FilmImageButton = ({ image, alt }) => {
	return (
		<span className="image left">
			<img src={ image } alt={ alt } />
		</span>
	);
}

export default FilmImageButton;