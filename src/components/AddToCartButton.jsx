// src/components/AddToCartButton.jsx
import toast from "react-hot-toast";
import { addCartItem } from "../services/api";

export default function AddToCartButton({ user, productId, stock, onAdded }) {
  const handleClick = async () => {
    if (!user) return toast.error("Please log in first");

    try {
      const res = await addCartItem(user.id, productId, 1);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Added to cart");
        if (onAdded) onAdded(); // optional callback for updating cart state
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <button
      className={`mt-2 px-3 py-2 rounded w-full font-semibold ${
        stock > 0
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-500 cursor-not-allowed text-gray-300"
      }`}
      onClick={handleClick}
      disabled={stock <= 0}
    >
      {stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
