import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const userInfo = localStorage.getItem("userInfo");

    return userInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
