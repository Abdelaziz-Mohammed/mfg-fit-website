import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = user?.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { safeUser, token } = res.data.data;
      const userData = { ...safeUser, token };
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed, Please try again");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return <AuthContext.Provider value={{ user, loading, error, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
