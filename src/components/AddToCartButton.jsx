// src/components/AddToCartButton.jsx
import toast from "react-hot-toast";
import { addCartItem } from "../services/api";

export default function AddToCartButton({ user, productId, stock, onAdded }) {
  const handleClick = async () => {
    if (!user) return toast.error("Please log in first");
    if (stock <= 0) return;

    try {
      const res = await addCartItem(user.id, productId, 1);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Added to cart!");
        if (onAdded) onAdded(); // optional callback for parent state update
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={stock <= 0}
      className={`mt-2 w-full px-4 py-2 font-semibold rounded transition ${
        stock > 0
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-400 cursor-not-allowed text-gray-200"
      }`}
      aria-label={stock > 0 ? "Add to Cart" : "Out of Stock"}
    >
      {stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}


