import React, { useState } from "react";
import Header from "../layout/Header";
import Contents from "../layout/Contents";
import LocalNavigation from "../layout/LocalNavigation";

function Drawer() {
    const [toggle, setToggle] = useState(false);
    const onClickHandlerOpen = () => {
        setToggle(true);
    };
    const onClickHandlerClose = () => {
        setToggle(false);
    };

    return (
        <>
            <Header toggle={toggle} clickHandlerOpen={onClickHandlerOpen} />
            <LocalNavigation toggle={toggle} clickHandlerClose={onClickHandlerClose} />
            <Contents toggle={toggle} />
        </>
    );
}

export default Drawer;
