import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import NavBar from "./components/NavBar";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductForm from "./pages/ProductForm";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import { addCartItem } from "./services/api";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  const handleAddToCart = async (productId) => {
  if (!user || !user.id ) {
     toast.error("Please log in first");
     return;
  }

  try {
    // Send username instead of user.id to match Flask backend
    const res = await addCartItem(user.id, productId, 1);
    if (res?.error) return toast.error(res.error);

    toast.success("Added to cart!");
  } catch (err) {
    console.error("Add to cart error:", err);
    toast.error("Failed to add to cart");
  }
};


  // Example of protected route
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={<HomePage user={user} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage onLogin={setUser} />} />
          <Route
            path="/products"
            element={<ProductsPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetail addToCart={handleAddToCart} />}
          />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
