// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  async function fetchCart() {
    setLoadingCart(true);
    try {
      const data = await getCartItems(user.username);
      if (data.error) {
        toast.error(`Failed to load cart: ${data.error}`);
        setCart([]);
        return;
      }
      setCart(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
      setCart([]);
    } finally {
      setLoadingCart(false);
    }
  }

  async function handleUpdate(itemId, newQty) {
    try {
      const item = cart.find((i) => i.id === itemId);
      if (!item) return;
      if (newQty < 1) return;
      if (newQty > item.stock) {
        toast.error(`Only ${item.stock} items available`);
        return;
      }

      const updated = await updateCartItem(itemId, newQty);
      if (updated.error) {
        toast.error(`Update failed: ${updated.error}`);
        return;
      }

      setCart((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, quantity: updated.quantity } : i
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update item");
    }
  }

  async function handleRemove(itemId) {
    try {
      const res = await removeCartItem(itemId);
      if (res.error) {
        toast.error(`Remove failed: ${res.error}`);
        return;
      }
      setCart((prev) => prev.filter((i) => i.id !== itemId));
      toast.success("Item removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  }

  async function handleCheckout() {
    try {
      setLoadingCheckout(true);
      const res = await checkoutCart(user.username);
      if (res.error) {
        toast.error(`Checkout failed: ${res.error}`);
        return;
      }

      const total = cart.reduce(
        (sum, item) => sum + item.quantity * (item.price || 0),
        0
      );

      setCart([]); // Clear cart
      toast.success(`Checkout successful! Total: $${total.toFixed(2)}`, {
        duration: 5000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    } finally {
      setLoadingCheckout(false);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0
  );

  if (loadingCart) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center border rounded-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-32 h-32 object-cover rounded-lg mb-3"
              />
              <p className="font-semibold text-center">{item.product_name}</p>
              <p className="text-sm text-gray-600 mb-2">
                ${item.price} × {item.quantity} ={" "}
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </p>

              <div className="flex space-x-2 mb-2">
                <button
                  onClick={() => handleUpdate(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-600 transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => handleUpdate(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50 hover:bg-yellow-600 transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </h2>
          <button
            onClick={handleCheckout}
            disabled={loadingCheckout}
            className={`mt-3 px-6 py-2 rounded text-white ${
              loadingCheckout
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingCheckout ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
