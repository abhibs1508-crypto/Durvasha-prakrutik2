import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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

  // -----------------------------------------
  // SUBMIT FORM → SEND TO LARAVEL API
  // -----------------------------------------
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/contacts",
        data
      );

      if (response.data.status === true) {
        alert("Message Sent Successfully!");
        reset(); // reset form
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        alert(
          "Validation Error:\n" +
            Object.values(errors).flat().join("\n")
        );
      } else {
        alert("Something went wrong! Server error.");
      }
    }
  };

  useEffect(() => {
    const qrBox = document.querySelector(".qr-box");
    const form = document.querySelector(".contact-form");

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

        {/* --------------------- LEFT SECTION --------------------- */}
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p>‪+91 81288 40055‬</p>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>info@techstrota.com</p>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Vadodara, Gujarat, India</p>
          </div>

          {/* Social Icons */}
          <h3 className="social-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Tech-Strota/61550062532070/" className="social-icon"><FaFacebook /></a>
            <a href="https://www.instagram.com/techstrota/" className="social-icon"><FaInstagram /></a>
            <a href="https://twitter.com/techstrota" className="social-icon"><FaLinkedin /></a>
            <a href="https://www.youtube.com/@techstrota" className="social-icon"><FaYoutube /></a>
          </div>

          {/* QR SECTION */}
          <div className="qr-box-wrapper">
            <div
              className="qr-box"
              onClick={() =>
                window.open("https://maps.app.goo.gl/m2Xjm7WUQjKR2MBX8", "_blank")
              }
            >
              <img className="brand-logo glow" src={durvaasaLogo} alt="Brand Logo" />
              <img src={qrCode} alt="QR Code" className="qr-img" />
            </div>

            <p className="qr-text">Scan or Click to Visit TechStrota Vadodara</p>
          </div>
        </div>

        {/* --------------------- RIGHT FORM SECTION --------------------- */}
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <h2>Contact Form</h2>

          <div className="form-group">
            <input type="text" {...register("name")} required />
            <label>Name</label>
            <span className="line"></span>
          </div>

          <div className="form-group">
            <input type="email" {...register("email")} required />
            <label>Email</label>
            <span className="line"></span>
          </div>

          <div className="form-group">
            <input
              type="tel"
              {...register("phone")}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
            <label>Phone</label>
            <span className="line"></span>
          </div>

          <div className="form-group textarea-group">
            <textarea rows="4" {...register("message")} required></textarea>
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