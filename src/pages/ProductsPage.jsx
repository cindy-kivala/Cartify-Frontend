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
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="mt-2 font-bold text-lg">{product.name}</h2>
          <p className="text-gray-700">${product.price.toFixed(2)}</p>
          <AddToCartButton
            user={user}
            productId={product.id}
            stock={product.stock}
            onAdded={() => onAddToCart(product.id)}
          />
        </div>
      ))}
    </div>
  );
}

