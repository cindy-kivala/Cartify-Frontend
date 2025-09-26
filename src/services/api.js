export const API_URL = import.meta.env.VITE_API_URL;

// Unified fetch helper
async function fetchJSON(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return { error: "Invalid JSON response" };
    }

    if (!res.ok) return { error: data.error || res.statusText };
    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

// ---------------- PRODUCTS ----------------
export const getProducts = () => fetchJSON(`/products`);
export const getProductById = (id) => fetchJSON(`/products/${id}`);
export const createProduct = (product) =>
  fetchJSON(`/products`, {
    method: "POST",
    body: JSON.stringify(product),
  });

// ---------------- USERS / AUTH ----------------
export const getUsers = () => fetchJSON(`/users`);
export const createUser = (user) =>
  fetchJSON(`/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });

export const signupUser = (user) =>
  fetchJSON(`/signup`, {
    method: "POST",
    body: JSON.stringify(user),
  });

export const loginUser = (credentials) =>
  fetchJSON(`/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

// ---------------- CART ----------------
export const getCartItems = (username) => fetchJSON(`/cart/${username}`);

export const addCartItem = (userId, productId, quantity = 1) =>
  fetchJSON(`/cart`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
  });

export const updateCartItem = (itemId, quantity) =>
  fetchJSON(`/cart/item/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (itemId) =>
  fetchJSON(`/cart/item/${itemId}`, { method: "DELETE" });

export async function checkoutCart(username) {
  const res = await fetch(`${API_URL}/checkout/${username}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to checkout");
  }

  return res.json();
};

// ---------------- ORDERS ----------------
export const getOrders = (username) => fetchJSON(`/orders/${username}`);
export const createOrder = (order) =>
  fetchJSON(`/orders`, {
    method: "POST",
    body: JSON.stringify(order),
  });

export const getOrderById = (orderId) => fetchJSON(`/orders/${orderId}`);
export const deleteOrder = (orderId) =>
  fetchJSON(`/orders/${orderId}`, { method: "DELETE" });
