import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

import organicImg from "../assets/organic-farming.jpeg";
import irrigationImg from "../assets/irrigation.jpeg";
import compostImg from "../assets/compost.jpeg";
import trainingImg from "../assets/training.jpeg";
import soilImg from "../assets/soil.jpeg";
import solarImg from "../assets/solar.jpeg";

const serviceDetails = [
  {
    id: "organic-farming",
    title: "Organic Farming",
    img: organicImg,
    content: `
Organic farming is a holistic production system that sustains the health of soils, ecosystems, and people. It relies on ecological processes, biodiversity, and cycles adapted to local conditions. 

Our organic farming solutions promote natural composting, biological pest control, and crop rotation techniques to maximize yield and soil vitality.`,
  },
  {
    id: "smart-irrigation",
    title: "Smart Irrigation",
    img: irrigationImg,
    content: `
Smart irrigation systems use sensors and automation to optimize water delivery, ensuring that crops receive just the right amount of moisture.

We provide solar-powered drip systems, remote control irrigation tools, and data-based water management for sustainable and efficient farming.`,
  },
  {
    id: "organic-compost",
    title: "Organic Compost",
    img: compostImg,
    content: `
Organic compost is essential for improving soil fertility naturally. Our compost is made from decomposed plant and animal matter, enriched with nutrients.

By using organic compost, farmers can improve soil structure, increase microbial activity, and reduce dependence on chemical fertilizers.`,
  },
  {
    id: "training-programs",
    title: "Farmer Training Programs",
    img: trainingImg,
    content: `
Our training programs empower farmers with practical and technological knowledge. From modern irrigation to organic pest management — our sessions are field-focused.

Join our regular workshops to learn, experiment, and adopt sustainable techniques that improve profitability and yield.`,
  },
  {
    id: "soil-testing",
    title: "Soil Testing & Advisory",
    img: soilImg,
    content: `
Healthy crops begin with healthy soil. We analyze pH, nutrient content, and texture to help farmers choose the right fertilizers and crop plans.

Our experts provide easy-to-understand reports and actionable recommendations tailored to your soil type.`,
  },
  {
    id: "solar-agriculture",
    title: "Solar Agriculture",
    img: solarImg,
    content: `
Solar energy is transforming agriculture by powering irrigation systems, dryers, and cold storage. 

We design and install solar solutions that reduce dependency on electricity, making farming more self-sufficient and sustainable.`,
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const index = serviceDetails.findIndex((s) => s.id === id);
  const service = serviceDetails[index];

  if (!service) {
    return <p className="not-found">Service not found</p>;
  }

  const prev = index > 0 ? serviceDetails[index - 1] : null;
  const next = index < serviceDetails.length - 1 ? serviceDetails[index + 1] : null;

  return (
    <main className="detail-root reveal in-view">
      <div className="detail-card">
        <img src={service.img} alt={service.title} className="detail-img" />
        <div className="detail-content">
          <h1>{service.title}</h1>
          <p>{service.content}</p>

          <div className="detail-nav">
            {prev && (
              <button className="nav-btn" onClick={() => navigate(`/services/${prev.id}`)}>
                ← {prev.title}
              </button>
            )}
            <Link to="/services" className="back-btn">
              Back to Services
            </Link>
            {next && (
              <button className="nav-btn" onClick={() => navigate(`/services/${next.id}`)}>
                {next.title} →
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
