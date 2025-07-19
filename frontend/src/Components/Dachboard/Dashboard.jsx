import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShareAltSquare } from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import "./Dashboard.css";
import Logout from "../Logout/Logout";
const Dashboard = () => {
  const[menuOpen, setMenuOpen] = useState(false);
  const handleShare = async () => {
    const currentURL = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check this out!",
          url: currentURL,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentURL);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Copy failed:", err);
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <div className="dashboard">
      <img className="logo" src="./images/media.png" alt="awall-logo" />
      <ul className="li-items">
        <li><a href="/">Home</a></li>
        <li><a href="tellstory">Tell Story</a></li>
        <li><a href="about">About</a></li>
        <li><a href="contact">Contact Us</a></li>
        <li><a href="signup">Get Started</a></li>
        <li><a href="signin">Login</a></li>
      </ul>
      <div className="mobile-menu">
        <button className="home-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <RxDropdownMenu />
        </button>
        {menuOpen && (
          <ul className="dropdown-menu">
            <li><a href="/">Home</a></li>
            <li><a href="tellstory">Tell Story</a></li>
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact Us</a></li>
            <li><a href="signup">Get Started</a></li>
            <li><a href="signin">Login</a></li>
          </ul>

        )}
      </div>
      <div className="dash-icons">
        <button className="share" onClick={handleShare}>
          <FaShareAltSquare />
        </button>
        <div className="logout-button"><Logout /></div>
        <a className="prof-icon" href="/profile"><CgProfile /></a>
      </div>
    </div>
  );
};

export default Dashboard;
