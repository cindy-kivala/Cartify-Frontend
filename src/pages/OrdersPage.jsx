import { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders/ryan").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>
      <ul className="orders-list">
        {orders.map((o) => (
          <li key={o.id} className="order-item">
            {o.quantity} × {o.product} — ${o.price * o.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
