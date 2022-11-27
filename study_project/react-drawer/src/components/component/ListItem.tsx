import React from 'react';

export interface IListItem {
    text?: string;
}

function ListItem(props: any) {
    return (
        <li>
            <div className="icon"></div>
            <div>{props.text}</div>
        </li>
    );
}

export default ListItem;