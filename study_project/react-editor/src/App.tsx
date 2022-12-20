// lib
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// components
import PostList from "./components/posts/PostList";
import PostView from "./components/posts/PostView";
import PostWrite from "./components/posts/PostWrite";
import { IData } from "./interface/Post.interface";

// css
import "./App.css";
import Header from "./components/layout/Header";

const App = () => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    const onPostSave = useCallback((data: IData[]) => {
        const posts = post.concat(data as []);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
        navigate("/");
    }, [post]);

    const onPostDelete = useCallback((title: string) => {
        const posts = post.filter((x: IData) => x.title !== title);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
    }, []);

    useEffect(() => {
        const response = localStorage.getItem("posts");
        if (response) {
            setPost(JSON.parse(response));
        }
    }, []);

    return (
        <div>
            <Header />
            <main className="contents">
                <Routes>
                    <Route path="/" element={<PostList items={post} handlePostDelete={onPostDelete} />}></Route>
                    <Route path="/postWrite" element={<PostWrite handleSave={onPostSave} />}></Route>
                    <Route path="/postView/:title" element={<PostView viewDatas={post} />}></Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
