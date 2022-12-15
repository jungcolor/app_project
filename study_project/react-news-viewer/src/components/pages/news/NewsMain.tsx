import React, { useEffect, useState } from "react";
import { getApi } from "../../../api/actions";
import ArticleList from "../../_molecules/ArticleList";
import { IData } from "../../../interface/News.interface";

const NewsMain = () => {
    const [datas, setDatas] = useState<IData[]>([]);
    const fetchData = async () => {
        const response = await getApi("");

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
