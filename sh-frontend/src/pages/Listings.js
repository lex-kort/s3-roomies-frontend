import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Listings.css";

// Services
import ListingService from '../services/ListingService';

// Components
import FilterMenu from '../components/FilterMenu';

// Images
import placeholder from '../img/placeholder.jpg';

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
                        <img src={placeholder} class="card-img-top" alt="placeholder" />
                        <div className='card-body text-center'>
                            <h2 className='card-title'>{listing.address}</h2>
                            <h5 className='card-subtitle'>{listing.city}, {listing.neighborhood}</h5>
                        </div>
                        <div className='card-body row'>
                            <div className='col-6'>
                                <div className='card-text'>Rent:</div>
                                <div className='card-text'>Surface area:</div>
                                <div className='card-text'>Pets allowed:</div>
                            </div>
                            <div className='col-6'>
                                <div className='card-text'>&euro;{listing.rent.toFixed(2)},-</div>
                                <div className='card-text'>{listing.surfaceArea} m&sup2;</div>
                                <div className='card-text'>{listing.petsAllowed ? "Yes" : "No"}</div>
                            </div>
                        </div>
                    </Link>
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