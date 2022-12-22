// lib
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// components
import PostList from "./components/posts/PostList";
import PostView from "./components/posts/PostView";
import PostWrite from "./components/posts/PostWrite";
import { useAppSelector } from "./app/hooks";

// css
import "./App.css";
import Header from "./components/layout/Header";
import { IData } from "./interface/Post.interface";

const App = () => {
    // 초기값 가져오는 함수
    const posts = useAppSelector((state) => state.post);

    return (
        <div className="app">
            <Header />
            <main className="contents">
                <Routes>
                    <Route path="/" element={<PostList items={posts} />}></Route>
                    <Route path="/postWrite" element={<PostWrite />}></Route>
                    <Route path="/postView/:title" element={<PostView viewDatas={posts} />}></Route>
                </Routes>
            </main>
        </div>
    );
};

export default App;
