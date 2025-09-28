// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AddToCartButton from "../components/AddToCartButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function HomePage({ user, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("HomePage: Failed to fetch products", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    try {
      await onAddToCart(productId);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f0ff]"></div>
        <span className="ml-3 text-[#e0e0ff]">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-center mb-8">Featured Products</h1>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8888aa] text-lg">No products available</p>
          </div>
        )}

        {/* Fixed Grid Layout - Override CSS image height */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card" style={{ padding: '16px' }}>
              <Link to={`/products/${product.id}`} className="block">
                {/* 4:3 Aspect Ratio Container - Override CSS */}
                <div className="relative w-full mb-3" style={{ aspectRatio: '4/3', height: 'auto' }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ 
                      position: 'absolute',
                      inset: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px'
                    }}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/200x150/e5e7eb/6b7280?text=No+Image")
                    }
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-1 right-1 bg-orange-500 text-white px-1 py-0.5 rounded text-xs">
                      {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs">
                      Out
                    </span>
                  )}
                </div>
              </Link>

              <div className="space-y-2">
                <Link to={`/products/${product.id}`} className="hover:text-[#00f0ff] transition">
                  <h2 className="product-name" style={{ fontSize: '14px' }}>{product.name}</h2>
                </Link>

                <p className="product-price" style={{ fontSize: '14px' }}>{product.price.toFixed(2)}</p>

                <div className="flex flex-wrap gap-1">
                  {product.category && (
                    <span className="bg-[#00f0ff] text-black text-xs px-1 py-0.5 rounded">
                      {product.category}
                    </span>
                  )}
                </div>

                <AddToCartButton
                  user={user}
                  productId={product.id}
                  stock={product.stock}
                  onAdded={() => handleAddToCart(product.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
