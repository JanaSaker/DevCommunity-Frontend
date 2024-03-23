import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddKeyLang = () => {
 const [language, setLanguage] = useState('');
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(false);
 const [languages, setLanguages] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs`);
        setLanguages(response.data.keyLangs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setError('Failed to fetch languages');
        setLoading(false);
      }
    };

    fetchLanguages();
 }, []);

 const handleChange = (e) => {
    setLanguage(e.target.value);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('language', language);

      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.status === 201) {
        setSuccess(true);
        setLanguage('');
        setError('');
        const updatedLanguages = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs`);
        setLanguages(updatedLanguages.data.keyLangs);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Failed to add key language');
      } else if (error.request) {
        setError('Failed to send request');
      } else {
        setError('An error occurred');
      }
    }
 };

 const handleDelete = async (langId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs/${langId}`);
      setSuccess(true);
      setError('');
      // Refresh the list of languages after deleting
      const updatedLanguages = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/keylangs`);
      setLanguages(updatedLanguages.data.keyLangs);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Failed to delete key language');
      } else if (error.request) {
        setError('Failed to send request');
      } else {
        setError('An error occurred');
      }
    }
 };

 return (
    <div>
      <h2>Add New Key Language</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Key language added successfully</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Language:</label>
          <input type="text" value={language} onChange={handleChange} />
        </div>
        <button type="submit">Add Key Language</button>
      </form>
      <h2>Key Languages</h2>
      {loading ? (
        <p>Loading languages...</p>
      ) : (
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>
              {lang.language}
              <button onClick={() => handleDelete(lang.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
 );
};

export default AddKeyLang;
