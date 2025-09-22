import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link to="/products">Products</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  );
}
