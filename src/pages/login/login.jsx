import React from 'react';
import { useLogin } from '../../hooks/useLogin'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
 const { signIn, loading, error } = useLogin();
//  const navigate = useNavigate();

 const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    signIn(username, password);
 };

 return (
    <div className='login-page'>
      <div className='login-title'>Login to &nbsp;<span className='login-devloop'>DevLoop</span></div>
      {error && <p className='login-required'>{error}</p>}
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-username'>
          <label className='login-label'>User Name:</label>
          <input
            name="username"
            className='login-input'
          />
        </div>
        <div>
          <label className='login-label'>Password:</label>
          <input
            type="password"
            name="password"
            className='login-input'
          />
        </div>
        <button className='login-button' type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <br />
        <div className='login-createAccount'> <Link className='login-createAccount' to="/register">Create Account</Link></div>
      </form>
    </div>
 );
};

export default Login;
