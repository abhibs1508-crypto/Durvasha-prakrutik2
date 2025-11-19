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
} from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message Sent Successfully!");
    reset();
  };

  return (
      <div className="contact-container">

        <div className="contact-header">
          <h2 className="title">Get In Touch</h2>
          <p className="subtitle">We’d love to hear from you!</p>
        </div>
    
      <main className="contact-main">
      {/* LEFT SIDE – CONTACT INFO */}
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
      </div>

      {/* RIGHT SIDE – CONTACT FORM (SMALL SIZE) */}
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form small-form">
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
      </div>
  );
}
