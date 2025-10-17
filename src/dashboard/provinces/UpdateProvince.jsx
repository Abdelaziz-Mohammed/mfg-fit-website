import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function UpdateProvince({ onClose, province }) {
  const { updateProvince, loading } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: province.translations[0].name || "",
    deliveryFees: province.deliveryFees || 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    deliveryFees: "",
  });

  console.log(province);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.name) {
      setFormErrors((prev) => ({
        ...prev,
        name: t("dashboard.provinces.forms.name.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (!formData.deliveryFees) {
      setFormErrors((prev) => ({
        ...prev,
        deliveryFees: t("dashboard.provinces.forms.deliveryFees.errors.required"),
      }));
      return;
    } else if (isNaN(formData.deliveryFees) || formData.deliveryFees < 0) {
      setFormErrors((prev) => ({
        ...prev,
        deliveryFees: t("dashboard.provinces.forms.deliveryFees.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, deliveryFees: "" }));
    }

    await updateProvince(formData);

    setFormData({
      name: "",
      deliveryFees: 0,
    });

    setFormErrors({
      name: "",
      deliveryFees: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.provinces.updateProvince")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name */}
        <FormField
          label={t("dashboard.provinces.forms.name.label")}
          type={"text"}
          name={"name"}
          placeholder={t("dashboard.provinces.forms.name.placeholder")}
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
        />
        {/* delivery fees */}
        <FormField
          label={t("dashboard.provinces.forms.deliveryFees.label")}
          type={"number"}
          name={"deliveryFees"}
          placeholder={t("dashboard.provinces.forms.deliveryFees.placeholder")}
          value={formData.deliveryFees}
          onChange={handleChange}
          error={formErrors.deliveryFees}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* update province btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.provinces.updateProvinceLoading") : t("dashboard.provinces.updateProvince")}
          </button>
          {/* cancel btn */}
          <button
            type="button"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hoverEffect"
            onClick={onClose}
          >
            {t("dashboard.provinces.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProvince;
