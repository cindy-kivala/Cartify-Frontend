// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail({ addToCart, user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full md:w-1/2 h-96 object-cover rounded"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-700">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-2 font-medium">Stock: {product.stock}</p>
        </div>

        <div className="mt-4">
          <AddToCartButton
            user={user}
            productId={product.id}
            stock={product.stock}
            onAdded={() => addToCart(product.id)}
          />
        </div>
      </div>
    </div>
  );
}

