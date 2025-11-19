import React from "react";
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
import qrCode from "../assets/TechStrota.jpeg"; // <-- ADD YOUR QR IMAGE

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message Sent Successfully!");
    reset();
  };

  return (
    <div className="contact-container">

      {/* HEADER */}
      <div className="contact-header">
        <h2 className="title">Get In Touch</h2>
        <p className="subtitle">We’d love to hear from you!</p>
      </div>

      <main className="contact-main">

        {/* LEFT SIDE – CONTACT INFO + QR */}
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

          {/* SOCIAL ICONS */}
          <h3 className="social-title">Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>

          {/* QR SCANNER BOX */}
          <div
            className="qr-box"
            onClick={() => window.open("https://maps.app.goo.gl/REY574k3NQskJkqQ6", "_blank")}
          >
            <img src={qrCode} alt="QR Code" />
            <p style={{ marginTop: "8px", fontWeight: "600", color: "#335c31" }}>
              Scan or Click to Visit TechStrota Vadodara
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – CONTACT FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">

          <h2>Contact Form</h2>

          {/* Name */}
          <div className="form-group">
            <input type="text" required {...register("name")} />
            <label>Name</label>
            <span className="line"></span>
          </div>

          {/* Email */}
          <div className="form-group">
            <input type="email" required {...register("email")} />
            <label>Email</label>
            <span className="line"></span>
          </div>

          {/* Phone */}
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

          {/* Message */}
          <div className="form-group textarea-group">
            <textarea rows="4" required {...register("message")}></textarea>
            <label>Your Message</label>
            <span className="line"></span>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>

        </form>
      </main>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        className="whatsapp-btn"
        href="https://wa.me/918128840055"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
