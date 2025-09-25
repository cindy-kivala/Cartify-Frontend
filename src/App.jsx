import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
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
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  // ✅ unified handleAddToCart for both HomePage and ProductsPage
  const handleAddToCart = async (productId) => {
    if (!user) return toast.error("Please log in first");

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          product_id: productId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add to cart");
      }

      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.message || "Failed to add to cart");
    }
  };

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        {/* ✅ Pass handleAddToCart to HomePage */}
        <Route path="/" element={<HomePage user={user} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage user={user} />} />
        <Route path="/orders" element={<OrdersPage user={user} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage onLogin={setUser} />} />

        {/* Products listing & detail routes */}
        <Route
          path="/products"
          element={<ProductsPage onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetail addToCart={handleAddToCart} />}
        />

        {/* Add Product route */}
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
