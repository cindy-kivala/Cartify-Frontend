import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // optional, create an empty file for now

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);