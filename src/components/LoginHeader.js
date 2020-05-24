import React from "react";
import TitleIcon from "./TitleIcon";


const LoginHeader = () => {
    return (
        <header id="header" className="no-padding-side">
            <div className="inner">
                <TitleIcon className="logo no-margin-side"/>
            </div>
        </header>
    );
}

export default LoginHeader;

