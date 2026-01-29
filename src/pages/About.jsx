import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "./About.css";

// --- ASSETS ---
// Ensure high-quality images are used here
import heroImg from "../assets/about1.jpg";
import philosophyImg from "../assets/about2.jpg"; 
import team1 from "../assets/farmer.jpg"; 
import team2 from "../assets/farmer2.jpeg"; 
import team3 from "../assets/about5.jpeg"; 

// --- DATA ---
const LEADERSHIP = [
  { name: "Rajesh Solanki", role: "FOUNDER", img: team1 },
  { name: "Anita Desai", role: "HEAD AGRONOMIST", img: team2 },
  { name: "Vikram Singh", role: "OPERATIONS", img: team3 },
];

const MILESTONES = [
  { year: "2012", label: "Origin", desc: "Started with 5 acres of experimental land." },
  { year: "2016", label: "Innovation", desc: "Developed proprietary bio-culture blends." },
  { year: "2020", label: "Scale", desc: "Expanded to 5,000+ acres across Gujarat." },
  { year: "2025", label: "Global", desc: "Exporting zero-residue produce worldwide." },
];

export default function About() {
  
  // --- SCROLL ANIMATION ---
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

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-legacy">
      {/* Subtle Grain for Texture */}
      <div className="noise-layer"></div>

      {/* --- 1. HERO: SPLIT PARALLAX --- */}
      <section className="legacy-hero">
        <div className="hero-split-text">
          <div className="hero-wrapper">
             <span className="label-caps reveal">Est. 2012</span>
             <h1 className="legacy-title reveal">
               <span className="block">Cultivating</span>
               <span className="block italic-gold">Heritage.</span>
             </h1>
             <p className="legacy-lead reveal">
               We are the bridge between Vedic agricultural wisdom and modern ecological science.
             </p>
          </div>
        </div>
        <div className="hero-split-img">
          <div className="img-reveal-mask">
             <img src={heroImg} alt="Durvasha Farm" className="zoom-img" />
          </div>
        </div>
      </section>

      {/* --- 2. THE MANIFESTO (Clean Typography) --- */}
      <section className="section legacy-manifesto">
        <div className="container">
          <div className="manifesto-grid">
             <div className="manifesto-head reveal">
                <h2>The<br/>Mission</h2>
             </div>
             <div className="manifesto-body reveal">
                <p className="huge-text">
                  We believe soil is a <span className="highlight">living entity</span>, not a factory floor.
                </p>
                <div className="divider-line"></div>
                <div className="body-cols">
                  <p>
                    Conventional farming extracts. Regenerative farming restores. 
                    Durvasha Prakrutik exists to prove that profitability and ecology 
                    are not opposing forces, but partners in progress.
                  </p>
                  <p>
                    By restoring the soil microbiome, we empower farmers to break free 
                    from chemical dependency and grow food that is truly medicine.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE VALUES (Horizontal Strip) --- */}
      <section className="legacy-values bg-dark">
        <div className="container">
           <div className="values-header reveal">
             <span className="label-caps gold">Our DNA</span>
             <h2 className="white">Uncompromising Standards</h2>
           </div>
           
           <div className="values-row">
             <div className="v-item reveal">
               <span className="v-num">01</span>
               <h3>Radical Transparency</h3>
               <p>Every seed, every input, every harvest is traceable.</p>
             </div>
             <div className="v-item reveal" style={{transitionDelay: '0.1s'}}>
               <span className="v-num">02</span>
               <h3>Farmer Sovereignty</h3>
               <p>We empower growers to own their supply chain.</p>
             </div>
             <div className="v-item reveal" style={{transitionDelay: '0.2s'}}>
               <span className="v-num">03</span>
               <h3>Scientific Rigor</h3>
               <p>Data-backed agronomy replaces guesswork.</p>
             </div>
           </div>
        </div>
      </section>

      {/* --- 4. VISUAL STORY (Parallax) --- */}
      <section className="legacy-visual">
         <div className="visual-mask">
            <img src={philosophyImg} alt="Philosophy" />
            <div className="visual-caption reveal">
               <h3>Residue Free. <br/> Nutrient Dense.</h3>
            </div>
         </div>
      </section>

      {/* --- 5. TIMELINE (Minimalist) --- */}
      <section className="section legacy-timeline">
         <div className="container">
            <div className="timeline-header reveal">
               <h2>Evolution</h2>
            </div>
            <div className="timeline-clean">
               {MILESTONES.map((m, i) => (
                 <div className="t-block reveal" key={i}>
                    <div className="t-year">{m.year}</div>
                    <div className="t-info">
                       <h4>{m.label}</h4>
                       <p>{m.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 6. LEADERSHIP (Editorial Grid) --- */}
      <section className="section legacy-team bg-cream">
         <div className="container">
            <div className="team-intro reveal">
               <span className="label-caps">The Architects</span>
               <h2>Leadership</h2>
            </div>
            <div className="team-editorial-grid">
               {LEADERSHIP.map((leader, i) => (
                 <div className="team-card reveal" key={i}>
                    <div className="img-wrapper">
                       <img src={leader.img} alt={leader.name} />
                       <div className="img-overlay"></div>
                    </div>
                    <div className="team-meta">
                       <h3>{leader.name}</h3>
                       <span>{leader.role}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 7. CTA (Cinematic) --- */}
      <section className="legacy-cta bg-dark">
         <div className="cta-content reveal">
            <h2>Ready to <span className="gold-serif">Transform</span><br/>Your Legacy?</h2>
            <div className="cta-actions">
               <a href="/contact" className="btn-clean">Partner With Us</a>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}