import React from "react";
import { Navigate } from "react-router-dom";

// Context
import { useAuth } from "../contexts/UserContext";

function Account(){
    const { user } = useAuth();
    if(user)
        return (
            <>
                <h2>Welcome {user.name}!</h2>
                <h2>Contact info:</h2>
                <h3>Email: {user.email}</h3>
                <h3>Phone number: {user.phoneNumber}</h3>
            </>
        ) 
    else{
        return(
            <Navigate replace to="/login" />
        )
    }
}

export default Account;