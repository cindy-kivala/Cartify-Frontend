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
          <div key={order.id} className="product-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#e0e0ff] glow">
                Order #{order.id}
              </h2>
              <p className="text-[#8888aa]">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Items in Grid with small images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="text-center p-2 rounded bg-[#1a1a2e] bg-opacity-50">
                  {/* Small Image using a fixed size */}
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.product}
                      style={{
                        width: '60px',
                        height: '45px', // 4:3 ratio
                        objectFit: 'cover',
                        borderRadius: '6px',
                        margin: '0 auto 8px auto'
                      }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  )}
                  
                  <p className="text-[#e0e0ff] text-xs font-medium line-clamp-1">
                    {item.product}
                  </p>
                  <p className="text-[#8888aa] text-xs">x {item.quantity}</p>
                  <p className="text-[#00ff9d] text-xs font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
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

// // src/pages/OrdersPage.jsx
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { getUserOrders } from "../services/api";

// export default function OrdersPage({ user }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     if (!user || !user.username) {
//       setLoading(false);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const data = await getUserOrders(user.username); // Use username, not id
//       setOrders(data || []);
//     } catch (err) {
//       console.error("OrdersPage: fetchOrders error", err);
//       toast.error("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="max-w-4xl mx-auto p-4 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
//         <p>Please log in to view your orders</p>
//         <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
//       </div>
//     );
//   }

//   if (loading) return <p className="text-center py-10">Loading orders...</p>;

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto p-4 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
//         <p className="text-gray-600 mb-4">You have no orders yet</p>
//         <a href="/cart" className="text-blue-500 hover:underline">Start Shopping</a>
//       </div>
//     );
//   }

//   return (
//   <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
//     <h1 className="page-title text-center mb-8">Your Orders</h1>

//     {orders.length === 0 && (
//       <div className="text-center py-12">
//         <p className="text-text-muted text-lg">You have no orders yet.</p>
//       </div>
//     )}

//     <div className="space-y-6">
//   {orders.map((order) => (
//     <div
//       key={order.id}
//       className="border border-transparent rounded-xl p-6 bg-card-glass shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-text-light">
//           Order #{order.id}
//         </h2>
//         <p className="text-text-muted">
//           {new Date(order.created_at).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Items in Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         {order.items.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center space-x-3 border-b border-gray-700 pb-2"
//           >
//             {/* Image with fixed 4:3 aspect ratio */}
//             {item.image_url && (
//               <div className="relative w-20" style={{ aspectRatio: "4 / 3" }}>
//                 <img
//                   src={item.image_url}
//                   alt={item.product}
//                   className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//               </div>
//             )}

//             <div className="flex-1">
//               <span className="font-medium text-text-light">
//                 {item.product}
//               </span>
//               <span className="text-text-muted ml-2">x {item.quantity}</span>
//             </div>
//             <span className="font-medium text-accent-neon-green">
//               ${(item.price * item.quantity).toFixed(2)}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Order Total */}
//       <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//         <span className="text-lg font-semibold text-text-light">Total:</span>
//         <span className="text-lg font-bold text-accent-neon-green">
//           ${order.total.toFixed(2)}
//         </span>
//       </div>
//     </div>
//   ))}
// </div>
// </div>
// );


// }