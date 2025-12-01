import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

import BlogList from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}
