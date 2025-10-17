import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import apiClient from "../apiClient";
import "./Voicerecorder.css";

const Voicerecorder = () => {
    const [voiceBlob, setVoiceBlob] = useState(null);
    const [voicePreview, setVoicePreview] = useState(null);

    const handleRecordingComplete = (blob) => {
        setVoiceBlob(blob);
        setVoicePreview(URL.createObjectURL(blob));
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("title", "My Voice Story");
        formData.append("description", "This is my voice story");
            if (voiceBlob) {
                formData.append("audio", voiceBlob, "voice_story.webm");
            }

    const res = await apiClient.post("", {
      body: formData,
    });
    if (res.ok) alert("Voice story uploaded!");
  };
  const handleDelete = () => {
    setVoiceBlob(null);
    setVoicePreview(null)
  }
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

      <button
        onClick={handleUpload}
        className="record-btn"
      >
        Upload
      </button>
    </div>
  );
};
export default Voicerecorder;