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

// Add a new product
export const addProduct = async (productData) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add product");
  }

  return await res.json();
};

// ------------------ Cart ------------------

// Get cart items for a user - FIXED to match backend response
export const getCartItems = async (userId) => {
  const res = await fetch(`${API_URL}/cart/user/${userId}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch cart");

  const data = await res.json();
  // Backend returns {items: [...], total_quantity: ..., total_price: ...}
  return data.items || [];
};

// Add item to cart - FIXED URL
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

// Remove item from cart - FIXED URL to match backend
export const removeCartItem = async (cartItemId) => {
  const res = await fetch(`${API_URL}/cart/item/${cartItemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to remove cart item");
  }

  return await res.json();
};

// Update cart item quantity - FIXED URL to match backend
export const updateCartItem = async (cartItemId, quantity) => {
  const res = await fetch(`${API_URL}/cart/item/${cartItemId}`, {
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

// Checkout - FIXED to use user_id instead of username
export const checkoutCart = async (userId) => {
  const res = await fetch(`${API_URL}/cart/checkout/${userId}`, {
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

// ------------------ Users ------------------

// Get all users
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

// Delete a user
export const deleteUser = async (userId) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return await res.json();
};

// Update a user
export const updateUser = async (userId, data) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
};

// ------------------ Orders ------------------

// Get all orders
export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
};

// Get orders for a specific user
export const getUserOrders = async (userId) => {
  const res = await fetch(`${API_URL}/orders/user/${userId}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user's orders");
  return await res.json();
};

// Update order status
export const updateOrder = async (orderId, data) => {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update order");
  return await res.json();
};

// Delete an order
export const deleteOrder = async (orderId) => {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return await res.json();
};