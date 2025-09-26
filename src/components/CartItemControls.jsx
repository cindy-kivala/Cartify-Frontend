import toast from "react-hot-toast";
import { updateCartItem, removeCartItem } from "../services/api";

export default function CartItemControls({ item, onUpdate, onRemove }) {
  const handleIncrement = async () => {
    if (item.quantity >= item.stock) {
      return toast.error(`Only ${item.stock} items available`);
    }
    try {
      const res = await updateCartItem(item.id, item.quantity + 1);
      if (res.error) return toast.error(res.error);
      onUpdate(res); // update parent state
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrement = async () => {
    if (item.quantity <= 1) return;
    try {
      const res = await updateCartItem(item.id, item.quantity - 1);
      if (res.error) return toast.error(res.error);
      onUpdate(res); // update parent state
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async () => {
    try {
      const res = await removeCartItem(item.id);
      if (res.error) return toast.error(res.error);
      toast.success("Item removed");
      onRemove(item.id); // remove from parent state
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={handleIncrement}
        disabled={item.quantity >= item.stock}
        className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-50"
      >
        +
      </button>
      <button
        onClick={handleDecrement}
        disabled={item.quantity <= 1}
        className="px-2 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
      >
        -
      </button>
      <button
        onClick={handleRemove}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
      >
        Remove
      </button>
    </div>
  );
}
