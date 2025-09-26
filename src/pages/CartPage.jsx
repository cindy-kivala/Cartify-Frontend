// src/pages/CartPage.jsx
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
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  async function fetchCart() {
    try {
      const items = await getCartItems(user.username);
      setCart(items);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    }
  }

  async function handleUpdate(productId, newQty) {
    try {
      const updated = await updateCartItem(user.username, productId, newQty);
      setCart((prev) =>
        prev.map((item) =>
          item.product_id === productId ? { ...item, quantity: updated.quantity } : item
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update item");
    }
  }

  async function handleRemove(productId) {
    try {
      await removeCartItem(user.username, productId);
      setCart((prev) => prev.filter((item) => item.product_id !== productId));
      toast.success("Item removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  }

 async function handleCheckout() {
  try {
    setLoadingCheckout(true);
    await checkoutCart(user.username);

    const orderSummary = cart
      .map(
        (item) =>
          `${item.product?.name} × ${item.quantity} ($${(
            item.product?.price * item.quantity
          ).toFixed(2)})`
      )
      .join(", ");

    const total = cart.reduce(
      (sum, item) => sum + item.quantity * (item.product?.price || 0),
      0
    );

    setCart([]); // Clear cart

    toast.success(
      `Order placed!\n\nItems: ${orderSummary}\nTotal: $${total.toFixed(2)}`,
      { duration: 6000 }
    );
  } catch (err) {
    console.error(err);
    toast.error("Checkout failed");
  } finally {
    setLoadingCheckout(false);
  }
}


  const total = cart.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.product_id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <p className="font-medium">{item.product?.name}</p>
                <p className="text-sm text-gray-600">
                  Price: ${item.product?.price} × {item.quantity} ={" "}
                  <strong>${(item.product?.price * item.quantity).toFixed(2)}</strong>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(item.product_id, item.quantity + 1)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleUpdate(item.product_id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </h2>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || loadingCheckout}
            className={`mt-3 px-4 py-2 rounded text-white ${
              cart.length === 0 || loadingCheckout
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingCheckout ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
