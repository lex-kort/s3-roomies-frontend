import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home.js';
import Listings from './pages/Listings.js';
import Account from './pages/Account.js';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Details from './pages/Details.js';
import Chat from './pages/Chat';
import Dummy from './pages/Dummy';

// Component
import Navbar from './components/Navbar.js';
import ProtectedRoute from './components/ProtectedRoute';

// Utils
import Roles from './services/utils/Roles';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<Details />} />
            <Route element={<ProtectedRoute role={[Roles.Landlord]}/>}>
              <Route path="/listings/new" element={<Dummy />}/>
            </Route>
            <Route element={<ProtectedRoute redirectTo={"/login"} />}>
              <Route path="/my-account" element={<Account />} />
              <Route path="/my-account/chat" element={<Chat />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
