import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import apiClient from "../apiClient";
import Dashboard from "../Dachboard/Dashboard";
import Footer from "../Footer/Footer";

const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiClient.post("/user/login/", credentials, { withCredentials: true });
      const { access, refresh, username } = response.data;

      if (access && refresh) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("username", username);
        apiClient.defaults.headers["Authorization"] = `Bearer ${access}`;
        navigate("/");
      } else {
        setError("Token not received, please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.detail || "Login failed, please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Dashboard />
      <div className="login">
        <h1 className="login-txt">Welcome back 👋</h1>
        <p className="login-small">Dive into real stories, real experiences</p>

        <div className="form-img">
          <form onSubmit={handleSubmit} className="form-login">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={credentials.username}
              className="username-login"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              className="password-login"
              placeholder="Password"
              required
            />
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {error && <p className="login-error">{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
