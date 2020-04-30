import React, { Component } from "react";
import { openSidebar } from "../assets/js/sidebar";
import RecommendationFilm from "./RecommendationFilm";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class SearchTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
			options: {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('jwt access')}`
				}
			},
			data: [],
			loaded: false,
			placeholder: "Loading",
			search: "",
    };
	}
	async fetchFilmsDecorator(url, options) {

		// Trying to make a request for the server
		const response = await fetch(url, options);
		let data = undefined;
	
		if (response.status > 400) {
			this.setState(() => {
				return { placeholder: "Something went wrong!" };
			});
		} else {
			data = await response.json();
		}
	
		this.setState(() => {
			return {
				data,
				loaded: true,
			}
		});
	}

	componentWillMount() {
		this.timer = null;
	}

  componentDidMount() {
		this.fetchFilmsDecorator("http://yyr3ll.pythonanywhere.com/api/v1/app/film/list/", this.state.options);
	}

	handleChange(event) {
		clearTimeout(this.timer);

		this.setState({ search: event.target.value.substr(0, 32) });

		this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
	}

	triggerChange() {
		const { search } = this.state.search;
		this.updateResults();
		this.setState({ search });
	}

	handleKeyDown(e) {
		if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
			this.triggerChange();
    }
	}	

	updateResults() {
		this.fetchFilmsDecorator("http://yyr3ll.pythonanywhere.com/api/v1/app/film/list/?search=" + this.state.search, this.state.options);
	}

	render() {
    let filteredFilms = <span></span>;
		if (this.state && typeof(this.state.data.results) != 'undefined' && this.state.data.results.length > 0) {
			filteredFilms = this.state.data.results.map(film => {
				return (
					<RecommendationFilm href={`/film/${film.id}`} title={film.title} image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre={film.genre.map(genre => {return(genre.name + '  ')})} />
				);
			})
		}
		return (
      <section className="tiles-section">
        <div className="controls">
          <form>
            <div id="search_bar" className="search-container">
              <div className="search">
                <i className="fa fa-filter openbtn" onClick={openSidebar} style={{fontSize:"16px"}}></i>
                <button id="search_button" className="search-btn" type="button">
                    <i className="fa fa-search"></i>
                </button>
                <span id="search_searched_count" className="search-searched-count">142 results</span>
                <input type="text" className="search-input"
									value={this.state.value}
									onChange={this.handleChange.bind(this)}
									onKeyDown={this.handleKeyDown.bind(this)}></input>
              </div>
            </div>
          </form>
        </div>
        <section className="tiles">
          {filteredFilms}
        </section>
      </section>
		);
	}
}

export default SearchTiles;