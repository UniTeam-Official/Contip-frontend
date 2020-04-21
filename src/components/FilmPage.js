import React, { Component } from "react";

class FilmPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		};
	}

	componentDidMount() {
		const token = localStorage.getItem('jwt');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${token}`
			}
		}
		fetch(`http://yyr3ll.pythonanywhere.com/api/v1/app/film/detail/${this.props.match.params.id}`, options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState(() => {
					return {
						data,
						loaded: true
					};
				});
			});
	}

    render(){
        console.log(this.state.data);
        let movie = <div className="inner">
                        <h1 id="main-film-title">TITLE</h1>
                        <span id="main-film-image" className="image main"><img src="image" alt="IMAGE" /></span>
                        <a href='/'>IMDB Link</a>
                        <h3>Film description:</h3>
                        <p id="film-description">DESCRIPTION</p>
                    </div>
        if(this.state && this.state.data) {
            movie = <div className="inner">
                        <h1 id="main-film-title">{this.state.data.title}</h1>
                        <span id="main-film-image" className="image main"><img src={this.state.data.image} alt="GET IMAGE FROM IMDB" /></span>
                        <a href={`https://www.imdb.com/title/tt0${this.state.data.imdb}`}>IMDB Link</a>
                        <h3>Film description:</h3>
                        <p id="film-description">GET DESCRIPTION FROM IMDB</p>
                    </div>
        }
        return(
            <div id="main">
                {movie}
            </div>
        )
    }
}

export default FilmPage;
