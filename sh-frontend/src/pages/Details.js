import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import ListingService from '../services/ListingService';

// Styling
import "./Details.css";

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
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>{listing.address}</h1>
                        <p>&euro;{listing.rent.toFixed(2)},-</p>
                    </div>
                    <div className='col'>
                        <h1>{listing.address}</h1>
                        <p>&euro;{listing.rent.toFixed(2)},-</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;