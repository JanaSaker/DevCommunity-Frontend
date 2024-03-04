import React, { useEffect, useState } from 'react';
import videoJob from './5c36f6b14c664628b0132aeebd92707a (1).mov';
import './jobboard.css';
import axios from 'axios';

const JobBoard = () => {
 const [jobs, setJobs] = useState([]);
 const [error, setError] = useState(null);
 const [visibleJobs, setVisibleJobs] = useState(6); // Start by showing 5 jobs


 useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/jobs');
        setJobs(response.data.jobs || []); 
        console.log(response.data.jobs);

      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error);

      }
    };

    fetchJobs();
 }, []);

 const showMoreJobs = () => {
  setVisibleJobs(visibleJobs + 3); // Increase the number of visible jobs by 5
};
 if (error) {
    return <div>Error: {error.message}</div>;
 }
 
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


 return (
    <div className='jobboard'>
      <video className="job-video" autoPlay loop muted controls={false} preload='auto'>
        <source src={videoJob} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div className='jobboard-title'>JobBoard</div>
      <div className='jobboard-container-title'>Recent Job Circulars</div>
      <div className='jobboard-container'>
      {jobs.slice(0, visibleJobs).map((job, index) => (
  <div key={job.id} className='jobboard-box'>
    <div className='jobtitle'>{job.title}</div>
    <div className='jobcomapnyName'>{job.company_name}</div>
    <div className='jobcompanyLocation'>{job.company_location}</div>
    <div className='jobavailability'>{job.availability}</div>
    <div className='jobplace'>{job.place}</div>
    <div className='jobdescription'>{job.description}</div>
    <div className='joblevel'>{job.level_required}</div>
    <div className='job-keylang'>
      {(job.keylangs || []).map((lang, langIndex) => (
        <div key={langIndex} className='job-language'>{lang.language}</div>
      ))}
    </div>
    <div className='jobsubmitionDate'>{formatDate(job.submission_date)}</div>
  </div>
))}

       {visibleJobs < jobs.length && (
          <button className='job-showmore'onClick={showMoreJobs}>Show More</button>
        )}
      </div>
    </div>
 );
}

export default JobBoard;
