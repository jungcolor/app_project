import React, { useEffect, useRef, useState } from "react";
import { IData } from './PostWrite';

interface IPostItem {
    item: IData;
    randomCount: number;
    handlePathChange: (href: string) => void;
}


const PostItem = ({ item, randomCount, handlePathChange }: IPostItem) => {
    const [count, setCount] = useState(randomCount);
    const timer = useRef(randomCount);
    const timerId = useRef<any>(null);
    const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const eTextKey = (e.target as HTMLAnchorElement).textContent;

        handlePathChange(`/post-view/${eTextKey}`);
    };

    useEffect(() => {
        timerId.current = setInterval(() => {
            timer.current -= 1;
            setCount(timer.current);
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (timer.current <= 0) {
            clearInterval(timerId.current);
        }
    }, [count]);

    return (
        <li style={{ display: "flex", alignItems: "center" }}>
            <a href="#" style={{ marginRight: "10px" }} onClick={onClickHandler}>
                {item.title}
            </a>
            <span>{count}</span>
        </li>
    );
};

export default PostItem;