import React from "react";
import NewsMain from "./pages/news/NewsMain";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NewsMain />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
