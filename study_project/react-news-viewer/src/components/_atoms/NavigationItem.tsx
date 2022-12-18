import { NavLink } from "react-router-dom";
import { INaviData } from "../../interface/Navi.interface";

const NavigationItem = ({ path, menuName }: INaviData) => {
    return <NavLink to={path} aria-activedescendant="active" className="navi-item m-2 p-1 text-xl text-white hover:text-amber-300">{menuName}</NavLink>
};

export default NavigationItem;
