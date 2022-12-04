import React from 'react';
import { IData } from './PostWrite';

interface IPostItem {
    item: IData;
    handlePathChange: (href: string) => void;
}

const PostItem = ({ item, handlePathChange }: IPostItem) => {
    const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const eTextKey = (e.target as HTMLAnchorElement).textContent;

        handlePathChange(`/post-view/${eTextKey}`);
    };

    return (
        <li style={{ display: "flex", alignItems: "center" }}>
            <a href="#" style={{ marginRight: "10px" }} onClick={onClickHandler}>
                {item.title}
            </a>
            <span>11</span>
        </li>
    );
};

export default PostItem;