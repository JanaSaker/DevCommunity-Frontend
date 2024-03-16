import React, { useState } from 'react';
import axios from 'axios';

const AddKeyLangPage = () => {
 const [keyLang, setKeyLang] = useState({
    language: '',
 });

 const handleChange = (e) => {
    setKeyLang({ ...keyLang, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}keylangs`, keyLang);
      if (response.status === 201) {
        alert('Key language added successfully');
        // Optionally, clear the form or redirect the user
        setKeyLang({ language: '' });
      }
    } catch (error) {
      console.error('Error adding key language:', error);
      alert('Failed to add key language');
    }
 };

 return (
    <div>
      <h2>Add Key Language</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Language:
          <input type="text" name="language" value={keyLang.language} onChange={handleChange} required />
        </label>
        <button type="submit">Add Language</button>
      </form>
    </div>
 );
};

export default AddKeyLangPage;
