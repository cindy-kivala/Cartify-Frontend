// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function HomePage({ user, onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("HomePage: Failed to fetch products", err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#1e1e2f",
              padding: "16px",
              borderRadius: "12px",
              color: "#fff",
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
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
              {product.stock !== undefined && (
                <p style={{ color: product.stock > 0 ? "#0f0" : "#f00" }}>
                  {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
                </p>
              )}
            </Link>

            <AddToCartButton
              user={user}
              productId={product.id}
              stock={product.stock}
              onAdded={() => {
                if (onAddToCart) onAddToCart(product.id);
                console.log("HomePage: Item added to cart", product.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
