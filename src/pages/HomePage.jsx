import { useState, useEffect } from "react";

function HomePage({ userId, addToCart }) {
  const [products, setProducts] = useState([]);

  const addProductToCart = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });
      const data = await res.json();
      console.log("Added to cart:", data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleAddToCart = (product) => {
    if (!userId) {
      alert("Please log in to add items to cart");
      return;
    }

   addProductToCart(product);
  };


  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="products-page">
      <h1 className="page-title">Home - Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h2 className="product-name">{p.name}</h2>
            <p className="product-price">${p.price}</p>
            <button onClick={() => handleAddToCart({ id: 1, name: "Sample Product" })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
