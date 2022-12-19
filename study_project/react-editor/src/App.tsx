import React, { useState, useEffect } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import PostWrite from "./components/PostWrite";
import { IData } from "./interface/Post.interface";

const App = () => {
    const { pathname } = window.location;
    const [path, setPath] = useState(pathname);
    const [post, setPost] = useState([]);
    const onClickHandler = () => {
        onPathChange("/");
    };
    const onPathChange = (href: string) => {
        setPath(href);
    };
    const onPostSave = (data: IData[]) => {
        const posts = post.concat(data as []);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
        onPathChange("/");
    };
    const onPostDelete = (title: string) => {
        const posts = post.filter((x: IData) => x.title === title);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
    }
    const renderPage = () => {
        let page = <PostList items={post} handlePathChange={onPathChange} handlePostDelete={onPostDelete} />;

        if (path === "/post-write") {
            page = <PostWrite handleSave={onPostSave} />;
        }
        else if (path.indexOf("/post-view") > -1) {
            const postKey = path.split("/post-view/").join("");
            const viewData = post.filter((x: IData) => x.title === postKey);

            page = <PostView viewData={viewData[0]} />;
        }

        return page;
    }

    useEffect(() => {
        const response = localStorage.getItem("posts");
        if (response) {
            setPost(JSON.parse(response));
        }
    }, []);

    return (
        <div>
            <nav>
                <a href="#" onClick={onClickHandler}>
                    HOME
                </a>
            </nav>
            <div className="contents">{renderPage()}</div>
        </div>
    );
}

export default App;
