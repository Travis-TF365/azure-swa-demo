import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Your current homepage component extracted
function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333", maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <header style={{ borderBottom: "1px solid #ddd", paddingBottom: 15, marginBottom: 30, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Acme Corp</h1>
        <nav>
          <Link to="/" style={navLink}>Home</Link>
          <a href="#about" style={navLink}>About</a>
          <a href="#contact" style={navLink}>Contact</a>
          <Link to="/internal/dashboard" style={navLink}>Internal Dashboard</Link>
        </nav>
      </header>

      <section id="home" style={{ marginBottom: 50, textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: 10 }}>Welcome to Acme Corp</h2>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>Innovating your world, one solution at a time.</p>
      </section>

      <section id="about" style={{ marginBottom: 50 }}>
        <h3>About Us</h3>
        <p>
          Acme Corp is a leading provider of innovative tech solutions. We specialize in delivering
          top-notch products that empower businesses worldwide.
        </p>
      </section>

      <section id="contact" style={{ marginBottom: 50 }}>
        <h3>Contact Us</h3>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
          <label htmlFor="name" style={{ marginBottom: 5 }}>Name:</label>
          <input id="name" type="text" placeholder="Your name" required style={inputStyle} />

          <label htmlFor="email" style={{ marginTop: 15, marginBottom: 5 }}>Email:</label>
          <input id="email" type="email" placeholder="you@example.com" required style={inputStyle} />

          <label htmlFor="message" style={{ marginTop: 15, marginBottom: 5 }}>Message:</label>
          <textarea id="message" placeholder="Your message" required rows={4} style={inputStyle} />

          <button type="submit" style={{ marginTop: 20, padding: "10px", backgroundColor: "#0078D4", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Send
          </button>
        </form>
      </section>

      <footer style={{ borderTop: "1px solid #ddd", paddingTop: 15, textAlign: "center", color: "#999" }}>
        &copy; {new Date().getFullYear()} Acme Corp. All rights reserved.
      </footer>
    </div>
  );
}

// New protected internal dashboard page
function Dashboard() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333", maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Internal Dashboard</h1>
      <p>Only logged-in users from your Microsoft org can see this.</p>
      <Link to="/" style={{ color: "#0078D4", fontWeight: "bold" }}>Back to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internal/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

const navLink = {
  marginLeft: 15,
  textDecoration: "none",
  color: "#0078D4",
  fontWeight: "bold",
};

const inputStyle = {
  padding: 8,
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: "1rem",
};
