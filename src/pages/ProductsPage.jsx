// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductsPage({ user, onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1 className="page-title glow">Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              background: "#1e1e2f",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.2s ease",
              textAlign: "center",
            }}
          >
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h2 className="product-name glow">{product.name}</h2>
              <p className="product-price glow">${product.price.toFixed(2)}</p>

              {product.description && (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#ddd",
                    margin: "8px 0",
                  }}
                >
                  {product.description}
                </p>
              )}
              {product.category && (
                <p style={{ fontSize: "0.85rem", color: "#bbb" }}>
                  <strong>Category:</strong> {product.category}
                </p>
              )}
              {product.brand && (
                <p style={{ fontSize: "0.85rem", color: "#bbb" }}>
                  <strong>Brand:</strong> {product.brand}
                </p>
              )}

              {product.stock !== undefined && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: product.stock > 0 ? "#0f0" : "#f00",
                  }}
                >
                  {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
                </p>
              )}
            </Link>

            <button
              className="btn btn-primary"
              style={{ marginTop: "12px", width: "100%" }}
              onClick={() => {
                if (!user) return toast.error("Please log in first");
                onAddToCart(product.id);
              }}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
