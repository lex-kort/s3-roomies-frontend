import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listings(){
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/listings").then((response) => {
            setListings(response.data.listings);
        });
    });

    return(
        <>
            <h2>This is a listings page.</h2>
            {listings.map(listing => (
                <p>{listing.address}</p>
            ))}
        </>
    )
}

export default Listings;