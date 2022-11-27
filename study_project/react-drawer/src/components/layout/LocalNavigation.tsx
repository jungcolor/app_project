import React from 'react';
import Button from '../component/Button';
import Horizontal from '../component/Horizontal';
import List from '../component/List';

function LocalNavigation() {
    const menu1 = [{ text: "inbox" }, { text: "Starred" }, { text: "Send email" }, { text: "Drafts" }];
    const menu2 = [{ text: "All mail" }, { text: "Trash" }, { text: "Spam" }];
    
    return (
        <div className="lnb">
            <div>
                <Button className="close" text="close" />
            </div>
            <Horizontal />
            <List>{menu1}</List>
            <Horizontal />
            <List>{menu2}</List>
        </div>
    );
}

export default LocalNavigation;