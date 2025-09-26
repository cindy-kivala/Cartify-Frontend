import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createProduct } from "../services/api";

export default function ProductForm() {
  const initialValues = {
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "",
    brand: "",
    stock: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string(),
    image_url: Yup.string().url("Invalid URL format"),
    category: Yup.string(),
    brand: Yup.string(),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required")
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newProduct = await createProduct({
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock, 10)
      });
      toast.success(`Product "${newProduct.name}" added successfully!`);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 className="page-title glow">Add New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "grid", gap: "16px" }}>
            <Field type="text" name="name" placeholder="Product Name" />
            <ErrorMessage name="name" component="div" className="error-msg" />

            <Field type="number" name="price" placeholder="Price" step="0.01" />
            <ErrorMessage name="price" component="div" className="error-msg" />

            <Field type="text" name="description" placeholder="Description" />
            <ErrorMessage name="description" component="div" className="error-msg" />

            <Field type="text" name="image_url" placeholder="Image URL" />
            <ErrorMessage name="image_url" component="div" className="error-msg" />

            <Field type="text" name="category" placeholder="Category" />
            <ErrorMessage name="category" component="div" className="error-msg" />

            <Field type="text" name="brand" placeholder="Brand" />
            <ErrorMessage name="brand" component="div" className="error-msg" />

            <Field type="number" name="stock" placeholder="Stock Quantity" />
            <ErrorMessage name="stock" component="div" className="error-msg" />

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "12px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
