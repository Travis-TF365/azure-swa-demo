import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

const DOMAIN = "@techforge365.com"; // <-- your allowed domain here

// Protected Route Component
function ProtectedRoute({ children, isAuthorized, user }) {
  if (!user) {
    // Not authenticated at all - redirect to login
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        textAlign: "center"
      }}>
        <h2>Authentication Required</h2>
        <p>Please log in to access this page.</p>
        <a 
          href="/.auth/login/aad" 
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#0078D4",
            color: "white",
            textDecoration: "none",
            borderRadius: 4,
            fontWeight: "bold"
          }}
        >
          Login with Microsoft
        </a>
      </div>
    );
  }
  
  if (!isAuthorized) {
    // Authenticated but not authorized
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        textAlign: "center"
      }}>
        <h2>Access Denied</h2>
        <p>You must be a member of the techforge365.com organization to access this page.</p>
        <p>Your email: <strong>{user.userDetails}</strong></p>
        <div style={{ marginTop: 20 }}>
          <Link to="/" style={{ color: "#0078D4", fontWeight: "bold", marginRight: 20 }}>
            Back to Home
          </Link>
          <a 
            href="/.auth/logout" 
            style={{
              color: "#dc3545",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Logout
          </a>
        </div>
      </div>
    );
  }
  
  return children;
}

// Your current homepage component
function Home({ isAuthorized, user }) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: 15,
          marginBottom: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Acme Corp</h1>
        <nav>
          <Link to="/" style={navLink}>
            Home
          </Link>
          <a href="#about" style={navLink}>
            About
          </a>
          <a href="#contact" style={navLink}>
            Contact
          </a>
          {isAuthorized && (
            <Link to="/internal/dashboard" style={navLink}>
              Internal Dashboard
            </Link>
          )}
          {user ? (
            <>
              <span style={{ marginLeft: 15, color: "#666" }}>
                Welcome, {user.userDetails}
              </span>
              <a href="/.auth/logout" style={{ ...navLink, color: "#dc3545" }}>
                Logout
              </a>
            </>
          ) : (
            <a href="/.auth/login/aad" style={navLink}>
              Login
            </a>
          )}
        </nav>
      </header>

      <section id="home" style={{ marginBottom: 50, textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: 10 }}>
          Welcome to Acme Corp
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Innovating your world, one solution at a time.
        </p>
        {user && (
          <p style={{ color: "#0078D4", fontWeight: "bold" }}>
            Logged in as: {user.userDetails}
          </p>
        )}
      </section>

      <section id="about" style={{ marginBottom: 50 }}>
        <h3>About Us</h3>
        <p>
          Acme Corp is a leading provider of innovative tech solutions. We
          specialize in delivering top-notch products that empower businesses
          worldwide.
        </p>
      </section>

      <section id="contact" style={{ marginBottom: 50 }}>
        <h3>Contact Us</h3>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}
        >
          <label htmlFor="name" style={{ marginBottom: 5 }}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            required
            style={inputStyle}
          />

          <label htmlFor="email" style={{ marginTop: 15, marginBottom: 5 }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            style={inputStyle}
          />

          <label
            htmlFor="message"
            style={{ marginTop: 15, marginBottom: 5 }}
          >
            Message:
          </label>
          <textarea
            id="message"
            placeholder="Your message"
            required
            rows={4}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              marginTop: 20,
              padding: "10px",
              backgroundColor: "#0078D4",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </section>

      <footer
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: 15,
          textAlign: "center",
          color: "#999",
        }}
      >
        &copy; {new Date().getFullYear()} Acme Corp. All rights reserved.
      </footer>
    </div>
  );
}

// Enhanced internal dashboard page
function Dashboard({ user }) {
  const dashboardData = {
    totalUsers: 245,
    activeProjects: 12,
    monthlyRevenue: "$125,000"
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
      }}
    >
      <header style={{ marginBottom: 30 }}>
        <h1>Internal Dashboard</h1>
        <p style={{ color: "#666" }}>
          Welcome, {user?.userDetails}! This dashboard is only accessible to techforge365.com employees.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 30 }}>
        <div style={dashboardCard}>
          <h3 style={{ margin: "0 0 10px 0", color: "#0078D4" }}>Total Users</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>{dashboardData.totalUsers}</p>
        </div>
        <div style={dashboardCard}>
          <h3 style={{ margin: "0 0 10px 0", color: "#0078D4" }}>Active Projects</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>{dashboardData.activeProjects}</p>
        </div>
        <div style={dashboardCard}>
          <h3 style={{ margin: "0 0 10px 0", color: "#0078D4" }}>Monthly Revenue</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>{dashboardData.monthlyRevenue}</p>
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>Recent Activity</h2>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 20 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
              📊 Quarterly report generated - 2 hours ago
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
              🚀 New feature deployed to production - 5 hours ago
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
              👥 Team meeting scheduled for tomorrow - 1 day ago
            </li>
            <li style={{ padding: "10px 0" }}>
              💼 Client presentation completed - 2 days ago
            </li>
          </ul>
        </div>
      </div>

      <div>
        <Link to="/" style={{ 
          color: "#0078D4", 
          fontWeight: "bold", 
          textDecoration: "none",
          padding: "10px 20px",
          border: "2px solid #0078D4",
          borderRadius: 4,
          display: "inline-block"
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

// Debug component to show auth status
function AuthDebug({ user, isAuthorized, loading }) {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div style={{
      position: "fixed",
      top: 10,
      right: 10,
      background: "#f8f9fa",
      border: "1px solid #ddd",
      padding: 10,
      fontSize: 12,
      fontFamily: "monospace",
      maxWidth: 300,
      zIndex: 1000
    }}>
      <strong>Auth Debug:</strong><br/>
      Loading: {loading ? "Yes" : "No"}<br/>
      User: {user ? "Yes" : "No"}<br/>
      {user && (
        <>
          Email: {user.userDetails}<br/>
          Provider: {user.identityProvider}<br/>
        </>
      )}
      Authorized: {isAuthorized ? "Yes" : "No"}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Fetch user info from Azure Static Web Apps auth endpoint
  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => {
        console.log("Auth response status:", res.status);
        if (!res.ok) {
          if (res.status === 401) {
            // Not authenticated - this is normal
            return { clientPrincipal: null };
          }
          throw new Error(`Authentication check failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Auth data:", data);
        setUser(data.clientPrincipal ?? null);
        setAuthError(null);
      })
      .catch((error) => {
        console.error("Auth error:", error);
        setUser(null);
        setAuthError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const isAuthorized =
    user?.userDetails?.endsWith(DOMAIN) && user?.identityProvider === "aad";

  if (loading) {
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center", 
        padding: 50 
      }}>
        <h2>Loading...</h2>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center", 
        padding: 50,
        color: "#dc3545"
      }}>
        <h2>Authentication Error</h2>
        <p>{authError}</p>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  return (
    <>
      <AuthDebug user={user} isAuthorized={isAuthorized} loading={loading} />
      <Router>
        <Routes>
          <Route path="/" element={<Home isAuthorized={isAuthorized} user={user} />} />
          <Route 
            path="/internal/dashboard" 
            element={
              <ProtectedRoute isAuthorized={isAuthorized} user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
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

const dashboardCard = {
  background: "#f8f9fa",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 20,
  textAlign: "center"
};