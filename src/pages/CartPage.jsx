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
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user || !user.id) {
      setCart([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const items = await getCartItems(user.id);
      console.log("CartPage: received items", items); // Debug log
      setCart(items || []);
    } catch (err) {
      console.error("CartPage: fetchCart error", err);
      toast.error("Failed to load cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
      toast.success("Item removed");
    } catch (err) {
      console.error("CartPage: remove error", err);
      toast.error("Failed to remove item");
    }
  };

  const handleUpdate = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
      const updatedItem = await updateCartItem(cartItemId, quantity);
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? updatedItem : item))
      );
      toast.success("Quantity updated");
    } catch (err) {
      console.error("CartPage: update error", err);
      toast.error("Failed to update quantity");
    }
  };

  const handleCheckout = async () => {
    if (!user || !user.id) {
      toast.error("Please log in first");
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    try {
      // Use user.id instead of user.username for checkout
      await checkoutCart(user.id);
      setCart([]);
      toast.success("Checkout successful!");
    } catch (err) {
      console.error("CartPage: checkout error", err);
      toast.error("Checkout failed");
    }
  };

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Please log in to view your cart</p>
        <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
      </div>
    );
  }

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <a href="/products" className="text-blue-500 hover:underline">Continue Shopping</a>
      </div>
    );
  }

  return (
  <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
    <h1 className="page-title text-center mb-8">Your Cart</h1>

    {cart.length === 0 && (
      <div className="text-center py-12">
        <p className="text-text-muted text-lg">Your cart is empty</p>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-center p-4 bg-card-glass border border-transparent rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          {/* Product Image */}
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.product_name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 transition-transform duration-300 hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}

          {/* Product Details */}
          <div className="flex-1 ml-0 sm:ml-4 mt-2 sm:mt-0">
            <p className="font-semibold text-lg text-text-light">{item.product_name}</p>
            <p className="text-accent-neon-green font-bold">${item.price ? item.price.toFixed(2) : '0.00'}</p>
            <p className="text-text-muted text-sm mt-1">
              Subtotal: ${((item.price || 0) * item.quantity).toFixed(2)}
            </p>
          </div>

          {/* Quantity and Remove Controls */}
          <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdate(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-4 py-1 bg-accent-neon-blue text-black font-bold rounded-lg hover:scale-110 hover:shadow-lg transition transform disabled:opacity-50"
              >
                -
              </button>
              <span className="px-4 py-1 border rounded-lg text-center font-medium text-text-light">
                {item.quantity}
              </span>
              <button
                onClick={() => handleUpdate(item.id, item.quantity + 1)}
                className="px-4 py-1 bg-accent-neon-blue text-black font-bold rounded-lg hover:scale-110 hover:shadow-lg transition transform"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="bg-accent-neon-pink text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition transform"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Cart Total and Checkout */}
    {cart.length > 0 && (
      <div className="mt-8 flex justify-end items-center space-x-6">
        <p className="text-xl font-bold text-accent-neon-green">
          Total: ${cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0).toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="btn btn-primary px-6 py-3 hover:scale-105"
        >
          Checkout
        </button>
      </div>
    )}
  </div>
);


}