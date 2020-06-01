import React from "react";
import logo from "../../../images/logo_own.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const TitleIcon = ({ className }) => {
    return (
        <Link to='/' className={ className }>
            <span className="symbol"><img src={ logo } alt="" /></span><span className="title">ConTip</span>
        </Link>
    );
}

export default TitleIcon;