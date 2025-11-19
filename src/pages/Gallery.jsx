import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Footer from "../components/Footer";

/* ====== STATIC IMPORTS: adjust only if your filenames differ ====== */
/* cultivation ..*/
import c1 from "../assets/gallery/cultivation/c1.jpeg";
import c2 from "../assets/gallery/cultivation/c2.jpeg";
import c3 from "../assets/gallery/cultivation/c3.jpeg";
import c4 from "../assets/gallery/cultivation/c4.jpeg";
import c5 from "../assets/gallery/cultivation/c5.jpeg";
/* varieties */
import v1 from "../assets/gallery/varieties/v1.jpeg";
import v2 from "../assets/gallery/varieties/v2.jpeg";
import v3 from "../assets/gallery/varieties/v3.jpeg";
import v4 from "../assets/gallery/varieties/v4.jpeg";
import v5 from "../assets/gallery/varieties/v5.jpeg";
/* organic */
import o1 from "../assets/gallery/organic/o1.jpeg";
import o2 from "../assets/gallery/organic/o2.jpeg";
import o3 from "../assets/gallery/organic/o3.jpeg";
import o4 from "../assets/gallery/organic/o4.jpeg";
import o5 from "../assets/gallery/organic/o5.jpeg";
/* farmers */
import f1 from "../assets/gallery/farmers/f1.jpeg";
import f2 from "../assets/gallery/farmers/f2.jpeg";
import f3 from "../assets/gallery/farmers/f3.jpeg";
import f4 from "../assets/gallery/farmers/f4.jpeg";
import f5 from "../assets/gallery/farmers/f5.jpeg";
/* products */
import p1 from "../assets/gallery/products/p1.jpeg";
import p2 from "../assets/gallery/products/p2.jpeg";
import p3 from "../assets/gallery/products/p3.jpeg";
import p4 from "../assets/gallery/products/p4.jpeg";
import p5 from "../assets/gallery/products/p5.jpeg";
/* infrastructure */
import i1 from "../assets/gallery/infrastructure/i1.jpeg";
import i2 from "../assets/gallery/infrastructure/i2.jpeg";
import i3 from "../assets/gallery/infrastructure/i3.jpeg";
import i4 from "../assets/gallery/infrastructure/i4.jpeg";
import i5 from "../assets/gallery/infrastructure/i5.jpeg";
/* research */
import r1 from "../assets/gallery/research/r1.jpeg";
import r2 from "../assets/gallery/research/r2.jpeg";
import r3 from "../assets/gallery/research/r3.jpeg";
import r4 from "../assets/gallery/research/r4.jpeg";
import r5 from "../assets/gallery/research/r5.jpeg";
/* landscape */
import l1 from "../assets/gallery/landscape/l1.jpeg";
import l2 from "../assets/gallery/landscape/l2.jpeg";
import l3 from "../assets/gallery/landscape/l3.jpeg";
import l4 from "../assets/gallery/landscape/l4.jpeg";
import l5 from "../assets/gallery/landscape/l5.jpeg";

const categories = [
  { key: "cultivation", title: "Cultivation", subtitle: "From seed to crop", images: [c1, c2, c3, c4, c5] },
  { key: "varieties", title: "Varieties", subtitle: "Different breeds", images: [v1, v2, v3, v4, v5] },
  { key: "organic", title: "Organic", subtitle: "Eco-friendly methods", images: [o1, o2, o3, o4, o5] },
  { key: "farmers", title: "Farmers", subtitle: "Our people & hands", images: [f1, f2, f3, f4, f5] },
  { key: "products", title: "Products", subtitle: "From farm to market", images: [p1, p2, p3, p4, p5] },
  { key: "infrastructure", title: "Infrastructure", subtitle: "Tools & systems", images: [i1, i2, i3, i4, i5] },
  { key: "research", title: "Research", subtitle: "Innovation & studies", images: [r1, r2, r3, r4, r5] },
  { key: "landscape", title: "Landscape", subtitle: "Fields & views", images: [l1, l2, l3, l4, l5] },
];

export default function Gallery() {
  const [openCategory, setOpenCategory] = useState(null); // key of open category in modal
  const [lightbox, setLightbox] = useState({ open: false, src: null });
  const [tilt, setTilt] = useState({}); // store tilt angles per card index

  // reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".gw-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // small helper: compute tilt from mouse position inside element
  const handleMouseMove = (e, idx) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * 12; // -6..6 degrees scaled
    const rotateX = (0.5 - y) * 10; // -5..5 degrees
    setTilt((t) => ({ ...t, [idx]: { rotateX, rotateY } }));
  };

  const handleMouseLeave = (idx) => {
    setTilt((t) => ({ ...t, [idx]: { rotateX: 0, rotateY: 0 } }));
  };

  return (
    <div>
    <main className="gw-root">
      <section className="gw-hero">
        <div className="gw-hero-inner">
          <h1 className="gw-title">Durvasha Prakrutik — Gallery Wall</h1>
          <p className="gw-sub">A premium 3D showcase of our banana farming — hover, explore & zoom.</p>
        </div>
      </section>

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
                  transform: `perspective(900px) rotateX(${t.rotateX}deg) rotateY(${t.rotateY}deg) translateZ(0)`,
                }}
                role="button"
                tabIndex={0}
                aria-label={`${cat.title} category`}
              >
                <div className="gw-card-media" aria-hidden>
                  <img src={cat.images[0]} alt={cat.title} />
                </div>

                <div className="gw-card-body">
                  <h3>{cat.title}</h3>
                  <p>{cat.subtitle}</p>
                  <div className="gw-actions">
                    <button className="btn-ghost" onClick={() => setOpenCategory(cat.key)}>View More</button>
                    <button
                      className="btn-cta"
                      onClick={() => { setLightbox({ open: true, src: cat.images[0] }); }}
                      title="Quick preview"
                    >
                      Quick Preview
                    </button>
                  </div>
                </div>

                <div className="gw-card-reflection" aria-hidden />
              </article>
            );
          })}
        </div>
      </section>

      {/* FULLSCREEN CATEGORY MODAL */}
      {openCategory && (
        <div className="gw-modal" role="dialog" aria-modal="true" onClick={() => setOpenCategory(null)}>
          <div className="gw-modal-inner" onClick={(e) => e.stopPropagation()}>
            <header className="gw-modal-header">
              <h2>{categories.find((c) => c.key === openCategory)?.title}</h2>
              <button className="modal-close" onClick={() => setOpenCategory(null)} aria-label="Close modal">✕</button>
            </header>

            <div className="gw-modal-grid">
              {categories.find((c) => c.key === openCategory)?.images.map((src, i) => (
                <div key={i} className="gw-modal-item" onClick={() => setLightbox({ open: true, src })}>
                  <img src={src} alt={`${openCategory}-${i + 1}`} />
                </div>
              ))}
            </div>

            <footer className="gw-modal-footer">
              <button className="btn-ghost" onClick={() => setOpenCategory(null)}>Close</button>
            </footer>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox.open && (
        <div className="gw-lightbox" onClick={() => setLightbox({ open: false, src: null })}>
          <img className="gw-lightbox-img" src={lightbox.src} alt="preview" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setLightbox({ open: false, src: null })} aria-label="Close preview">✕</button>
             
        </div>
      )}
      <Footer/>
    </main>

     </div>
  );
}
