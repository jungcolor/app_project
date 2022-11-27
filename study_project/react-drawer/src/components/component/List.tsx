import React from 'react';
import ListItem, { IListItem } from './ListItem';

interface IList {
    children: object[];
}

const createItem = (items: object[]) => {
    return items?.map((item: IListItem, idx: number) => {
        return <ListItem key={idx} text={item.text} />;
    });
}

function List(props: IList) {
    return <ul>{createItem(props.children)}</ul>;
}

export default List;