import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
  checkoutCart,
} from "./services/api";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductForm from "./pages/ProductForm";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  // -------------------- User state --------------------
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // -------------------- Cart state --------------------
  const [cart, setCart] = useState([]);

  // Fetch cart whenever user logs in
  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await getCartItems(user.username);
      setCart(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  // -------------------- Handlers --------------------
  const handleLogout = () => setUser(null);

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) return toast.error("Please log in first");

    try {
      const existingItem = cart.find((item) => item.product_id === productId);

      if (existingItem) {
        // Update quantity
        const updated = await updateCartItem(
          existingItem.id,
          existingItem.quantity + quantity
        );
        setCart((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        toast.success("Updated quantity in cart!");
      } else {
        // Add new item
        const newItem = await addToCart(productId, user.username, quantity);
        setCart((prev) => [...prev, newItem]);
        toast.success("Added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // -------------------- Render --------------------
  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<HomePage user={user} handleAddToCart={handleAddToCart} />}
        />

        {/* Cart */}
        <Route path="/cart" element={<CartPage user={user} />} />

        {/* Orders */}
        <Route path="/orders" element={<OrdersPage user={user} />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage onLogin={setUser} />} />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductsPage onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetail addToCart={handleAddToCart} />}
        />

        {/* Add Product */}
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
