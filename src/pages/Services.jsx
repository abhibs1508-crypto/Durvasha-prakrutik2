import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import Footer from "../components/Footer";
// 🌿 Image Imports
import organicImg from "../assets/organic-farming.jpeg";
import irrigationImg from "../assets/irrigation.jpeg";
import compostImg from "../assets/compost.jpeg";
import trainingImg from "../assets/training.jpeg";
import soilImg from "../assets/soil.jpeg";
import solarImg from "../assets/solar.jpeg";

const services = [
  {
    id: "organic-farming",
    title: "Organic Farming",
    desc: "Experience eco-friendly and chemical-free cultivation that boosts soil health and ensures premium crop yield.",
    img: organicImg,
  },
  {
    id: "smart-irrigation",
    title: "Smart Irrigation",
    desc: "Optimize water usage using smart drip and sprinkler systems for efficient and sustainable agriculture.",
    img: irrigationImg,
  },
  {
    id: "organic-compost",
    title: "Organic Compost",
    desc: "High-quality natural compost made from organic waste — nourish your crops with the power of nature.",
    img: compostImg,
  },
  {
    id: "training-programs",
    title: "Farmer Training Programs",
    desc: "Empowering farmers through field workshops and modern agri-tech education for better productivity.",
    img: trainingImg,
  },
  {
    id: "soil-testing",
    title: "Soil Testing & Advisory",
    desc: "Accurate soil analysis and nutrient management solutions to ensure sustainable crop planning.",
    img: soilImg,
  },
  {
    id: "solar-agriculture",
    title: "Solar Agriculture",
    desc: "Harness solar energy to power irrigation and farming equipment, reducing costs and carbon footprints.",
    img: solarImg,
  },
];

export default function Services() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting ? e.target.classList.add("in-view") : null
        ),
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="services-root">
      <header className="services-header reveal">
        <h1>Our Services</h1>
        <p>
          From soil to solar — empowering farmers through innovation, education,
          and sustainability.
        </p>
      </header>

      <section className="services-grid">
        {services.map((srv, i) => (
          <div className="service-card reveal" key={i}>
            <div className="service-img">
              <img src={srv.img} alt={srv.title} />
            </div>
            <div className="service-content">
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
              <Link className="read-more" to={`/services/${srv.id}`}>
                Learn More
              </Link>
            </div>
          </div>
        ))}

      </section>
      <Footer/>
    </main>
  );
}
