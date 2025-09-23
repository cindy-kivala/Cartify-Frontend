import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // validation schema
  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .positive("Price must be greater than 0")
      .required("Price is required"),
  });

  // handle form submit (add or edit)
  const handleSubmit = (values, { resetForm }) => {
    if (editingProduct) {
      fetch(`http://localhost:5000/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((updatedProduct) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
          );
          setEditingProduct(null);
          resetForm();
        });
    } else {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((newProduct) => {
          setProducts((prev) => [...prev, newProduct]);
          resetForm();
        });
    }
  };

  // handle delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="product-page">
      <h1 className="product-title">Products</h1>

      {/* formik form for add/edit */}
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
              <label className="form-label">Name</label>
              <Field name="name" className="form-input" />
              <ErrorMessage
                name="name"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price</label>
              <Field type="number" name="price" className="form-input" />
              <ErrorMessage
                name="price"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* product list */}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
            </div>
            <div className="product-actions">
              <button
                onClick={() => setEditingProduct(product)}
                className="btn btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
