import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { login } from "../services/api";

//use api.js helper

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
   try {
     const data = await login(values); // API call

    // Store full user info including id
     onLogin({
       id: data.id,
       username: data.username,
       email: data.email,
     });

     toast.success(`Welcome back, ${data.username}!`);
     navigate("/");
   } catch (err) {
     console.error(err);
     toast.error(err.message || "Invalid credentials");
   } finally {
     setSubmitting(false);
   }
 };


  return (
    <div className="page-container" style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      <h1 className="page-title">Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="product-form">
            <Field className="form-input" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" className="error-msg" />
            <Field className="form-input" name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error-msg" />
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
