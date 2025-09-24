import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin}) {
  
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
  try {
    const res = await fetch("http://localhost:5000/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, password }),
    });

    // Read response text first
    const text = await res.text();

    // Try parsing JSON if text exists
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
     data = {};
    }

    // Check HTTP status
    if (!res.ok) {
     throw new Error(data.error || `HTTP error! status: ${res.status}`);
   }

    // Successful login
    console.log("Login successful:", data);
    // persist user
    localStorage.setItem("user", JSON.stringify(data));
    if (onLogin) onLogin(data);

    navigate("/products"); // Redirect to products page

   } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    }
 };

  return (
    <div className="login-page">
      <h1 className="page-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Click here to <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
