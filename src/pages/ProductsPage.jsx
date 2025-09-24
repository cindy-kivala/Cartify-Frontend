
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Electronics",
    "Groceries",
    "Health & Beauty",
    "Baby Products",
    "Clothing"
  ];

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

 
  // Add to cart handler
 const addToCart = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Guest cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
    return;
  }

  // Logged-in user cart
  try {
    const res = await fetch(`http://localhost:5000/cart/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: product.id, quantity: 1 }),
    });

    if (!res.ok) throw new Error("Failed to add to cart");

    const data = await res.json();
    console.log("Added to cart:", data);

    setCart((prev) => [...prev, data]);
    alert(`${product.name} added to cart!`);
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};

// Filter products based on category
  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <div className="product-page" 
    style={{ 
      padding: "40px 20px",
      minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      
    }}
    >

      <h1 
        style={{
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "30px",
          color: "#FFD700",
          textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        Our Products
        </h1>


      {/* Category Filter */}
      <div 
        className="category-filter" 
        style={{ 
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px"
         }}>
        <label>Filter by category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "32px"
        }}
        >

       {filteredProducts.map((product) => (
         <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
      </div>
    </div>
  );
}