import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("i18nextLng") || "en";
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------- fetch initial data -------------
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCoupons();
    fetchOrders();
    fetchProvinces();
    fetchAds();
  }, [lang]);

  //#region products
  const addProduct = async (productData, lang) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const formData = new FormData();

      for (const key in productData) {
        if (key === "images") {
          productData.images.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, productData[key]);
        }
      }

      await axios.post(`/api/products?lang=${lang}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
      toast.success("Product added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`/api/products?lang=${lang}`);
      setProducts(res.data.data);
      // logging to be removed
      // console.log(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

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

      fetchProducts();
      toast.success("Product updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
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

      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  //#endregion

  //#region categories
  const addCategory = async (categoryData, lang) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const formData = new FormData();
      for (const key in categoryData) {
        if (key === "imageUrl") {
          formData.append("image", categoryData[key]);
        } else {
          formData.append(key, categoryData[key]);
        }
      }

      await axios.post(`/api/categories?lang=${lang}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
      toast.success("Category added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding category");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`/api/categories?lang=${lang}`);
      setCategories(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching categories");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const updateCategory = async (categoryId, updatedData) => {
    setLoading(true);
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.put(`/api/categories/${categoryId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
      toast.success("Category updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating category");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
      toast.success("Category deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting category");
      // logging to be removed
      console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  //#endregion categories

  //#region coupons
  const createCoupon = async (couponData) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.post("/api/coupons/products", couponData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCoupons();
      toast.success("Coupon added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding coupon");
      toast.error(err.response?.data?.message || "Error adding coupon");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchCoupons = async () => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.get("/api/coupons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCoupons(res.data.data.coupons);

      // logging to be removed
      // console.log(res.data.data.coupons);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching coupons");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const applyCoupon = async (couponCode) => {
    setLoading(true);
    setError("");
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.post(
        "/api/coupons/use",
        { code: couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCoupons();
      toast.success("Coupon applied successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error applying coupon");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const deleteCoupon = async (couponId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.delete(`/api/coupons/${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCoupons();
      toast.success("Coupon deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting coupon");
      // logging to be removed
      console.log(err);
      toast.error(err.response?.data?.message || "Error deleting coupon");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  //#endregion coupons

  //#region orders
  const createNewOrder = async (orderData, provinceId) => {
    setLoading(true);
    setError("");

    try {
      await axios.post(`/api/orders/provinces/${provinceId}`, orderData);

      fetchOrders();
      toast.success("Order created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating order");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.data);
      // logging to be removed
      // console.log(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching orders");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.patch(
        `/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
      toast.success("Order status updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating order status");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  //#endregion orders

  //#region provinces
  const addProvince = async (provinceData, lang) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.post(`/api/provinces?lang=${lang}`, provinceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProvinces();
      toast.success("Province added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding province");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchProvinces = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`/api/provinces?lang=${lang}`);
      setProvinces(res.data.data);
      // logging to be removed
      // console.log(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching provinces");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchProvinceById = async (provinceId) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`/api/provinces/${provinceId}`);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching province");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const updateProvince = async (provinceId, updatedData) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.put(`/api/provinces/${provinceId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProvinces();
      toast.success("Province updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating province");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const deleteProvince = async (provinceId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.delete(`/api/provinces/${provinceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProvinces();
      toast.success("Province deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting province");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const addDeliveryFeeToProvince = async (provinceId, productId, fee) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.post(
        `/api/provinces/${provinceId}/products/${productId}/delivery-fee`,
        { fee },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error adding delivery fee");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const removeDeliveryFeeFromProvince = async (provinceId, productId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.delete(`/api/provinces/${provinceId}/products/${productId}/delivery-fee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error removing delivery fee");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };
  //#endregion provinces

  //#region ads
  const createAd = async (adData, productId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios.post(`/api/ad/${productId}/products`, adData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Ad created successfully!");
      fetchAds();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating an ad");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const fetchAds = async () => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.get("/api/ad", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(res.data.data);
      // logging to be removed
      // console.log(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching ads");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  const deleteAd = async (adId) => {
    setLoading(true);
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.delete(`/api/ad/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAds();
      toast.success("Ad deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting ad");
      // logging to be removed
      // console.log(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  //#endregion ads

  return (
    <AdminContext.Provider
      value={{
        lang,
        setLang,
        // data fetching
        products,
        categories,
        coupons,
        orders,
        provinces,
        ads,
        // loading and error states
        loading,
        error,
        // products functions
        addProduct,
        updateProduct,
        deleteProduct,
        //  categories functions
        addCategory,
        updateCategory,
        deleteCategory,
        // coupons functions
        createCoupon,
        applyCoupon,
        deleteCoupon,
        // orders functions
        createNewOrder,
        updateOrderStatus,
        // provinces functions
        fetchProvinceById,
        addProvince,
        updateProvince,
        deleteProvince,
        addDeliveryFeeToProvince,
        removeDeliveryFeeFromProvince,
        // ads functions
        createAd,
        fetchAds,
        deleteAd,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
