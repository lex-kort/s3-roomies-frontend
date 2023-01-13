import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Service
import ResponseService from "../services/ResponseService";

// Context
import { useAuth } from "../contexts/UserContext";

// Images
import placeholder from '../img/placeholder.jpg';

function Account(){
    const { user } = useAuth();
    const [ responses, setResponses ] = useState([]);

    useEffect(() => {
        (async() => {
            if(user){
                const result = await ResponseService.getUserResponses(user.id);
                setResponses(result);
            }
        })();
    }, [user])
    
    const stylies = {
        maxWidth: '350px'
    }
    
    if(user){
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Profile page</h1>
                    <h2>Welcome {user.name}!</h2>
                    <h2>Contact info:</h2>
                    <h3>Email: {user.email}</h3>
                    <h3>Phone number: {user.phoneNumber}</h3>
                </div>
                <div className="list-group d-flex justify-content-center">
                    {responses.map(response => (
                        <Link className="list-group-item mx-auto d-flex w-50" to={"/listings/" + response.listing.id}>
                            <div className="row">
                                <div className="col-8">
                                    <h4 className="mb-1">{response.listing.address}</h4>
                                    <h6 className="mb-1">{response.listing.city}, {response.listing.neighborhood}</h6>
                                    <p>Responded on: {response.responseDate}</p>
                                </div>
                                <img src={placeholder} className="col-4" alt="placeholder" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}

export default Account;