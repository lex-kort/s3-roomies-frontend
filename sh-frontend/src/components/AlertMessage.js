import React from "react";

function AlertMessage({ message, type }){
    if(message && type){
        return (
            <div className={"alert " + type}>
                {message}
            </div>
        )
    }
}

export default AlertMessage;