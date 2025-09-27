// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserOrders } from "../services/api";

export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user || !user.username) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const data = await getUserOrders(user.username); // Use username, not id
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

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p>Please log in to view your orders</p>
        <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
      </div>
    );
  }

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p className="text-gray-600 mb-4">You have no orders yet</p>
        <a href="/cart" className="text-blue-500 hover:underline">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.product}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <span className="font-medium">{item.product}</span>
                      <span className="text-gray-600 ml-2">x {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}