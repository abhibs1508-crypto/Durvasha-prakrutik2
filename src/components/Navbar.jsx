import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar fixed-nav">
        <div className="navbar-container">

          {/* Logo */}
          <div className="logo" onClick={closeMenu}>
            <img src={logo2} alt="Durvasha Prakrutik" />
            <span>Durvasha Prakrutik</span>
          </div>

          {/* Mobile toggle */}
          <div className={`menu-toggle ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>

          {/* Navigation links */}
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
            <li><NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink></li>
            <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          </ul>

        </div>
      </nav>

      {/* Auto spacing to stop overlapping */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
