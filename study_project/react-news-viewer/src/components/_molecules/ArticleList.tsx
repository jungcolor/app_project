import React from "react";
import { IData, IDatas } from "../../interface/News.interface";
import ArticleItem from "../_atoms/ArticleItem";

const ArticleList = ({ datas }: IDatas) => {
    return (
        <article className="p-7">
            <ul>
                {datas?.map((data: IData, idx: number) => {
                    const { title, description, url, urlToImage } = data;

                    return (
                        <li key={idx} className="overflow-hidden mb-7 pb-7 border-b border-b-slate-400">
                            <ArticleItem title={title} description={description} url={url} urlToImage={urlToImage} />
                        </li>
                    )
                })}
            </ul>
        </article>
    );
};

export default ArticleList;
