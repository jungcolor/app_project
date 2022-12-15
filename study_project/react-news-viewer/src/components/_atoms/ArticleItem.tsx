import React from "react";
import { IData } from "../../interface/News.interface";

const ArticleItem = ({ title, description, url, urlToImage }: IData) => {
    return (
        <a href={url} target="_blank" rel="noreferrer noopener" className="item block overflow-hidden">
            {urlToImage &&
                <div className="w-52 h-36 float-left overflow-hidden mr-3">
                    <img src={urlToImage} alt={description} />
                </div>
            }

            <dl className="overflow-hidden">
                <dt className="text-lg font-bold text-gray-700">{title}</dt>
                {description && <dd className="item-description">{description}</dd>}
            </dl>
        </a>
    )
};

export default ArticleItem;
