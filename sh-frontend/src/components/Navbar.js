import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar(){
    return (
        <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            <NavLink to="/my-account">My Account</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default Navbar;