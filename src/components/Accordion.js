import React, { Component } from "react";
import AccordionHeader from "./AccordionHeader";
import Checkbox from "./Checkbox";

import host from '../config';


let FILTERS = [];
const SORTING = ["title", "-title"];

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genreList: [],
            loaded: false,
            placeholder: "Loading",

            filters: FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),

            sorting: SORTING.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),
        };
    }

    async componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }

        const response = await fetch(`${ host }api/v1/app/genre/list/`, options);

        if (response.status > 400) {
            this.props.history.push("/login");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const genreList = await response.json();
        
        FILTERS = Array.from(genreList.map(genre => genre.id));

        this.setState(() => {
            return {
                genreList,
                loaded: true
            };
        });
    }

    handleFiltersChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            filters: {
              ...prevState.filters,
              [name]: !prevState.filters[name],
            },
        }));

        this.props.createFiltersList(this.handleFiltersList.bind(this));
    };

    handleSortingChange = changeEvent => {
        const { name } = changeEvent.target;
        const mustBeUnchecked = Object
            .keys(this.state.sorting)
            .filter(option => name !== option);

        this.setState(prevState => ({
            sorting: {
              ...prevState.sorting,
              [name]: !prevState.sorting[name],
              [mustBeUnchecked]: false,
            },
        }));

        this.props.createSortingList(this.handleSortingList.bind(this));
    }

    handleFiltersList() {
        const checkedFilters = (Object
            .keys(this.state.filters)
            .filter(option => this.state.filters[option])
        );
        
        this.props.formFilterQuery(checkedFilters);
    };

    handleSortingList() {
        const checkedSorting = (Object
            .keys(this.state.sorting)
            .filter(option => this.state.sorting[option])
        );
        
        this.props.formSortingQuery(checkedSorting);
    }

	render() {
        let accordionHeader = <span></span>;
        let checkboxList = <span></span>;

        const { accordionList } = this.props;
        const accordions = accordionList.map(accordion => {
            if (accordion.accordionHeader === "genres") {
                if (accordion.className === "accordion-content content-sidebar") {
                    accordionHeader = <AccordionHeader className="filters-title filters-title-sidebar" accordionName="Genres" />;
                } else {
                    accordionHeader = <AccordionHeader className="filters-title" accordionName="Genres" />;
                }
    
                checkboxList = (
                    <ul className="list">
                        {this.state.genreList.map(genre => {
                            const id = accordion.namePrefix + "Filter" + genre.id;
                            return (
                                <li id="check-box" className="list-item" key={ id }>
                                    <Checkbox
                                        id={ id }
                                        name={ genre.id }
                                        text={ genre.name }
                                        isSelected={ this.state.filters[genre.id] }
                                        onCheckboxChange={ this.handleFiltersChange } />
                                </li>
                            );
                        })}
                    </ul>
                );             
            } else {
                if (accordion.className === "accordion-content content-sidebar") {
                    accordionHeader = <AccordionHeader className="filters-title filters-title-sidebar" accordionName="Sorting" />;
                } else {
                    accordionHeader = <AccordionHeader className="filters-title" accordionName="Sorting" />;
                }
    
                checkboxList = (
                    <ul className="list">
                        {(() => {
                            const sortingName = accordion.namePrefix + "Ascending";
                            return(
                                <li id="check-box" className="list-item" key={ sortingName }>
                                    <Checkbox
                                        id={ sortingName }
                                        name="title"
                                        text="Alphabetical (A-Z)"
                                        isSelected={ this.state.sorting["title"] }
                                        onCheckboxChange={ this.handleSortingChange } />
                                </li>
                            );
                        })()}
                        {(() => {
                            const sortingName = accordion.namePrefix + "Descending";
                            return(
                                <li id="check-box" className="list-item" key={ sortingName }>
                                    <Checkbox
                                        id={ sortingName }
                                        name="-title"
                                        text="Alphabetical (Z-A)"
                                        isSelected={ this.state.sorting["-title"] }
                                        onCheckboxChange={ this.handleSortingChange } />
                                </li>
                            );
                        })()}
                    </ul>
                );
            }

            return (
                <div key={ accordion.namePrefix }>
                    <div className="accordion-btn .active opened active">
                        { accordionHeader }
                    </div>
                    <div className="panel" style={{ maxHeight: "1200px" }}>
                        <div className={ accordion.className }>
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        { checkboxList }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        

		return accordions;
	}
}

export default Accordion;
