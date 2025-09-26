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
  const [cart, setCart] = useState({ items: [], total: 0, total_price: 0 });

  // Load cart on mount
  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  async function fetchCart() {
    const data = await getCartItems(user.username);
    if (data.error) return toast.error(data.error);
    setCart(data); // full object: {items, total, total_price}
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
    setCart({ items: [], total: 0, total_price: 0 });
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {!user ? (
        <p>Please log in to view your cart.</p>
      ) : cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => {
              const itemTotal = (item.price * item.quantity).toFixed(2);
              return (
                <li key={item.id}>
                  <strong>{item.product_name}</strong> (${item.price}) <br />
                  Quantity: {item.quantity}{" "}
                  <button onClick={() => handleUpdate(item.id, item.quantity + 1)}>+</button>
                  <button
                    onClick={() => handleUpdate(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                  <div>Subtotal: ${itemTotal}</div>
                </li>
              );
            })}
          </ul>
          <hr />
          <div>
            <p><strong>Total Items:</strong> {cart.total}</p>
            <p><strong>Total Price:</strong> ${cart.total_price.toFixed(2)}</p>
          </div>
        </>
      )}
      {user && cart.items.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}
