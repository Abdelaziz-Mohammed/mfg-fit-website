import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../loading/Loading";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user?.token) {
      try {
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          toast.error("Session expired. Please log in again.");
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [user, logout]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
