import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css";
import Footer from "../components/Footer";

const API_URL = "http://127.0.0.1:8000/api/blogs";
const defaultImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23f1f7ef'/%3E%3C/svg%3E";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="blog-detail-root">
      <div className="blog-detail-container">
        {loading ? (
          <div className="loading">Loading blog...</div>
        ) : !blog ? (
          <div className="not-found">Blog not found.</div>
        ) : (
          <article className="detail-card reveal">
            <div className="detail-thumb-wrap">
              <img
                src={blog.image || defaultImage}
                alt={blog.title}
                className="detail-thumb"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
            </div>

            <div className="detail-body">
              <h1 className="detail-title">{blog.title}</h1>
              <div className="detail-meta">
                <span className="detail-date">
                  {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ""}
                </span>
              </div>

              <p className="detail-desc">{blog.short_description || ""}</p>

              <div
                className="detail-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div className="detail-actions">
                <Link to="/blog" className="btn ghost">
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>

      <Footer />
    </div>
  );
}
