import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>
      <ul className="orders-list">
        {orders.map((o) => (
          <li key={o.id} className="order-item">
            {o.items.map((item, i) => (
              <div key={i}>
                {item.quantity} × {item.product} — ${item.price * item.quantity}
              </div>
            ))}
            <strong>Total: ${o.total}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
