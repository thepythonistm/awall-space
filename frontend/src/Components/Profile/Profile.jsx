import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import './Profile.css';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ bio: '', website: '', image: null });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiClient.get('/user/profile/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                setProfile(res.data);
                setFormData({
                    bio: res.data.bio || '',
                    website: res.data.website || '',
                    image: null  // keep uploaded file here
                });
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            }
        };
        fetchProfile();
    }, []);

    const handleNavigate = () => {
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        let website = formData.website.trim();
        if (website && !website.startsWith('http')) {
            website = 'https://' + website;
        }

        const data = new FormData();
        data.append('bio', formData.bio);
        data.append('website', website);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const res = await apiClient.patch('/user/profile/', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setProfile(res.data);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-cont">
            <h2 className="profile-header">My Profile</h2>

            <label htmlFor="image-upload" className="image-upload-wrapper">
  {profile.image ? (
    <img src={profile.image} alt="Profile" className="profile-image" />
  ) : (
    <div className="placeholder-image">No Image</div>
  )}
</label>

{editMode && (
  <input
    id="image-upload"
    className="file-input"
    type="file"
    name="image"
    accept="image/*"
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
    }
  />
)}

            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>

            {editMode ? (
                <>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="text-field"
                        placeholder="Your bio..."
                    />
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="website-ipt"
                        placeholder="https://example.com"
                    />
                    <button onClick={handleSave} className="save-button">Save</button>
                </>
            ) : (
                <>
                    <p className="bio-txt"><strong>Bio:</strong> {profile.bio || 'N/A'}</p>
                    <p className="site-url">
                        <strong>Website:</strong>{" "}
                        {profile.website ? (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                {profile.website}
                            </a>
                        ) : 'N/A'}
                    </p>
                    <button onClick={() => setEditMode(true)} className="edit-btn">Edit</button>
                </>
            )}

            <button className="back-btn" onClick={handleNavigate}>
                <IoArrowBackCircle />
            </button>
        </div>
    );
};

export default Profile;
