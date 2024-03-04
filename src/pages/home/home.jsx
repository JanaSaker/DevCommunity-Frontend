import React from 'react';
import './home.css';
import videoFile from './Untitled_video_-_Made_with_Clipchamp.mov'; // Import the video file
import { Link } from 'react-router-dom';
import Job_Image from './Job_image.jpg';
const Home = () => {
  return (
  <div className='home-body'>
    <div className="hero-section">
        <video className="video" autoPlay loop muted controls={false} preload='auto'>
          <source src={videoFile} type="video/mp4"/>
        </video>
        <div className='home-mission'> 
       <div className='home-mission-welcome'> Welcome to <span className='devloop-text'>DevLoop</span></div>
<br />
<div className='home-mission-text-'>
Our mission is to empower developers worldwide. We strive to:
<br />
<br />
Connect developers with exciting job opportunities from leading companies.
<br />
Enable developers to showcase their skills and experience through personalized CVs.
<br />
Enhance productivity with intuitive Pomodoro time management tools.
<br />
Foster learning and growth through curated DevTube resources.
<br />
Facilitate knowledge sharing and community engagement with our Insights platform.
<br />
<br />
<br />
</div>
<span className='home-joinus'>
            <Link className='home-joinus' to="/register">Join us</Link> 
          </span>  in revolutionizing the way developers connect, learn, and thrive in the digital age.< br/> Explore limitless possibilities with  <span className='devloop-text'>DevLoop</span> today.</div>
    </div>
    {/* ///////////////////////////////////////////////////////// */}
    <div className='home-job'>
      <div className='home-job-text-box'>
        <div className='home-job-text'> 
        "Take the Next Step in Your Career Journey"
        <br />
        <br />
        "Find Your Dream Job Here"
        </div>
        <button className='home-job-btn'>
        <Link className='home-job-link' to="/jobs">Get Started</Link>
        </button>
      </div>
      <div className='home-job-img-box'>
        <div className='home-job-img'>
          <img className='home-job-img1'src={Job_Image} alt='haha'/>
        </div>
        </div>
        </div>
{/* /////////////////////////////////////////////////////////// */}
    <div className='home-cv'>
      <div className='home-job-img-box'>
        <div className='home-job-img'>
          <img className='home-job-img1'src={Job_Image} alt='haha'/>
        </div>
      </div>
      <div className='home-job-text-box'>
        <div className='home-job-text'> 
        "Take the Next Step in Your Career Journey"
        <br />
        <br />
        "Find Your Dream Job Here"
        </div>
        <button className='home-job-btn'>
        <Link className='home-job-link' to="/cvbank">Get Started</Link>
        </button>
      </div>
      </div>
      {/* ///////////////////////////////////////////////// */}
      <div className='home-job'>
      <div className='home-job-text-box'>
        <div className='home-job-text'> 
        "Take the Next Step in Your Career Journey"
        <br />
        <br />
        "Find Your Dream Job Here"
        </div>
        <button className='home-job-btn'>
        <Link className='home-job-link' to="/jobs">Get Started</Link>
        </button>
      </div>
      <div className='home-job-img-box'>
        <div className='home-job-img'>
          <img className='home-job-img1'src={Job_Image} alt='haha'/>
        </div>
        </div>
        </div>
        {/* /////////////////////////////////////////////////////////// */}
    <div className='home-cv'>
      <div className='home-job-img-box'>
        <div className='home-job-img'>
          <img className='home-job-img1'src={Job_Image} alt='haha'/>
        </div>
      </div>
      <div className='home-job-text-box'>
        <div className='home-job-text'> 
        "Take the Next Step in Your Career Journey"
        <br />
        <br />
        "Find Your Dream Job Here"
        </div>
        <button className='home-job-btn'>
        <Link className='home-job-link' to="/cvbank">Get Started</Link>
        </button>
      </div>
      </div>
            {/* ///////////////////////////////////////////////// */}
            <div className='home-job'>
      <div className='home-job-text-box'>
        <div className='home-job-text'> 
        "Take the Next Step in Your Career Journey"
        <br />
        <br />
        "Find Your Dream Job Here"
        </div>
        <button className='home-job-btn'>
        <Link className='home-job-link' to="/jobs">Get Started</Link>
        </button>
      </div>
      <div className='home-job-img-box'>
        <div className='home-job-img'>
          <img className='home-job-img1'src={Job_Image} alt='haha'/>
        </div>
        </div>
        </div>
      </div>



  
  );
}
export default Home;
