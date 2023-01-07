import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css';
import { useAuth } from '../contexts/UserContext';
import AuthService from '../services/AuthService';

function Navbar(){
    const navigate = useNavigate();
    const { setUser, auth, setAuth } = useAuth();

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        setAuth(false);
        navigate('/');
    }

    const setLinks = () => {
        if(auth){
            return (
                <>
                    <NavLink className="link nav-link" to="/my-account">My Account</NavLink>
                    <NavLink className="link nav-link" to="/" onClick={handleLogout}>Logout</NavLink>
                </>
            )
        } 
        else{
            return(
                <>
                    <NavLink className="link nav-link" to="/register">Register</NavLink>
                    <NavLink className="link nav-link" to="/login">Login</NavLink>
                </>
            )
        }
    }

    return (
        <nav className='navbar bg-light'>
            <NavLink className="link nav-link" to="/">Home</NavLink>
            <NavLink className="link nav-link" to="/listings">Listings</NavLink>
            {setLinks()}
        </nav>
    )
}

export default Navbar;