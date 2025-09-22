// client/src/pages/ProductForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // product id from route
  const [initialValues, setInitialValues] = useState({ name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Load product if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetch(`/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInitialValues({ name: data.name, price: data.price });
        })
        .catch((err) => console.error("Error loading product:", err));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const url = id ? `/products/${id}` : "/products";
      const method = id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to save product");

      navigate("/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Product" : "Add Product"}
      </h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize // re-renders form when data loads
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <Field
                name="name"
                className="border p-2 w-full rounded"
                placeholder="Enter product name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">Price</label>
              <Field
                name="price"
                type="number"
                className="border p-2 w-full rounded"
                placeholder="Enter price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductForm;
