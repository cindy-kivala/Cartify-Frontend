// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOrders } from "../services/api";

export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const data = await getOrders(user.id);
      setOrders(data || []);
    } catch (err) {
      console.error("OrdersPage: fetchOrders error", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center py-10">You have no orders yet</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className="border rounded p-4 mb-4 bg-gray-50 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <ul className="mb-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between mb-1">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold text-right">
              Total: ${order.total.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
