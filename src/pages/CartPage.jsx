import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cart:", data);
        setCart(data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const updateItem = (id, quantity) => {
    console.log(`Updating cart item ${id} with quantity ${quantity}`);
    fetch(`http://localhost:5000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((updated) => {
        console.log("Updated item:", updated);
        setCart(cart.map((item) => (item.id === id ? updated : item)));
      });
  };

  const removeItem = (id) => {
    console.log("Removing cart item:", id);
    fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          onRemove={removeItem}
        />
      ))}
    </div>
  );
}

export default CartPage;