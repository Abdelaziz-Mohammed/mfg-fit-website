import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------- start products -------------
  const addProduct = async (productData) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const formData = new FormData();

      for (const key in productData) {
        if (key === "imageUrl") {
          formData.append("image", productData[key]);
        } else {
          formData.append(key, productData[key]);
        }
      }

      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error adding product");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
      // logging to be removed
      console.log(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProduct = async (productId, updatedData) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const formData = new FormData();

      for (const key in updatedData) {
        if (key === "imageUrl") {
          formData.append("image", updatedData[key]);
        } else {
          formData.append(key, updatedData[key]);
        }
      }

      await axios.put(`/api/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  // ------------- end products -------------

  // ------------- start categories -------------

  // ------------- end categories -------------

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        coupons,
        orders,
        provinces,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
