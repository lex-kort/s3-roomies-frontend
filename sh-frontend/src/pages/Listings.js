import React, { useState, useEffect } from 'react';

import "./Listings.css";

// Services
import ListingCRUD from '../services/crud/ListingCRUD';

// Components
import FilterMenu from '../components/FilterMenu';

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
        <div className='layout'>
            <FilterMenu applyFilter={applyFilter} />
            <div className='listing-container'>
                <h2>All available listings</h2>
                <div className='row mx-2'>
                    { listings.map(listing => (
                        <div className='col-xl-3 col-lg-4 col-md-6 my-2'>
                            <div key={listing.id} className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{listing.address}</h5>
                                    <p className='card-text'>{listing.city}, {listing.neighborhood}</p>
                                    <p className=''>Rent: &euro;{listing.rent.toFixed(2)},-</p>
                                    <p className=''>Surface area: {listing.surfaceArea}m&sup2;</p>
                                    <p className=''>Pets allowed: {listing.petsAllowed ? "yes" : "no"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Listings;