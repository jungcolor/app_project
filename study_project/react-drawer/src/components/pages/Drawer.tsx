import React from 'react';
import Header from '../layout/Header';
import Contents from "../layout/Contents";
import LocalNavigation from '../layout/LocalNavigation';

function Drawer() {
    return (
        <>
            <Header />
            <LocalNavigation />
            <Contents />
        </>
    );
}

export default Drawer;