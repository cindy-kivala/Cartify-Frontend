// src/pages/ProductForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "",
    brand: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.price) {
      return toast.error("Name and price are required");
    }

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          description: form.description,
          image_url: form.image_url,
          category: form.category,
          brand: form.brand
        })
      });

      if (!res.ok) throw new Error("Failed to create product");

      const newProduct = await res.json();
      toast.success(`Product "${newProduct.name}" added successfully!`);

      // Reset form
      setForm({
        name: "",
        price: "",
        description: "",
        image_url: "",
        category: "",
        brand: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 className="page-title glow">Add New Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary" style={{ marginTop: "12px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
}
