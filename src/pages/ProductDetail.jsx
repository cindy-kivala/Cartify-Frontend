// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetail({ user, addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("ProductDetail: Failed to fetch product", err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <img
        src={product.image_url}
        alt={product.name}
        style={{ width: "100%", maxWidth: "400px", objectFit: "cover", borderRadius: "12px" }}
      />

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>{product.name}</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "12px" }}>${product.price.toFixed(2)}</p>
        {product.description && <p style={{ marginBottom: "12px" }}>{product.description}</p>}
        <p style={{ marginBottom: "12px" }}>Stock: {product.stock}</p>

        <AddToCartButton
          user={user}
          productId={product.id}
          stock={product.stock}
          onAdded={() => {
            if (addToCart) addToCart(product.id);
            console.log("ProductDetail: Item added to cart", product.id);
          }}
        />
      </div>
    </div>
  );
}

