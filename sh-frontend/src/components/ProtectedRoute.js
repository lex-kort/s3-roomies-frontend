import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Context
import { useAuth } from "../contexts/UserContext";

function ProtectedRoute({roles, redirectTo}){
    const { user, auth } = useAuth();
    if(auth){ 
        return !roles || roles.some((role) => user.role === role) ? <Outlet/> : <Navigate replace to="/" />
    }
    return (
        <Navigate replace to={redirectTo} />
    )
}

export default ProtectedRoute;