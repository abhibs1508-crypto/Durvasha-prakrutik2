import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

// --- ASSETS ---
import heroVideo from "../assets/bg_video.mp4";
import aboutImg from "../assets/about.jpg";
import service1 from "../assets/service1.jpeg";
import service2 from "../assets/service2.jpeg";
import service3 from "../assets/service3.jpeg";
import service4 from "../assets/gallery/infrastructure/i3.jpeg";
import service6 from "../assets/gallery/varieties/v2.jpeg"; // Market
import farmer1 from "../assets/farmer.jpg";
import farmer2 from "../assets/farmer2.jpeg";
import farmer3 from "../assets/farmer3.jpeg";
import c1 from "../assets/gallery/cultivation/c1.jpeg";
import c2 from "../assets/gallery/cultivation/c2.jpeg";
import c3 from "../assets/gallery/cultivation/c3.jpeg";
import c4 from "../assets/gallery/cultivation/c4.jpeg";

import "./Home.css";

// --- DATA ---
const SERVICES = [
  { id: "01", title: "Soil Regeneration", desc: "Microbiome restoration & compost science.", img: service1 },
  { id: "02", title: "Organic Inputs", desc: "Certified bio-fertilizers & inputs.", img: service2 },
  { id: "03", title: "Smart Irrigation", desc: "Water conservation technology.", img: service4 },
  { id: "04", title: "Market Linkage", desc: "Direct premium buyer connections.", img: service6 },
  { id: "05", title: "Agronomy Advisory", desc: "Expert on-field mentorship.", img: service3 },
];

// REPLACED PRODUCTS WITH BLOG/JOURNAL
const BLOG_POSTS = [
  { category: "Technique", date: "Jan 28, 2026", title: "The Secret to Increasing Wheat Yield by 30%", img: c1 },
  { category: "Success Story", date: "Jan 15, 2026", title: "How Gujarat Farmers are Ditching Chemicals", img: c2 },
  { category: "Innovation", date: "Jan 02, 2026", title: "Why Micro-Irrigation is the Future of Cotton", img: service4 },
];

const METHODOLOGY_STEPS = [
  { num: "01", title: "The Scan", text: "We don't guess. We analyze soil biology at a microscopic level to understand the root cause of depletion.", img: c3 },
  { num: "02", title: "The Cure", text: "Application of our proprietary bio-culture blends to restore the natural carbon cycle.", img: service2 },
  { num: "03", title: "The Sow", text: "Selecting heirloom seeds that are genetically adapted to local climate resilience.", img: c4 },
  { num: "04", title: "The Harvest", text: "Reaping nutrient-dense, chemical-free produce that commands premium market rates.", img: c1 },
];

const TESTIMONIALS_DATA = [
  { img: farmer1, name: "Ramesh Patel", role: "Cotton Farmer", text: "My yield increased by 30% without chemicals. The soil texture has completely transformed.", location: "Gujarat" },
  { img: farmer2, name: "Sita Sharma", role: "Vegetable Grower", text: "Durvasha changed how I view farming. It is no longer a struggle, but a science.", location: "Rajasthan" },
  { img: farmer3, name: "Rajesh Kumar", role: "Wheat Farmer", text: "Their consultation saved my crop this season. Truly professional guidance.", location: "MP" },
  { img: c2, name: "Anita Verma", role: "Organic Exporter", text: "I finally get the premium price I deserve because the produce quality is unmatched.", location: "Maharashtra" },
];

// --- COMPONENT: WATERMARK HEADING ---
const SectionHeading = ({ eyebrow, title, watermark, dark }) => (
  <div className={`section-header ${dark ? 'dark-mode' : ''} reveal-up`}>
    <span className="header-eyebrow">{eyebrow}</span>
    <h2 className="header-title">
      {title}
      <span className="header-watermark">{watermark}</span>
    </h2>
    <div className="header-line"></div>
  </div>
);

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(0);

  // --- SCROLL ANIMATION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- PARALLAX EFFECT ---
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.setProperty("--scroll", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ultra-wrapper">
      {/* TEXTURE */}
      <div className="noise-texture"></div>

      {/* --- 1. HERO: CINEMATIC --- */}
      <section className="hero-portal">
        <div className="portal-video">
          <video src={heroVideo} autoPlay muted loop playsInline />
          <div className="portal-overlay"></div>
        </div>
        <div className="portal-content container">
          <div className="hero-frame reveal-up">
            <span className="hero-tag">EST. 2024 • REGENERATIVE ECOLOGY</span>
            <h1 className="hero-headline">
              Nature, <br />
              <span className="gold-script">Perfected by Science.</span>
            </h1>
            <p className="hero-lead">
              We bridge ancient Vedic wisdom with precision agronomy to heal the earth and empower the hands that feed us.
            </p>
            <div className="hero-btn-group">
              <a href="/about" className="btn-luxe primary">Our Philosophy</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ABOUT: SPLIT SCREEN --- */}
      <section className="section about-manifesto">
        <div className="container grid-split">
          <div className="text-side reveal-up">
            <SectionHeading 
              eyebrow="Who We Are" 
              title="Architects of the Soil" 
              watermark="ORIGIN" 
            />
            <p className="big-desc">
              Conventional farming strips the land. <span className="highlight">We rebuild it.</span> 
              Durvasha Prakrutik exists to prove that sustainability and profitability are partners, not enemies.
            </p>
            <div className="stat-strip">
              <div className="stat"><h3>2K+</h3><span>Acres Restored</span></div>
              <div className="stat"><h3>100%</h3><span>Residue Free</span></div>
            </div>
          </div>
          <div className="img-side reveal-up">
            <div className="img-mask"><img src={aboutImg} alt="About" /></div>
          </div>
        </div>
      </section>

      {/* --- 3. SERVICES: ACCORDION --- */}
      <section className="section services-premium bg-dark">
        <div className="container">
          <div className="section-header reveal-up">
            <h4 className="header-eyebrow">OUR EXPERTISE</h4>
            <h2 className="text-white" style={{fontFamily: 'var(--font-head)', fontSize:'3.5rem'}}>Holistic Solutions</h2>
          </div>
          <div className="accordion-wrapper reveal-up">
            {SERVICES.map((item, index) => (
              <div 
                key={item.id} 
                className={`acc-item ${activeService === index ? "active" : ""}`}
                onMouseEnter={() => setActiveService(index)}
              >
                <img src={item.img} alt={item.title} className="acc-bg" />
                <div className="acc-overlay"></div>
                <div className="acc-content">
                  <span className="acc-num">{item.id}</span>
                  <h3>{item.title}</h3>
                  <p className="acc-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. NEW: STICKY SCROLL METHODOLOGY (Unique!) --- */}
      <section className="section methodology-sticky bg-cream">
        <div className="container">
          <div className="sticky-layout">
            <div className="sticky-left">
              <SectionHeading 
                eyebrow="The Method" 
                title="From Seed to Soul" 
                watermark="PROCESS"
              />
              <p className="sticky-desc">
                A rigorous, four-step scientific process designed to restore fertility and maximize yield.
              </p>
              <a href="/services" className="btn-link">Learn Technical Details →</a>
            </div>
            
            <div className="scroll-right">
              {METHODOLOGY_STEPS.map((step, i) => (
                <div className="method-card reveal-up" key={i}>
                  <div className="m-img-box"><img src={step.img} alt={step.title} /></div>
                  <div className="m-content">
                    <span className="m-num">{step.num}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. NEW: GALLERY (Infinite Film Reel) --- */}
      <section className="section gallery-reel bg-dark">
        <div className="container">
           <SectionHeading 
              eyebrow="The Journal" 
              title="Nature in Motion" 
              watermark="GALLERY"
              dark={true}
            />
        </div>
        <div className="film-track-container">
          <div className="film-track">
            {/* Doubled for seamless loop */}
            {[c1, c2, c3, c4, farmer1, farmer2, service4, c1, c2, c3, c4, farmer1].map((img, i) => (
              <div className="film-frame" key={i}>
                <img src={img} alt="Gallery" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. NEW: BLOG / INSIGHTS (Replaces Products) --- */}
      <section className="section blog-editorial">
        <div className="container">
          <SectionHeading 
            eyebrow="Knowledge Hub" 
            title="The Cultivator's Journal" 
            watermark="INSIGHTS" 
          />
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <div className="blog-card reveal-up" key={i} style={{transitionDelay: `${i*100}ms`}}>
                <div className="blog-img">
                  <img src={post.img} alt={post.title} />
                  <span className="blog-cat">{post.category}</span>
                </div>
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <a href="/blog" className="blog-read">Read Article ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. TESTIMONIALS (PRESERVED AS REQUESTED) --- */}
      <section className="section testimonial-section bg-dark">
        <div className="container">
          <SectionHeading 
            eyebrow="Community Voices" 
            title="Stories of Impact" 
            watermark="TRUST"
            dark={true}
          />
          
          <div className="testimonial-display reveal-up">
            <div className="testimonial-list">
              {TESTIMONIALS_DATA.map((t, i) => (
                <div 
                  key={i} 
                  className={`t-dot-item ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                >
                  <img src={t.img} alt={t.name} />
                  <div className="t-meta">
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonial-quote-area">
              <span className="quote-mark">“</span>
              <p key={activeTestimonial} className="quote-text key-anim">
                {TESTIMONIALS_DATA[activeTestimonial].text}
              </p>
              <div className="quote-author">
                — {TESTIMONIALS_DATA[activeTestimonial].name}, <span className="gold-text">{TESTIMONIALS_DATA[activeTestimonial].role}</span>
              </div>
            </div>
          </div>
        </div>
      </section> 

      {/* --- 8. NEW: CTA (Cinematic Text Mask) --- */}
      <section className="section cta-mask">
        <div className="cta-video-bg">
          <video src={heroVideo} autoPlay muted loop playsInline />
        </div>
        <div className="cta-mask-content">
          <h2 className="mask-text">JOIN THE<br/>REVOLUTION</h2>
          <div className="cta-actions reveal-up">
            <p>Transform your land today.</p>
            <a href="/contact" className="btn-luxe primary">Get Started</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}