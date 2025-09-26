// src/api.js
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// -------------------- Products --------------------
export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());

export const getProductById = (id) =>
  fetch(`${API_URL}/products/${id}`).then(res => res.json());

export const createProduct = (product) =>
  fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(res => res.json());

// -------------------- Users --------------------
export const getUsers = () =>
  fetch(`${API_URL}/users`).then(res => res.json());

export const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json(); // returns full user object
};

// -------------------- Auth --------------------
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data; // full user object { id, username, email, ... }
};

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const userData = await res.json();

  if (!res.ok) {
    throw new Error(userData.error || "Signup failed");
  }

  return userData; // full user object
};

// -------------------- Cart --------------------
export const getCartItems = (username) =>
  fetch(`${API_URL}/cart/${username}`).then(res => res.json());

export const addToCart = async (productId, username) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, product_id: productId, quantity: 1 }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to add to cart");
  }

  return res.json();
};

export const updateCartItem = (id, quantity) =>
  fetch(`${API_URL}/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }).then(res => res.json());

export const deleteCartItem = (id) =>
  fetch(`${API_URL}/cart/${id}`, { method: "DELETE" }).then(res => res.json());

export const checkoutCart = (username) =>
  fetch(`${API_URL}/checkout/${username}`, { method: "POST" }).then(res => res.json());

// -------------------- Orders --------------------
export const getOrders = async (username) => {
  const res = await fetch(`${API_URL}/orders/${username}`);
  if (!res.ok) return []; // username not found
  return res.json();
};

export const createOrder = (order) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).then(res => res.json());

export const deleteOrderById = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`, { method: "DELETE" }).then(res => res.json());
