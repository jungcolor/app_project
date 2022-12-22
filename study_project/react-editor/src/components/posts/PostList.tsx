import React from "react";
import { IData } from "../../interface/Post.interface";
import PostEmpty from "./PostEmpty";
import PostItem from "./PostItem";

interface IPostList {
    items: IData[];
}

const PostList = ({ items }: IPostList) => {
    return (
        <>
            <h2>목록 보기</h2>
            <ul>{items.length > 0 ? items.map((item, idx) => <PostItem key={idx} item={item} />) : <PostEmpty />}</ul>
        </>
    );
};

export default PostList;
