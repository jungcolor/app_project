import { Outlet } from "react-router-dom";

const Contents = () => {
    return (
        <div className="min-h-screen m-auto">
            <Outlet />
        </div>
    );
};

export default Contents;
