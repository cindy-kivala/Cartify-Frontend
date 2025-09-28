// src/pages/ProductForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { addProduct } from "../services/api";

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
      .min(0, "Stock cannot be negative")
      .required("Stock is required")
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newProduct = await addProduct({ 
        ...values, 
        price: parseFloat(values.price),
        stock: parseInt(values.stock)
      });
      if (newProduct.error) throw new Error(newProduct.error);

      toast.success(`Product "${newProduct.name}" added successfully!`);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
      <div className="max-w-2xl mx-auto">
        <h1 className="page-title text-center mb-8">Add New Product</h1>
        
        <div className="product-card">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="product-form">
                <Field 
                  type="text" 
                  name="name" 
                  placeholder="Product Name"
                  className="form-input"
                />
                <ErrorMessage name="name" component="div" className="form-error" />

                <Field 
                  type="number" 
                  name="price" 
                  placeholder="Price" 
                  step="0.01"
                  className="form-input"
                />
                <ErrorMessage name="price" component="div" className="form-error" />

                <Field 
                  type="text" 
                  name="description" 
                  placeholder="Description"
                  className="form-input"
                />
                <ErrorMessage name="description" component="div" className="form-error" />

                <Field 
                  type="text" 
                  name="image_url" 
                  placeholder="Image URL"
                  className="form-input"
                />
                <ErrorMessage name="image_url" component="div" className="form-error" />

                <Field 
                  type="text" 
                  name="category" 
                  placeholder="Category"
                  className="form-input"
                />
                <ErrorMessage name="category" component="div" className="form-error" />

                <Field 
                  type="text" 
                  name="brand" 
                  placeholder="Brand"
                  className="form-input"
                />
                <ErrorMessage name="brand" component="div" className="form-error" />

                <Field 
                  type="number" 
                  name="stock" 
                  placeholder="Stock Quantity"
                  className="form-input"
                />
                <ErrorMessage name="stock" component="div" className="form-error" />

                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-4" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
