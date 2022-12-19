import React, { useEffect, useRef, useState } from "react";
import { IData } from "../interface/Post.interface";
import { Link } from "react-router-dom";

interface IPostItem {
    item: IData;
    randomCount: number;
    handlePostDelete: (title: string) => void;
}

const PostItem = ({ item, randomCount, handlePostDelete }: IPostItem) => {
    const [count, setCount] = useState(randomCount);
    const timer = useRef(randomCount);
    const timerId = useRef<any>(null);

    // useEffect(() => {
    //     timerId.current = setInterval(() => {
    //         timer.current -= 1;
    //         setCount(timer.current);
    //     }, 1000);

    //     return () => clearInterval(timerId.current);
    // }, []);

    // useEffect(() => {
    //     if (timer.current <= 0) {
    //         clearInterval(timerId.current);
    //         handlePostDelete(title);
    //     }
    // }, [count]);

    return (
        <li style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/postView/${item.title}`} style={{ marginRight: "10px" }}>{item.title}</Link>
            <span>{count}</span>
        </li>
    );
};

export default PostItem;