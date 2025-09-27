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
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Featured Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=No+Image';
                    }}
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
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${product.id}`} className="block hover:text-blue-600 transition">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h2>
                </Link>
                
                <div className="mb-3">
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    ${product.price.toFixed(2)}
                  </p>
                  
                  {product.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
                  
                  {product.brand && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-1">
                      {product.brand}
                    </span>
                  )}
                </div>
                
                {product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="mb-3">
                  <p className={`text-sm font-medium ${
                    product.stock > 5 ? 'text-green-600' : 
                    product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
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
        
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
}
