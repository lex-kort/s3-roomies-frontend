import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";

function Account(){
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        (async() => {
            UserService.getUser().then((response) => {
                setUser(response.data);
            });
        })();
    }, []);

    if(!user) return null;
    return(
        <>
            <h2>Welcome {user.name}!</h2>
        </>
    )
}

export default Account;