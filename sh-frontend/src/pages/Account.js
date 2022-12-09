import React from "react";

// Context
import { useAuth } from "../contexts/UserContext";

function Account(){
    const { user } = useAuth();
    
    if(user){
        return (
            <>
                <h1>Profile page</h1>
                <h2>Welcome {user.name}!</h2>
                <h2>Contact info:</h2>
                <h3>Email: {user.email}</h3>
                <h3>Phone number: {user.phoneNumber}</h3>
            </>
        )
    }
}

export default Account;