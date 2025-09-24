import { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: product.id, quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Added to cart:", data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Home - Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h2 className="product-name">{p.name}</h2>
            <p className="product-price">${p.price}</p>
            <button onClick={() => addToCart(p)} className="btn-secondary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
