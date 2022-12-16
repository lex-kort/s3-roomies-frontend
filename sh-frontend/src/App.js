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
import ProtectedRoute from './components/ProtectedRoute';
import Roles from './services/utils/Roles';
import Dummy from './pages/Dummy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<Details />} />
          <Route element={<ProtectedRoute role={[Roles.Landlord]}/>}>
            <Route path="/listings/new" element={<Dummy />}/>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/my-account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={
              <Register />
          } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
