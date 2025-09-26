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
  const [cart, setCart] = useState({ items: [], total: 0, total_price: 0 });

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems(user.username);
      if (data.error) throw new Error(data.error);
      setCart(data); // data = { items, total, total_price }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await removeCartItem(id);
      if (res.error) throw new Error(res.error);
      await fetchCart(); // refresh totals & items from backend
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to remove item");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const item = cart.items.find((i) => i.id === itemId);
      if (!item) throw new Error("Cart item not found");

      const updatedItem = await updateCartItem(itemId, newQuantity);
      if (updatedItem.error) throw new Error(updatedItem.error);

      await fetchCart(); // refresh totals & items from backend
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update quantity");
    }
  };

  const handleCheckout = async () => {
    if (!user) return toast.error("Please login first");
    if (cart.items.length === 0) return toast.error("Cart is empty");

    try {
      const res = await checkoutCart(user.username);
      if (res.error) throw new Error(res.error);
      setCart({ items: [], total: 0, total_price: 0 });
      toast.success("Checkout successful! Your order has been placed.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Checkout failed");
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1 className="page-title glow">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-muted">Cart is empty</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {cart.items.map((item) => (
            <div key={item.id} className="product-card">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h2 className="product-name glow">{item.product_name}</h2>
              <p className="product-price glow">
                ${item.price.toFixed(2)} × {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </p>

              <div style={{ display: "flex", gap: "8px", margin: "10px 0" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-delete"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTALS from backend */}
          <div
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            <p>Total Items: {cart.total}</p>
            <p>Total Price: ${cart.total_price.toFixed(2)}</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            style={{ marginTop: "10px" }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
