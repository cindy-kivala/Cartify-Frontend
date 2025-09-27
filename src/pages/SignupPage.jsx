import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { signup } from "../services/api";

export default function Signup({ onLogin }) {
  const navigate = useNavigate();

  const initialValues = { username: "", email: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const data = await signup(values);

    // Store full user info including id
    onLogin({
      id: data.id,
      username: data.username,
      email: data.email,
    });

    toast.success("Signup successful!");
    navigate("/");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Signup failed");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div
      className="page-container"
      style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}
    >
      <h1 className="page-title glow">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="product-form">
            <Field className="form-input" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" className="error-msg" />

            <Field className="form-input" name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error-msg" />

            <Field className="form-input" name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error-msg" />

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
