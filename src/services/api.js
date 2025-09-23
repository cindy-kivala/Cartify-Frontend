const API_URL = "http://localhost:5000";

// Products
export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());

export const createProduct = (product) =>
  fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  }).then(res => res.json());

// Users
export const getUsers = () =>
  fetch(`${API_URL}/users`).then(res => res.json());

export const createUser = (user) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }).then(res => res.json());

// Cart items
export const getCartItems = (userId) =>
  fetch(`${API_URL}/cart/${userId}`).then(res => res.json());

export const addCartItem = (userId, item) =>
  fetch(`${API_URL}/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  }).then(res => res.json());

// Orders
export const getOrders = () =>
  fetch(`${API_URL}/orders`).then(res => res.json());

export const createOrder = (order) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  }).then(res => res.json());

export const getOrderById = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`).then(res => res.json());

export const deleteOrder = (orderId) =>
  fetch(`${API_URL}/orders/${orderId}`, {
    method: "DELETE"
  }).then(res => res.json());
