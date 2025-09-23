import { useEffect, useState } from "react";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", payment: "Credit Card" });

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
    cart.forEach((item) =>
      fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
    );
    alert(`Order placed!\nName: ${form.name}\nAddress: ${form.address}\nPayment: ${form.payment}`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <ul className="checkout-summary">
        {cart.map((item) => (
          <li key={item.id} className="checkout-item">
            {item.name} × {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h2 className="checkout-total">Total: ${total}</h2>

      <form onSubmit={placeOrder} className="checkout-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </label>

        <label>
          Payment Method:
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option>Credit Card</option>
            <option>Mpesa</option>
            <option>PayPal</option>
            <option>Cash on Delivery</option>
          </select>
        </label>

        <button type="submit" className="btn-primary">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
