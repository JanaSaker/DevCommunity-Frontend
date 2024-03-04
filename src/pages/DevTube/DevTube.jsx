import React, { useEffect, useState } from 'react';
// import './courseboard.css'; 
import axios from 'axios';
import videoJob from './DEVTUBE-VIDEO.mov';


const DevTube = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCourses, setVisibleCourses] = useState(6); // Start by showing 6 courses

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/courses');
                setCourses(response.data.courses || []);
                console.log(response.data.courses);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='courseboard'>
                <video className="cv-video" autoPlay loop muted controls={false} preload='auto'>
        <source src={videoJob} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
            <div className='courseboard-title'>CourseBoard</div>
            <div className='courseboard-container-title'>Recent Courses</div>
            <div className='courseboard-container'>
                {courses.slice(0, visibleCourses).map((course, index) => (
                    <div key={course.id} className='courseboard-box'>
                        <div className='coursetitle'>{course.title}</div>
                        <div className='coursesubtitle'>{course.subtitle}</div>
                        <div className='coursedescription'>{course.description}</div>
                        <div className='coursesubmissionDate'>{formatDate(course.submission_date)}</div>
                        <div className='course-keylang'>{(course.keylang || []).map(lang => lang).join(', ')}</div>
                        {isYouTubeLink(course.URL) ? (
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${extractVideoId(course.URL)}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className='warning-message'>This is not a YouTube link.</div>
                        )}
                    </div>
                ))}
                {visibleCourses < courses.length && (
                    <button className='course-showmore' onClick={showMoreCourses}>Show More</button>
                )}
            </div>
        </div>
    );
};
const extractVideoId = (url) => {
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
   };

export default DevTube;
