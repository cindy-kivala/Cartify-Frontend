// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "https://cartify-backend-main.onrender.com/"

// Get cart items for a user
export const getCartItems = async (username) => {
  try {
    const res = await fetch(`${API_URL}/cart/${username}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getCartItems error:", err);
    return [];
  }
};

// Add item to cart
export const addCartItem = async (userId, productId, quantity = 1) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("addCartItem error:", err);
    return { error: "Failed to add item" };
  }
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  try {
    const res = await fetch(`${API_URL}/cart/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("updateCartItem error:", err);
    return { error: "Failed to update item" };
  }
};

// Remove item from cart
export const removeCartItem = async (itemId) => {
  try {
    const res = await fetch(`${API_URL}/cart/${itemId}`, { method: "DELETE" });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("removeCartItem error:", err);
    return { error: "Failed to remove item" };
  }
};

// Checkout cart
export const checkoutCart = async (username) => {
  try {
    const res = await fetch(`${API_URL}/cart/checkout/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("checkoutCart error:", err);
    return { error: "Checkout failed" };
  }
};







// // src/services/api.js
// const API_URL = import.meta.env.VITE_API_URL || "https://cartify-backend-main.onrender.com";

// // Helper for consistent API calls
// const apiCall = async (endpoint, options = {}) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include", // include cookies/session info
//     ...options,
//   };

//   try {
//     const res = await fetch(`${API_URL}${endpoint}`, config);

//     // Try parsing JSON
//     let data;
//     try {
//       data = await res.json();
//     } catch {
//       data = {};
//     }

//     if (!res.ok) {
//       throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`);
//     }

//     return data;
//   } catch (error) {
//     console.error(`API call failed for ${endpoint}:`, error);
//     throw error;
//   }
// };

// // -------------------- AUTH --------------------
// export const signupUser = async (userData) =>
//   apiCall("/signup", {
//     method: "POST",
//     body: JSON.stringify(userData),
//   });

// export const loginUser = async (credentials) =>
//   apiCall("/login", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//   });

// export const logoutUser = async () =>
//   apiCall("/logout", { method: "POST" });

// // -------------------- PRODUCTS --------------------
// export const getProducts = async () => apiCall("/products");

// export const getProductById = async (id) => apiCall(`/products/${id}`);

// export const createProduct = async (data) =>
//   apiCall("/products", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

// // Seed database (for testing)
// export const seedDatabase = async () =>
//   apiCall("/seed", { method: "POST" });

// // -------------------- CART --------------------
// export const getCartItems = async (username) => {
//   if (!username) throw new Error("Username is required to fetch cart items");
//   return apiCall(`/cart/${username}`);
// };

// export const addCartItem = async ({ username, product_id, quantity = 1 }) => {
//   if (!username || !product_id) throw new Error("Username and product_id are required");
//   return apiCall("/cart", {
//     method: "POST",
//     body: JSON.stringify({ username, product_id, quantity }),
//   });
// };

// export const updateCartItem = async (item_id, quantity) => {
//   if (!item_id || !quantity) throw new Error("Item ID and quantity are required");
//   return apiCall(`/cart/item/${item_id}`, {
//     method: "PATCH",
//     body: JSON.stringify({ quantity }),
//   });
// };

// export const removeCartItem = async (item_id) => {
//   if (!item_id) throw new Error("Item ID is required");
//   return apiCall(`/cart/item/${item_id}`, { method: "DELETE" });
// };

// export const checkoutCart = async (username) => {
//   if (!username) throw new Error("Username is required for checkout");
//   return apiCall(`/cart/checkout/${username}`, { method: "POST" });
// };

// // -------------------- ORDERS --------------------
// export const getOrders = async (username) => {
//   if (!username) throw new Error("Username is required to fetch orders");
//   return apiCall(`/orders/${username}`);
// };

// export const deleteOrder = async (order_id) => {
//   if (!order_id) throw new Error("Order ID is required");
//   return apiCall(`/orders/${order_id}`, { method: "DELETE" });
// };
