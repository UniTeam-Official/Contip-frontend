import React from "react";
import SocMediaBar from "./SocMediaBar";
import SuggestForm from "./SuggestForm";
import Copyrights from "./Copyrights";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="inner">
                <SuggestForm />
                <SocMediaBar />
                <Copyrights />
            </div>
        </footer>
    );
}

export default Footer;