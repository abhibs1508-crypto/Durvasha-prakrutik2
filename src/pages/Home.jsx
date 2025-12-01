import React, { useEffect, useState, useRef } from "react";
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
import farmer4 from "../assets/gallery/farmers/f5.jpeg";
import farmer5 from "../assets/gallery/farmers/f3.jpeg";

import c1 from "../assets/gallery/cultivation/c1.jpeg";
import c2 from "../assets/gallery/cultivation/c2.jpeg";
import c3 from "../assets/gallery/cultivation/c3.jpeg";
import c4 from "../assets/gallery/cultivation/c4.jpeg";

import "./Home.css";

export default function Home() {
  // Scroll reveal for sections
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // subtle parallax for elements with .parallax
  useEffect(() => {
    const handler = () => {
      const items = document.querySelectorAll(".parallax");
      items.forEach((el) => {
        const speed = Number(el.dataset.speed || 0.3);
        const rect = el.getBoundingClientRect();
        const y = (window.scrollY - rect.top + window.innerHeight / 2) * (speed / 100);
        el.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Testimonials (swipe + auto)
  const testimonials = [
    { img: farmer1, name: "Ramesh Patel", text: "Organic methods increased my yield by 30%!" },
    { img: farmer2, name: "Sita Sharma", text: "Sustainable practices improved my soil health." },
    { img: farmer3, name: "Rajesh Kumar", text: "Great consultation and natural fertilizers." },
    { img: farmer4, name: "Anita Verma", text: "I now sell organic crops at premium prices." },
    { img: farmer5, name: "Vikram Singh", text: "Eco-friendly solutions helped me reduce costs." },
  ];
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const autoRef = useRef(null);

  // Auto slide every 3 seconds
  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAuto() {
    stopAuto();
    autoRef.current = setInterval(() => {
      setCurrent((s) => (s + 1) % testimonials.length);
    }, 3000); // 3s as requested
  }
  function stopAuto() {
    if (autoRef.current) clearInterval(autoRef.current);
  }

  // Swipe support for testimonial track
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let dx = 0;
    let dragging = false;

    const onStart = (e) => {
      stopAuto();
      dragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      el.style.transition = "none";
    };
    const onMove = (e) => {
      if (!dragging) return;
      const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      dx = clientX - startX;
      el.style.transform = `translateX(${dx}px)`;
    };
    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      el.style.transition = "transform 0.45s ease";
      el.style.transform = "";
      if (Math.abs(dx) > 70) {
        if (dx < 0) setCurrent((s) => (s + 1) % testimonials.length);
        else setCurrent((s) => (s - 1 + testimonials.length) % testimonials.length);
      }
      dx = 0;
      startAuto();
    };

    el.addEventListener("mousedown", onStart);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);

    return () => {
      el.removeEventListener("mousedown", onStart);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);

      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [testimonials.length]);

  // Services tilt micro interaction (subtle)
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const onMove = (e) => {
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        el.style.transform = `perspective(800px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateZ(6px)`;
      });
    };
    const onLeave = () => {
      cards.forEach((el) => (el.style.transform = ""));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="home-root">
      {/* HERO */}
      <section className="hero reveal">
        <video className="hero-video" src={heroVideo} autoPlay muted loop playsInline />
        <div className="hero-overlay" />
        <div className="hero-content parallax" data-speed="6">
          {/* title with gradient highlight background */}
          <div className="hero-title-wrap">
            <h1 className="hero-heading">Durvasha Prakrutik</h1>
            <div className="hero-title-bg" aria-hidden />
          </div>

          <p className="hero-subheading">Nurturing Nature With Purity — sustainable farming solutions.</p>
          <div className="hero-buttons">
            <a className="btn primary" href="/about">Learn More</a>
            <a className="btn ghost" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Separator wave */}
      <div className="separator">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0,20 C300,120 900,-20 1200,60 L1200,100 L0,100 Z" fill="#f0fff4" /></svg>
      </div>

      {/* ABOUT — Split layout + gradient premium cards (Style C) */}
      <section className="about reveal" id="about">
        <div className="about-container">
          <div className="about-img-wrapper parallax" data-speed="3">
            <img src={aboutImg} alt="About Durvasha" className="about-img" />
            <div className="about-pill top">Certified Organic</div>
            <div className="about-pill bottom">Farmer Support</div>
          </div>

          <div className="about-text">
            <h2 className="animated-heading">Who We Are</h2>
            <p className="lead">
              Durvasha Prakrutik blends traditional wisdom with modern ecological practices. We support farmers with
              knowledge, certified organic inputs, market access and continuous on-field training.
            </p>

            <div className="about-grid">
              <div className="about-grid-item">
                <h4>Our Mission</h4>
                <p>Enable regenerative farming and fair livelihoods for smallholders.</p>
              </div>
              <div className="about-grid-item">
                <h4>Our Vision</h4>
                <p>Restore soil health and build resilient rural economies.</p>
              </div>
              <div className="about-grid-item">
                <h4>Programs</h4>
                <p>Soil labs, compost training, seed trials & water-saving clinics.</p>
              </div>
              <div className="about-grid-item">
                <h4>Impact</h4>
                <p>2,000+ acres transitioned, improved incomes and healthier soils.</p>
              </div>
            </div>

            {/* Gradient Premium Cards (Style C) */}
            <div className="about-feature-cards">
              <div className="feature-card premium">
                <div className="feature-icon">🌱</div>
                <h4>Soil First</h4>
                <p>Data-driven soil programs that rebuild fertility and structure.</p>
              </div>
              <div className="feature-card premium">
                <div className="feature-icon">🤝</div>
                <h4>Farmer Centric</h4>
                <p>On-field mentoring, cooperative formation & market connect.</p>
              </div>
              <div className="feature-card premium">
                <div className="feature-icon">📚</div>
                <h4>Training</h4>
                <p>Hands-on workshops: composting, intercropping, pest management.</p>
              </div>
              <div className="feature-card premium">
                <div className="feature-icon">🔬</div>
                <h4>Testing</h4>
                <p>Soil & seed testing to design farm-specific plans.</p>
              </div>
            </div>

            <ul className="about-list">
              <li>Tailored farm plans & on-field training</li>
              <li>Certified organic inputs and traceability</li>
              <li>Market linkages for premium organic produce</li>
            </ul>

            <div className="about-cta">
              <a className="btn primary" href="/programs">Explore Programs</a>
              <a className="btn ghost" href="/join">Join Farmers</a>
            </div>
          </div>
        </div>
      </section>

      {/* Separator flipped */}
      <div className="separator flip">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0,80 C300,0 900,100 1200,20 L1200,100 L0,100 Z" fill="#ffffff" /></svg>
      </div>

      {/* WHY CHOOSE US (Neon glow cards) */}
      <section className="why-choose reveal">
        <h2 className="animated-heading">Why Farmers Trust Us</h2>
        <div className="why-cards">
          {[
            { icon: "🌱", title: "Organic Expertise", desc: "Certified methods & proven practices." },
            { icon: "💧", title: "Water Wise", desc: "Efficient irrigation & conservation." },
            { icon: "🌾", title: "Higher Yield", desc: "Yield improvements via soil health." },
            { icon: "📈", title: "Market Ready", desc: "Access to premium organic markets." },
            { icon: "🤝", title: "Community", desc: "Farmer networks and mentorship." },
            { icon: "🛠️", title: "Tools & Training", desc: "Practical kits and on-field help." },
          ].map((c, i) => (
            <div key={i} className="why-card neon">
              <div className="why-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="feature-glow" />
            </div>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="separator">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0,0 C300,100 900,0 1200,80 L1200,100 L0,100 Z" fill="#f9fff8" /></svg>
      </div>

      {/* SERVICES (3D tilt + improved content styling) */}
      <section className="services reveal">
        <h2 className="animated-heading">Our Services</h2>
        <p className="section-desc">Practical, eco-friendly services to help your farm thrive.</p>

        <div className="service-cards">
          {[
            { img: service1, title: "Soil Enrichment", desc: "Tailored composts & micronutrients." },
            { img: service2, title: "Organic Inputs", desc: "Certified organic seeds & fertilizers." },
            { img: service3, title: "Training", desc: "Hands-on workshops & on-field mentoring." },
            { img: service4, title: "Irrigation", desc: "Water-efficient systems and consulting." },
            { img: service5, title: "Seed Varieties", desc: "Adapted seeds for local climates." },
            { img: service6, title: "Supply Chain", desc: "Market linkages and aggregation support." },
          ].map((s, i) => (
            <div key={i} className="service-card tilt">
              <img src={s.img} alt={s.title} />
              <div className="service-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <a className="service-link" href="/services">Learn more →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (Auto-move every 3s, swipeable) */}
      <section className="testimonial reveal">
        <h2 className="animated-heading">What Our Farmers Say</h2>

        <div className="testimonial-wrap">
          <button className="prev-btn" onClick={() => { stopAuto(); setCurrent((s) => (s - 1 + testimonials.length) % testimonials.length); startAuto(); }} aria-label="Previous">‹</button>

          <div className="testimonial-track" ref={trackRef}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card ${i === current ? "active" : i === (current + 1) % testimonials.length ? "next" : ""}`}
                aria-hidden={i === current ? "false" : "true"}
              >
                <img src={t.img} alt={t.name} />
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <blockquote>{t.text}</blockquote>
                <p className="farmer-name">{t.name}</p>
                <p className="farmer-location">📍 Gujarat, India</p>
              </div>
            ))}
          </div>

          <button className="next-btn" onClick={() => { stopAuto(); setCurrent((s) => (s + 1) % testimonials.length); startAuto(); }} aria-label="Next">›</button>
        </div>

        <div className="dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}></button>
          ))}
        </div>
      </section>

      {/* OUR FARM HIGHLIGHTS — Dual-layer sliding gallery (Style 1) */}
      <section className="flow-gallery reveal">
        <h2 className="animated-heading">Our Farm Highlights</h2>

        <div className="flow-outer">
          {/* top strip — moves left */}
          <div className="flow-strip flow-top" aria-hidden>
            {[c1, c2, c3, c4, c1, c2, c3, c4].map((img, i) => (
              <div key={`t-${i}`} className="flow-item">
                <img src={img} alt={`Farm top ${i}`} />
              </div>
            ))}
          </div>

          {/* bottom strip — moves right */}
          <div className="flow-strip flow-bottom" aria-hidden>
            {[c4, c3, c2, c1, c4, c3, c2, c1].map((img, i) => (
              <div key={`b-${i}`} className="flow-item">
                <img src={img} alt={`Farm bottom ${i}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2 className="animated-heading">Ready to Transform Your Farm?</h2>
        <p>Get personalized plans, training and certified organic inputs. Let's grow together.</p>
        <a className="btn primary" href="/contact">Get Started</a>
      </section>

      <Footer />
    </div>
  );
}
