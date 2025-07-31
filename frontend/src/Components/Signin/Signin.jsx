import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import apiClient from "../apiClient";
import Dashboard from "../Dachboard/Dashboard";
import Footer from "../Footer/Footer";

const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { username, password } = credentials;

    try {
      const response = await apiClient.post("/user/login/", { username, password });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_TOKEN", refreshToken);
        apiClient.defaults.headers["authorization"] = `Bearer ${accessToken}`;
        navigate("/");
      } else {
        setError("Token not received, try again");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.detail || "Login failed, please try again");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
              className="username-login"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="password-login"
              placeholder="Password"
            />
            <button type="submit" className="submit-btn">Signin</button>
          </form>
                    <form onSubmit={handleSubmit} className="form-login1">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="username-login1"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="password-login1"
              placeholder="Password"
            />
            <button type="submit" className="submit-btn1">Signin</button>
          </form>
        </div>
        
        {error && <p className="login-error">{error}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default Signin;
