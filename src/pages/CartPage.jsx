import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getCartItems, addCartItem, updateCartItem, deleteCartItem, checkoutCart } from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const items = await getCartItems(user.id);
      setCart(items);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItem(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const updatedItem = await updateCartItem(id, { quantity: newQuantity });
      setCart((prev) => prev.map((item) => (item.id === id ? updatedItem : item)));
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const checkout = async () => {
    if (!user) return toast.error("Please login first");
    if (cart.length === 0) return toast.error("Cart is empty");

    try {
      await checkoutCart(user.id);
      setCart([]);
      toast.success("Checkout successful! Your order has been placed.");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1 className="page-title glow">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-muted">Cart is empty</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {cart.map((item) => (
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
                {item.price} × {item.quantity}
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
          <button
            className="btn btn-primary"
            onClick={checkout}
            style={{ marginTop: "20px" }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>

  );
}
