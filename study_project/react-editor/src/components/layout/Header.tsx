import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/postWrite">글 작성</NavLink>
            </nav>
        </header>
    );
};

export default Header;
