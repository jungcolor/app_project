import React from "react";
import { INaviData, INaviDatas } from "../../interface/Navi.interface";
import NavigationItem from "../_atoms/NavigationItem";

const Navigation = ({ naviDatas }: INaviDatas) => {
    return (
        <nav>
            <ul className="flex items-center">
                {naviDatas?.map((naviData: INaviData, idx: number) => {
                    const { path, menuName } = naviData;

                    return (
                        <li key={idx} className="mr-3">
                            <NavigationItem path={path} menuName={menuName} />
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
