import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(){
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            <NavLink to="/my-account">My Account</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default Navbar;