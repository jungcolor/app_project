import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "./_templates/Wrapper";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Wrapper />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
