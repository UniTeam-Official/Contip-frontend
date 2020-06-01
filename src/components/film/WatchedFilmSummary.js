import React, { Component } from "react";
import RateButton from "../button/RateButton";
import TextInputField from "../input/TextInputField";


class WatchedFilmSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			film_rating: "",
			tmdb: [],
			loaded_tmdb: false,

			ratingInputList: [
				{
                    type: "text",
                    name: `rating${ this.props.film_id }`,
                    id: `rating${ this.props.film_id }`,
                    value: this.film_rating,
                    onChange: this.handleRatingChange,
                    placeholder: "0-100 points",
                },
			],
		};
	}

    handleRatingChange = event => {
        this.setState({
            film_rating: event.target.value
        });
	}
	
	async loadTMDB() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/${ this.props.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options);
        console.log(response);

        if (response.status > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const tmdb = await response.json();
        console.log(tmdb);

        this.setState(() => {
            return {
                tmdb,
                loaded_tmdb: true
            };
        });
    }

	render() {
		let overview = <span></span>

		if (!this.state.loaded_tmdb) {
			this.loadTMDB();
		} else {
			overview = this.state.tmdb.overview;

			return (
				<div className="col-xs-6">
					<article id="film square" className="title-card">
						<div className="col-xs-4">
							<div className="watchlist-row">
								<a className="no-border-btm" href={ this.props.link }>
									<div className="title-poster no-radius-right">
										<img className="title-poster-img" src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.props.title }/>
									</div>
								</a>
							</div>
						</div>
						<div className="col-xs-8 title-card-content">
							<div className="title-card-content-title">
								<a className="no-border-btm" href={ this.props.link }>
									{ this.props.title }
								</a>
							</div>
							<p className="title-card-content-description">
								{ overview }
							</p>
							<div className="title-card-content-bottom">
								<div id="text-input-field" className="col-6 col-12-xsmall rating-input-field">
									<TextInputField textInputList={ this.state.ratingInputList } />
								</div>
								<div className="col-12">
									<ul className="actions">
										<RateButton film_id={ this.props.film_id } film_rating={ this.state.film_rating } className="rating-button" />
									</ul>
								</div>
							</div>
						</div>
					</article>
				</div>
			);
		}

		return null;
	}
}

export default WatchedFilmSummary;