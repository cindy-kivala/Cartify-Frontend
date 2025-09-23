// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";


function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">E-Commerce</h1>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
        Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
        <Link to="/cart" className="nav-link">
          Cart ({cartCount})
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

  // CREATE: add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // update quantity if already in cart
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
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


  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductsPage addToCart={addToCart} />}
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 E-Commerce App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
