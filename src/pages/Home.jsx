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

/* ============================
   STATIC SERVICES (Glass style)
   ============================ */
const STATIC_SERVICES = [
  { id: 1, name: "Soil Enrichment", image: service1, description: "Tailored composts & micronutrients to restore fertility." },
  { id: 2, name: "Organic Inputs", image: service2, description: "Certified organic seeds, bio-fertilizers & natural inputs." },
  { id: 3, name: "Training & Mentoring", image: service3, description: "Hands-on workshops, field mentoring & capacity building." },
  { id: 4, name: "Irrigation Systems", image: service4, description: "Efficient irrigation & water-conservation solutions." },
  { id: 5, name: "Seed Varieties", image: service5, description: "Climate-adapted, high-performing seed varieties." },
  { id: 6, name: "Market Linkages", image: service6, description: "Aggregation, market access & premium buyers." },
];

export default function Home() {
  // ---------- Intersection Observer Reveal ----------
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ---------- Parallax ----------
  useEffect(() => {
    const handler = () => {
      document.querySelectorAll(".parallax").forEach(el => {
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

  // ---------- Testimonials ----------
  const testimonials = [
    { img: farmer1, name: "Ramesh Patel", text: "Organic methods increased my yield by 30%!", location: "Gujarat, India" },
    { img: farmer2, name: "Sita Sharma", text: "Sustainable practices improved my soil health.", location: "Rajasthan, India" },
    { img: farmer3, name: "Rajesh Kumar", text: "Great consultation and natural fertilizers.", location: "Madhya Pradesh, India" },
    { img: farmer4, name: "Anita Verma", text: "I now sell organic crops at premium prices.", location: "Maharashtra, India" },
    { img: farmer5, name: "Vikram Singh", text: "Eco-friendly solutions helped me reduce costs.", location: "Gujarat, India" },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialTrackRef = useRef(null);
  const testimonialAutoRef = useRef(null);

  const startTestimonialAuto = () => {
    stopTestimonialAuto();
    testimonialAutoRef.current = setInterval(() => {
      setCurrentTestimonial(s => (s + 1) % testimonials.length);
    }, 3600);
  };

  const stopTestimonialAuto = () => {
    if (testimonialAutoRef.current) clearInterval(testimonialAutoRef.current);
  };

  useEffect(() => {
    startTestimonialAuto();
    return () => stopTestimonialAuto();
  }, []);

  // ---------- Left rotating images (testimonial left) ----------
  const leftImgs = [farmer1, farmer2, farmer3, farmer4, farmer5];
  const [leftImgIndex, setLeftImgIndex] = useState(0);
  const leftAutoRef = useRef(null);

  const startLeftAuto = () => {
    stopLeftAuto();
    leftAutoRef.current = setInterval(() => {
      setLeftImgIndex(i => (i + 1) % leftImgs.length);
    }, 3000);
  };

  const stopLeftAuto = () => {
    if (leftAutoRef.current) clearInterval(leftAutoRef.current);
  };

  useEffect(() => {
    startLeftAuto();
    return () => stopLeftAuto();
  }, []);

  // ---------- Highlights slider (Swiper-like) ----------
  const highlights = [c1, c2, c3, c4];
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesCount = highlights.length;
  const sliderRef = useRef(null);
  const sliderAutoRef = useRef(null);
  const pointerDataRef = useRef({ down: false, startX: 0, delta: 0 });
  const transitionMs = 450;

  const startSliderAuto = () => {
    stopSliderAuto();
    sliderAutoRef.current = setInterval(() => {
      setSlideIndex(i => (i + 1) % slidesCount);
    }, 3800);
  };
  const stopSliderAuto = () => {
    if (sliderAutoRef.current) clearInterval(sliderAutoRef.current);
  };

  useEffect(() => {
    startSliderAuto();
    return () => stopSliderAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => setSlideIndex(i => (i + 1) % slidesCount);
  const prevSlide = () => setSlideIndex(i => (i - 1 + slidesCount) % slidesCount);

  const onPointerDown = e => {
    stopSliderAuto();
    pointerDataRef.current.down = true;
    pointerDataRef.current.startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    pointerDataRef.current.delta = 0;
    const slidesEl = sliderRef.current?.querySelector(".slides");
    if (slidesEl) slidesEl.style.transition = "none";
  };

  const onPointerMove = e => {
    if (!pointerDataRef.current.down) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    pointerDataRef.current.delta = clientX - pointerDataRef.current.startX;
    const slidesEl = sliderRef.current?.querySelector(".slides");
    if (slidesEl) {
      slidesEl.style.transform = `translateX(calc(-${slideIndex * 100}% + ${pointerDataRef.current.delta}px))`;
    }
    // prevent page scroll during drag
    if (Math.abs(pointerDataRef.current.delta) > 6) {
      e.preventDefault?.();
    }
  };

  const onPointerUp = () => {
    if (!pointerDataRef.current.down) return;
    pointerDataRef.current.down = false;
    const delta = pointerDataRef.current.delta;
    const slidesEl = sliderRef.current?.querySelector(".slides");
    if (slidesEl) slidesEl.style.transition = `${transitionMs}ms ease`;
    if (Math.abs(delta) > 60) {
      if (delta < 0) nextSlide();
      else prevSlide();
    } else {
      // snap back (re-apply transform)
      setSlideIndex(i => i);
    }
    pointerDataRef.current.delta = 0;
    startSliderAuto();
  };

  // Sync transform when slideIndex changes
  useEffect(() => {
    const slidesEl = sliderRef.current?.querySelector(".slides");
    if (!slidesEl) return;
    slidesEl.style.transition = `${transitionMs}ms ease`;
    slidesEl.style.transform = `translateX(-${slideIndex * 100}%)`;
  }, [slideIndex]);

  // Pointer event listeners
  useEffect(() => {
    const root = sliderRef.current;
    if (!root) return;
    const down = e => onPointerDown(e);
    const move = e => onPointerMove(e);
    const up = () => onPointerUp();
    root.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);

    // prevent image native dragging
    const imgs = root.querySelectorAll("img");
    imgs.forEach(img => (img.ondragstart = () => false));

    return () => {
      root.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      imgs.forEach(img => (img.ondragstart = null));
    };
  }, [slideIndex]);

  // Hover tilt for .flow-item images (keeps previous effect)
  useEffect(() => {
    const imgs = document.querySelectorAll(".flow-item img");
    imgs.forEach(img => {
      const onMove = e => {
        const rect = img.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        img.style.transform = `perspective(800px) rotateX(${dy * -6}deg) rotateY(${dx * 5.5}deg) scale(1.06)`;
      };
      const onLeave = () => {
        img.style.transform = "";
        img.style.transition = "transform .35s ease";
      };
      img.addEventListener("mousemove", onMove);
      img.addEventListener("mouseleave", onLeave);
    });

    return () =>
      imgs.forEach(img => {
        img.removeEventListener("mousemove", null);
        img.removeEventListener("mouseleave", null);
      });
  }, []);

  // Service card click (SPA-friendly fallback)
  const onServiceClick = (e, href) => {
    if (e.metaKey || e.ctrlKey) return; // allow open-in-new-tab
    window.location.href = href;
  };

  return (
    <div className="home-root">
      {/* HERO */}
      <section className="hero reveal">
        <video className="hero-video" src={heroVideo} autoPlay muted loop playsInline />
        <div className="hero-overlay" />
        <div className="hero-content parallax" data-speed="6">
          <h1 className="hero-heading">Durvasha Prakrutik</h1>
          <p className="hero-subheading">Nurturing Nature With Purity — sustainable farming solutions.</p>
          <div className="hero-buttons">
            <a className="btn primary" href="/about">Learn More</a>
            <a className="btn ghost" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about reveal" id="about">
        <div className="about-container">
          <div className="about-img-wrapper parallax" data-speed="3">
            <img src={aboutImg} alt="About Durvasha" className="about-img" />
            <div className="about-pill top">Certified Organic</div>
            <div className="about-pill bottom">Farmer Support</div>
          </div>

          <div className="about-text">
            <h2 className="animated-heading large">Who We Are</h2>
            <p className="lead">
              Durvasha Prakrutik blends traditional wisdom with modern ecological practices.
              We help farmers transition to sustainable, regenerative agriculture using
              soil-first methods, climate-adapted seeds, and community-based market linkages.
            </p>

            <div className="about-grid">
              <div className="about-grid-item"><h4>Our Mission</h4><p>Enable regenerative farming across smallholder landscapes.</p></div>
              <div className="about-grid-item"><h4>Our Vision</h4><p>Restore soil health and deliver resilient yields for future generations.</p></div>
              <div className="about-grid-item"><h4>Our Approach</h4><p>Scientific + traditional methods: soil testing, composting, crop diversity.</p></div>
              <div className="about-grid-item"><h4>Core Values</h4><p>Transparency, co-creation with farmers, and continuous learning.</p></div>
              <div className="about-grid-item"><h4>Programs</h4><p>On-field trials, seed trials, soil labs, and farmer exchanges.</p></div>
              <div className="about-grid-item"><h4>Impact</h4><p>2,000+ acres transformed, improved incomes and biodiversity restored.</p></div>
            </div>

            <div className="about-cta">
              <p>Want to bring regenerative practices to your farm? We offer free diagnostics, affordable inputs, and training programs tailored to your region.</p>
              <a className="btn primary" href="/contact">Request Soil Test</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (Glass cards) */}
      <section className="services reveal" id="services">
        <h2 className="animated-heading large">Our Services</h2>
        <p className="lead" style={{ maxWidth: 900, margin: "0.5rem auto 1.6rem" }}>
          From soil enrichment to full value-chain support — our services are designed to boost productivity while regenerating the land.
        </p>

        <div className="services-grid glass-grid">
          {STATIC_SERVICES.map((s, idx) => (
            <div
              key={s.id}
              className="glass-card stagger"
              style={{ animationDelay: `${idx * 90}ms` }}
              role="button"
              tabIndex={0}
              onClick={e => onServiceClick(e, "/services")}
              onKeyDown={e => (e.key === "Enter" ? onServiceClick(e, "/services") : null)}
            >
              <div className="glass-media">
                <img src={s.image} alt={s.name} />
              </div>
              <div className="glass-body">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="glass-actions">
                  <a className="link" href="/services" onClick={e => e.stopPropagation()}>Learn more →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial reveal">
        <h2 className="animated-heading large">What Our Farmers Say</h2>

        <div className="testimonial-sidewrap">
          <div className="testimonial-left" onMouseEnter={stopLeftAuto} onMouseLeave={startLeftAuto}>
            <div className="left-img-frame">
              <img src={leftImgs[leftImgIndex]} alt={`Farmer ${leftImgIndex + 1}`} />
            </div>
            <div className="left-caption">Real farmers, real results</div>
          </div>

          <div className="testimonial-right">
            <div className="testimonial-wrap">
              <button
                className="prev-btn"
                onClick={() => {
                  stopTestimonialAuto();
                  setCurrentTestimonial(c => (c - 1 + testimonials.length) % testimonials.length);
                  startTestimonialAuto();
                }}
                aria-label="Previous testimonial"
              >‹</button>

              <div
                className="testimonial-track"
                ref={testimonialTrackRef}
                style={{ transform: `translateX(-${currentTestimonial * 100}%)`, transition: "0.5s ease" }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className={`testimonial-card ${i === currentTestimonial ? "active" : ""}`}>
                    <img src={t.img} alt={t.name} />
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <blockquote>{t.text}</blockquote>
                    <p className="farmer-name">{t.name}</p>
                    <p className="farmer-location">📍 {t.location}</p>
                  </div>
                ))}
              </div>

              <button
                className="next-btn"
                onClick={() => {
                  stopTestimonialAuto();
                  setCurrentTestimonial(c => (c + 1) % testimonials.length);
                  startTestimonialAuto();
                }}
                aria-label="Next testimonial"
              >›</button>
            </div>

            <div className="dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`dot ${i === currentTestimonial ? "active" : ""}`} onClick={() => setCurrentTestimonial(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS / SLIDER */}
      <section className="flow-gallery reveal">
        <h2 className="animated-heading large">Our Farm Highlights</h2>
        <p className="lead" style={{ maxWidth: 820, margin: "0.5rem auto 1.2rem" }}>
          A rotating showcase of fields, seed trials and farmer success stories — swipe or use the arrows.
        </p>

        <div
          className="highlights-slider upgraded"
          ref={sliderRef}
          onMouseEnter={stopSliderAuto}
          onMouseLeave={startSliderAuto}
        >
          <button className="slider-arrow left" onClick={prevSlide} aria-label="Previous slide">‹</button>

          <div className="slides-wrap">
            <div className="slides">
              {highlights.map((img, i) => (
                <div className="slide flow-item" key={i}>
                  <div className="slide-card">
                    <img src={img} alt={`highlight-${i + 1}`} />
                    <div className="slide-caption">
                      <h4>{i === 0 ? "Healthy Soil" : i === 1 ? "Seed Trials" : i === 2 ? "Integrated Pest Management" : "Water Conservation"}</h4>
                      <p>Results-driven methods tested with our farmer groups.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-arrow right" onClick={nextSlide} aria-label="Next slide">›</button>

          <div className="slider-dots">
            {highlights.map((_, i) => (
              <button key={i} className={`slider-dot ${i === slideIndex ? "active" : ""}`} onClick={() => setSlideIndex(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2 className="animated-heading large">Ready to Transform Your Farm?</h2>
        <p>Get personalized plans, training, and certified organic inputs. Let's grow together.</p>
        <a className="btn primary" href="/contact">Get Started</a>
      </section>

      <Footer />
    </div>
  );
}
