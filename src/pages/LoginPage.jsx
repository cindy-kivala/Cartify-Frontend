import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")



const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();

    if (!res.ok) {
      setError(data.error); // catch invalid credentials
      } else {
        console.log("Login successful", data);
        setCurrentUser(data);
        }
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Network error. Please try again later.");
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
      <p>
        Click here to <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
