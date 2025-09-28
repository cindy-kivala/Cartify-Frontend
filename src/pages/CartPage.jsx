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
      console.log("CartPage: received items", items);
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
      toast.success("Item removed from cart");
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
      await checkoutCart(user.id);
      setCart([]);
      toast.success("Checkout successful! Your order has been placed.");
    } catch (err) {
      console.error("CartPage: checkout error", err);
      toast.error("Checkout failed");
    }
  };

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center">
        <h1 className="page-title mb-4">Your Cart</h1>
        <p className="text-[#8888aa]">Please log in to view your cart</p>
        <a href="/login" className="btn btn-primary mt-4">Login</a>
      </div>
    );
  }

  if (loading) return <p className="text-center py-10 text-[#e0e0ff]">Loading cart...</p>;

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center">
        <h1 className="page-title mb-4">Your Cart</h1>
        <p className="text-[#8888aa] mb-4">Your cart is empty</p>
        <a href="/products" className="btn btn-primary">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <h1 className="page-title text-center mb-8">Your Cart</h1>

      {/* Grid Layout for Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            {/* Small Product Image */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-full h-40 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}

            {/* Product Details */}
            <div className="mb-4">
              <h3 className="product-name mb-2">{item.product_name}</h3>
              <p className="product-price mb-1">${item.price ? item.price.toFixed(2) : '0.00'}</p>
              <p className="text-[#8888aa] text-sm">
                Subtotal: ${((item.price || 0) * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 bg-[#00f0ff] text-black font-bold rounded-full hover:scale-110 transition disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-3 py-1 border border-[#8888aa] rounded text-[#e0e0ff] font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdate(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-[#00f0ff] text-black font-bold rounded-full hover:scale-110 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id)}
              className="btn btn-secondary w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Total and Checkout */}
      <div className="product-card max-w-md mx-auto text-center">
        <p className="text-2xl font-bold text-[#00ff9d] mb-4 glow">
          Total: ${cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0).toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="btn btn-primary w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}