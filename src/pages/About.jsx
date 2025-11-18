import React, { useEffect } from "react";
import "./About.css";

import aboutImg1 from "../assets/about1.jpg";
import aboutImg2 from "../assets/about2.jpg";
import aboutImg3 from "../assets/about3.jpg";
import aboutImg4 from "../assets/about4.jpeg";
import aboutImg5 from "../assets/about5.jpeg";

import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="about-root">
      {/* TOP MODULE HEADING */}
      <section className="module-heading reveal">
        <div className="container">
          <h1 className="module-title gradient-heading">About Durvasha Prakrutik</h1>
          <p className="module-sub">
            Organic-first farming solutions — practical, measurable and fair. Learn what makes our approach unique.
          </p>
        </div>
      </section>

      {/* HERO */}
      <section className="about-hero reveal">
        <div className="about-hero-inner">
          <div className="hero-text">
            <h2 className="gradient-heading">We grow with the land</h2>
            <p className="lead">
              Combining time-tested local knowledge with modern sustainable methods, Durvasha Prakrutik helps farmers
              increase productivity while restoring soil health. Our programs are hands-on, measurable and farmer-friendly.
            </p>

            <div className="hero-highlights">
              <div className="highlight">
                <strong>Field-first approach</strong>
                <span>On-site demonstrations & training</span>
              </div>
              <div className="highlight">
                <strong>Scientifically-backed</strong>
                <span>Soil testing & tailored nutrient plans</span>
              </div>
              <div className="highlight">
                <strong>Market support</strong>
                <span>Connect to buyers who value organic produce</span>
              </div>
            </div>

            <div className="hero-cta">
              <a href="/contact" className="btn primary">Work With Us</a>
              <a href="/services" className="btn ghost">Our Services</a>
            </div>
          </div>

          <div className="hero-image">
            <div className="photo-frame floating">
              <img src={aboutImg1} alt="Sustainable farming" />
              <div className="photo-accent" />
            </div>
            <p className="hero-caption">Field visits, soil tests & real farmer results.</p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="who-we-are reveal">
        <div className="container grid-two">
          <div className="who-left">
            <h3 className="gradient-heading">Who We Are</h3>
            <p>
              We are farmer-centric: our work focuses on regenerative practices that restore soil, reduce inputs
              and increase returns. We blend local knowledge with agronomic science so change happens quickly on-ground.
            </p>

            <ul className="features">
              <li>Certified organic fertilizers & inputs</li>
              <li>Hands-on farmer training & field demo</li>
              <li>Soil testing & bespoke enrichment plans</li>
              <li>Support for market access & premium pricing</li>
            </ul>
          </div>

          <aside className="who-right">
            <div className="stat-card interactive">
              <h3>10k+</h3>
              <p>Acres supported</p>
            </div>
            <div className="stat-card interactive">
              <h3>5k+</h3>
              <p>Farmers trained</p>
            </div>
            <div className="stat-card interactive">
              <h3>12 yrs</h3>
              <p>Experience in organic agri</p>
            </div>
          </aside>
        </div>
      </section>

      {/* VISION / MISSION / VALUES */}
      <section className="vmv reveal">
        <div className="container">
          <h2 className="section-title gradient-heading">Vision · Mission · Values</h2>
          <div className="vmv-grid">
            <article className="vmv-card interactive">
              <img src={aboutImg2} alt="vision" />
              <h4 className="gradient-heading-small">Vision</h4>
              <p>
                A thriving sustainable agriculture ecosystem where soil fertility, farmer livelihoods
                and consumer health are aligned.
              </p>
            </article>

            <article className="vmv-card interactive">
              <img src={aboutImg3} alt="mission" />
              <h4 className="gradient-heading-small">Mission</h4>
              <p>
                Deliver practical, scalable organic solutions and empower farming communities
                through training, technology and market links.
              </p>
            </article>

            <article className="vmv-card interactive">
              <img src={aboutImg4} alt="values" />
              <h4 className="gradient-heading-small">Values</h4>
              <p>
                Transparency, sustainability, community-first action and respect for local farming knowledge.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach reveal">
        <div className="container">
          <h2 className="section-title gradient-heading">How We Work</h2>
          <div className="approach-grid">
            <div className="approach-step interactive">
              <div className="step-num">01</div>
              <h5>Soil Audit</h5>
              <p>Complete soil testing and baseline report to design a precise enrichment plan.</p>
            </div>

            <div className="approach-step interactive">
              <div className="step-num">02</div>
              <h5>Tailored Plan</h5>
              <p>Custom organic fertilizer & crop plan based on soil needs and local conditions.</p>
            </div>

            <div className="approach-step interactive">
              <div className="step-num">03</div>
              <h5>Field Implementation</h5>
              <p>Hands-on field support, demos, and farmer training for practical adoption.</p>
            </div>

            <div className="approach-step interactive">
              <div className="step-num">04</div>
              <h5>Monitoring & Market</h5>
              <p>Continuous monitoring and support; help connecting to premium organic markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="about-why reveal">
        <div className="container">
          <h2 className="section-title gradient-heading">Why Choose Durvasha Prakrutik</h2>

          <div className="why-grid enhanced">
            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Trusted Experts</h4>
              <p>Field-proven agronomy and decades of experience in organic systems. We deploy practical returns-first solutions.</p>
              <span className="badge">Trusted</span>
            </div>

            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Local & Practical</h4>
              <p>Solutions adapted to local crops, climate and farmer realities with simple steps that scale quickly.</p>
              <span className="badge">Local</span>
            </div>

            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Certified Inputs</h4>
              <p>We supply tested and certified organic inputs — measured results, reliable supply chains.</p>
              <span className="badge">Certified</span>
            </div>

            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Results Driven</h4>
              <p>Focus on measurable yield, soil health and farmer profitability through data-led trials.</p>
              <span className="badge">Results</span>
            </div>

            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Community First</h4>
              <p>We build farmer groups and local networks for long term success and knowledge sharing.</p>
              <span className="badge">Community</span>
            </div>

            <div className="why-card interactive big">
              <h4 className="gradient-heading-small">Sustainability</h4>
              <p>Practices that restore the land and reduce environmental impact while increasing resilience.</p>
              <span className="badge">Sustainable</span>
            </div>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="sustain reveal">
        <div className="container">
          <h2 className="section-title gradient-heading">Sustainability Practices</h2>
          <p className="muted">Actions we take on-ground to preserve resources and regenerate soil.</p>

          <div className="sustain-grid">
            <div className="sustain-card interactive">
              <h5>Water Smart</h5>
              <p>Rainwater harvesting and drip irrigation to conserve water.</p>
            </div>
            <div className="sustain-card interactive">
              <h5>Soil Care</h5>
              <p>Composting, green manures and rotation to rebuild fertility.</p>
            </div>
            <div className="sustain-card interactive">
              <h5>Renewables</h5>
              <p>Solar pumps and clean-energy tools to cut carbon footprint.</p>
            </div>
            <div className="sustain-card interactive">
              <h5>Biodiversity</h5>
              <p>Polyculture and habitat strips to boost ecosystem health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta reveal">
        <div className="container cta-inner floating-cta">
          <div>
            <h2 className="gradient-heading">Ready to transform your farm?</h2>
            <p>Get a free soil audit & custom plan — start your transition to sustainable farming today.</p>
          </div>
          <a href="/contact" className="btn cta-btn shine">Request Audit</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
