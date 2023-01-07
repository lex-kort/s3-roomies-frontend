import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Listings.css";

// Services
import ListingService from '../services/ListingService';

// Components
import FilterMenu from '../components/FilterMenu';

function Listings(){
    const [listings, setListings] = useState([]);

    const applyFilter = (minArea, maxRent, petsAllowed, neighborhood) => {
        (async () => {
            const result = await ListingService.getFilteredListings(
                {
                    "minArea" : Number(minArea) === 0 ? null : minArea,
                    "maxRent" : Number(maxRent) === 0 ? null : maxRent,
                    "pets" : (petsAllowed.toLowerCase() === "true" || petsAllowed.toLowerCase() === "false") ? petsAllowed : null,
                    "neighborhood" : (neighborhood ? neighborhood : null)
                }
            );
            setListings(result.data);
        })();
    }

    useEffect(() => {
        (async () => {
            const result = await ListingService.getActiveListings();
            setListings(result.data);
        })();
    }, []);

    const createCard = (listing) => {
        return (
            <div key={listing.id} className='col-xl-3 col-lg-4 col-md-6 my-2'>
                <div className='card'>
                    <Link className='link' to={"/listings/" + listing.id}>
                        <div className='card-body'>
                            <h5 className='card-title'>{listing.address}</h5>
                            <p className='card-text'>{listing.city}, {listing.neighborhood}</p>
                            <p className=''>Rent: &euro;{listing.rent.toFixed(2)},-</p>
                            <p className=''>Surface area: {listing.surfaceArea}m&sup2;</p>
                            <p className=''>Pets allowed: {listing.petsAllowed ? "yes" : "no"}</p>
                        </div>
                    </Link  >
                </div>
            </div>
        )
    }

    function Listings(){
        if(!listings){
            return (
                <>
                    <h2 className='text-center'>No listings were found with the filter</h2>
                </>
            )
        }

        return (
            <>
                <h2 className='text-center'>All available listings</h2>
                <div className='row mx-2'>
                    {listings.map(listing => (
                        createCard(listing)
                    ))}
                </div>
            </>
        )
    }

    return(
        <div className='layout'>
            <FilterMenu applyFilter={applyFilter} />
            <div className='container listing-container'>
                <Listings />
            </div>
        </div>
    )
}

export default Listings;