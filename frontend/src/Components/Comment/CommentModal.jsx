// Comment.jsx
import React from "react";
import "./CommentModal.css";

const CommentModal = ({ post, comments, onClose, onSubmit, onChange, newComment }) => {
  return (
    <>
      <div className="comment-backdrop" onClick={onClose}></div>
      <div className="comment-modal">
        <h3>Comments :</h3>
        <div className="comment-list">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment-item">
                <strong>{c.author.username}</strong>: {c.content}
                <small className="comment-time">
                  {new Date(c.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
        <div className="comment-input-area">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => onChange(e.target.value)}
            className="comment-input"
          />
          <button onClick={onSubmit} className="comment-submit-btn">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
