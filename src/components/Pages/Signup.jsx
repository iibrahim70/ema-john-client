import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Signup.css';
import { AuthContext } from '../providers/AuthProvider';

const Signup = () => {
  const [error, setError] = useState('');
  const { createUser } = useContext(AuthContext); 

  const handleSignup = event => {
    event.preventDefault(); 

    const form = event.target; 
    const email = form.email.value; 
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

    setError('');
    if(password !== confirm){
      setError('Your password did not match')
      return; 
    }
    else if(password.length < 6){
      setError('Your password is too short')
      return; 
    }

    createUser(email, password)
    .then(res => {
      const loggedUser = res.user;
      console.log(loggedUser);
    })
    .catch(err => {
      console.log(err);
      setError(err.message);
    })
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="" required />
        </div>
        <input className='btn-submit' type="submit" value="Sign Up" />
      </form>
      <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
      <p className='text-error'>{error}</p>
    </div>
  );
};

export default Signup;