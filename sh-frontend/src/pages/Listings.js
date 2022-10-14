import React, { useState, useEffect } from 'react';
import ListingCRUD from '../services/crud/ListingCRUD';

function Listings(){
    const [listings, setListings] = useState([]);

    const applyFilter = () => {
        const fetchData = async () => {
            const result = await ListingCRUD.getFilteredListings({ 
                params : {
                    pets: false
                }
            });
            setListings(result.data);
        }
        fetchData();
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await ListingCRUD.getActiveListings();
            setListings(result.data);
        }
        fetchData();
    }, []);

    return(
        <>
            <h2>This is a listings page.</h2>
            {listings.map(listing => (
                <p key={listing.id}>{listing.address}</p>
            ))}
            <button onClick={applyFilter}>Apply filter</button>
        </>
    )
}

export default Listings;