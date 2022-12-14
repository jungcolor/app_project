import React from "react";
import ReactDOM from "react-dom/client";

// lib
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";

// css
import App from "./App";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
