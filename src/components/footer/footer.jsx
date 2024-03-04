import React from 'react';
import './footer.css';
import Logos from'./DevLoopLogo-removebg-preview.png'
import { NavLink } from "react-router-dom";
import Insta from './Download Free NEON App Icon Sets for iOS 14 Home Screens.jpg'
import FB from './Facebook.jpg'
import Msg from './Messages.jpg'
const Footer = () => {
    return (
      <div className="footer">
<hr className='horizantle-line'/>
        <div className='footer-first'>

          <div className='footer-right'>
          <div className='footer-logo'>
            <img className='footer-logo' src={Logos} alt=''/>
          </div>
          <div className='footer-logo-desc'>
          </div>
</div>

<div className='footer-left'>
<ul className="footer-links">
        <li className='nav-link'>
          <NavLink to="/home" exact activeClassName="active">Home</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink className={({ isActive }) => isActive ? 'notactive' : undefined} to="/" >JobBoard</NavLink>
          <ul className="nav-dropdown">
            <li className='nav-list'><NavLink to="/cvbank" activeClassName="active">Cv Bank</NavLink></li>
            <li className='nav-list'><NavLink to="/jobs" activeClassName="active">Jobs</NavLink></li>
          </ul>
        </li>
        <li className='nav-link'>
          <NavLink to="/insights" activeClassName="active">Insights</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to="/devtube" activeClassName="active">DevTube</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to="/pomoclock" activeClassName="active">PomoClock</NavLink>
        </li>
      </ul>
      <div className='footer-references'>
<img className='footer-img' src={Insta} alt=''/>
<img className='footer-img' src={FB} alt=''/>
<img className='footer-img' src={Msg} alt=''/>
      </div>
</div>
</div>
<div className='footer-second'>
<hr className='horizantle-line'/>
<div className='footer-copyright'>© 2024 DevLoop. All rights reserved.</div>

</div>
</div>
    );
  }
  
  export default Footer;
  