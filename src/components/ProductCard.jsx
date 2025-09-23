import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .positive("Price must be > 0")
    .required("Price is required"),
});

export default function ProductForm({ onSuccess }) {
  return (
    <Formik
      initialValues={{ name: "", price: "" }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        await axios.post("http://localhost:5000/products", values);
        resetForm();
        onSuccess();
      }}
    >
      <Form className="product-form">
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <Field name="name" placeholder="Product Name" className="form-input" />
          <ErrorMessage name="name" component="div" className="form-error" />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <Field
            name="price"
            placeholder="Price"
            type="number"
            className="form-input"
          />
          <ErrorMessage name="price" component="div" className="form-error" />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </Form>
    </Formik>
  );
}
