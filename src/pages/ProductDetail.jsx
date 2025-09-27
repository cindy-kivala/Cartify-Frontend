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
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400/e5e7eb/6b7280?text=No+Image';
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

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-4xl font-bold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          {/* Product Meta */}
          <div className="flex flex-wrap gap-2">
            {product.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Category: {product.category}
              </span>
            )}
            {product.brand && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Brand: {product.brand}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div>
            <p className={`text-lg font-medium ${
              product.stock > 5 ? 'text-green-600' : 
              product.stock > 0 ? 'text-orange-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
            </p>
          </div>
          
          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
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
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">SKU:</span> #{product.id}
              </div>
              <div>
                <span className="font-medium">Added:</span> {new Date(product.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}