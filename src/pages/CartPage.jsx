// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCartItems, checkoutCart } from "../services/api";
import CartItemControls from "../components/CartItemControls";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getCartItems(user.id);
      setCart(data || []);
    } catch {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleUpdate = (updatedItem) => {
    setCart((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) return toast.error("Please log in first");
    try {
      await checkoutCart(user.id);
      setCart([]);
      toast.success("Checkout successful");
    } catch {
      toast.error("Checkout failed");
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <CartItemControls
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center font-semibold text-lg">
            <span>Total: ${totalPrice.toFixed(2)}</span>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
