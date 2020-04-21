import React, { Component } from "react";

class FilmPage extends Component{
    render(){
        return(
            <div id="main">
				<div className="inner">
					<h1 id="main-film-title">Film name</h1>
					<span id="main-film-image" className="image main"><img src={this.props.image} alt="" /></span>
					<h3>Film description:</h3>
                    <p id="film-description">{this.props.description}</p>
				</div>
			</div>
        )
    }
}

export default FilmPage;
