/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchHeader from "./SearchHeader";
import SearchTiles from "./SearchTiles";
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
                    <a className="closebtn" href="" onClick={closeSidebar}>×</a>
                    <div className="accordion">
                        <Accordion className="accordion-content content-sidebar" accordionHeader="genres" namePrefix="sidebarGenres" />
                        <Accordion className="accordion-content content-sidebar" accordionHeader="sorting" namePrefix="sidebarSorting" />
                    </div>
                </div>
				<Header />
				<div id="main">
                    <div className="inner">
                        <SearchHeader />
                        <div className="sections-double">
                            <div id="filters" className="filters-section">
                                <div id="filter-box" className="accordion">
                                    <Accordion className="accordion-content" accordionHeader="genres" namePrefix="genres" />
                                    <Accordion className="accordion-content" accordionHeader="sorting" namePrefix="sorting" />
                                </div>
                            </div>
                            <SearchTiles />
                        </div>
                    </div>
                </div>
				<Footer />
			</div>
        );
    }
    
}

export default SearchPage;
