import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import NavBar from "./components/NavBar";
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
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('cartify_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log("App: Loaded user from localStorage", userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('cartify_user');
      }
    }
    setLoading(false);
  }, []);

  // Enhanced login handler that saves to localStorage
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('cartify_user', JSON.stringify(userData));
    toast.success(`Welcome, ${userData.username}!`);
  };

  // Enhanced logout handler that clears localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cartify_user');
    toast.success("Logged out successfully");
  };

  const handleAddToCart = async (productId) => {
    if (!user || !user.id) {
      toast.error("Please log in first");
      return;
    }

    try {
      const res = await addCartItem(user.id, productId, 1);
      if (res?.error) return toast.error(res.error);

      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Show loading spinner while checking for saved user
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          {/* Pass the handleLogin function to login/signup pages */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
          
          <Route
            path="/products"
            element={<ProductsPage onAddToCart={handleAddToCart} user={user} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetail addToCart={handleAddToCart} user={user} />}
          />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;