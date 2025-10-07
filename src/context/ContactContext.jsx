import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/contact", formData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error sending message");
      toast.error(err.response?.data?.message || "Error sending message", { autoClose: 3000 });
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 8000);
    }
  };

  return <ContactContext.Provider value={{ loading, error, sendMessage }}>{children}</ContactContext.Provider>;
};

export const useContact = () => useContext(ContactContext);
