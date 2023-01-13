import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import ListingService from '../services/ListingService';
import ResponseService from '../services/ResponseService';

// Styling
import "./Details.css";

// Images
import placeholder from "../img/placeholder.jpg"

// Contexts
import { useAuth } from "../contexts/UserContext";

// Components
import AlertMessage from "../components/AlertMessage";

function Details(){
    const { user } = useAuth();
    const params = useParams();
    const listingID = params.id;

    const [listing, setListing] = useState();
    const [totalResponses, setTotalResponses] = useState();
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState();

    useEffect(() => {
        (async () => {
            const result = await ListingService.getListing(listingID);
            setListing(result.data);
            await getCount();
        })();
        // eslint-disable-next-line
    }, []);

    const handleRespondToListing = async() => {
        const response = await ResponseService.respondToListing(listingID);
        setMessage(response.message);
        setAlertType(response.type);
        await getCount();
    };

    const handleRemoveResponse = async() => {
        const response = await ResponseService.removeResponse(listingID);
        setMessage(response.message);
        setAlertType(response.type);
        await getCount();
    };

    const getCount = async() =>{
        const count = await ResponseService.getTotalResponses(listingID);
        setTotalResponses(count);
    }

    function ResponseButton(){
        if(user && user.userRole === "STUDENT"){
            return (
                <div className='btn-group my-3'>
                    <button type="button" className="btn btn-primary w-25" cy-name="respond-to-listing" onClick={handleRespondToListing}>Respond</button>
                    <button type="button" className="btn btn-secondary w-25" cy-name="remove-response" onClick={handleRemoveResponse}>Remove my response</button>
                </div>
            )
        }
    }

    if(listing != null){
        return(
            <div className='container listing-information'>
                <div className='listing-header row p-3 text-light'>
                    <div className='col-6 p-0'>
                        <div>
                            <h1>{listing.address}</h1>
                            <h5>{listing.city}, {listing.neighborhood}</h5>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                Monthly rent: 
                            </div>
                            <div className='col-6'>
                                &euro;{listing.rent.toFixed(2)},-
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                Surface area: 
                            </div>
                            <div className='col-6'>
                                {listing.surfaceArea.toFixed(2)} m&sup2;
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                Pets allowed: 
                            </div>
                            <div className='col-6'>
                                {listing.petsAllowed ? "Yes" : "No"}
                            </div>
                        </div>
                    </div>
                    <div className='col-6 p-0'>
                        <img src={placeholder} alt="Placeholder" className='img-fluid'/>
                    </div>
                </div>
                <div className='listing-details row p-3'>
                    <div className='col-3 p-0 fw-semibold'>
                        Description:
                    </div>
                    <div className='col-9 p-0'>
                        {listing.description}
                    </div>
                </div>
                <div className='listing-responses row p-3'>
                    <div className='row'>
                        <label className='col-6'>Total responses: {totalResponses}</label>
                        <label className='col-6'>Active: {listing.isActive ? "Yes" : "No"}</label>
                    </div>
                    <ResponseButton />
                    <div className='mt-1'>
                        <AlertMessage message={message} type={alertType} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='container listing-information'>
            No listing found.
        </div>
    )
}

export default Details;