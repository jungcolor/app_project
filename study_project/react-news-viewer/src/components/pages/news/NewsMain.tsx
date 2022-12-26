import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ArticleList from "../../_molecules/ArticleList";
import { asyncNewsListFetch } from "../../../features/news/newsSlice";

const NewsMain = () => {
    const params = useParams();
    let { category } = params;

    const dispatch = useAppDispatch();
    const newsList = useAppSelector((state) => state.news.datas);
    const loading = useAppSelector((state) => state.news.loading);

    useEffect(() => {
        category = !category ? "" : category;
        dispatch(asyncNewsListFetch(category));
    }, []);

    return (
        <>
            {loading === "Loading" ? "Loading..." : <ArticleList datas={newsList} />}
        </>
    );
};

export default NewsMain;
