import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Error from "./../pages/error/Error";
import Home from "./../pages/home/Home";
import Shop from "./../pages/shop/Shop";
import About from "./../pages/about/About";
import Contact from "./../pages/contact/Contact";
import Login from "./../auth/login/Login";
import Dashboard from "./../dashboard/Dashboard";
import ProtectedRoute from "./../components/protectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // Auth routes
  {
    path: "/login",
    element: <Login />,
  },
  // Dashboard routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
