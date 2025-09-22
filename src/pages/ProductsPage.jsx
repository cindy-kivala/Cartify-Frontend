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
      // editing existing product
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
      // adding new product
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

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
          <Form className="mb-6 space-y-3">
            <div>
              <label className="block font-medium">Name</label>
              <Field name="name" className="border px-2 py-1 w-full" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Price</label>
              <Field
                type="number"
                name="price"
                className="border px-2 py-1 w-full"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* product list */}
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p>${product.price}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
