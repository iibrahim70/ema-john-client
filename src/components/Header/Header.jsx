import React, { useContext } from 'react'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
const Header = () => {
  const {user, logOut} = useContext(AuthContext);  

  const handleLogout = () => {
    logOut()
    .then(res => {})
    .catch(err => console.error(err));
  }

  return (
    <nav className='header px-24 flex justify-between items-center h-20 bg-gray-800'>
      <img src={logo} alt="" />
      <div className='text-white no-underline'>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        {
          user && <span>Welcome {user.email} <button onClick={handleLogout}>Signout</button></span>
        }
      </div>
    </nav>
  );
};

export default Header;