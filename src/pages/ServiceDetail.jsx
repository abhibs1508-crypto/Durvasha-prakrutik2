import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/services/${slug}`)
      .then((res) => res.json())
      .then((data) => setService(data.data))
      .catch(() => setService(null));

    fetch("http://127.0.0.1:8000/api/services")
      .then((res) => res.json())
      .then((data) => setAllServices(data.data));
  }, [slug]);

  if (!service) {
    return <p className="not-found">Loading Service...</p>;
  }

  const index = allServices.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? allServices[index - 1] : null;
  const next = index < allServices.length - 1 ? allServices[index + 1] : null;

  return (
    <main className="detail-root">
      <div className="detail-card animate-detail">
        <div className="detail-img-wrapper">
          <img src={service.image_url} alt={service.title} className="detail-img" />
          <h1 className="detail-title">{service.title}</h1>
        </div>

        <div className="detail-content">
          <div
            className="service-description"
            dangerouslySetInnerHTML={{ __html: service.long_description }}
          />

          <div className="detail-nav">
            {prev && (
              <button
                className="nav-btn"
                onClick={() => navigate(`/services/${prev.slug}`)}
              >
                ← {prev.title}
              </button>
            )}

            <Link to="/services" className="back-btn">
              Back to Services
            </Link>

            {next && (
              <button
                className="nav-btn"
                onClick={() => navigate(`/services/${next.slug}`)}
              >
                {next.title} →
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
