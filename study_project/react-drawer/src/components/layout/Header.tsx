import React from "react";
import Title from "../component/Title";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

interface IHeader {
    toggle?: boolean;
    clickHandlerOpen: () => void;
}

function Header(props: IHeader) {
    const onClickHandler = () => {
        props.clickHandlerOpen();
    };

    return (
        <div className={"header" + props.toggle ? "open" : ""}>
            {!props.toggle && <DensityMediumIcon fontSize="small" className="toggleIcon toggleOpen" htmlColor="white" onClick={onClickHandler} />}
            <Title title="TITLE" />
        </div>
    );
}

export default Header;
