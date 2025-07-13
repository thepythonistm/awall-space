import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Dashboard from "../Dachboard/Dashboard";
import apiClient from "../apiClient";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CommentModal from "../Comment/CommentModal";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [newComments, setNewComments] = useState({});
    const [activePost, setActivePost] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiClient.get("create/posts/");
                setPosts(response.data);
            } catch (error) {
                console.error("posts error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const toggleReadMore = (id, content) => {
        if (content.length <= 100) return;
        setExpandedPosts((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCommentChange = (postId, text) => {
        setNewComments((prev) => ({
            ...prev,
            [postId]: text,
        }));
    };

    const handleCommentSubmit = async (postId) => {
        const text = newComments[postId]?.trim();
        if (!text) return;

        try {
            const token = localStorage.getItem('access_token');
            await apiClient.post(
                `/create/posts/${postId}/comments/`,
                { content: text, post: postId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewComments((prev) => ({ ...prev, [postId]: '' }));
            fetchComments(postId);
        } catch (error) {
            console.error("Error submitting comment:", error.response || error);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const res = await apiClient.get(`/create/posts/${postId}/comments/`);
            setComments(res.data);
            setActivePost(postId);
        } catch (err) {
            console.error("Failed to load comments", err);
        }
    };

    const closeComments = () => {
        setActivePost(null);
        setComments([]);
    };

    return (
        <div>
            <Dashboard />
            <div className="home">
                <div className="text">
                    <h1>Your story deserves to be heard
                        Love❤️ <br /> life, Business🏷️ — all in one place</h1>
                    <p>Awall is a dynamic storytelling platform where every voice matters. <br /> Whether you're sharing a personal story of love, adventure, success, <br /> or growth, or you're a startup or brand looking to showcase your journey, <br /> Awall gives you the space to connect and inspire. Designed for both <br /> individuals and businesses, Awall blends real-life experiences with authentic <br /> brand storytelling. It's more than a blog or social platform — it’s a growing <br /> community where stories of life, business, and transformation are shared <br /> to motivate and engage. From personal milestones to startup success stories, <br /> Awall helps you share your journey, build your presence, and reach a wider audience.</p>
                </div>
                <div className="img-cont"><DotLottieReact src="https://lottie.host/e519bbea-21a7-488d-908c-d1698f37895f/Tkc5UccMto.lottie" loop autoplay /></div>

                <div className="buttons">
                    <button className="register" onClick={() => navigate('register')} >Register</button>
                    <button className="tell" onClick={() => navigate('tellstory')}>Tell Story</button>
                    <button className="collab" onClick={() => navigate('')}>Collaborate</button>
                </div>

                <h2 className="posts-h">Recent Posts 📝:</h2>
                <div className="home-posts">
                    {loading ? (
                        <p>Loading Posts...</p>
                    ) : (
                        posts?.map((post) => {
                            const isExpanded = expandedPosts[post.id];
                            const showToggle = post.content.length > 100;
                            const displayContent = isExpanded ? post.content : post.content.slice(0, 100);

                            return (
                                <div key={post.id} className={`story-post ${isExpanded ? "expanded" : ""}`}>
                                    <p className="story-p"><strong>{post.author.username}</strong></p>
                                    <p className="content-p">{displayContent}</p>
                                    <small className="time">{new Date(post.created_at).toLocaleString()}</small>
                                    {post.video && (
                                        <video className="video" controls>
                                            <source src={post.video} type="mp4" />
                                        </video>
                                    )}

                                    {showToggle && (
                                        <button className="read-more-btn" onClick={() => toggleReadMore(post.id, post.content)}>
                                            {isExpanded ? "Read Less" : "Read More"}
                                        </button>
                                    )}

                                    <div className="comment-btn-area">
                                        <button onClick={() => fetchComments(post.id)} className="comment-icon-btn">💬</button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {activePost && (
                <CommentModal 
                    post={posts.find(p => p.id === activePost)}
                    comments={comments}
                    onClose={closeComments}
                    onSubmit={() => handleCommentSubmit(activePost)}
                    onChange={(val) => handleCommentChange(activePost, val)}
                    newComment={newComments[activePost] || ''}
                />
            )}
        </div>
    );
};

export default Home;
