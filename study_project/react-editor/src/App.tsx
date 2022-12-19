import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import PostWrite from "./components/PostWrite";
import { IData } from "./interface/Post.interface";

const App = () => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    const onPostSave = (data: IData[]) => {
        const posts = post.concat(data as []);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
        navigate("/");
    };

    const onPostDelete = (title: string) => {
        const posts = post.filter((x: IData) => x.title !== title);
        const result = JSON.stringify(posts);
        localStorage.setItem("posts", result);
        setPost(posts);
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
                <Link to="/">HOME</Link>
            </nav>
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
