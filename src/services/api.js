// src/api.js

export const API_URL = import.meta.env.VITE_API_URL;

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

export const createUser = (user) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(res => res.json());

export const loginUser = (credentials) =>
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then(res => res.json());

export const signupUser = (data) =>
  fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

// -------------------- Cart --------------------
export const getCartItems = (username) =>
  fetch(`${API_URL}/cart/${username}`).then(res => res.json());

export const addCartItem = (userId, item) =>
  fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: userId, ...item }),
  }).then(res => res.json());

export const updateCartItem = (id, quantity) =>
  fetch(`${API_URL}/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }).then(res => res.json());

export const deleteCartItem = (id) =>
  fetch(`${API_URL}/cart/${id}`, { method: "DELETE" })
    .then(res => res.json());

export const checkoutCart = (username) =>
  fetch(`${API_URL}/checkout/${username}`, { method: "POST" })
    .then(res => res.json());

// -------------------- Orders --------------------
export const getOrders = (username) =>
  fetch(`${API_URL}/orders/${username}`).then(res => res.json());

export const getOrderById = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`).then(res => res.json());

export const createOrder = (order) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).then(res => res.json());

export const deleteOrderById = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE",
  }).then(res => res.json());
