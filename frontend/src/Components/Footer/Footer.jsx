import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-title">Our Stories</h3>
          <p className="footer-text">
            A Moroccan platform for storytelling, where individuals and startups share their inspiring narratives in a free creative space.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">Individual Stories</a></li>
            <li><a href="/">Startup Stories</a></li>
            <li><a href="/tellstory">Share Your Story</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact-info">
            <li>Email: info@ourstories.ma</li>
            <li>Phone: +212 6 12 34 56 78</li>
            <li>Address: Rabat, Morocco</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Made with <FaHeart className="heart-icon" /> in Morocco | &copy; {new Date().getFullYear()} Our Stories. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;