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

        {/* Grid Layout with Smaller Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="relative block">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-105 mb-3"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200/e5e7eb/6b7280?text=No+Image")
                  }
                />
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                    Only {product.stock} left!
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Out of Stock
                  </span>
                )}
              </Link>

              <div className="space-y-2">
                <Link to={`/products/${product.id}`} className="hover:text-[#00f0ff] transition">
                  <h2 className="product-name line-clamp-2">{product.name}</h2>
                </Link>

                <p className="product-price">${product.price.toFixed(2)}</p>

                <div className="flex flex-wrap gap-1">
                  {product.category && (
                    <span className="bg-[#00f0ff] text-black text-xs px-2 py-1 rounded-full font-bold">
                      {product.category}
                    </span>
                  )}
                  {product.brand && (
                    <span className="bg-[#ff00f7] text-white text-xs px-2 py-1 rounded-full font-bold">
                      {product.brand}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-[#8888aa] text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}

                <p className={`text-sm font-medium ${
                  product.stock > 5 ? 'text-[#00ff9d]' :
                  product.stock > 0 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>

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