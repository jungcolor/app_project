import React from "react";
import { IData } from "../../interface/News.interface";

const ArticleItem = ({ title, description, url, urlToImage }: IData) => {
    return (
        <a href={url} target="_blank" rel="noreferrer noopener">
            <figure>
                <img src={urlToImage} alt={description} />
            </figure>
            <dl>
                <dt>{title}</dt>
                <dd>{description}</dd>
            </dl>
        </a>
    );
};

export default ArticleItem;
