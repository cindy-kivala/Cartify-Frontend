import { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:5000/orders/ryan").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">My Orders</h1>
      <ul className="mt-4">
        {orders.map(o => (
          <li key={o.id} className="border p-2 rounded mb-2">
            {o.quantity} × {o.product} — ${o.price * o.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
