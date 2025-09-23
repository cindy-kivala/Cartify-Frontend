import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then(setCart)
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const updateItem = (id, quantity) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setCart(cart.map((item) => (item.id === id ? updated : item)));
      });
  };

  const removeItem = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="cart-page">
      <h1 className="page-title">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onRemove={removeItem}
          />
        ))
      )}
    </div>
  );
}

export default CartPage;
