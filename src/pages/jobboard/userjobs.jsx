// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import'./jobboard.css';

// const OwnerJobs = ({ ownerId }) => {
//     const [jobs, setJobs] = useState([]);
//     const [ownerJobs, setOwnerJobs] = useState([]);

//  useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/jobs');
//         setJobs(response.data.jobs || []);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//  }, []);

//  useEffect(() => {
//   console.log('Owner ID:', ownerId); // Add this line to check the ownerId

//   const ownerJobs = Array.isArray(jobs) ? jobs.filter(job => job.ownerId === ownerId) : [];
//   setOwnerJobs(ownerJobs);
//  }, [jobs, ownerId]);

//  return (
//     <div className='jobboard'>
//       {ownerJobs.map(job => (
//         <div key={job._id}>
//               <div className='jobtitle'>{job.title}</div>
//             <div className='jobcomapnyName'>{job.company_name}</div>
//             <div className='jobcompanyLocation'>{job.company_location}</div>

//             <div className='jobavailability'>{job.availability}</div>
//             <div className='jobplace'>{job.place}</div>
//             <div className='jobdescription'>{job.description}</div>
//             <div className='joblevel'>{job.level_required}</div>
//             <div className='job-keylang'>{(job.KeyLangs || []).map(lang => lang.language).join(', ')}</div>
//             <div className='jobsubmitionDate'>{job.submission_date}</div>
//           </div>
//       ))}
//     </div>
//  );
// };

// export default OwnerJobs;
