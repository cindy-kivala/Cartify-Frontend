// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCartItems, removeCartItem, updateCartItem } from "../services/api";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  // Fetch cart items for the logged-in user
  const fetchCart = async () => {
    if (!user || !user.id) return;

    try {
      const items = await getCartItems(user.id);
      setCart(items);
    } catch (err) {
      console.error("CartPage: fetchCart error", err);
      alert("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Remove item from cart
  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      console.error("CartPage: remove error", err);
      alert("Failed to remove item");
    }
  };

  // Update quantity
  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) return;
    try {
      await updateCartItem(cartItemId, quantity);
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("CartPage: update error", err);
      alert("Failed to update quantity");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span>{item.product_name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #f00",
                    color: "#f00",
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
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

