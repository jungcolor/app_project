import React from "react";
import Header from "../../_templates/Header";
import Contents from "../../_templates/Contents";
import ArticleSection from "../../_organism/ArticleSection";

const NewsMain = () => {
    return (
        <>
            <Header />
            <Contents subpage={<ArticleSection />} />
        </>
    );
};

export default NewsMain;
