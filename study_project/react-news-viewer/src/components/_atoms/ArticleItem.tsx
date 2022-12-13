import React from "react";

const ArticleItem = () => {
    return (
        <li>
            <a href="#">
                <figure>이미지</figure>
                <dl>
                    <dt>타이틀</dt>
                    <dd>내용</dd>
                </dl>
            </a>
        </li>
    );
};

export default ArticleItem;
