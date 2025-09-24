import React from "react";

function ProductCard({ product, userId, onAddToCart }) {
  const handleAddToCart = async () => {
    if (!userId) {
      alert("User not logged in!");
      return;
  }

    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Added to cart: ${product.name} (Qty: ${product.quantity})`);
        if (onAddToCart) onAddToCart(product); // optional callback to update cart counter
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart. Check console for details.");
    }
  };
  
  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
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
          No Image
        </div>
      )}
      <h3>{product.name}</h3>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Category: {product.category || "Uncategorized"}
      </p>
      <p style={{ fontSize: "0.9rem" }}>{product.details}</p>
      <p style={{ fontWeight: "bold", marginTop: "5px" }}>${product.price}</p>
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;