import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../services/api";
import CartItemControls from "../components/CartItemControls";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems(user.username);
      if (data.items) setCart(data.items);
      else setCart([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  const handleUpdate = (updatedItem) => {
    setCart((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      const res = await checkoutCart(user.username);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Checkout successful!");
        setCart([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1 className="page-title glow">My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "20px" }}>
            {cart.map((item) => (
              <div key={item.id} className="product-card">
                <h2 className="product-name glow">{item.product_name}</h2>
                <p className="product-price glow">
                  ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
                <CartItemControls item={item} onUpdate={handleUpdate} onRemove={handleRemove} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", fontSize: "1.2rem" }}>
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
