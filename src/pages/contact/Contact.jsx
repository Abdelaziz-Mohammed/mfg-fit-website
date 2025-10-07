import { useState } from "react";
import FormField from "./../../components/formField/FormField";
import { useContact } from "../../context/ContactContext";
import { toast } from "react-toastify";

function Contact() {
  const { loading, error, sendMessage } = useContact();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.firstName) {
      setFormErrors((prev) => ({
        ...prev,
        firstName: "Please enter your first name",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, firstName: "" }));
    }

    if (!formData.lastName) {
      setFormErrors((prev) => ({
        ...prev,
        lastName: "Please enter your last name",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, lastName: "" }));
    }

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

    if (!formData.subject) {
      setFormErrors((prev) => ({
        ...prev,
        subject: "Please enter the subject",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, subject: "" }));
    }

    if (!formData.message) {
      setFormErrors((prev) => ({
        ...prev,
        message: "Please enter your message",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, message: "" }));
    }

    const response = await sendMessage({
      userName: formData.firstName + " " + formData.lastName,
      userEmail: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (response?.status === "success") {
      setSuccessMessage("Message sent successfully!");
      toast.success(response?.message || "Message sent successfully!", { autoClose: 3000 });
      setErrorMessage("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormErrors({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }

    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="mt-28 mb-12 py-8 bg-gray-50 rounded-lg max-w-3xl mx-auto px-6 shadow-xl">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 uppercase">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <FormField
                label={"First Name"}
                type={"text"}
                name={"firstName"}
                placeholder={"John"}
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
              />
              {/* Last Name */}
              <FormField
                label={"Last Name"}
                type={"text"}
                name={"lastName"}
                placeholder={"Doe"}
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
              />
            </div>
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
            {/* Subject */}
            <FormField
              label={"Subject"}
              type={"text"}
              name={"subject"}
              placeholder={"Subject"}
              value={formData.subject}
              onChange={handleChange}
              error={formErrors.subject}
            />
            {/* Message */}
            <FormField
              label={"Message"}
              type={"textarea"}
              name={"message"}
              placeholder={"Your message..."}
              value={formData.message}
              onChange={handleChange}
              error={formErrors.message}
            />
            {/* Send btn */}
            <button
              type="submit"
              className="w-full text-white bg-primary/95 hover:bg-primary py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Sending message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
