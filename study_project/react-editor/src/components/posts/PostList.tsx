import React from 'react';
import { IData } from '../../interface/Post.interface';
import PostItem from './PostItem';

interface IPostList {
    handlePostDelete: (title: string) => void;
    items: IData[];
}

const getCount = () => {
    return Math.max(10, Math.floor(Math.random() * 30));
};

const PostList = ({ handlePostDelete, items }: IPostList) => {
    return (
        <>
            <h2>목록 보기</h2>
            <ul>
                {items?.map((item, idx) => (
                    <PostItem key={idx} item={item} randomCount={getCount()} handlePostDelete={handlePostDelete} />
                ))}
            </ul>

        </>
    );
};

export default PostList;