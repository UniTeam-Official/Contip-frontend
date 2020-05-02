/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchHeader from "./SearchHeader";
import SearchTiles from "./SearchTiles";
import Accordion from "./Accordion";
import { closeSidebar } from "../assets/js/sidebar";
import { accordionButtonListener } from "../assets/js/accordion";
import history from './history';

class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          filterQuery: [],
          sortingQuery: [],
      };
  }

  componentDidMount() {
      accordionButtonListener();
  }

  deleteExtraOption(item, arr) {
      if (Array.isArray(arr)) {
          let extraOption = arr.indexOf(item);

          if (~extraOption) {
              arr.splice(extraOption, 1);
          }
      }

      return arr;
  }

  deleteExtraSortings(item, sortingQuery, sortingOptions) {
      let extraOption;
      if (~item.indexOf("-title")) {
          extraOption = sortingOptions.indexOf("Descending");
      } else {
          extraOption = sortingOptions.indexOf("Ascending");
      }

      if (!(~extraOption)) {
          sortingQuery.splice(sortingQuery.indexOf(item), 1);
      }

      return sortingQuery;
  }

  handleFilterQuery(filterOptions, sortingOptions, signalFilterOff, signalSortingOff) {
      let filterQuery = this.state.filterQuery;
      let sortingQuery = this.state.sortingQuery;

      // sorting options cleaning (NOTE: if you can rewrite this shit, do it better)
      if ((sortingOptions.length > 0 && filterOptions.length === 0)
          || (signalSortingOff)) {
          // *screams internally*
          sortingQuery.forEach((item) => {
              sortingQuery = this.deleteExtraSortings(item, sortingQuery, sortingOptions);
              sortingQuery = this.deleteExtraSortings(item, sortingQuery, sortingOptions);
          });
      }

      // form filter query
      filterOptions.forEach((item) => {
          filterQuery = this.deleteExtraOption(item, filterQuery);
          filterQuery.push(item);
      });

      // form sorting query
      sortingOptions.forEach((item) => {
          if (~item.indexOf("Ascending")) {
              sortingQuery = this.deleteExtraOption("title", sortingQuery);
              sortingQuery.push("title");
          } else {
              sortingQuery = this.deleteExtraOption("-title", sortingQuery);
              sortingQuery.push("-title");
          }
      });

      // filter options cleaning (NOTE: if you can rewrite this shit, do it better)
      if ((sortingOptions.length === 0 && filterOptions.length > 0)
          || (sortingOptions.length > 0 && filterOptions.length > 0)
          || signalFilterOff) {
          filterQuery.forEach((item) => {
              let extraOption = filterOptions.indexOf(item);

              if (!(~extraOption)) {
                  filterQuery.splice(filterQuery.indexOf(item), 1);
              }
          });
      }

      console.log(`filterQuery: ${ filterQuery }`);
      console.log(`sortingQuery: ${ sortingQuery }`);
      console.log("-------------------------");

      this.setState({
          filterQuery: filterQuery,
          sortingQuery: sortingQuery,
      })
  }

	render() {
		return (
			<div id="wrapper">
                <div id="filterSidebar" className="filter-sidebar">
                    <a className="closebtn" href="" onClick={ closeSidebar }>×</a>
                    <div className="accordion">
                      <Accordion className="accordion-content content-sidebar"
                          accordionHeader="genres"
                          namePrefix="sidebarGenres"
                          history={this.props.history}
                          handleFilterQuery={ this.handleFilterQuery.bind(this) } />
                      <Accordion className="accordion-content content-sidebar"
                        accordionHeader="sorting"
                        namePrefix="sidebarSorting"
                         history={this.props.history}
                        handleFilterQuery={ this.handleFilterQuery.bind(this) } />
                    </div>
                </div>
				<Header />
				<div id="main">
                    <div className="inner">
                        <SearchHeader />
                        <div className="sections-double">
                            <div id="filters" className="filters-section">
                                <div id="filter-box" className="accordion">
                                  <Accordion className="accordion-content"
                                      accordionHeader="genres"
                                      namePrefix="genres"
                                      history={this.props.history}
                                      handleFilterQuery={ this.handleFilterQuery.bind(this) } />
                                  <Accordion className="accordion-content"
                                    accordionHeader="sorting"
                                    namePrefix="sorting"
                                    history={this.props.history}
                                    handleFilterQuery={ this.handleFilterQuery.bind(this) } />
                                </div>
                            </div>
                            <SearchTiles filterQuery={ `genre=[${ [...this.state.filterQuery] }]` } sortingQuery={ `ordering=${ this.state.sortingQuery }` } />
                        </div>
                    </div>
                </div>
				<Footer />
			</div>
        );
    }

}

export default SearchPage;
