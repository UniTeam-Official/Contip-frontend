import React, { Component } from "react";
import { openSidebar } from "../assets/js/sidebar";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

	render() {
		return (
			<div id="search_bar" className="search-container">
                <div className="search">
                    <i className="fa fa-filter openbtn" onClick={openSidebar} style={{fontSize:"16px"}}></i>
                    <button id="search_button" className="search-btn" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                    <span id="search_searched_count" className="search-searched-count">142 results</span>
                    <input className="search-input"></input>
                </div>
            </div>
		);
	}
}

export default SearchBar;