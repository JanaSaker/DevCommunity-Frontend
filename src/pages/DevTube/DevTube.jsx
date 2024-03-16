import React, { useEffect, useState } from 'react';
import axios from 'axios';
import videoJob from './DEVTUBE-VIDEO.mov';
import Modal from 'react-modal';
import './DevTube.css'

const DevTube = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCourses, setVisibleCourses] = useState(6); // Start by showing 6 courses
    const [keylangs, setKeylangs] = useState([]); // Assuming you have a list of key languages
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for new Course modal visibility
    const [newCourse, setNewCourse] = useState({
        title: '',
        subtitle: '',
        description: '',
        status: 'accepted', // Default status
        URL: '',
        keylangs: [],
    });
    const isLoggedIn = true; // Placeholder for determining if the user is logged in
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        const fetchKeylangs = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/keylangs');
            setKeylangs(response.data.keyLangs || []);
          } catch (error) {
            console.error('Error fetching key languages:', error);
            setError(error.message);
          }
        };
        fetchKeylangs();
     }, []);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/courses');
                setCourses(response.data.courses || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error);
            }
        };

        fetchCourses();
    }, []);

    const showMoreCourses = () => {
        setVisibleCourses(visibleCourses + 3); // Increase the number of visible courses by 3
    };

    const isYouTubeLink = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const extractVideoId = (url) => {
        const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(videoIdRegex);
        return match ? match[1] : null;
    };
    const handleNewCourseSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isLoggedIn) {
              throw new Error('User is not logged in');
            }
            // Construct the course data object
            const courseData = {
              title: newCourse.title,
              subtitle: newCourse.subtitle,
              description: newCourse.description,
              status: newCourse.status,
              URL: newCourse.URL,
              keylangs: newCourse.keylangs.map(id => ({ id, language: keylangs.find(lang => lang.id === id).language })),
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
            // Send the POST request to add a new course
            const response = await axios.post('http://localhost:4000/api/courses', courseData, config);
            if (response && response.data) {
              // Update the state with the newly created course
              setCourses([...courses, response.data.course]);
              // Reset the new course form
              setNewCourse({
                title: '',
                subtitle: '',
                description: '',
                status: 'accepted',
                URL: '',
                keylangs: [],
              });
              closeModal();
            } else {
              console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Error submitting new course:', error);
            setError(error.message);
        }
       };
       
    const handleKeylangChange = (event) => {
        const selectedLangId = parseInt(event.target.value);
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setNewCourse(prevState => ({
            ...prevState,
            keylangs: [...prevState.keylangs, selectedLangId],
          }));
        } else {
          setNewCourse(prevState => ({
            ...prevState,
            keylangs: prevState.keylangs.filter(langId => langId !== selectedLangId),
          }));
        }
     };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='courseboard'>
            <video className="cv-video" autoPlay loop muted controls={false} preload='auto'>
                <source src={videoJob} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className='devtube'>
            <div className='courseboard-title'>CourseBoard</div>
            <div className='courseboard-container-title'>Recent Courses</div>
            <div className='courseboard-container'>
                {courses.slice(0, visibleCourses).map((course, index) => (
                    <div key={course.id} className='courseboard-box'>
                      <div className='course-text'>
                        <div className='coursetitle'>{course.title}</div>
                        <div className='coursesubtitle'>{course.subtitle}</div>
                        <div className='coursedescription'>{course.description}</div>
                        <div className='course-keylang'>
              {(course.keylangs || []).map((lang, langIndex) => (
                <div key={langIndex} className='course-language'>{lang.language}</div>
              ))}
            </div>
 
            </div>                      {isYouTubeLink(course.URL) ? (
                            <iframe
                                className='course-video-tube'
                                width="277"
                                height="315"
                                src={`https://www.youtube.com/embed/${extractVideoId(course.URL)}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className='warning-message'>This is not a YouTube link.</div>
                        )}
                        <div className='coursesubmissionDate'>{formatDate(course.submission_date)}</div>
                        </div>   
                                     
                ))}

                </div>
                {visibleCourses < courses.length && (
                    <button className='course-showmore' onClick={showMoreCourses}>Show More</button>
                )}
            </div>
            {isLoggedIn && (
                <button className='course-add-button' onClick={openModal}>Add Course</button>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Course"
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
                        maxWidth: '90%',
                        maxHeight: '90%',
                        overflow: 'auto'
                    }
                }}
            >
     <form onSubmit={handleNewCourseSubmit}>
    <label htmlFor="title">Title:</label>
    <input
        type="text"
        id="title"
        value={newCourse.title}
        onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
        required
    />

    <label htmlFor="subtitle">Subtitle:</label>
    <input
        type="text"
        id="subtitle"
        value={newCourse.subtitle}
        onChange={e => setNewCourse({ ...newCourse, subtitle: e.target.value })}
        required
    />

    <label htmlFor="description">Description:</label>
    <textarea
        id="description"
        value={newCourse.description}
        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
        required
    />

    <label htmlFor="URL">URL:</label>
    <input
        type="text"
        id="URL"
        value={newCourse.URL}
        onChange={e => setNewCourse({ ...newCourse, URL: e.target.value })}
        required
    />
     <h2>Key Languages</h2>
          {keylangs.length > 0 ? (
            keylangs.map(lang => (
              <div key={lang.id}>
                <input
                  type="checkbox"
                  id={`keylang-${lang.id}`}
                  value={lang.id}
                  onChange={handleKeylangChange}
                  checked={newCourse.keylangs.includes(lang.id)}
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

export default DevTube;
