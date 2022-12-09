import React from "react";
import { useAuth } from "../contexts/UserContext";

function Dummy(){
    const { user } = useAuth();

    if(user){
        return(
            <>
                It's a dummy!
            </>
        )
    }
}

export default Dummy;