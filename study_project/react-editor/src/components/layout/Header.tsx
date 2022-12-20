import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">HOME</Link>
                <Link to="/postWrite">글 작성</Link>
            </nav>
        </header>
    );
};

export default Header;