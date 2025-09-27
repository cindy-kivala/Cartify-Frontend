// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import toast from "react-hot-toast";
import { getProducts } from "../services/api"; // uses dynamic API_URL

export default function ProductsPage({ onAddToCart, user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(); // automatically uses API_URL from api.js
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

   return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="page-title text-center mb-8">All Products</h1>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No products available</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card flex flex-col justify-between">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
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
            </div>

            {/* Product Name & Price */}
            <h2 className="product-name mt-3 line-clamp-2">{product.name}</h2>
            <p className="product-price mt-1">${product.price.toFixed(2)}</p>

            {/* Add to Cart Button */}
            <div className="mt-3">
              <AddToCartButton
                user={user}
                productId={product.id}
                stock={product.stock}
                onAdded={() => onAddToCart(product.id)}
                className="btn btn-primary w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

