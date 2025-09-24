import { Link } from "react-router-dom";

export default function Navbar({ cartCount, currentUser, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Cartify</div>
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/checkout">Checkout</a></li>
        
         {currentUser ? (
          <>
            <span className="nav-link">Hello, {currentUser.username}</span>
            <button onClick={handleLogout} className="nav-link btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </ul>
    </nav>
  );
}

