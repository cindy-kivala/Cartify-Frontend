import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import  { getOrders, deleteOrderById } from "../services/api";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(user.id);
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrderById(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success("Order deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px" }}>
      <h1 className="page-title glow">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted">No orders yet</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {orders.map(order => (
            <div key={order.id} className="product-card">
              <h2 className="product-name glow">Order #{order.id}</h2>
              <p className="product-price glow">Total: ${order.total.toFixed(2)}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {order.items.map((i, idx) => (
                  <li key={idx} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                    {i.image_url && (
                      <img
                        src={i.image_url}
                        alt={i.product}
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", marginRight: "10px" }}
                      />
                    )}
                    <span>{i.product} × {i.quantity} — ${i.price}</span>
                  </li>
                ))}
              </ul>
              <button 
                className="btn btn-delete" 
                onClick={() => handleDeleteOrder(order.id)}
              >
              Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
