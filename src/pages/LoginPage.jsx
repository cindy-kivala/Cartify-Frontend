// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      onLogin(res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      <h1 className="page-title">Login</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <input className="form-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="form-input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
