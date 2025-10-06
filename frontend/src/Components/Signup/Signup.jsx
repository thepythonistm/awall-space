import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import "./Signup.css";
import Dashboard from "../Dachboard/Dashboard";
import Footer from "../Footer/Footer";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password1: "",
  });
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const trimmed = cookie.trim();
        if (trimmed.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ handleSubmit triggered");
    alert("Form submitted!");

    setError({});
    setIsSubmitting(true);

    try {
      await apiClient.get("/user/csrf/", { withCredentials: true });

      const csrftoken = getCookie("csrftoken");

      const response = await apiClient.post(
        "/user/register/",
        formData,
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        }
      );

      console.log("Registration successful:", response.data);
      navigate("/signin");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError(error.response?.data || { non_field_errors: ["Registration failed. Please try again."] });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <div>
      <Dashboard />
     <div className="signup">
      <div className="form-img">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <strong className="callaction">Let’s get you started</strong><br />

            <input 
              type="text" 
              name="username" 
              onChange={handleChange} 
              value={formData.username}
              className="username" 
              placeholder="Enter your special username 👌"
            />
            {error.username && <p className="error-message">{error.username}</p>}<br />

            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              value={formData.email}
              className="email" 
              placeholder="Enter your email"
            />
            {error.email && <p className="error-message">{error.email}</p>}<br />

            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              value={formData.password}
              className="password" 
              placeholder="Enter a strong password"
            />
            {error.password && <p className="error-message">{error.password}</p>}<br />

            <input 
              type="password" 
              name="password1" 
              onChange={handleChange} 
              value={formData.password1}
              className="password1" 
              placeholder="Confirm your password"
            />
            {error.password1 && <p className="error-message">{error.password1}</p>}<br />

            <button className="signup-btn" type="submit" >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button><br />

            {error.non_field_errors && <p className="error-message">{error.non_field_errors}</p>}

            <a className="signin-txt" href="/signin">Already have an account? 👀 Sign in</a>
          </form>
        </div>

      
      </div>
    </div>
    <Footer />
     </div>
  );
};

export default Signup;
