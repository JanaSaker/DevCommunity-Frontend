import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './cv.css'; // Adjust the import path as necessary
import videoJob from './CV-VIDEO.mp4';
import PDF from './PDF-ICON.png';


const CVBoard = () => {
  const [cvs, setCvs] = useState([]);
  const [keylangs, setKeylangs] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCvs, setVisibleCvs] = useState(6); // Start by showing 6 CVs
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [newCvModalIsOpen, setNewCvModalIsOpen] = useState(false); // State for new CV modal visibility
  const [newCv, setNewCv] = useState({
    title: '',
    description: '',
    file: null,
    keylangs: [],
  });
  const isLoggedIn = true; // Placeholder for determining if the user is logged in

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

  const fetchCVs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/cvs');
      setCvs(response.data.cvs || []);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const showMoreCvs = () => {
    setVisibleCvs(visibleCvs + 3); // Increase the number of visible CVs by 3
  };

  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openNewCvModal = () => {
    setNewCvModalIsOpen(true);
  };

  const closeNewCvModal = () => {
    setNewCvModalIsOpen(false);
  };

  const handleNewCvSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isLoggedIn) {
        throw new Error('User is not logged in');
      }

      // Construct the keylangs array with only selected languages
      const selectedKeylangs = keylangs.filter(lang => newCv.keylangs.includes(lang.id))
                                         .map(lang => ({ id: lang.id, language: lang.language }));

      // Create a new FormData object to send the CV data
      const formData = new FormData();
      formData.append('title', newCv.title);
      formData.append('description', newCv.description);
      formData.append('file', newCv.file);
      // Serialize the selected keylangs array as a JSON string
      formData.append('keylangs', JSON.stringify(selectedKeylangs));

      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      };
      // Send the POST request to add a new CV
      const response = await axios.post('http://localhost:4000/api/cvs', formData, config);
      if (response && response.data) {
        // Update the state with the newly created CV
        setCvs([...cvs, response.data.cv]);
        // Reset the new CV form
        setNewCv({
          title: '',
          description: '',
          file: null,
          keylangs: [],
        });
        closeNewCvModal();
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error submitting new CV:', error);
      setError(error.message);
    }
  };

  const handleKeylangChange = (event) => {
    const selectedLangId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setNewCv(prevState => ({
        ...prevState,
        keylangs: [...prevState.keylangs, selectedLangId],
      }));
    } else {
      setNewCv(prevState => ({
        ...prevState,
        keylangs: prevState.keylangs.filter(langId => langId !== selectedLangId),
      }));
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='all-cv'>
    <div className='cvboard'>
    <video className="cv-video" autoPlay loop muted controls={false} preload='auto'>
        <source src={videoJob} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div className='cvboard-title'>Recent CVs</div>
      <div className='cvboard-container'>
        {cvs.slice(0, visibleCvs).map((cv, index) => (
          <div key={cv.id} className='cvboard-box' onClick={() => openModal(cv.file)}>
            <div className='cv-title'>{cv.title}</div>
            <div className='cv-description'>{cv.description}</div>
            <div className='cv-file'>
  {cv.file.endsWith('.pdf') ? (
    <img className='cv-file-icon' src={PDF} alt="PDF" />
  ) : (
    <img className='cv-file-icon-icon' src={`http://localhost:4000/files/${cv.file}`} alt="CV" />
  )}
</div>

            <div className='cv-keylang'>
      {(cv.keylangs || []).map((lang, langIndex) => (
        <div key={langIndex} className='cv-language'>{lang.language}</div>
      ))}
    </div>          </div>
        ))}
         </div>
        {visibleCvs < cvs.length && (
          <button className='cv-showmore' onClick={showMoreCvs}>Show More</button>
        )}
     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="CV Viewer"
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
        <button onClick={closeModal}>Close</button>
        <iframe src={`http://localhost:4000/files/${selectedFile}`} style={{ width: '100%', height: '100%' }} title="CV" />
      </Modal>
      {isLoggedIn && (
        <button className='cv-add-button' onClick={openNewCvModal}>Add CV</button>
      )}
          </div>

      <Modal
        isOpen={newCvModalIsOpen}
        onRequestClose={closeNewCvModal}
        contentLabel="Add CV"
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
        <form onSubmit={handleNewCvSubmit}>
          <input type="text" placeholder="Title" value={newCv.title} onChange={e => setNewCv({ ...newCv, title: e.target.value })} />
          <textarea placeholder="Description" value={newCv.description} onChange={e => setNewCv({ ...newCv, description: e.target.value })} />
          <input type="file" onChange={e => setNewCv({ ...newCv, file: e.target.files[0] })} accept=".pdf,.doc,.docx" />
          <h2>Key Languages</h2>
          {keylangs.length > 0 ? (
            keylangs.map(lang => (
              <div key={lang.id}>
                <input
                  type="checkbox"
                  id={`keylang-${lang.id}`}
                  value={lang.id}
                  onChange={handleKeylangChange}
                  checked={newCv.keylangs.includes(lang.id)}
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

export default CVBoard;
