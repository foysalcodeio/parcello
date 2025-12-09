import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // return <progress className="progress w-56"></progress>
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (!user) {
        return <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;