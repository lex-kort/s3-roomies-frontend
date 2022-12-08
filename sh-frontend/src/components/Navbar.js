import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css';
import { useAuth } from '../contexts/UserContext';
import AuthService from '../services/AuthService';

function Navbar(){
    const navigate = useNavigate();
    const { setAuth, user } = useAuth();

    const handleLogout = () => {
        AuthService.logout();
        setAuth(false);
        navigate('/');
    }

    const setLinks = () => {
        if(user){
            return <>
                    <NavLink to="/my-account">My Account</NavLink>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </>
        } 
        else{
            return <>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>
        }
    }

    return (
        <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            {setLinks()}
        </nav>
    )
}

export default Navbar;