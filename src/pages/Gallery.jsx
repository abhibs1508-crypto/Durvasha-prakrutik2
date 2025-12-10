import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Footer from "../components/Footer";

// =============================
// API & STORAGE CONFIG
// =============================
const API_URL = "http://localhost:8000/api/gallery";
const STORAGE_URL = "http://localhost:8000/storage/";

export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, src: null });
  const [tilt, setTilt] = useState({});
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH GALLERY FROM API
  // =============================
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (json.status) {
          const formatted = json.data.map((item, index) => ({
            key: `category-${index}`,
            title: item.title,
            subtitle: item.short_description,
            images: [
              STORAGE_URL + item.image,
              ...item.gallery_images.map((g) => STORAGE_URL + g.data.image),
            ],
          }));

          setCategories(formatted);
          setLoading(false);
        }
      } catch (error) {
        console.error("Gallery load error:", error);
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  // =============================
  // SCROLL REVEAL
  // =============================
  useEffect(() => {
    const els = document.querySelectorAll(".gw-reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in-view")
        ),
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [categories]);

  // =============================
  // 3D TILT
  // =============================
  const handleMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    setTilt((t) => ({ ...t, [idx]: { rotateX, rotateY } }));
  };

  const handleMouseLeave = (idx) => {
    setTilt((t) => ({ ...t, [idx]: { rotateX: 0, rotateY: 0 } }));
  };

  return (
    <div>
      <main className="gw-root">
        {/* HERO SECTION */}
        <section className="gw-hero">
          <div className="gw-hero-inner">
            <h1 className="gw-title">Durvasha Prakrutik — Gallery Wall</h1>
            <p className="gw-sub">
              A premium 3D showcase of our banana farming — hover, explore &
              zoom.
            </p>
          </div>
        </section>

        {/* LOADING STATE */}
        {loading && <div className="loading-text">Loading Gallery...</div>}

        {/* GALLERY GRID */}
        {!loading && (
          <section className="gw-wall">
            <div className="gw-grid">
              {categories.map((cat, idx) => {
                const t = tilt[idx] || { rotateX: 0, rotateY: 0 };

                return (
                  <article
                    key={cat.key}
                    className="gw-card gw-reveal"
                    onMouseMove={(e) => handleMouseMove(e, idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    style={{
                      transform: `perspective(900px) rotateX(${t.rotateX}deg) rotateY(${t.rotateY}deg)`,
                    }}
                  >
                    <div className="gw-card-media">
                      <img src={cat.images[0]} alt={cat.title} />
                    </div>

                    <div className="gw-card-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.subtitle}</p>

                      <div className="gw-actions">
                        <button
                          className="btn-ghost"
                          onClick={() => setOpenCategory(cat.key)}
                        >
                          View More
                        </button>

                        <button
                          className="btn-cta"
                          onClick={() =>
                            setLightbox({
                              open: true,
                              src: cat.images[0],
                            })
                          }
                        >
                          Quick Preview
                        </button>
                      </div>
                    </div>

                    <div className="gw-card-reflection" />
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* CATEGORY MODAL */}
        {openCategory && (
          <div className="gw-modal" onClick={() => setOpenCategory(null)}>
            <div
              className="gw-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="gw-modal-header">
                <h2>
                  {categories.find((c) => c.key === openCategory)?.title}
                </h2>
                <button
                  className="modal-close"
                  onClick={() => setOpenCategory(null)}
                >
                  ✕
                </button>
              </header>

              <div className="gw-modal-grid">
                {categories
                  .find((c) => c.key === openCategory)
                  ?.images.map((src, i) => (
                    <div
                      key={i}
                      className="gw-modal-item"
                      onClick={() =>
                        setLightbox({ open: true, src: src })
                      }
                    >
                      <img src={src} alt={`img-${i}`} />
                    </div>
                  ))}
              </div>

              <footer className="gw-modal-footer">
                <button
                  className="btn-ghost"
                  onClick={() => setOpenCategory(null)}
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        )}

        {/* LIGHTBOX */}
        {lightbox.open && (
          <div
            className="gw-lightbox"
            onClick={() => setLightbox({ open: false, src: null })}
          >
            <img
              className="gw-lightbox-img"
              src={lightbox.src}
              alt="preview"
            />
            <button
              className="lightbox-close"
              onClick={() => setLightbox({ open: false, src: null })}
            >
            </button>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}