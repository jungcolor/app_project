import React from 'react';
import { IData } from '../interface/Post.interface';
import { useParams } from "react-router-dom";

interface IPostView {
    viewDatas: IData[];
}

const PostView = ({ viewDatas }: IPostView) => {
    const { title } = useParams();
    const data = viewDatas.filter((viewData: IData) => viewData.title === title)[0];

    return (
        <div>
            <h2>{data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
        </div>
    );
};

export default PostView;