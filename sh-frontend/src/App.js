import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home.js';
import Listings from './pages/Listings.js';
import Account from './pages/Account.js';
import Login from './pages/Login.js';
import Details from './pages/Details.js';

// Component
import Navbar from './components/Navbar.js';

// Contexts
import UserProvider from './contexts/UserContext'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
        </UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<Details />} />
          <Route path="/my-account" element={
            <UserProvider>
              <Account />
            </UserProvider>
           }/>
          <Route path="/login" element={
            <UserProvider>
              <Login />
            </UserProvider>
          } />
          {/* <Route path="/register" element={
            <UserProvider>
              <Register />
            </UserProvider>
          } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
