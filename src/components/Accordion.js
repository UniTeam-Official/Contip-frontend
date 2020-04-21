import React, { Component } from "react";
import AccordionHeader from "./AccordionHeader";
import Checkbox from "./Checkbox";

class Accordion extends Component {
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
        fetch("http://yyr3ll.pythonanywhere.com/api/v1/app/genre/list/", options)
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

	render() {
		if (this.props.accordionHeader === "genres") {
            return (
                <div>
                    <div className="accordion-btn .active">
                        <AccordionHeader accordionName="Genres" />
                    </div>
                    <div className="panel">
                        <div className="accordion-content">
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            {this.state.data.map(genre => {
                                                let genre_name = "genre" + genre.id;
                                                return (
                                                    <li id="check-box" className="list-item">
                                                        <Checkbox name={genre_name} text={genre.name} checked="false" />
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
                        <AccordionHeader accordionName="Sorting" />
                    </div>
                    <div className="panel">
                        <div className="accordion-content">
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            <li id="check-box" className="list-item">
                                                <Checkbox name="A-Z" text="Alphabetical (A-Z)" checked="false" />
                                            </li>
                                            <li id="check-box" className="list-item">
                                                <Checkbox name="Z-A" text="Alphabetical (Z-A)" checked="false" />
                                            </li>
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