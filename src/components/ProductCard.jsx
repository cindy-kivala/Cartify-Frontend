import React from "react";

function ProductCard({ product, onAddToCart }) {
  
  return (
    <div
      className="product-card"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "150px",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#888",
          }}
        >
          {product.image}
        </div>
      )}
      <h3>{product.name}</h3>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Category: {product.category || "Uncategorized"}
      </p>
      <p style={{ fontSize: "0.9rem" }}>{product.details}</p>
      <p style={{ fontWeight: "bold", marginTop: "5px" }}>${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          marginTop: "10px",
          padding: "8px 10px",
          border: "none",
          borderRadius: "6px",
          background: "linear-gradient(90deg, #FF4500, #FF6347)",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;