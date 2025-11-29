import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("http://127.0.0.1:8001/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setAll(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setAll([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const blog = useMemo(
    () => all.find((b) => String(b.id) === String(id)),
    [all, id]
  );

  if (loading)
    return <div className="loading">Loading…</div>;

  if (!blog)
    return (
      <div className="notfound">
        Blog not found.{" "}
        <button className="btn ghost" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );

  const imageUrl = `http://127.0.0.1:8001/storage/${blog.image}`;

  return (
    <div className="home-root blog-detail-root">
      <div
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(11,35,12,0.25), rgba(11,35,12,0.25)), url(${imageUrl})`,
        }}
      >
        <div className="detail-hero-inner">
          <h1 className="detail-title">{blog.title}</h1>
          <p className="detail-meta">
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <main className="detail-main">
        <article className="detail-card">
          <img src={imageUrl} alt={blog.title} className="detail-img" />
          <div
            className="detail-content"
            dangerouslySetInnerHTML={{ __html: blog.long_description || "" }}
          />
          <div style={{ marginTop: 18 }}>
            <button className="btn primary" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </article>

        <aside className="detail-side">
          <div className="about card">
            <h4>About this post</h4>
            <p>
              {blog.short_description ||
                (blog.long_description &&
                  stripHtml(blog.long_description).slice(0, 160))}
            </p>
          </div>

          <div className="share card">
            <h4>Share</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                className="btn ghost"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/?text=${encodeURIComponent(
                  blog.title + " " + window.location.href
                )}`}
              >
                WhatsApp
              </a>
              <a
                className="btn ghost"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  blog.title
                )}&url=${encodeURIComponent(window.location.href)}`}
              >
                Twitter
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "");
}
