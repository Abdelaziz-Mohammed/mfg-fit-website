import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import axios from "axios";
import "./utils/i18n.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <ContactProvider>
      <AuthProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </ContactProvider>
  </AdminProvider>
);
