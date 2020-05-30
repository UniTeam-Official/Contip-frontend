import React from "react";
import logo from "../../../images/logo_own.png";

const TitleIcon = ({ className }) => {
    return (
        <a href="/" className={ className }>
            <span className="symbol"><img src={ logo } alt="" /></span><span className="title">ConTip</span>
        </a>
    );
}

export default TitleIcon;