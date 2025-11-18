import React, { useEffect, useState } from "react";
import "./Contact.css";
import Footer from "../components/Footer";

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });

  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries)=> entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')), { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
    return ()=> obs.disconnect();
  },[]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); alert('Message sent — thank you!'); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); };

  return (
    <main className="contact-root">
      <header className="contact-head reveal">
        <h1>Contact</h1>
        <p className="lead">Reach out for partnerships, product inquiries, or farmer programs.</p>
      </header>

      <section className="contact-grid">
        <form className="contact-box form-box reveal" onSubmit={onSubmit}>
          <h3>Send a message</h3>
          <label>Full name</label>
          <input name="name" value={form.name} onChange={onChange} required />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required />

          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={onChange} />

          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={onChange} />

          <label>Message</label>
          <textarea name="message" rows="5" value={form.message} onChange={onChange} required/>

          <button className="btn-submit" type="submit">Send Message</button>
        </form>

        <aside className="contact-box info-box reveal delay">
          <h3>Contact info</h3>
          <div className="info-row"><strong>Phone</strong><div className="muted">+91 90237 56982</div></div>
          <div className="info-row"><strong>Email</strong><div className="muted">support@business.com</div></div>
          <div className="info-row"><strong>Address</strong><div className="muted">Vadodara, Gujarat, India</div></div>

          <div style={{marginTop:12}} className="muted">Prefer phone? Best times: Mon–Sat, 9AM–6PM IST</div>
        </aside>
      </section>
      <Footer />
    </main>
  );
}
