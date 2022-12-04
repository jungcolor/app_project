import React from 'react';
import { IData } from './PostWrite';

interface IPostView {
    viewData: IData;
}

const PostView = ({ viewData }: IPostView) => {
    return (
        <div>
            <h2>{viewData.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: viewData.contents }}></div> 
        </div>
    );
};

export default PostView;