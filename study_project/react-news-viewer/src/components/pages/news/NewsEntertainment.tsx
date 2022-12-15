import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getApi } from "../../../api/actions";
import { IData } from "../../../interface/News.interface";
import ArticleList from "../../_molecules/ArticleList";

const NewsEntertainment = () => {
    const [datas, setDatas] = useState<IData[]>([]);
    const { pathname } = useLocation();
    const category = pathname.split("/").join("");
    const fetchData = async () => {
        const response = await getApi(category);
        setDatas(response);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ArticleList datas={datas} />
        </>
    );
};

export default NewsEntertainment;
