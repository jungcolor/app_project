import React, { useState } from 'react';
import Title from '../component/Title';
import Button from '../component/Button';

function Header() {    
    return (
        <div className="header open">
            <Button className="open" text="open" />
            <Title title="TITLE" />
        </div>
    );
}

export default Header;