import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Cartify</div>
      <ul className="navbar-links">
        <li><a href="/products">Products</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/checkout">Checkout</a></li>
        <li><a href="/home">Home</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

