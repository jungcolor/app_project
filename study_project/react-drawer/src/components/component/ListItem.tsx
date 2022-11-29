import React from 'react';

export interface IListItem {
    text?: string;
}

function ListItem(props: IListItem) {
    return (
        <li>
            <div className="icon"></div>
            <div>{props.text}</div>
        </li>
    );
}

export default ListItem;