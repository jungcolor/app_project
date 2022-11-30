import React, { useState } from "react";
import Header from "../layout/Header";
import Contents from "../layout/Contents";
import LocalNavigation from "../layout/LocalNavigation";

function Drawer() {
    const [toggle, setToggle] = useState(false);
    const onClickHandlerToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <Header toggle={toggle} clickHandlerOpen={onClickHandlerToggle} />
            <LocalNavigation toggle={toggle} clickHandlerClose={onClickHandlerToggle} />
            <Contents toggle={toggle} />
        </>
    );
}

export default Drawer;
