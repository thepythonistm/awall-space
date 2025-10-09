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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setIsSubmitting(true);

    try {
      // No CSRF needed now
      const response = await apiClient.post("/user/register/", formData);

      console.log("Registration successful:", response.data);
      navigate("/signin");
    } 
    catch (err) {
      if (err.response) {
        console.error("Registration error data:", err.response.data);
        setError(err.response.data || { non_field_errors: ["Registration failed."] });
      } else if (err.request) {
        setError({ non_field_errors: ["No response from server. Check backend or CORS."] });
        console.error("Network error:", err.request);
      } else {
        setError({ non_field_errors: [err.message] });
        console.error("Error:", err.message);
      }
    } 
    finally {
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

              <button className="signup-btn" type="submit">
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
