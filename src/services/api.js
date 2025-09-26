export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper: fetch wrapper with JSON + error handling
async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { error: "Invalid JSON response" };
    }

    if (!res.ok) {
      return data.error ? { error: data.error } : { error: res.statusText || "Request failed" };
    }
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

// ---------------- PRODUCTS ----------------
export const getProducts = () => fetchJSON(`${API_URL}/products`);
export const getProductById = (id) => fetchJSON(`${API_URL}/products/${id}`);
export const createProduct = (product) =>
  fetchJSON(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

// ---------------- AUTH / USERS ----------------
export const getUsers = () => fetchJSON(`${API_URL}/users`);
export const createUser = (user) =>
  fetchJSON(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

export const signupUser = (user) =>
  fetchJSON(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

export const loginUser = (credentials) =>
  fetchJSON(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

// ---------------- CART ----------------
export const getCartItems = (username) => fetchJSON(`${API_URL}/cart/${username}`);
export const addCartItem = (item) =>
  fetchJSON(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

export const updateCartItem = (itemId, quantity) =>
  fetchJSON(`${API_URL}/cart/item/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (itemId) =>
  fetchJSON(`${API_URL}/cart/item/${itemId}`, { method: "DELETE" });

export const checkoutCart = (username) =>
  fetchJSON(`${API_URL}/cart/checkout/${username}`, { method: "POST" });

// ---------------- ORDERS ----------------
export const getOrders = (username) => fetchJSON(`${API_URL}/orders/${username}`);
export const createOrder = (order) =>
  fetchJSON(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

export const getOrderById = (orderId) => fetchJSON(`${API_URL}/orders/${orderId}`);
export const deleteOrder = (orderId) =>
  fetchJSON(`${API_URL}/orders/${orderId}`, { method: "DELETE" });
