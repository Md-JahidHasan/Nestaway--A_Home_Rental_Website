import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";


const HostRoute = ({ children }) => {
    
    const [role, isLoading] = useRole();


    if (isLoading) return <LoadingSpinner></LoadingSpinner>;

    if (role === 'host') return children;

    return <Navigate to='/dashboard'></Navigate>
};

export default HostRoute;

HostRoute.prototypes = {
    children: PropTypes.element
}