import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

import BlogList from "./pages/Blog";       // 👈 BLOG LIST PAGE
import BlogDetail from "./pages/BlogDetail"; // 👈 BLOG DETAIL PAGE

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* BLOG MODULE */}
        <Route path="/blog" element={<BlogList />} />        {/* blog list */}
        <Route path="/blog/:id" element={<BlogDetail />} />  {/* blog detail */}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}
