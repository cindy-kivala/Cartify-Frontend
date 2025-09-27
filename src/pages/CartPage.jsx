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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const items = await getCartItems(user.id);
      setCart(items);
    } catch (err) {
      console.error("CartPage: fetchCart error", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
      toast.success("Item removed");
    } catch (err) {
      console.error("CartPage: remove error", err);
      toast.error("Failed to remove item");
    }
  };

  const handleUpdate = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
      const updatedItem = await updateCartItem(cartItemId, quantity);
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? updatedItem : item))
      );
    } catch (err) {
      console.error("CartPage: update error", err);
      toast.error("Failed to update quantity");
    }
  };

  const handleCheckout = async () => {
    if (!user || !user.username) return;
    try {
      await checkoutCart(user.username);
      setCart([]);
      toast.success("Checkout successful!");
    } catch (err) {
      console.error("CartPage: checkout error", err);
      toast.error("Checkout failed");
    }
  };

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  if (cart.length === 0)
    return <p className="text-center py-10">Your cart is empty</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 mb-2 border rounded bg-gray-50"
          >
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p>${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  handleUpdate(item.id, parseInt(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Checkout
      </button>
    </div>
  );
}





// // src/pages/CartPage.jsx
// import { useEffect, useState } from "react";

// export default function CartPage({ user }) {
//   const [cart, setCart] = useState([]);

//   const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

//   // Fetch cart items
//   const fetchCart = async () => {
//     if (!user) return;
//     try {
//       const res = await fetch(`${API_URL}/cart/user/${user.id}`, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) throw new Error("Failed to fetch cart");
//       const data = await res.json();
//       setCart(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Add item to cart
//   const addToCart = async (productId, quantity = 1) => {
//     try {
//       const res = await fetch(`${API_URL}/cart/`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id: user.id, product_id: productId, quantity }),
//       });
//       if (!res.ok) throw new Error("Failed to add item");
//       await fetchCart();
//       alert("Item added to cart!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Update cart item quantity
//   const updateCartItem = async (cartItemId, quantity) => {
//     if (quantity < 1) return; // prevent negative quantity
//     try {
//       const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ quantity }),
//       });
//       if (!res.ok) throw new Error("Failed to update item");
//       await fetchCart();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Remove cart item
//   const removeCartItem = async (cartItemId) => {
//     try {
//       const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) throw new Error("Failed to remove item");
//       await fetchCart();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
//         {user?.username}'s Cart
//       </h1>

      
//       {cart.length > 0 ? (
//         cart.map(item => (
//          <li
//            key={item.id}
//            style={{
//              display: "flex",
//              justifyContent: "space-between",
//              alignItems: "center",
//              padding: "0.5rem 1rem",
//              marginBottom: "0.5rem",
//              border: "1px solid #ccc",
//              borderRadius: "8px",
//              backgroundColor: "#f9f9f9"
//            }}
//          >
//           <span>{item.product_name}</span>
//           <span>Qty: {item.quantity}</span>
//        </li>
//      ))
//    ) : (
//      <p>Your cart is empty</p>
//    )}

//     </div>
//   );
// }

