import React from "react";
import { NavLink } from "react-router-dom";
import { INaviData } from "../../interface/Navi.interface";

const NavigationItem = ({ path, menuName }: INaviData) => {
    return <NavLink to={path} aria-activedescendant="active">{menuName}</NavLink>;
};

export default NavigationItem;
