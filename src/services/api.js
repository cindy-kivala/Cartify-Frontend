const API_URL = import.meta.env.VITE_API_URL;

// -------------------- AUTH --------------------
export const signupUser = async (userData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}/logout`, { method: "POST" });
  return res.json();
};

// -------------------- PRODUCTS --------------------
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// -------------------- CART --------------------
export const getCartItems = async (username) => {
  const res = await fetch(`${API_URL}/cart/${username}`);
  return res.json();
};

export const addCartItem = async (user_id, product_id, quantity = 1) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, product_id, quantity }),
  });
  return res.json();
};

export const updateCartItem = async (item_id, quantity) => {
  const res = await fetch(`${API_URL}/cart/item/${item_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
};

export const removeCartItem = async (item_id) => {
  const res = await fetch(`${API_URL}/cart/item/${item_id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const checkoutCart = async (username) => {
  const res = await fetch(`${API_URL}/cart/checkout/${username}`, { method: "POST" });
  return res.json();
};

// -------------------- ORDERS --------------------
export const getOrders = async (username) => {
  const res = await fetch(`${API_URL}/orders/${username}`);
  return res.json();
};

export const deleteOrder = async (order_id) => {
  const res = await fetch(`${API_URL}/orders/${order_id}`, { method: "DELETE" });
  return res.json();
};
