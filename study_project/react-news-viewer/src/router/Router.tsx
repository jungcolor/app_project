import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsBusiness from "../components/pages/news/NewsBusiness";
import NewsEntertainment from "../components/pages/news/NewsEntertainment";
import NewsHealth from "../components/pages/news/NewsHealth";
import NewsMain from "../components/pages/news/NewsMain";
import NewsScience from "../components/pages/news/NewsScience";
import NewsSports from "../components/pages/news/NewsSports";
import NewsTechnology from "../components/pages/news/NewsTechnology";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<NewsMain />} />
            <Route path="/business" element={<NewsBusiness />} />
            <Route path="/entertainment" element={<NewsEntertainment />} />
            <Route path="/health" element={<NewsHealth />} />
            <Route path="/science" element={<NewsScience />} />
            <Route path="/sports" element={<NewsSports />} />
            <Route path="/technology" element={<NewsTechnology />} />
        </Routes>
    );
};

export default Router;
