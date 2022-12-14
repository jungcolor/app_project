import axios from "axios";
import React, { useEffect, useState } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import { apiKey } from "../../../api/types";

const NewsMain = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`);
        setData(response.data.articles);
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data);


    return <div>메인 & 전체보기</div>;
};

export default NewsMain;
