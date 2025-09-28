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
      await checkoutCart(user.id);
      setCart([]);
      toast.success("Checkout successful!");
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

      {/* Grid Layout for Cart Items with small 4:3 images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            {/* Small 4:3 Product Image */}
            {item.image_url && (
              <div className="relative w-full mb-3" style={{ aspectRatio: '4/3' }}>
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-2">
              <h3 className="product-name text-sm line-clamp-2">{item.product_name}</h3>
              <p className="product-price text-sm">${item.price ? item.price.toFixed(2) : '0.00'}</p>
              <p className="text-[#8888aa] text-xs">
                Subtotal: ${((item.price || 0) * item.quantity).toFixed(2)}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleUpdate(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-6 h-6 bg-[#00f0ff] text-black font-bold rounded text-xs hover:scale-110 transition disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 border border-[#8888aa] rounded text-[#e0e0ff] text-xs min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleUpdate(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-[#00f0ff] text-black font-bold rounded text-xs hover:scale-110 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="btn btn-secondary w-full text-xs py-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total and Checkout */}
      <div className="product-card max-w-md mx-auto text-center">
        <p className="text-xl font-bold text-[#00ff9d] mb-4 glow">
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