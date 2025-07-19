import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Components/Home/Home';
import Tellstory from './Components/Tellstory/Tellstory';
import Dashboard from './Components/Dachboard/Dashboard';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Profile from './Components/Profile/Profile';
import Logout from './Components/Logout/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tellstory" element={<Tellstory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />


      </Routes>
    </Router>
  );
}

export default App;
