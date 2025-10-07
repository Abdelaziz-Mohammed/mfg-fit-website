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
import DashboardIndex from "./../dashboard/DashboardIndex";
import Products from "./../dashboard/products/Products";
import Categories from "./../dashboard/categories/Categories";
import Coupons from "./../dashboard/coupons/Coupons";
import Orders from "./../dashboard/orders/Orders";
import Provinces from "./../dashboard/provinces/Provinces";
import Settings from "./../dashboard/settings/Settings";

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
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "provinces",
        element: <Provinces />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
