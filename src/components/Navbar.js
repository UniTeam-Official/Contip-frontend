import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const Navbar = () => {
    return (
        <ul id="desktop_menu">
            <li id="desktop_navbarbutton"><Link to='/search'>Search</Link></li>
            <li id="desktop_navbarbutton"><Link to='/'>Recommendations</Link></li>
            <li id="desktop_navbarbutton"><Link to='/watched'>Watched Movies</Link></li>
            <li id="desktop_navbarbutton"><Link to='/profile'>Profile</Link></li>
        </ul>
    );
}

export default Navbar;
