import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import heroVideo from "../assets/bg_video.mp4";
import aboutImg from "../assets/about.jpg";
import service1 from "../assets/service1.jpeg";
import service2 from "../assets/service2.jpeg";
import service3 from "../assets/service3.jpeg";
import service4 from "../assets/gallery/infrastructure/i3.jpeg";
import service5 from "../assets/gallery/varieties/v1.jpeg";
import service6 from "../assets/gallery/varieties/v2.jpeg";

import farmer1 from "../assets/farmer.jpg";
import farmer2 from "../assets/farmer2.jpeg";
import farmer3 from "../assets/farmer3.jpeg";
import farmer4 from"../assets/gallery/farmers/f5.jpeg";
import farmer5 from "../assets/gallery/farmers/f3.jpeg"
import c1 from "../assets/gallery/cultivation/c1.jpeg";
import c2 from "../assets/gallery/cultivation/c2.jpeg";
import c3 from "../assets/gallery/cultivation/c3.jpeg";
import c4 from "../assets/gallery/cultivation/c4.jpeg";

import "./Home.css";

export default function Home() {
  // Scroll reveal effect
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        }),
      { threshold: 0.1 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Testimonial carousel state
  const testimonials = [
    { img: farmer1, name: "Ramesh Patel", text: "Organic methods increased my yield by 30%!" },
    { img: farmer2, name: "Sita Sharma", text: "Sustainable practices improved my soil health." },
    { img: farmer3, name: "Rajesh Kumar", text: "Great consultation and natural fertilizers." },
    { img: farmer4, name: "Anita Verma", text: "I now sell organic crops at premium prices." },
    { img: farmer5, name: "Vikram Singh", text: "Eco-friendly solutions helped me reduce costs." },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-root">
      {/* Hero Section */}
      <section className="hero reveal">
        <video className="hero-video" autoPlay muted loop src={heroVideo}></video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Durvasha Prakrutik</h1>
          <h1 className="hero-heading">Nurturing Nature With Purity</h1>

          <p>Organic farming solutions for sustainable growth and healthy soil.</p>
          <div className="hero-buttons">
            <a href="/about" className="btn primary">Learn More</a>
            <a href="/contact" className="btn ghost">Contact Us</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about reveal">
        <div className="about-container">
          <div className="about-img-wrapper">
            <img src={aboutImg} alt="About" className="about-img" />
          </div>
          <div className="about-text">
            <h2>About Durvasha Prakrutik</h2>
            <p>
              We empower farmers with organic techniques that improve soil health, reduce chemical dependency,
              and increase crop yield. Our mission is to create sustainable farming practices for a healthier planet.
            </p>
            <ul>
              <li>Certified Organic Fertilizers</li>
              <li>Soil Enrichment Programs</li>
              <li>Crop Rotation & Sustainable Farming</li>
              <li>Water Conservation Practices</li>
              <li>Expert Farm Consultation</li>
            </ul>
            <p>Join thousands of farmers benefiting from natural and sustainable farming methods.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose reveal">
        <h2>Why Choose Us</h2>
        <div className="why-cards">
          {[
            { title: "Organic Expertise", desc: "Years of experience in certified organic farming.", icon: "🌱" },
            { title: "Sustainable Methods", desc: "Practices that protect soil and environment.", icon: "💧" },
            { title: "Increased Yield", desc: "Natural techniques to boost productivity.", icon: "🌾" },
            { title: "Expert Guidance", desc: "Professional farm consultancy.", icon: "📈" },
            { title: "Community Support", desc: "Helping farmers network and grow together.", icon: "🤝" },
            { title: "Advanced Solutions", desc: "Modern tools with traditional wisdom.", icon: "🛠️" },
          ].map((card, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services reveal">
        <h2>Our Services</h2>
        <p className="section-desc">Providing innovative solutions for organic farming.</p>
        <div className="service-cards">
          {[service1, service2, service3, service4, service5, service6].map((img, i) => (
            <div key={i} className="card service-card">
              <img src={img} alt={`Service ${i + 1}`} />
              <h3>Service {i + 1}</h3>
              <p>High-quality solution tailored for sustainable agriculture and soil enrichment.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial reveal">
  <h2>What Our Farmers Say</h2>

  <div className="testimonial-slider fade-anim">
    
    {/* Prev Button */}
    <button className="prev-btn" onClick={prevTestimonial}>Previous</button>

    {/* Testimonial Card */}
    <div className="testimonial-card">
      <img
        src={testimonials[currentTestimonial].img}
        alt={testimonials[currentTestimonial].name}
      />

      {/* Animated Stars */}
      <div className="stars">⭐⭐⭐⭐⭐</div>

      <blockquote>
        {testimonials[currentTestimonial].text}
      </blockquote>

      <p className="farmer-name">{testimonials[currentTestimonial].name}</p>
      <p className="farmer-location">📍 Gujarat, India</p>

      <p className="farmer-extra">
        "Durvasha Prakrutik supported me with natural fertilizers, soil
        improvement techniques and step-by-step guidance. My crop quality and
        market value improved significantly."
      </p>
    </div>

    {/* Next Button */}
    <button className="next-btn" onClick={nextTestimonial}>Next</button>
  </div>

  {/* Dots Indicator */}
  <div className="testimonial-dots">
    {testimonials.map((_, index) => (
      <span
        key={index}
        className={`dot ${currentTestimonial === index ? "active" : ""}`}
        onClick={() => setCurrentTestimonial(index)}
      ></span>
    ))}
  </div>
</section>

      {/* Flowing Image Slider Section */}
      <section className="flow-gallery reveal">
        <h2>Our Farm Highlights</h2>
        <div className="flow-container">
          <div className="flow-track">
            {[c1, c2, c3, c4, c1, c2, c3, c4].map((img, index) => (
              <img src={img} alt={`Farm ${index + 1}`} key={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
