import { useState } from "react";
import FormField from "./../../components/formField/FormField";
import { useContact } from "../../context/ContactContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Contact() {
  const { loading, error, sendMessage } = useContact();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // basic validation
    if (!formData.firstName) {
      newErrors.firstName = t("contact.form.firstName.errors.required");
    }

    if (!formData.lastName) {
      newErrors.lastName = t("contact.form.lastName.errors.required");
    }

    if (!formData.email) {
      newErrors.email = t("contact.form.email.errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.form.email.errors.invalid");
    }

    if (!formData.subject) {
      newErrors.subject = t("contact.form.subject.errors.required");
    }

    if (!formData.message) {
      newErrors.message = t("contact.form.message.errors.required");
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const response = await sendMessage({
      userName: `${formData.firstName} ${formData.lastName}`,
      userEmail: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (response?.status === "success") {
      toast.success(response?.message || "Message sent successfully!", { autoClose: 3000 });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormErrors({});
    } else if (error) {
      toast.error(error, { autoClose: 3000 });
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="mt-28 mb-12 py-8 bg-gray-50 rounded-lg max-w-3xl mx-auto px-6 shadow-xl">
          <h2 className="text-center text-primary text-2xl sm:text-3xl font-bold mb-8 uppercase">
            {t("contact.title")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <FormField
                label={t("contact.form.firstName.label")}
                type={"text"}
                name={"firstName"}
                placeholder={t("contact.form.firstName.placeholder")}
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
              />
              {/* Last Name */}
              <FormField
                label={t("contact.form.lastName.label")}
                type={"text"}
                name={"lastName"}
                placeholder={t("contact.form.lastName.placeholder")}
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
              />
            </div>
            {/* Email */}
            <FormField
              label={t("contact.form.email.label")}
              type={"email"}
              name={"email"}
              placeholder={t("contact.form.email.placeholder")}
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
            {/* Subject */}
            <FormField
              label={t("contact.form.subject.label")}
              type={"text"}
              name={"subject"}
              placeholder={t("contact.form.subject.placeholder")}
              value={formData.subject}
              onChange={handleChange}
              error={formErrors.subject}
            />
            {/* Message */}
            <FormField
              label={t("contact.form.message.label")}
              type={"textarea"}
              name={"message"}
              placeholder={t("contact.form.message.placeholder")}
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
              {loading ? <span>{t("contact.form.submitButton.loading")}</span> : t("contact.form.submitButton.label")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
