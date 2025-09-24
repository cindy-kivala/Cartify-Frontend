// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function Navbar({ currentUser, handleLogout }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Cartify</h1>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
        Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
        <Link to="/checkout" className="nav-link">
        Checkout
        </Link>
        <Link to="/login" className="nav-link">
        Login
        </Link>
      </div>
    </nav>
  );
}

function App() {
   const [cart, setCart] = useState([]);
   const [currentUser, setCurrentUser] = useState(null); 

  // CREATE: add product to cart
  
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToCart = async (product) => {
  if (!userId) {
    alert("Please login first to add items to the cart!");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: product.id, quantity: 1 }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const data = await response.json();
    console.log("Added to cart:", data);
  } catch (err) {
    console.error("Add to cart error:", err);
  }
};


  // UPDATE: change quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  // DELETE: remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
 
  // Logout function
  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]); 
  };

  return (
      <div className="app-container">
        <Navbar 
           cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
           currentUser={currentUser}
           handleLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <HomePage
                userId={currentUser?.id}
                addToCart={addToCart}
              />
            }
           />
            <Route
              path="/products"
              element={
              <ProductsPage 
                 userId={currentUser?.id}
                 addToCart={addToCart}
               />
              }
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 E-Commerce App</p>
        </footer>
      </div>
  );
}

export default App;
