import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
        setLoading(false);

        setTimeout(() => {
          document.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("in-view");
          });
        }, 150);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="services-root">
      <header className="services-header reveal">
        <h1>Our Premium Services</h1>
        <p>Providing modern, sustainable, and technology-driven agriculture solutions for your success.</p>
      </header>

      {loading ? (
        <p className="loading-text reveal">Loading Services...</p>
      ) : (
        <section className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card reveal"
              key={service.id}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="service-img">
                <img src={service.image_url} alt={service.title} />
                <div className="service-overlay">
                  <h3>{service.title}</h3>
                  <Link to={`/services/${service.slug}`} className="read-more">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="service-content">
                <p>{service.short_description}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
