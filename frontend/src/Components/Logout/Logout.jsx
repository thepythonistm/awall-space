import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import { BiLogOutCircle } from "react-icons/bi";
import React from "react";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  const refresh = localStorage.getItem("refresh");
  const access = localStorage.getItem("access");

  if (!refresh || !access) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/signin");
    return;
  }

  apiClient
    .post(
      "/user/logout/",
      { refresh },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login/");
    })
    .catch((err) => {
      console.error("Logout Failed", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login/");
    });
};

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        <BiLogOutCircle size={24} />
      </button>
    </div>
  );
};

export default Logout;
