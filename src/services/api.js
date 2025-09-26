// src/api.js
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ---------------- PRODUCTS ----------------
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

// ---------------- USERS ----------------
export const getUsers = () =>
  fetch(`${API_URL}/users`).then(res => res.json());

export const createUser = (user) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(res => res.json());

// ---------------- CART ----------------
// username must match backend routes
export const getCartItems = (username) =>
  fetch(`${API_URL}/cart/${username}`).then(res => res.json());

export const addCartItem = (item) =>
  fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(res => res.json());

export const updateCartItem = (itemId, quantity) =>
  fetch(`${API_URL}/cart/item/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }).then(res => res.json());

export const removeCartItem = (itemId) =>
  fetch(`${API_URL}/cart/item/${itemId}`, {
    method: "DELETE",
  }).then(res => res.json());

// ---------------- CHECKOUT ----------------
export const checkoutCart = (username) =>
  fetch(`${API_URL}/checkout/${username}`, {
    method: "POST",
  }).then(res => res.json());

// ---------------- ORDERS ----------------
export const getOrders = (username) =>
  fetch(`${API_URL}/orders/${username}`).then(res => res.json());

export const createOrder = (order) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).then(res => res.json());

export const getOrderById = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`).then(res => res.json());

export const deleteOrder = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
  }).then(res => res.json());

  // ---------------- AUTH ----------------
export const loginUser = (credentials) =>
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then(res => res.json());
