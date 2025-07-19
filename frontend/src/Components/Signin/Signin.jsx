import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import apiClient from "../apiClient";
import Dashboard from "../Dachboard/Dashboard";
import Footer from "../Footer/Footer";
const Signin = () => {
    const navigate = useNavigate();
    const[credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const[error, setError] = useState(null);
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        const{username, password} = credentials;
        try{
            const response = await apiClient.post("/user/login/", {username, password});
            console.log("Login response:", response);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            if (accessToken && refreshToken){
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_TOKEN", refreshToken);
                apiClient.defaults.headers["authorization"] = `Bearer ${accessToken}`;
                navigate('/');
            } else {
                setError("Token not received,try again");
            }
        } catch(error){
            console.error("Login erro:", error);
            setError(error.response?.data?.detail || "Login failed, please try again");
        }
    };
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return(
        <div className="login-container">
            <Dashboard />
            <div className="login">
                <strong className="login-txt">Welcome back👋</strong><br />
                <small className="login-small">dive into real stories, real experiences</small>
                <div className="form-img">
                    <div className="form-login">
                        <form onSubmit={handleSubmit}>
                            <input type="username" onChange={handleChange} name="username" className="username-login" placeholder="username"/>
                            <input type="password" onChange={handleChange} name="password" className="password-login" placeholder="password"/><br />
                            <button type="submit" className="submit-btn">Signin</button>
                        </form>
                </div>
                <div className="signin-pic"><img src="./images/signinpic.jpg" alt="" /></div>
                <div className="mobile-img"><img src="./images/vecteezy_wireframe-sign-up-and-log-in-ui-elements_49109257.jpg" alt="" /></div>
            </div>
            </div>
            <Footer />

        </div>
    )
}
export default Signin;