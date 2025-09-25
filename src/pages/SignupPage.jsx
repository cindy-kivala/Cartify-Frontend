// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return toast.error("All fields are required");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });

      // ✅ automatically log in the user
      onLogin(res.data);
      toast.success("Signup successful!");
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}
    >
      <h1 className="page-title glow">Sign Up</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="form-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
