// lib
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// components
import { useAppSelector } from "./app/hooks";

// css
import "./App.css";
import Header from "./components/layout/Header";

const App = () => {
    // 초기값 가져오는 함수
    const posts = useAppSelector((state) => state.post);
    const PostList = lazy(() => import("./components/posts/PostList"));
    const PostWrite = lazy(() => import('./components/posts/PostWrite'));
    const PostView = lazy(() => import("./components/posts/PostView"));

    return (
        <div className="app">
            <Header />
            <main className="contents">
                <Suspense fallback={<div>Loading....</div>}>
                    <Routes>
                        <Route path="/" element={<PostList items={posts} />}></Route>
                        <Route path="/postWrite" element={<PostWrite />}></Route>
                        <Route path="/postView/:title" element={<PostView viewDatas={posts} />}></Route>
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
};

export default App;
