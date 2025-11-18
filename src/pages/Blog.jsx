import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import Footer from "../components/Footer";


const PAGE_SIZE = 6;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // 🌗 DARK MODE (LOCAL TO BLOG ONLY)
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("blogDarkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("blog-dark-mode", dark);
    localStorage.setItem("blogDarkMode", dark);
  }, [dark]);

  // Fetch Blogs
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://happy.techstrota.com/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setBlogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("blogs fetch", err);
        setBlogs([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((b) =>
      `${b.title} ${b.paragraph || ""} ${stripHtml(b.content || "")}`
        .toLowerCase()
        .includes(q)
    );
  }, [blogs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className={`home-root blog-list-root ${dark ? "dark" : ""}`}>
      
      {/* 🌗 ADVANCED DARK MODE TOGGLE */}
      <div className="theme-toggle">
        <input
          type="checkbox"
          id="toggleBtn"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        <label htmlFor="toggleBtn" className="toggle-label">
          <span className="toggle-thumb"></span>
          <span className="stars"></span>
          <span className="moon"></span>
          <span className="sun"></span>
        </label>
      </div>

      {/* HERO */}
      <section className="bp-hero">
        <div className="bp-hero-inner">
          <h1 className="hero-title">Insights & Articles</h1>
          <p className="hero-sub">
            Fresh guides, stories and practical tips for sustainable growth.
          </p>

          <div className="hero-controls">
            <input
              className="search-input"
              placeholder="Search by title or content..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <main className="bp-main">
        {loading ? (
          <div className="grid">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <article
                key={i}
                className="card skeleton"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="thumb-skel" />
                <div className="body-skel">
                  <div className="line short" />
                  <div className="line" />
                  <div className="line small" />
                </div>
              </article>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <p>No posts found.</p>
            <button
              className="btn primary"
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            <div className="grid">
              {pageItems.map((b, i) => (
                <article
                  key={b.id}
                  className="card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Link
                    to={`/blog/${b.id}`}
                    className="thumb-link"
                    aria-label={b.title}
                  >
                    <div className="thumb-wrap">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="thumb"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23f1f7ef'/%3E%3C/svg%3E";
                        }}
                      />
                      <span className="glow-border" />
                    </div>
                  </Link>

                  <div className="card-body">
                    <h3 className="card-title">{b.title}</h3>
                    <p className="card-desc">
                      {(b.paragraph || stripHtml(b.content || "")).slice(0, 140)}
                      {(b.paragraph || b.content || "").length > 140 ? "…" : ""}
                    </p>

                    <div className="card-meta">
                      <small className="date">
                        {new Date(b.created_at).toLocaleDateString()}
                      </small>
                      <Link to={`/blog/${b.id}`} className="btn ghost">
                        Learn more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* PAGINATION */}
            <nav className="pager">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn ghost"
                disabled={page === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    className={`page-num ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="btn ghost"
                disabled={page === totalPages}
              >
                Next
              </button>
            </nav>
          </>
        )}
      </main>
              <Footer/>

    </div>
    
  );
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "");
}
