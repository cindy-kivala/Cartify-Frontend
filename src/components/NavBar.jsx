// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ user, onLogout }) {
  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <Link to="/" className="navbar-brand brand-font">
        Cartify
      </Link>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <li>
            <button
              onClick={onLogout}
              className="btn btn-secondary"
              style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "8px" }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* ✅ Animated Brand Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .brand-font {
          font-family: 'Orbitron', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          animation: neonRainbow 3s linear infinite;
          transition: transform 0.2s ease-in-out;
        }

        .brand-font:hover {
          transform: scale(1.1);
        }

        @keyframes neonRainbow {
          0% { color: #ff4fa1; text-shadow: 0 0 8px #ff4fa1; }
          25% { color: #ffae00; text-shadow: 0 0 8px #ffae00; }
          50% { color: #00e0ff; text-shadow: 0 0 8px #00e0ff; }
          75% { color: #8d4dff; text-shadow: 0 0 8px #8d4dff; }
          100% { color: #ff4fa1; text-shadow: 0 0 8px #ff4fa1; }
        }
      `}</style>
    </nav>
  );
}
