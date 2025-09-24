import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cart, setCart] = useState([]);
  const userId = 1; // example user

  // Fetch cart items for the user
  useEffect(() => {
    fetch(`http://localhost:5000/cart/${userId}`)
      .then((res) => res.json())
      .then(setCart)
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  // Update quantity of a cart item
  const updateItem = (id, quantity) => {
    fetch(`http://localhost:5000/cart/${userId}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((updated) => {
        console.log("Updated item:", updated);
        setCart(cart.map((item) => (item.id === id ? updated : item)));
      })
      .catch((err) => console.error("Error updating item:", err));
  };

  // Remove a cart item
  const removeItem = async (cartItemId) => {
  try {
    const res = await fetch(`http://localhost:5000/cart/1/${cartItemId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete item");

    // Update UI
    setCart(cart.filter(item => item.id !== cartItemId));
  } catch (err) {
    console.error("Error removing item:", err);
  }
};


  // Add a new item to the cart (example)
  const addItem = () => {
    const newItem = { product_id: 1, quantity: 1 }; // example product
    fetch(`http://localhost:5000/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((added) => {
        console.log("Added item:", added);
        setCart([...cart, added]);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  return (
    <div>
      <h1>User {userId} Cart</h1>
      <button onClick={addItem}>Add Example Product</button>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={(newQty) => handleUpdate(item.id, newQty)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;

