import React, { Component } from "react";

class AccordionHeader extends Component {
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
