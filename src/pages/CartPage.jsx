import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { getCartItems, updateCartItem, removeCartItem, checkoutCart } from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems(user.username);
      if (data.error) throw new Error(data.error);
      setCart(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await removeCartItem(id);
      if (res.error) throw new Error(res.error);
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to remove item");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const item = cart.find((i) => i.id === itemId);
      if (!item) throw new Error("Cart item not found");

      const updatedItem = await updateCartItem(itemId, newQuantity);
      if (updatedItem.error) throw new Error(updatedItem.error);

      setCart((prev) =>
        prev.map((cartItem) => (cartItem.id === itemId ? updatedItem : cartItem))
      );
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update quantity");
    }
  };

  const handleCheckout = async () => {
    if (!user) return toast.error("Please login first");
    if (cart.length === 0) return toast.error("Cart is empty");

    try {
      const res = await checkoutCart(user.username);
      if (res.error) throw new Error(res.error);
      setCart([]);
      toast.success("Checkout successful! Your order has been placed.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Checkout failed");
    }
  };

  // ---------------- TOTAL COUNT & PRICE ----------------
  const totalCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.quantity * item.price, 0), [cart]);

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
                ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </p>

              <div style={{ display: "flex", gap: "8px", margin: "10px 0" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
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

              <button className="btn btn-delete" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}

          {/* TOTALS */}
          <div style={{ marginTop: "20px", fontWeight: "bold", fontSize: "1.2rem" }}>
            <p>Total Items: {totalCount}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>

          <button className="btn btn-primary" onClick={handleCheckout} style={{ marginTop: "10px" }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
