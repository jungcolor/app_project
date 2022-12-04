import React from 'react';
import PostItem from './PostItem';
import { IData } from './PostWrite';

interface IPostList {
    handlePathChange: (href: string) => void;
    items: IData[];
}

const PostList = ({ handlePathChange, items }: IPostList) => {
    const onClickHandler = () => {
        handlePathChange("/post-write");
    };

    return (
        <>
            <h2>목록 보기</h2>
            <ul>
                {items.map((item, idx) => (
                    <PostItem key={idx} item={item} handlePathChange={handlePathChange} />
                ))}
            </ul>
            <a href="#" onClick={onClickHandler}>
                글 작성
            </a>
        </>
    );
};

export default PostList;