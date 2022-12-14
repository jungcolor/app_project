import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul className="flex items-center">
                <li className="mr-3">
                    <NavLink to="/" aria-activedescendant="active">
                        전체보기
                    </NavLink>
                </li>
                <li className="mr-3">
                    <NavLink to="/business" aria-activedescendant="active">
                        비즈니스
                    </NavLink>
                </li>
                <li className="mr-3">
                    <NavLink to="/entertainment" aria-activedescendant="active">
                        엔터테인먼트
                    </NavLink>
                </li>
                <li className="mr-3">
                    <NavLink to="/health" aria-activedescendant="active">
                        건강
                    </NavLink>
                </li>
                <li className="mr-3">
                    <NavLink to="/science" aria-activedescendant="active">
                        과학
                    </NavLink>
                </li>
                <li className="mr-3">
                    <NavLink to="/sports" aria-activedescendant="active">
                        스포츠
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/technology" aria-activedescendant="active">
                        기술
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
