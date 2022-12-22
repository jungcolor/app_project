import React, { useEffect, useRef, useState } from "react";
import { IData } from "../../interface/Post.interface";
import { Link } from "react-router-dom";

interface IPostItem {
    item: IData;
}

const PostItem = ({ item }: IPostItem) => {
    return (
        <li>
            <Link to={`/postView/${item.title}`}>{item.title}</Link>
        </li>
    );
};

export default PostItem;
