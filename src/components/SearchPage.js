/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Headline from "./Headline";
import SearchTiles from "./SearchTiles";
import Accordion from "./Accordion";
import { closeSidebar } from "../assets/js/sidebar";
import { accordionButtonListener } from "../assets/js/accordion";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterQuery: [],
            sortingQuery: [],
            handleFiltersList: null,
            handleSortingList: null,

            filterList: [
                { 
                    className: "accordion-content",
                    accordionHeader: "genres",
                    namePrefix: "genres",
                    history: this.props.history,
                },

                { 
                    className: "accordion-content",
                    accordionHeader: "sorting",
                    namePrefix: "sorting",
                    history: this.props.history,
                },
            ],

            filterSidebarList: [
                {
                    className: "accordion-content content-sidebar",
                    accordionHeader: "genres",
                    namePrefix: "sidebarGenres",
                    history: this.props.history,
                },

                {
                    className: "accordion-content content-sidebar",
                    accordionHeader: "sorting",
                    namePrefix: "sidebarSorting",
                    history: this.props.history,
                },
            ],
        };
    }

    componentDidMount() {
        accordionButtonListener();
    }

    formFilterQuery(filterQuery) {
        this.setState({
            filterQuery,
        })
    }

    formSortingQuery(sortingQuery) {
        this.setState({
            sortingQuery,
        })
    }

    createFiltersList(handleFiltersList) {
        this.setState({
            handleFiltersList,
        })
    }

    createSortingList(handleSortingList) {
        this.setState({
            handleSortingList,
        })
    }

    render() {
        return (
            <div id="wrapper">
                <div id="filterSidebar" className="filter-sidebar">
                    <a className="closebtn" onClick={closeSidebar}>×</a>
                    <div className="accordion">
                        <Accordion 
                            accordionList={ this.state.filterSidebarList }
                            createFiltersList = { this.createFiltersList.bind(this) }
                            formFilterQuery = { this.formFilterQuery.bind(this) } />
                    </div>
                </div>
                <Header />
                <div id="main">
                    <div className="inner">
                        <Headline
                            heading = "Looking For Something?"
                            subheading = "Here you can look up something definitely special for your evening" />

                        <div className="sections-double">
                            <div id="filters" className="filters-section">
                                <div id="filter-box" className="accordion">
                                <Accordion 
                                    accordionList={ this.state.filterList }
                                    createFiltersList = { this.createFiltersList.bind(this) }
                                    formFilterQuery = { this.formFilterQuery.bind(this) } />
                                </div>
                            </div>

                            <SearchTiles
                                name="searchTiles"
                                filterQuery={`genre=[${[...this.state.filterQuery]}]`}
                                sortingQuery={`ordering=${this.state.sortingQuery}`}
                                handleFiltersList={ this.state.handleFiltersList }
                                handleSortingList={ this.state.handleSortingList } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

export default SearchPage;
