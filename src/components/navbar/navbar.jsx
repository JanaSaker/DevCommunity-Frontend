import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from './DevLoopLogo-removebg-preview.png';
import { useAuthContext } from '../../hooks/useAuthContext'; // Adjust the import path as necessary
import { useLogout } from '../../hooks/useLogout'; // Adjust the import path as necessary

const Navbar = () => {
 const { user } = useAuthContext(); // Assuming 'user' is the key you're using to store the user data in the context
 const { logout } = useLogout();
 const navigate = useNavigate(); // Use useNavigate for navigation
 const [showNav, setShowNav] = useState(false); // State to control the visibility of the navigation links

 const handleLogin = () => {
    // Redirect to the login page
    navigate('/login'); // Adjust the path as necessary
 };

 const toggleNav = () => {
    setShowNav(!showNav);
 };

 return (
    <div className="navbar">
      <img className="logo" src={logo} alt='DevLoop Logo' />
      <div className="burger" onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${showNav ? 'show' : ''}`}>
        <li className='nav-link'>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink className={({ isActive }) => isActive ? 'notactive' : undefined} to="/jobs" >JobBoard</NavLink>
          <ul className="nav-dropdown">
            <li className='nav-list'><NavLink to="/cvbank" activeClassName="active">Cv Bank</NavLink></li>
            <li className='nav-list'><NavLink to="/jobs" activeClassName="active">Jobs</NavLink></li>
          </ul>
        </li>
        {/* <li className='nav-link'>
          <NavLink to="/insights" activeClassName="active">Insights</NavLink>
        </li> */}
        <li className='nav-link'>
          <NavLink to="/devtube" activeClassName="active">DevTube</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to="/pomoclock" activeClassName="active">PomoClock</NavLink>
        </li>
        <li className='nav-link'>
          {user ? (
            <button className='nav-button' onClick={logout}>Logout</button>
          ) : (
            <button className='nav-button' onClick={handleLogin}>Login</button>
          )}
        </li>
      </ul>
    </div>
 );
}

export default Navbar;
