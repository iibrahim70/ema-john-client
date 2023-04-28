import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/Login.css';
import { AuthContext } from '../providers/AuthProvider';

const LogIn = () => {
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate(); 
  const location = useLocation()
  console.log(location);

  const from = location.state?.from?.pathname || '/'; 

  const handleLogin = event => {
    event.preventDefault(); 

    const form = event.target; 
    const email = form.email.value; 
    const password = form.password.value; 
    console.log(email, password);

    signIn(email, password)
    .then(res => {
      const loggedUser = res.user; 
      console.log(loggedUser);
      form.rest(); 
      navigate(from, {replace: true});
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="" name="password" id="" required />
          <p><small></small></p>
        </div>
          <input className='btn-submit' type="submit" value="Login" />
      </form>
      <p><small>New to Ema-john? <Link to="/signup">Create New Account</Link></small></p>
    </div>
    );
};

export default LogIn;