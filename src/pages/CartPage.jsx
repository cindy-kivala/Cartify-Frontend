import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
  checkoutCart,
} from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await getCartItems(user.username);
      setCart(res);
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
    if (newQuantity < 1) return;
    try {
      const updatedItem = await updateCartItem(id, newQuantity);
      setCart((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const checkout = async () => {
    if (!user) return toast.error("Please log in first");
    if (cart.length === 0) return toast.error("Cart is empty");

    try {
      await checkoutCart(user.username);
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
        <p>Your cart is empty</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1e1e2f",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div>
                  <strong>{item.product_name}</strong> <br />
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-primary"
            style={{ marginTop: "20px", width: "200px" }}
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
