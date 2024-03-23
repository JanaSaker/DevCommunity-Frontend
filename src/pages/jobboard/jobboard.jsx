import React, { useEffect, useState } from 'react';
import videoJob from './5c36f6b14c664628b0132aeebd92707a (1).mov';
import './jobboard.css';
import axios from 'axios';
import Modal from 'react-modal';
import'./jobmodal.css'

const JobBoard = () => {
 const [keylangs, setKeylangs] = useState([]);
 const [jobs, setJobs] = useState([]);
 const [error, setError] = useState(null);
 const [visibleJobs, setVisibleJobs] = useState(6); // Start by showing 6 jobs
 const [modalIsOpen, setModalIsOpen] = useState(false); // State for new Job modal visibility
 const [newJob, setNewJob] = useState({
    title: '',
    company_name: '',
    company_location: '',
    availability: '',
    place: '',
    description: '',
    level_required: '',
    keylangs: [],
 });
 const isLoggedIn = true; // Placeholder for determining if the user is logged in

 useEffect(() => {
    const fetchKeylangs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs`);
        setKeylangs(response.data.keyLangs || []);
      } catch (error) {
        console.error('Error fetching key languages:', error);
        setError(error.message);
      }
    };  
    fetchKeylangs();
 }, []);

 const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/jobs`);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching Jobs:', error);
      setError(error.message);
    }
 };

 useEffect(() => {
    fetchJobs();
 }, []);

 const showMoreJobs = () => {
    setVisibleJobs(visibleJobs + 3); // Increase the number of visible jobs by 3
 };

 const openModal = () => {
    setModalIsOpen(true);
 };

 const closeModal = () => {
    setModalIsOpen(false);
 };

 const handleNewJobSubmit = async (event) => {
  event.preventDefault();
  try {
     if (!isLoggedIn) {
       throw new Error('User is not logged in');
     }
     // Construct the job data object
     const jobData = {
       title: newJob.title,
       company_name: newJob.company_name,
       company_location: newJob.company_location,
       availability: newJob.availability,
       place: newJob.place,
       description: newJob.description,
       level_required: newJob.level_required,
       status: "success", // Assuming you want to set the status to "success"
       keylangs: newJob.keylangs.map(id => ({ id, language: keylangs.find(lang => lang.id === id).language })),
     };
 
     const token = localStorage.getItem('token');
     if (!token) {
       throw new Error('Token not found in local storage');
     }
     const config = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
       },
     };
     // Send the POST request to add a new job
     const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/jobs`, jobData, config);
     if (response && response.data) {
       // Update the state with the newly created job
       setJobs([...jobs, response.data.job]);
       // Reset the new job form
       setNewJob({
         title: '',
         company_name: '',
         company_location: '',
         availability: '',
         place: '',
         description: '',
         level_required: '',
         keylangs: [],
       });
       closeModal();
     } else {
       console.error('Unexpected response:', response);
     }
  } catch (error) {
     console.error('Error submitting new job:', error);
     setError(error.message);
  }
 };
 
 const handleKeylangChange = (event) => {
    const selectedLangId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setNewJob(prevState => ({
        ...prevState,
        keylangs: [...prevState.keylangs, selectedLangId],
      }));
    } else {
      setNewJob(prevState => ({
        ...prevState,
        keylangs: prevState.keylangs.filter(langId => langId !== selectedLangId),
      }));
    }
 };

 const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
 };

 if (error) {
    return <div>Error: {error}</div>;
 }

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
            <div className='job-submitionDate'>{formatDate(job.submission_date)}</div>
            <div className='job-title'>{job.title}</div>
            <div className='job-company'>
            <div className='job-comapnyName'>{job.company_name}</div>
            -
            <div className='job-companyLocation'>{job.company_location}</div>
            </div>
            
            <div className='job-level'><span className='job-level-required'> Level required:</span>&nbsp;&nbsp;&nbsp;{job.level_required}</div>
            <div className='job-place-avlble'>
            <div className='job-availability'>{job.availability}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='job-place'>{job.place}</div>
          </div>
            <div className='job-keylang'>
             {(job.keylangs || []).map((lang, langIndex) => (
                <div key={langIndex} className='job-language'>{lang.language}</div>
             ))}   
            </div>
            <div className='job-description'><span className='job-description-lable'>Job description:</span> &nbsp;&nbsp;{job.description}</div>
          </div>
        ))}
      </div>
      {visibleJobs < jobs.length && (
          <button className='job-showmore' onClick={showMoreJobs}>Show More</button>
        )}
      {isLoggedIn && (
        <button className='job-add-button' onClick={openModal}>Add Job</button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Job"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '65%',
            maxHeight: '90%',
            overflow: 'auto'
          }
        }}
      >
        <form onSubmit={handleNewJobSubmit}>
 <label className="form-label" htmlFor="title">Job Position</label>
 <input
    type="text"
    id="title"
    value={newJob.title}
    onChange={e => setNewJob({ ...newJob, title: e.target.value })}
    required
 />

 <label htmlFor="company_name">Company Name:</label>
 <input
    type="text"
    id="company_name"
    value={newJob.company_name}
    onChange={e => setNewJob({ ...newJob, company_name: e.target.value })}
    required
 />

 <label htmlFor="company_location">Company Location:</label>
 <input
    type="text"
    id="company_location"
    value={newJob.company_location}
    onChange={e => setNewJob({ ...newJob, company_location: e.target.value })}
    required
 />

 <label htmlFor="availability">Availability:</label>
 <select
    id="availability"
    value={newJob.availability}
    onChange={e => setNewJob({ ...newJob, availability: e.target.value })}
    required
 >
    <option value="">Select Availability</option>
    <option value="PartTime">Part Time</option>
    <option value="FullTime">Full Time</option>
 </select>

 <label htmlFor="place">Place:</label>
 <select
    id="place"
    value={newJob.place}
    onChange={e => setNewJob({ ...newJob, place: e.target.value })}
    required
 >
    <option value="">Select Place</option>
    <option value="Remotely">Remotely</option>
    <option value="OnSite">On Site</option>
    <option value="Hybrid">Hybrid</option>
 </select>

 <label htmlFor="description">Description:</label>
 <textarea
    id="description"
    value={newJob.description}
    onChange={e => setNewJob({ ...newJob, description: e.target.value })}
    required
 />
 <label htmlFor="level_required">Level Required:</label>
 <select
    id="level_required"
    value={newJob.level_required}
    onChange={e => setNewJob({ ...newJob, level_required: e.target.value })}
    required
 >
    <option value="">Select Level Required</option>
    <option value="Junior">Junior</option>
    <option value="Mid">Mid</option>
    <option value="Senior">Senior</option>
 </select>
 <h2>Key Languages</h2>
          {keylangs.length > 0 ? (
            keylangs.map(lang => (
              <div key={lang.id}>
                <input
                  type="checkbox"
                  id={`keylang-${lang.id}`}
                  value={lang.id}
                  onChange={handleKeylangChange}
                  checked={newJob.keylangs.includes(lang.id)}
                />
                <label htmlFor={`keylang-${lang.id}`}>{lang.language}</label>
              </div>
            ))
          ) : (
            <p>No key languages available.</p>
          )}
 <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
 );
};

export default JobBoard;

