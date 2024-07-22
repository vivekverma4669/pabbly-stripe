import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    console.log('Uploading file:', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from server:', response.data);

      setSummary(response.data.summary);
      setError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
      setSummary('');
    }
  };

  return (
    <div>
      <h1>AI-Powered Content Summarization</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Summarize</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
