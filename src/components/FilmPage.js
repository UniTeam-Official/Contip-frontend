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
        if(this.state.data.length > 0) {
            return(
                <div id="main">
                    <div className="inner">
                        <h1 id="main-film-title">{this.state.data.results.title}</h1>
                        <span id="main-film-image" className="image main"><img src={this.state.data.results.image} alt="" /></span>
                        <a href={this.state.data.results.imdb}>IMDB Link</a>
                        <h3>Film description:</h3>
                        <p id="film-description">{this.state.data.results.description}</p>
                    </div>
                </div>
            )
        }
        return(
            <div id="main">
                <div className="inner">
                    <h1 id="main-film-title">TITLE</h1>
                    <span id="main-film-image" className="image main"><img src="image" alt="IMAGE" /></span>
                    <a href='/'>IMDB Link</a>
                    <h3>Film description:</h3>
                    <p id="film-description">DESCRIPTION</p>
                </div>
            </div>
        )
    }
}

export default FilmPage;
