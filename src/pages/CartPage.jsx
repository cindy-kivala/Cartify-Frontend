import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  // Load cart on mount
  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  async function fetchCart() {
    const data = await getCartItems(user.username);
    if (data.error) return toast.error(data.error);
    setCart(data);
  }

  async function handleAdd(productId) {
    const data = await addCartItem(user.id, productId, 1);
    if (data.error) return toast.error(data.error);
    fetchCart();
  }

  async function handleUpdate(itemId, qty) {
    const data = await updateCartItem(itemId, qty);
    if (data.error) return toast.error(data.error);
    fetchCart();
  }

  async function handleRemove(itemId) {
    const data = await removeCartItem(itemId);
    if (data.error) return toast.error(data.error);
    fetchCart();
  }

  async function handleCheckout() {
    const data = await checkoutCart(user.username);
    if (data.error) return toast.error(data.error);
    toast.success("Checkout successful!");
    setCart([]);
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {!user ? (
        <p>Please log in to view your cart.</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              Product {item.product_id} - Quantity {item.quantity}
              <button onClick={() => handleUpdate(item.id, item.quantity + 1)}>+</button>
              <button
                onClick={() => handleUpdate(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {user && cart.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}
