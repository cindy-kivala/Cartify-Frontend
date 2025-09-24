
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";


const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function RegisterPage() {
  const handleRegister = async (values, { resetForm }) => {
    try {
      console.log("Submitting registration data:", values);

      const response = await axios.post(
        "http://localhost:5000/register",
        values
      );

      console.log("Registration success:", response.data);

      alert("Registration successful!");
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        <Form>
          <div className="form-field">
            <label>Username:</label>
            <Field type="text" name="username" placeholder="Enter your username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="emaireg-field">
            <label>Email:</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="passreg-field">
            <label>Password:</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;