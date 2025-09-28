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
      const data = await getUserOrders(user.username);
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
      <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center">
        <h1 className="page-title mb-4">Your Orders</h1>
        <p className="text-[#8888aa]">Please log in to view your orders</p>
        <a href="/login" className="btn btn-primary">Go to Login</a>
      </div>
    );
  }

  if (loading) return <p className="text-center py-10 text-[#e0e0ff]">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center">
        <h1 className="page-title mb-4">Your Orders</h1>
        <p className="text-[#8888aa] mb-4">You have no orders yet</p>
        <a href="/cart" className="btn btn-primary">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <h1 className="page-title text-center mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="product-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#e0e0ff] glow">
                Order #{order.id}
              </h2>
              <p className="text-[#8888aa]">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Items in Grid with small 4:3 images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col items-center space-y-1 p-2 rounded bg-[#1a1a2e] bg-opacity-50">
                  {/* Small 4:3 Image */}
                  {item.image_url && (
                    <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={item.image_url}
                        alt={item.product}
                        className="absolute inset-0 w-full h-full object-cover rounded"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <p className="text-[#e0e0ff] text-xs font-medium line-clamp-1">
                      {item.product}
                    </p>
                    <p className="text-[#8888aa] text-xs">x {item.quantity}</p>
                    <p className="text-[#00ff9d] text-xs font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center pt-3 border-t border-[#8888aa] border-opacity-30">
              <span className="text-lg font-semibold text-[#e0e0ff] glow">Total:</span>
              <span className="text-lg font-bold text-[#00ff9d] glow">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}