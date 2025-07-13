import React, { useState, useRef, useEffect } from 'react';
import './Tellstory.css';
import apiClient from '../apiClient';
import Dashboard from '../Dachboard/Dashboard';
import { RiVideoUploadFill } from "react-icons/ri";

const Tellstory = () => {
  const [tellStory, setTellStory] = useState({ title: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);
  const textareaRef = useRef(null);
  const inputRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [tellStory.text]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTellStory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadPercent(0);
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage('Unauthorized: Please log in first.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', tellStory.title);
    formData.append('content', tellStory.text);
    if (videoFile) {
      formData.append('video', videoFile);
    }

    try {
      await apiClient.post('create/posts/', formData, {
  headers: {
    Authorization: `Bearer ${token}`
  },
  onUploadProgress: (progressEvent) => {
    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    setUploadPercent(percent);
  },
});

      setMessage('Your story was added successfully.');
      setTellStory({ title: '', text: '' });
      setVideoFile(null);
    } catch (error) {
      console.error('Error response:', error.response);
      setMessage(
        error.response?.status === 401
          ? 'Unauthorized: Please log in again.'
          : `Error creating post: ${error.response?.data?.detail || error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='tellstory'>
      <Dashboard />
      <div className='create-container'>
        <div className='form-cont'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              className='title'
              value={tellStory.title}
              onChange={handleChange}
              placeholder='Enter a title📝'
              required
            />
            <br />
            <div className='textarea-wrapper'>
              <textarea
                ref={textareaRef}
                className='textarea'
                name='text'
                value={tellStory.text}
                onChange={handleChange}
                placeholder='Begin your story here🧱'
                required
                style={{
                  overflow: 'hidden',
                  resize: 'none',
                  minHeight: '200px',
                }}
              />
            </div>
                      <input
            type="file"
            accept="video/*"
            className="video-upload"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div className='icon-container'>
            <RiVideoUploadFill className='icon-upload' onClick={handleIconClick} />
            <p className='video-txt'>Upload your story video here (maximum 10 min)</p>
          </div>

          {uploadPercent > 0 && (
            <div className="upload-progress">
              <div className="upload-bar" style={{ width: `${uploadPercent}%` }} />
            </div>
          )}
          <div className='video-prev' >
            {videoFile && (
            <video  width="320" controls style={{ marginTop: '15px' }}>
              <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
              Your browser does not support the video tag.
            </video>
          )}
          </div>

          <div className='share-btn'>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Sharing...' : 'Share'}
            </button>
            {message && <p className='feedback'>{message}</p>}
          </div>
          </form>



        </div>
      </div>
    </div>
  );
};

export default Tellstory;
