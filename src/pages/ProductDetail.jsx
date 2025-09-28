// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
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
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }
    
    try {
      await addToCart(productId);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-b-[#00f0ff]"></div>
        <span className="ml-3 text-[#e0e0ff]">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center">
        <h1 className="page-title mb-4">Product Not Found</h1>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-6">
          <Link to="/" className="text-[#00f0ff] hover:text-[#ff00f7] transition">
            ← Back to Products
          </Link>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image - Smaller, Card Format */}
          <div className="product-card">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=No+Image';
                }}
              />
              {product.stock <= 5 && product.stock > 0 && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                  Only {product.stock} left!
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-card space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0ff] mb-2 glow">{product.name}</h1>
              <p className="product-price text-3xl mb-4">${product.price.toFixed(2)}</p>
            </div>
            
            {/* Product Meta */}
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="bg-[#00f0ff] text-black px-3 py-1 rounded-full text-sm font-bold">
                  {product.category}
                </span>
              )}
              {product.brand && (
                <span className="bg-[#ff00f7] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.brand}
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <div>
              <p className={`text-lg font-medium glow ${
                product.stock > 5 ? 'text-[#00ff9d]' : 
                product.stock > 0 ? 'text-orange-400' : 'text-red-400'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
              </p>
            </div>
            
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-[#e0e0ff] mb-2 glow">Description</h3>
                <p className="text-[#8888aa] leading-relaxed">{product.description}</p>
              </div>
            )}
            
            {/* Add to Cart */}
            <div className="pt-4">
              <AddToCartButton
                user={user}
                productId={product.id}
                stock={product.stock}
                onAdded={() => handleAddToCart(product.id)}
              />
            </div>
            
            {/* Additional Info */}
            <div className="pt-4 border-t border-[#8888aa] border-opacity-30">
              <div className="grid grid-cols-2 gap-4 text-sm text-[#8888aa]">
                <div>
                  <span className="font-medium text-[#e0e0ff]">SKU:</span> #{product.id}
                </div>
                <div>
                  <span className="font-medium text-[#e0e0ff]">Added:</span> {new Date(product.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}