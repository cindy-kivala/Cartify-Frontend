// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || "https://cartify-backend-main.onrender.com";

// ------------------ Auth ------------------

// Signup
export const signup = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Signup failed");
  }

  return await res.json();
};

// Login
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Login failed");
  }

  return await res.json();
};

// ------------------ Products ------------------

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};

// ------------------ Cart ------------------

// Get cart items for a user
export const getCartItems = async (userId) => {
  const res = await fetch(`${API_URL}/cart/user/${userId}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch cart");

  const data = await res.json();
  // Ensure cart_items is always an array
  return data.cart_items || [];
};

// Add item to cart
export const addCartItem = async (userId, productId, quantity = 1) => {
  const res = await fetch(`${API_URL}/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add to cart");
  }

  return await res.json();
};

// Remove item from cart
export const removeCartItem = async (cartItemId) => {
  const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to remove cart item");
  }

  return await res.json();
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update cart item");
  }

  return await res.json();
};

// Checkout
export const checkoutCart = async (username) => {
  const res = await fetch(`${API_URL}/cart/checkout/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Checkout failed");
  }

  return await res.json();
};



// const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// // ---------------- Cart API ----------------
// // Get cart items for a user by username
// export const getCartItems = async (userId) => {
//   try {
//     const res = await fetch(`${API_URL}/cart/user/${user.id}`, {
//      method: "GET",
//      credentials: "include",
//      headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) throw new Error("Failed to fetch cart");
//     const data = await res.json();

//     // Check the structure of the response
//     console.log("cart response:", data);

//    // If your backend sends { cart_items: [...] }
//     setCart(data.cart_items || []); // <-- make sure it's an array

//   }
//   catch (err) {
//     console.error("getCartItems error:", err);
//     return [];};
//   }

// // Add item to cart using username (Flask expects 'userId' not 'username')
// /**
//  * Add an item to the cart for a user.
//  * @param {number|string} userId - The ID of the user
//  * @param {number|string} productId - The ID of the product
//  * @param {number} quantity - Quantity to add (default 1)
//  * @returns {Promise<Object>} - The added cart item or { error: message }
//  */
// export const addCartItem = async (userId, productId, quantity = 1) => {
//   try {
//     const res = await fetch(`${API_URL}/cart/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
//     });

//     // If server returns non-2xx, parse error message
//     if (!res.ok) {
//       let errorMsg = "Failed to add item to cart";
//       try {
//         const errData = await res.json();
//         errorMsg = errData.error || errorMsg;
//       } catch {
//         // response is not JSON
//       }
//       return { error: errorMsg };
//     }

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("addCartItem error:", err);
//     return { error: "Network error: Unable to add to cart" };
//   }
// };

// // Update cart item quantity by item ID
// export const updateCartItem = async (itemId, quantity) => {
//   try {
//     const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity }),
//     });
//     if (!res.ok) throw new Error("Failed to update cart item");
//     return await res.json();
//   } catch (err) {
//     console.error("updateCartItem error:", err);
//     return { error: err.message };
//   }
// };

// // Remove cart item by ID
// export const removeCartItem = async (itemId) => {
//   try {
//     const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error("Failed to remove cart item");
//     return await res.json();
//   } catch (err) {
//     console.error("removeCartItem error:", err);
//     return { error: err.message };
//   }
// };

// // Checkout cart for a user by username
// export const checkoutCart = async (userId) => {
//   try {
//     const res = await fetch(`${API_URL}/cart/checkout/${userId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     if (!res.ok) throw new Error("Checkout failed");
//     return await res.json();
//   } catch (err) {
//     console.error("checkoutCart error:", err);
//     return { error: err.message };
//   }
// };

// // ---------------- Users API ----------------
// export const getUsers = async () => {
//   const res = await fetch(`${API_URL}/users/`);
//   if (!res.ok) throw new Error("Failed to fetch users");
//   return res.json();
// };

// export const getUser = async (id) => {
//   const res = await fetch(`${API_URL}/users/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch user");
//   return res.json();
// };

// export const updateUser = async (id, data) => {
//   const res = await fetch(`${API_URL}/users/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to update user");
//   return res.json();
// };

// export const deleteUser = async (id) => {
//   const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
//   if (!res.ok) throw new Error("Failed to delete user");
//   return res.json();
// };

// // ---------------- Products API ----------------
// export const getProducts = async () => {
//   try {
//     const res = await fetch(`${API_URL}/products/`);
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return await res.json();
//   } catch (err) {
//     console.error("getProducts error:", err);
//     return [];
//   }
// };

// export const getProduct = async (id) => {
//   try {
//     const res = await fetch(`${API_URL}/products/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch product");
//     return await res.json();
//   } catch (err) {
//     console.error("getProduct error:", err);
//     return null;
//   }
// };

// export const addProduct = async (productData) => {
//   try {
//     const res = await fetch(`${API_URL}/products/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productData),
//     });
//     if (!res.ok) throw new Error("Failed to add product");
//     return await res.json();
//   } catch (err) {
//     console.error("addProduct error:", err);
//     return { error: "Failed to add product" };
//   }
// };

// // ---------------- Orders API ----------------
// export const getOrders = async () => {
//   try {
//     const res = await fetch(`${API_URL}/orders/`);
//     if (!res.ok) throw new Error("Failed to fetch orders");
//     return await res.json();
//   } catch (err) {
//     console.error("getOrders error:", err);
//     return [];
//   }
// };

// export const getOrder = async (id) => {
//   try {
//     const res = await fetch(`${API_URL}/orders/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch order");
//     return await res.json();
//   } catch (err) {
//     console.error("getOrder error:", err);
//     return null;
//   }
// };

// export const deleteOrder = async (id) => {
//   try {
//     const res = await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
//     if (!res.ok) throw new Error("Failed to delete order");
//     return await res.json();
//   } catch (err) {
//     console.error("deleteOrder error:", err);
//     return { error: "Failed to delete order" };
//   }
// };

// // ---------------- Auth API ----------------
// export const loginUser = async (credentials) => {
//   try {
//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//       credentials: "include", // include cookies if needed
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || "Login failed");
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("loginUser error:", err);
//     return { error: err.message };
//   }
// };

// export const signupUser = async (userData) => {
//   try {
//     const res = await fetch(`${API_URL}/auth/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//       credentials: "include",
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || "Signup failed");
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("signupUser error:", err);
//     return { error: err.message };
//   }
// };

