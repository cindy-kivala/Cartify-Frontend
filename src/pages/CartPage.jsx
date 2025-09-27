// src/pages/CartPage.jsx
import { useEffect, useState } from "react";

export default function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

  // Fetch cart items
  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/cart/user/${user.id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(`${API_URL}/cart/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      await fetchCart();
      alert("Item added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (cartItemId, quantity) => {
    if (quantity < 1) return; // prevent negative quantity
    try {
      const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      await fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  // Remove cart item
  const removeCartItem = async (cartItemId) => {
    try {
      const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      await fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {user?.username}'s Cart
      </h1>

      {cart.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#555" }}>Your cart is empty</p>
      ) : (
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
              <div>
                <strong>{item.product.name}</strong> <br />
                <span style={{ color: "#666" }}>Qty: {item.quantity}</span>
              </div>
              <div>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    marginRight: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    marginRight: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => removeCartItem(item.id)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    cursor: "pointer",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


// // src/pages/CartPage.jsx
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { getCartItems, checkoutCart } from "../services/api";
// import CartItemControls from "../components/CartItemControls";

// export default function CartPage({ user }) {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     if (!user) {
//       setCart([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = await getCartItems(user.id);
//       setCart(data || []);
//     } catch {
//       toast.error("Failed to load cart items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   const handleUpdate = (updatedItem) => {
//     setCart((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
//   };

//   const handleRemove = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleCheckout = async () => {
//     if (!user) return toast.error("Please log in first");
//     try {
//       await checkoutCart(user.id);
//       setCart([]);
//       toast.success("Checkout successful");
//     } catch {
//       toast.error("Checkout failed");
//     }
//   };

//   const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading) return <p className="text-center py-10">Loading cart...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-gray-600">Your cart is empty</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between border rounded-lg p-3 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image_url}
//                     alt={item.product_name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-medium">{item.product_name}</p>
//                     <p className="text-gray-700">${item.price.toFixed(2)}</p>
//                   </div>
//                 </div>

//                 <CartItemControls
//                   item={item}
//                   onUpdate={handleUpdate}
//                   onRemove={handleRemove}
//                 />
//               </li>
//             ))}
//           </ul>

//           <div className="mt-6 flex justify-between items-center font-semibold text-lg">
//             <span>Total: ${totalPrice.toFixed(2)}</span>
//             <button
//               onClick={handleCheckout}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
//             >
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
