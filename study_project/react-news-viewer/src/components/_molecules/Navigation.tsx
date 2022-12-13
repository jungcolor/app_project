import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul className="flex items-center">
                <li className="mr-3">
                    <Link to="/">전체보기</Link>
                </li>
                <li className="mr-3">
                    <Link to="/business">비즈니스</Link>
                </li>
                <li className="mr-3">
                    <Link to="/entertainment">엔터테인먼트</Link>
                </li>
                <li className="mr-3">
                    <Link to="/health">건강</Link>
                </li>
                <li className="mr-3">
                    <Link to="/science">과학</Link>
                </li>
                <li className="mr-3">
                    <Link to="/sports">스포츠</Link>
                </li>
                <li>
                    <Link to="/technology">기술</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
