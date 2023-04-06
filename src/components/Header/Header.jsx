import React from 'react'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className='header px-24 flex justify-between items-center h-20 bg-gray-800'>
      <img src={logo} alt="" />
      <div className='text-white no-underline'>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="login">Login</Link>
      </div>
    </nav>
  );
};

export default Header;