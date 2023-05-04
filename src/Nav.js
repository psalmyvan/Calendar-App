import './App.css';
import React from 'react';
//import {Link}from 'react-router-dom'

function Nav() {
    // const navStyle = {
    //     color: 'white'
    // };
  return (
    <nav>
            <ul className="nav-links">
                {/* <Link style={navStyle} to='/'>
                <li>Home</li>
                </Link> */}
                <h1>CALENDAR APP</h1>
                {/* <Link style={navStyle} to='/appointment'>
                <li>Contingency</li>
                </Link> */}
            </ul>
    </nav>
  );
}

export default Nav;