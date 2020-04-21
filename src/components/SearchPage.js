import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchHeader from "./SearchHeader";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import Accordion from "./Accordion";
import { closeSidebar } from "../assets/js/sidebar";
import { accordionButtonListener } from "../assets/js/accordion";

class SearchPage extends Component {
    componentDidMount() {
        accordionButtonListener();
    }
    
	render() {
		return (
			<div id="wrapper">
                <div id="filterSidebar" className="filter-sidebar">
                    <a className="closebtn" href="javascript:void(0)" onClick={closeSidebar}>×</a>
                    <div className="accordion">
                        <Accordion accordionHeader="genres" />
                        <Accordion accordionHeader="sorting" />
                    </div>
                </div>
				<Header />
				<div id="main">
                    <div className="inner">
                        <SearchHeader />
                        <div className="sections-double">
                            <div id="filters" className="filters-section">
                                <div id="filter-box" className="accordion">
                                    <Accordion accordionHeader="genres" />
                                    <Accordion accordionHeader="sorting" />
                                </div>
                            </div>
                            <section className="tiles-section">
                                <div className="controls">
                                    <form>
                                        <SearchBar />
                                    </form>
                                </div>
                                <MovieList />
                            </section>
                        </div>
                    </div>
                </div>
				<Footer />
			</div>
        );
    }
    
}

export default SearchPage;
