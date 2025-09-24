import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";


export default function ProductsPage({ userId, addToCart}) {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

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

  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <div className="product-page" style={{ padding: "20px" }}>
      <h1>Products</h1>

      {/* Category Filter */}
      <div className="category-filter" style={{ marginBottom: "20px" }}>
        <label>Filter by category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "5px", marginLeft: "10px" }}
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
          gap: "20px",
        }}
      >
       {filteredProducts.map((product) => (
         <ProductCard
          key={product.id}
          product={product}
          userId={userId}
          onAddToCart={addToCart}
        />
      ))}
      </div>
    </div>
  );
}
