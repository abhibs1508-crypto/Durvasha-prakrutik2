import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import Footer from "../components/Footer";

const PAGE_SIZE = 6;
const API_URL = "http://127.0.0.1:8000/api/blogs";
const defaultImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23f1f7ef'/%3E%3C/svg%3E";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [dark, setDark] = useState(
    () => localStorage.getItem("blogDarkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("blog-dark", dark);
    localStorage.setItem("blogDarkMode", dark);
  }, [dark]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => mounted && setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return blogs;
    return blogs.filter((b) =>
      `${b.title} ${b.short_description || ""} ${b.content || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [blogs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return (
    <div className={`blog-list-root ${dark ? "blog-dark" : ""}`}>
      <div style={{ textAlign: "right", padding: "16px 20px" }}>
        <button className="btn ghost" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <section className="bp-hero">
        <div className="bp-hero-inner">
          <div>
            <h1 className="hero-title">Insights & Articles</h1>
            <p className="hero-sub">
              Fresh guides, stories, and practical tips for sustainable growth.
            </p>
          </div>

          <div className="hero-actions">
            <input
              className="search-input"
              placeholder="Search blog..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>

      <main className="bp-main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filtered.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          <>
            <div className="grid">
              {pageItems.map((b, index) => (
                <article
                  key={b.id}
                  className="card reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Link */}
                  <Link to={`/blog/${b.id}`} className="thumb-wrap">
                    <img
                      src={b.image || defaultImage}
                      alt={b.title}
                      className="thumb"
                      onError={(e) => (e.currentTarget.src = defaultImage)}
                    />
                  </Link>

                  {/* Card Body */}
                  <div className="card-body">
                    <h3 className="card-title">{b.title}</h3>
                    <p className="card-desc">
                      {(b.short_description || b.content || "").slice(0, 140)}
                      {(b.short_description || b.content || "").length > 140
                        ? "…"
                        : ""}
                    </p>

                    <div className="card-meta">
                      <span className="date">
                        {b.created_at
                          ? new Date(b.created_at).toLocaleDateString()
                          : ""}
                      </span>
                      <Link to={`/blog/${b.id}`} className="btn learn-more">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pager">
              <button
                className="page-num"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`page-num ${page === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="page-num"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
