// src/components/AddToCartButton.jsx
import React from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AddToCartButton({ user, productId, stock, onAdded }) {
  const handleClick = async () => {
    console.log("AddToCartButton: user =", user);
    console.log("AddToCartButton: productId =", productId);

    if (!user) {
      alert("Please log in first");
      return;
    }
    if (!user.id) {
      console.error("AddToCartButton: user.id is missing!");
      alert("Error: User ID is missing");
      return;
    }
    if (stock <= 0) {
      alert("Out of stock");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      console.log("AddToCartButton: server response =", data);

      if (!res.ok) {
        alert(data.error || "Failed to add to cart");
      } else {
        alert("Added to cart!");
        if (onAdded) onAdded();
      }
    } catch (err) {
      console.error("AddToCartButton: fetch error", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={stock <= 0}
      style={{
        marginTop: "12px",
        width: "100%",
        padding: "10px",
        backgroundColor: stock > 0 ? "#007bff" : "#ccc",
        color: stock > 0 ? "#fff" : "#666",
        border: "none",
        borderRadius: "6px",
        cursor: stock > 0 ? "pointer" : "not-allowed",
      }}
    >
      {stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
