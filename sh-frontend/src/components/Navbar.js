import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar(){
    const renderSignin = () =>{
        if(localStorage.getItem('jwt_access_token')){
            return <NavLink to="/logout">Logout</NavLink>;
        }
        else{
            return <NavLink to="/login">Login</NavLink>;
        }
    }

    return (
        <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            <NavLink to="/my-account">My Account</NavLink>
            {window.addEventListener('storage', () => {
                renderSignin();
            })}
        </nav>
    )
}

export default Navbar;