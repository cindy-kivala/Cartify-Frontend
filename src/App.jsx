// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import OrdersPage from "./pages/OrdersPage";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">E-Commerce</h1>
      <div className="navbar-links">
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 E-Commerce App</p>
        </footer>
      </div>
    </Router>
  );
}
