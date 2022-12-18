import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../../api/actions";
import { IData } from "../../../interface/News.interface";
import ArticleList from "../../_molecules/ArticleList";

const NewsMain = () => {
    const [datas, setDatas] = useState<IData[]>([]);
    const params = useParams();
    const { category } = params;
    const fetchData = async () => {
        const response = await getApi(category ? category : "");
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

export default NewsMain;
