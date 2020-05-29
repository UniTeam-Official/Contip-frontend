import React from "react";

const AccordionHeader = ({ className, accordionName }) => {
	return (
        <header className="accordion-header">
            <div>
                <div className={ className } >{ accordionName }</div>
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

export default AccordionHeader;
