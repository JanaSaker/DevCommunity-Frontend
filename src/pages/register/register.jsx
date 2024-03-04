import React from 'react';
import { useRegister } from '../../hooks/useRegister'; // Adjust the import path as necessary
import './register.css';
import {Link} from 'react-router-dom';

const Register = () => {
 const { register, loadingRegister, errorRegister } = useRegister();

 const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const profile = e.target.elements.profile.files[0]; // Get the selected file
    register(username, email, password, profile); // Include the file in the register function call
 };

 return (
    <div className="register-page">
      <div className='register-title'>Register</div>
      {errorRegister && <p className="error">{errorRegister}</p>}
      <form className='register-form' onSubmit={handleSubmit}>
        <div>
          <label className='register-label'>User Name:</label>
          <input className='register-input' type="text" name="username" />
        </div>
        <div>
          <label className='register-label'>Email:</label>
          <input className='register-input' type="email" name="email" />
        </div>
        <div>
          <label className='register-label'>Password:</label>
          <input className='register-input' type="password" name="password" />
        </div>
        <div>
          <label className='register-label'>Profile Image:</label>
          <input className='register-input' type="file" name="profile" />
        </div>
        <div className='register-navigate'>I already have an account. <Link className='register-link' to='/login'>Login</Link></div>
        <button className='register-button' type="submit" disabled={loadingRegister}>
          {loadingRegister ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
 );
};

export default Register;
