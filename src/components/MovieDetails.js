import React from "react";


const MovieDetails = ({ genres }) => {
	return (
		<div className="content">
			{genres.map(genre => {
				return (
					<span>{ genre }</span>
				);			
			})}
		</div>
	);
}

export default MovieDetails;
