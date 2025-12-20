import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();
    console.log(location);

    if (loading) {
        // return <progress className="progress w-56"></progress>
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (!user) {
        return <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />
    }
    return children;
};

export default PrivateRoute;