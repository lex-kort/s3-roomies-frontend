import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import ListingService from '../services/ListingService';

// Styling
import "./Details.css";

// Images
import placeholder from "../img/placeholder.jpg"

function Details(){
    const params = useParams();
    const listingID = params.id;

    const [listing, setListing] = useState();

    useEffect(() => {
        (async () => {
            const result = await ListingService.getListing(listingID);
            setListing(result.data);
        })();
        // eslint-disable-next-line
    }, []);

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
                                {listing ? "Yes" : "No"}
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

                </div>
            </div>
        )
    }
}

export default Details;