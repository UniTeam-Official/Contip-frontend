import React, { Component } from "react";

class AccordionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };

        this.accordionName = null;
    }

	render() {
		return (
			<header className="accordion-header">
                <div>
                    <div className="filters-title" >{this.props.accordionName}</div>
                </div>
                <span className="icon">
                    <div className="circle-plus closed">
                        <div className="circle">
                            <div className="horizontal"></div>
                            <div className="vertical"></div>
                        </div>
                    </div>
                </span>
            </header>
		);
	}
}

export default AccordionHeader;
