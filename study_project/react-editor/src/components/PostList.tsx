import React from 'react';
import { IData } from '../interface/Post.interface';
import PostItem from './PostItem';

interface IPostList {
    handlePathChange: (href: string) => void;
    handlePostDelete: (id: string) => void;
    items: IData[];
}

const getCount = () => {
    return Math.max(10, Math.floor(Math.random() * 30));
};

const PostList = ({ handlePathChange, handlePostDelete, items }: IPostList) => {
    const onClickHandler = () => {
        handlePathChange("/post-write");
    };

    return (
        <>
            <h2>목록 보기</h2>
            <ul>
                {items.map((item, idx) => (
                    <PostItem key={idx} item={item} randomCount={getCount()} handlePathChange={handlePathChange} handlePostDelete={handlePostDelete} />
                ))}
            </ul>
            <a href="#" onClick={onClickHandler}>
                글 작성
            </a>
        </>
    );
};

export default PostList;