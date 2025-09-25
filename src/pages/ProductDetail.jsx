// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductById } from "../services/api";
import { addToCart } from "../services/api";


export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h2 className="glow">Loading product...</h2>;
  if (!product) return <h2 className="glow">Product not found</h2>;


  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <div
        className="product-detail-card"
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          background: "#1e1e2f",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
          flexWrap: "wrap",
        }}
      >
        {/* Product image */}
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "10px",
            flexShrink: 0,
          }}
        />

        {/* Product info */}
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h1 className="product-name glow">{product.name}</h1>
          <p className="product-price glow" style={{ fontSize: "1.5rem" }}>
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <p
              className="product-description"
              style={{
                marginTop: "12px",
                fontSize: "1rem",
                color: "#ddd",
                lineHeight: "1.5",
              }}
            >
              {product.description}
            </p>
          )}

          <div style={{ marginTop: "16px", color: "#bbb" }}>
            {product.category && (
              <p>
                <strong>Category:</strong> {product.category}
              </p>
            )}
            {product.brand && (
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            )}
          </div>

          {product.stock !== undefined && (
            <p
              style={{
                marginTop: "12px",
                color: product.stock > 0 ? "#0f0" : "#f00",
              }}
            >
              {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
            </p>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: "20px", padding: "10px 20px" }}
            onClick={() => addToCart(product.id, currentUser.username)}
            disabled={product.stock <= 0} // ✅ disable button
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
