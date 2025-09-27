const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// ---------------- Cart API ----------------
// Get cart items for a user by username
export const getCartItems = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/cart/user/${user.id}`, {
     method: "GET",
     credentials: "include",
     headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch cart");
    const data = await res.json();

    // Check the structure of the response
    console.log("cart response:", data);

   // If your backend sends { cart_items: [...] }
    setCart(data.cart_items || []); // <-- make sure it's an array

  }
  catch (err) {
    console.error("getCartItems error:", err);
    return [];};

// Add item to cart using username (Flask expects 'userId' not 'username')
/**
 * Add an item to the cart for a user.
 * @param {number|string} userId - The ID of the user
 * @param {number|string} productId - The ID of the product
 * @param {number} quantity - Quantity to add (default 1)
 * @returns {Promise<Object>} - The added cart item or { error: message }
 */
export const addCartItem = async (userId, productId, quantity = 1) => {
  try {
    const res = await fetch(`${API_URL}/cart/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    });

    // If server returns non-2xx, parse error message
    if (!res.ok) {
      let errorMsg = "Failed to add item to cart";
      try {
        const errData = await res.json();
        errorMsg = errData.error || errorMsg;
      } catch {
        // response is not JSON
      }
      return { error: errorMsg };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("addCartItem error:", err);
    return { error: "Network error: Unable to add to cart" };
  }
};

// Update cart item quantity by item ID
export const updateCartItem = async (itemId, quantity) => {
  try {
    const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart item");
    return await res.json();
  } catch (err) {
    console.error("updateCartItem error:", err);
    return { error: err.message };
  }
};

// Remove cart item by ID
export const removeCartItem = async (itemId) => {
  try {
    const res = await fetch(`${API_URL}/cart/item/${itemId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove cart item");
    return await res.json();
  } catch (err) {
    console.error("removeCartItem error:", err);
    return { error: err.message };
  }
};

// Checkout cart for a user by username
export const checkoutCart = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/cart/checkout/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Checkout failed");
    return await res.json();
  } catch (err) {
    console.error("checkoutCart error:", err);
    return { error: err.message };
  }
};

// ---------------- Users API ----------------
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users/`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

// ---------------- Products API ----------------
export const getProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products/`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
};

export const addProduct = async (productData) => {
  try {
    const res = await fetch(`${API_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to add product");
    return await res.json();
  } catch (err) {
    console.error("addProduct error:", err);
    return { error: "Failed to add product" };
  }
};

// ---------------- Orders API ----------------
export const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders/`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (err) {
    console.error("getOrders error:", err);
    return [];
  }
};

export const getOrder = async (id) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`);
    if (!res.ok) throw new Error("Failed to fetch order");
    return await res.json();
  } catch (err) {
    console.error("getOrder error:", err);
    return null;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete order");
    return await res.json();
  } catch (err) {
    console.error("deleteOrder error:", err);
    return { error: "Failed to delete order" };
  }
};

// ---------------- Auth API ----------------
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include", // include cookies if needed
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Login failed");
    }

    return await res.json();
  } catch (err) {
    console.error("loginUser error:", err);
    return { error: err.message };
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Signup failed");
    }

    return await res.json();
  } catch (err) {
    console.error("signupUser error:", err);
    return { error: err.message };
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
