import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import ListingCRUD from '../services/crud/ListingCRUD';

// Styling
import "./Details.css";

function Details(){
    const params = useParams();
    const listingID = params.id;

    const [listing, setListing] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await ListingCRUD.getListing(listingID);
            setListing(result.data);
        }
        fetchData();
    }, []);

    if(listing != null){
        return(
            <div>
                <h1>{listing.address}</h1>
                <p>&euro;{listing.rent.toFixed(2)},-</p>
            </div>
        )
    }
}

export default Details;