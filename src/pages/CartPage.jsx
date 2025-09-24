import { useEffect, useState } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Logged-in user

  useEffect(() => {
    if (user) {
      // Fetch persisted cart from backend
      fetch(`http://localhost:5000/cart/${user.id}`)
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Failed to fetch cart:", err));
    } else {
      // Guest cart from localStorage
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
    }
  }, [user]); // Reload when user changes

  // Update quantity by passing the new value directly
const updateQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) return; // Prevent quantity < 1

  if (user) {
    try {
      const res = await fetch(
        `http://localhost:5000/cart/${user.id}/${item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (!res.ok) throw new Error("Failed to update quantity");
      const updatedItem = await res.json();
      setCartItems((prev) =>
        prev.map((i) => (i.id === item.id ? updatedItem : i))
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    const updatedCart = cartItems.map((i) =>
      i.id === item.id ? { ...i, quantity: newQuantity } : i
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }
};



  const removeItem = async (item) => {
    if (user) {
      try {
        await fetch(`http://localhost:5000/cart/${user.id}/${item.id}`, {
          method: "DELETE",
        });
        setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      } catch (err) {
        console.error("Failed to remove item:", err);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.filter((i) => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

   // Compute cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px 20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >

             <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <div>
                <button onClick={() => updateQuantity(item, item.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item, Number(e.target.value))
                  }
                  style={{ width: "50px", textAlign: "center", margin: "0 5px" }}
                />
                <button onClick={() => updateQuantity(item, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button onClick={() => removeItem(item)} style={{ color: "red" }}>
                Remove
              </button>
            </div>
          ))}
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
        </div>
      )}
    </div>

  );
}

export default CartPage;

