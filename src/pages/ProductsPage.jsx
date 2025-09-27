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
  <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Products</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=No+Image';
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

          <h2 className="mt-3 font-semibold text-lg text-gray-800 line-clamp-2">{product.name}</h2>
          <p className="text-green-600 font-bold text-xl mt-1">${product.price.toFixed(2)}</p>

          <AddToCartButton
            user={user}
            productId={product.id}
            stock={product.stock}
            onAdded={() => onAddToCart(product.id)}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          />
        </div>
      ))}
    </div>

    {products.length === 0 && !loading && (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No products available</p>
      </div>
    )}
  </div>
);

}

