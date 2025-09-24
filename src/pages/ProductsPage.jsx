import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().positive("Price must be greater than 0").required("Price is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const payload = { name: values.name, price: Number(values.price) };
    if (editingProduct) {
      fetch(`http://localhost:5000/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((updatedProduct) => {
          setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
          setEditingProduct(null);
          resetForm();
        });
    } else {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((newProduct) => {
          setProducts((prev) => [...prev, newProduct]);
          resetForm();
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" }).then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="product-page">
      <h1 className="product-title">Products</h1>
      <Formik
        initialValues={{
          name: editingProduct?.name || "",
          price: editingProduct?.price || "",
        }}
        enableReinitialize
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="product-form">
            <div className="form-group">
              <label>Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component="div" className="form-error" />
            </div>
            <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
            {editingProduct && (
              <button type="button" onClick={() => { setEditingProduct(null); resetForm(); }}>
                Cancel
              </button>
            )}
          </Form>
        )}
      </Formik>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}