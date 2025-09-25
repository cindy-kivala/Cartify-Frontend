import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { loginUser } from "../services/api";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = await loginUser(values);
      onLogin(user);
      toast.success(`Welcome back, ${user.username}!`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
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
