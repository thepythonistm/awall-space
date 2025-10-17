import React, { useState, useRef, useEffect } from 'react';
import './Tellstory.css';
import apiClient from '../apiClient';
import Dashboard from '../Dachboard/Dashboard';
import Footer from '../Footer/Footer';
import { AudioRecorder } from "react-audio-voice-recorder";
import Voicerecorder from '../Voicerecorder/Voicerecorder';

const Tellstory = () => {
  const [tellStory, setTellStory] = useState({ title: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
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
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage('Unauthorized: Please log in first.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', tellStory.title);
    formData.append('content', tellStory.text);
  

    try {
      await apiClient.post('create/posts/', formData, {
  headers: {
    Authorization: `Bearer ${token}`
  },

});

      setMessage('Your story was added successfully.');
      setTellStory({ title: '', text: '' });
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
    <>
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
      

          <div>
            <Voicerecorder />
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
      <Footer />
    </div>
    </>
  );
};

export default Tellstory;
