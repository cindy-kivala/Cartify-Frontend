// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  getCartItems, 
  addCartItem, 
  updateCartItem, 
  deleteCartItem, 
  checkoutCart 
} from "../services/api";

export default function CartPage({ user, cart, setCart }) {
  const [cart, setCart] = useState([]);

  // Fetch cart items on mount or when user changes
  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await getCartItems(user.username); // or user.id depending on backend
      setCart(res); // res is already parsed JSON
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  // Add item to cart
  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) return toast.error("Please log in first");

    try {
      const existingItem = cart.find(item => item.product_id === productId);

      if (existingItem) {
        // Update quantity if item exists
        const updated = await updateCartItem(existingItem.id, existingItem.quantity + quantity);
        setCart(prev => prev.map(item => (item.id === updated.id ? updated : item)));
        toast.success("Updated quantity in cart!");
      } else {
        // Add new item if it doesn't exist
        const newItem = await addCartItem(user.id, { product_id: productId, quantity });
        setCart(prev => [...prev, newItem]);
        toast.success("Added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      await deleteCartItem(id);
      setCart(prev => prev.filter(item => item.id !== id));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // Update quantity
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const updatedItem = await updateCartItem(id, newQuantity); // pass number directly
      setCart(prev => prev.map(item => (item.id === id ? updatedItem : item)));
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // Checkout
  const checkout = async () => {
    if (!user) return toast.error("Please log in first");
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
        <p>Your cart is empty</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {cart.map(item => (
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
              <div>
                <strong>{item.product_name}</strong> <br />
                ${item.price.toFixed(2)}
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
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
