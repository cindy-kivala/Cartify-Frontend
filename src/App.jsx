import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { getCartItems, addCartItem, updateCartItem, deleteCartItem, checkoutCart } from "./services/api";

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
  const [cart, setCart] = useState([]);

  const handleLogout = () => setUser(null);

  //fetch cart
  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await getCartItems(user.id);
      setCart(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };



  // ✅ unified handleAddToCart for both HomePage and ProductsPage
  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) return toast.error("Please log in first");

    try {
       const existingItem = cart.find(item => item.product_id === productId);

      if (existingItem) {
        // Update quantity if exists
        const updated = await updateCartItem(existingItem.id, existingItem.quantity + quantity);
        setCart(prev =>
          prev.map(item => (item.id === updated.id ? updated : item))
        );
        toast.success("Updated quantity in cart!");
      } else {
        const newItem = await addCartItem(user.id, { product_id: productId, quantity });
        setCart(prev => [...prev, newItem]);
        toast.success("Added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        {/* ✅ Pass handleAddToCart to HomePage */}
        <Route path="/" element={<HomePage user={user} handleAddToCart={handleAddToCart} />} />
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
