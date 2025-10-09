import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormField from "./../../components/formField/FormField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import i18n from "../../utils/i18n";

function Login() {
  const { login, loading, error: loginError, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.email) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter your email",
      }));
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Invalid email, Please enter a valid email",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!formData.password) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, password: "" }));
    }

    await login(formData.email, formData.password);

    setFormData({ email: "", password: "" });
    setFormErrors({ email: "", password: "" });
  };

  if (loginError) {
    toast.error(loginError);
  }

  return (
    <>
      <div className="bg-neutral-50 min-h-screen w-full flex items-center justify-center">
        <div className="bg-white py-10 px-6 rounded-lg shadow-xl w-full max-w-lg my-8 mx-4 border border-neutral-200">
          <p className="text-2xl font-bold mb-2 text-center border-b border-b-neutral-200 pb-2">
            Welcome back to{" "}
            <Link to={"/"} className="text-primary">
              MFG FIT
            </Link>
          </p>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <FormField
              label={"Email"}
              type={"email"}
              name={"email"}
              placeholder={"john.doe@example.com"}
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
            {/* Password */}
            <FormField
              label={"Password"}
              type={"password"}
              name={"password"}
              placeholder={"************"}
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
            />
            {/* Submit btn */}
            <button
              type="submit"
              className="w-full text-white bg-primary/95 hover:bg-primary py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* login error */}
          {loginError && <p className="text-red-500 mt-6 text-[13px]">* {loginError}</p>}
        </div>
      </div>
      <ToastContainer
        position={`${i18n.language === "ar" ? "top-left" : "top-right"}`}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={`${i18n.language === "ar" ? "true" : "false"}`}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Login;
