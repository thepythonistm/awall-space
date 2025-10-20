import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import apiClient from "../apiClient";
import "./Voicerecorder.css";

const Voicerecorder = ({ onAudioReady }) => {
  const [voicePreview, setVoicePreview] = useState(null);

  const handleRecordingComplete = (blob) => {
    setVoicePreview(URL.createObjectURL(blob));
    onAudioReady(blob); 
  };

  const handleDelete = () => {
    setVoicePreview(null);
    setVoicePreview(null);
  };

  return (
    <div className="recorder-container">
      <h2 className="recorder-txt">🎙️ Share Your Voice Story</h2>

      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
      />

      {voicePreview && (
        <div className="voice-prev">
          <audio controls src={voicePreview}></audio><br />
          <button onClick={handleDelete} className="delete-btn">
            🗑️ Delete
          </button>
        </div>
      )}


    </div>
  );
};

export default Voicerecorder;
