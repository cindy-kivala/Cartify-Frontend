import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().positive("Price must be > 0").required("Price is required"),
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
      <Form className="flex gap-2 mt-2">
        <div>
          <Field name="name" placeholder="Product Name" className="border p-1" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <Field name="price" placeholder="Price" type="number" className="border p-1" />
          <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
      </Form>
    </Formik>
  );
}
