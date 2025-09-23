import { useEffect, useState } from "react";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "Credit Card",
  });

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((r) => r.json())
      .then(setCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    // Clear cart items in backend
    cart.forEach((item) =>
      fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
    );

    alert(
      `Order placed!\nName: ${form.name}\nAddress: ${form.address}\nPayment: ${form.payment}`
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="ckecout-page">
      <h1>Checkout</h1>

      {/* Cart Summary */}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h2 className="mt-4 font-bold">Total: ${total}</h2>

      {/* Checkout Form */}
      <form onSubmit={placeOrder} className="checkout form">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="nameinput"
            required
          />
        </label>

        <label className="block">
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="addressinput"
            required
          />
        </label>

        <label className="block">
          Payment Method:
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="paymentselect"
          >
            <option>Credit Card</option>
            <option>Mpesa</option>
            <option>PayPal</option>
            <option>Cash on Delivery</option>
          </select>
        </label>

        <button
          type="submit"
          className="checkoutbutton"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
