// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProducts } from "../services/api";


export default function HomePage({ user, handleAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res);
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
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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
              textAlign: "center",
            }}
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

            <button
              className="btn btn-primary"
              style={{ marginTop: "12px", width: "100%" }}
              onClick={() => {
                if (!user) return toast.error("Please log in first");
                handleAddToCart(product.id);
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
