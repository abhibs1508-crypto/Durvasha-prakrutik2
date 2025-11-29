import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import "./contact.css";
import qrCode from "../assets/TechStrota.jpeg";
import durvaasaLogo from "../assets/logo2.png";
import Footer from "../components/Footer";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message Sent Successfully!");
    reset();
  };

  useEffect(() => {
    const qrBox = document.querySelector(".qr-box");
    const form = document.querySelector(".contact-form");

    // Add animation class on load
    qrBox.classList.add("slide-in");
    form.classList.add("slide-in");
  }, []);

  return (
    <div className="contact-container">

      <div className="contact-header">
        <h2 className="title fancy-title">Get In Touch</h2>
        <p className="subtitle">We’d love to hear from you!</p>
      </div>

      <main className="contact-main">

        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p>+91 81288 40055</p>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>info@techstrota.com</p>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Vadodara, Gujarat, India</p>
          </div>

          <h3 className="social-title">Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>

          {/* QR BOX WRAPPER */}
          <div className="qr-box-wrapper">
            <div
              className="qr-box"
              onClick={() =>
                window.open("https://maps.app.goo.gl/REY574k3NQskJkQ6", "_blank")
              }
            >
              <img className="brand-logo glow" src={durvaasaLogo} alt="Brand Logo" />
              <img src={qrCode} alt="QR Code" className="qr-img" />
            </div>

            <p className="qr-text">
              Scan or Click to Visit TechStrota Vadodara
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">

          <h2>Contact Form</h2>

          <div className="form-group">
            <input type="text" required {...register("name")} />
            <label>Name</label>
            <span className="line"></span>
          </div>

          <div className="form-group">
            <input type="email" required {...register("email")} />
            <label>Email</label>
            <span className="line"></span>
          </div>

          <div className="form-group">
            <input
              type="tel"
              required
              {...register("phone")}
              pattern="[0-9]{10}"
              maxLength="10"
            />
            <label>Phone</label>
            <span className="line"></span>
          </div>

          <div className="form-group textarea-group">
            <textarea rows="4" required {...register("message")}></textarea>
            <label>Your Message</label>
            <span className="line"></span>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </main>

      <a
        className="whatsapp-btn"
        href="https://wa.me/918128840055"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>

      <Footer />
    </div>
  );
}
