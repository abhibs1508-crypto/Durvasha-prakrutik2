import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import logo2 from "../assets/logo2.png";
import qrCode from "../assets/TechStrota.jpeg";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Glow Effect */}
      <div className="footer-glow"></div>

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section fade-up">
          <img src={logo2} alt="durvasha-Prakrutik" className="footer_logo" />
          <p>
            Your trusted source for natural and organic products.
            We deliver quality and care — straight from nature to you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section fade-up delay-1">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section fade-up delay-2">
          <h3>Contact</h3>
          <p>📞 +91 90237 56982</p>
          <p>📧 techstrote@gmail.com</p>
        </div>

        {/* Address + QR Code */}
        <div className="footer-section fade-up delay-3 address-with-qr">
          <h3>Address</h3>
          <p>📍 Vadodara, Gujarat, India</p>

          {/* QR CODE BOX */}
          <div
            className="qr-footer-box"
            onClick={() =>
              window.open("https://maps.app.goo.gl/m2Xjm7WUQjKR2MBX8", "_blank")
            }
          >
            <img src={logo2} className="qr-mini-logo" alt="logo" />
            <img src={qrCode} className="qr-footer-img" alt="QR Code" />
          </div>

          <p className="qr-footer-text">Scan to Visit TechStrota</p>
        </div>

        {/* Social */}
        <div className="footer-section fade-up delay-4 social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Tech-Strota/61550062532070/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/techstrota/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@techstrota" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Made by 
          <span className="highlight"> Team-1</span> | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
