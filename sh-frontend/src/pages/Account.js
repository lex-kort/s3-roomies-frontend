import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/UserContext";

function Account(){
    const { user } = useAuth();
    if(user === null) return(
        <Navigate replace to="/login" />
    )
    else{
        return (
            <>
                <h2>Welcome {user.name}!</h2>
            </>
        )
    }
}

export default Account;