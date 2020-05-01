import React, { Component } from "react";
import AccordionHeader from "./AccordionHeader";
import Checkbox from "./Checkbox";
import history from './history';

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            filterOptions: [],
            sortingOptions: [],
            signalFilterOff: false,
            signalSortingOff: false,
            writableAsc: true,
            writableDesc: true,
        };
    }

    componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
        fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/genre/list/", options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    this.props.history.push("/login");
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

    handleCheckbox(option, checkState) {
        let filterOptions = this.state.filterOptions;
        let sortingOptions = this.state.sortingOptions;
        let signalFilterOff = false;
        let signalSortingOff = false;
        let genreList = this.state.data;

        console.log(`option: ${ option }`);
        console.log(`checkState: ${ checkState }`);

        if (~option.indexOf("sorting")) {
            if (checkState) {
                sortingOptions.push(option);

                signalSortingOff = false;
            } else {
                let optionIndexUnchecked = sortingOptions.indexOf(option);
                if (~optionIndexUnchecked) {
                    sortingOptions.splice(optionIndexUnchecked, 1);
                }

                signalSortingOff = true;
            }
        } else {
            if (checkState) {
                filterOptions.push(option);

                signalFilterOff = false;
            } else {
                let optionIndexUnchecked = filterOptions.indexOf(option);
                if (~optionIndexUnchecked) {
                    filterOptions.splice(optionIndexUnchecked, 1);
                }

                signalFilterOff = true;
            }
        }

        console.log(`filterOptions: ${ filterOptions }`);
        console.log(`sortingOptions: ${ sortingOptions }`);

        this.setState({
            filterOptions: filterOptions,
            sortingOptions: sortingOptions,
            signalFilter: signalFilterOff,
            signalSorting: signalSortingOff,
        });

        this.props.handleFilterQuery(
            filterOptions,
            sortingOptions,
            signalFilterOff,
            signalSortingOff,
            genreList
        );
    }

	render() {
		if (this.props.accordionHeader === "genres") {
            return (
                <div>
                    <div className="accordion-btn .active opened active">
                        {(() => {
                            if (this.props.className === "accordion-content content-sidebar") {
                                return (<AccordionHeader className="filters-title filters-title-sidebar" accordionName="Genres" />);
                            } else {
                                return (<AccordionHeader className="filters-title" accordionName="Genres" />);
                            }
                        })()}
                    </div>
                    <div className="panel" style={{ maxHeight: "1200px" }}>
                        <div className={ this.props.className }>
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            {this.state.data.map(genre => {
                                                let genre_name = this.props.namePrefix + "Filter" + genre.id;
                                                return (
                                                    <li id="check-box" className="list-item">
                                                        <Checkbox 
                                                            name={ genre_name }
                                                            text={ genre.name }
                                                            checked="false"
                                                            writable={ true }
                                                            closed={ this.props.closedChipID == genre.id }
                                                            handleCheckbox={ this.handleCheckbox.bind(this) } />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="accordion-btn .active">
                        {(() => {
                            if (this.props.className === "accordion-content content-sidebar") {
                                return (<AccordionHeader className="filters-title filters-title-sidebar" accordionName="Sorting" />);
                            } else {
                                return (<AccordionHeader className="filters-title" accordionName="Sorting" />);
                            }
                        })()}
                    </div>
                    <div className="panel">
                        <div className={ this.props.className }>
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            {(() => {
                                                let sortingName = this.props.namePrefix + "Ascending";
                                                return(
                                                    <li id="check-box" className="list-item">
                                                        <Checkbox name={ sortingName } text="Alphabetical (A-Z)" checked="false" writable={ this.state.writableAsc } handleCheckbox={ this.handleCheckbox.bind(this) } />
                                                    </li>
                                                );
                                            })()}
                                            {(() => {
                                                let sortingName = this.props.namePrefix + "Descending";
                                                return(
                                                    <li id="check-box" className="list-item">
                                                        <Checkbox name={ sortingName } text="Alphabetical (Z-A)" checked="false" writable={ this.state.writableDesc } handleCheckbox={ this.handleCheckbox.bind(this) } />
                                                    </li>
                                                );
                                            })()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default Accordion;
