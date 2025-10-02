import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Error from "./../pages/error/Error";
import Home from "./../pages/home/Home";
import About from "./../pages/about/About";
import Contact from "./../pages/contact/Contact";
import Login from "./../auth/login/Login";
import Register from "./../auth/register/Register";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
