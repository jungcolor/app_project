import React from 'react';
import PostItem from './PostItem';
import { IData } from './PostWrite';

interface IPostList {
    handlePathChange: (href: string) => void;
    items: IData[];
}

const getCount = () => {
    return Math.max(10, Math.floor(Math.random() * 30));
};

const PostList = ({ handlePathChange, items }: IPostList) => {
    const onClickHandler = () => {
        handlePathChange("/post-write");
    };

    return (
        <>
            <h2>목록 보기</h2>
            <ul>
                {items.map((item, idx) => (
                    <PostItem key={idx} item={item} randomCount={getCount()} handlePathChange={handlePathChange} />
                ))}
            </ul>
            <a href="#" onClick={onClickHandler}>
                글 작성
            </a>
        </>
    );
};

export default PostList;