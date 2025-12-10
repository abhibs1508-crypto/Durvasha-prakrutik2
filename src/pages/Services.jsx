import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import Footer from "../components/Footer";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
        setLoading(false);

        const elements = document.querySelectorAll(".service-card, .services-header");
        elements.forEach((el, index) => {
          setTimeout(() => el.classList.add("in-view"), index * 150);
        });
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="services-root">
      <header className="services-header reveal">
        <h1>Our Premium Services</h1>
        <p>
          Providing modern, sustainable, and technology-driven agriculture solutions for your success.
        </p>
      </header>

      {loading ? (
        <p className="reveal">Loading Services...</p>
      ) : (
        <section className="services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="service-card reveal">
              <div className="service-img">
                <img src={service.image_url} alt={service.title} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.short_description}</p>
                <Link to={`/services/${service.slug}`} className="read-more">Learn More</Link>
              </div>
            </div>
          ))}
        </section>
      )}

      <Footer />
    </main>
  );
}
