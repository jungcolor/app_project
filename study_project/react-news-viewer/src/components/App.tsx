import { Route, Routes, useLocation } from "react-router-dom";
import NewsMain from "./pages/news/NewsMain";
import Layout from "./_templates/Layout";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<Layout />}>
                    <Route index element={<NewsMain />} />
                    <Route path=":category" element={<NewsMain key={location.key} />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
