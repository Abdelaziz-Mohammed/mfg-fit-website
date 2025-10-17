import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function AddProvince({ onClose }) {
  const { addProvince, loading } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    deliveryFees: 0,
  });

  const [formErrors, setFormErrors] = useState({
    nameEn: "",
    nameAr: "",
    deliveryFees: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.nameEn) {
      setFormErrors((prev) => ({
        ...prev,
        nameEn: t("dashboard.provinces.forms.nameEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (!formData.nameAr) {
      setFormErrors((prev) => ({
        ...prev,
        nameAr: t("dashboard.provinces.forms.nameAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, nameAr: "" }));
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

    await addProvince({ name: formData.nameEn, deliveryFees: formData.deliveryFees }, "en");
    await addProvince({ name: formData.nameAr, deliveryFees: formData.deliveryFees }, "ar");

    setFormData({
      nameEn: "",
      nameAr: "",
      deliveryFees: 0,
    });

    setFormErrors({
      nameEn: "",
      nameAr: "",
      deliveryFees: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.provinces.addProvince")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* nameEn */}
        <FormField
          label={t("dashboard.provinces.forms.nameEn.label")}
          type={"text"}
          name={"nameEn"}
          placeholder={t("dashboard.provinces.forms.nameEn.placeholder")}
          value={formData.nameEn}
          onChange={handleChange}
          error={formErrors.nameEn}
        />
        {/* nameAr */}
        <FormField
          label={t("dashboard.provinces.forms.nameAr.label")}
          type={"text"}
          name={"nameAr"}
          placeholder={t("dashboard.provinces.forms.nameAr.placeholder")}
          value={formData.nameAr}
          onChange={handleChange}
          error={formErrors.nameAr}
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
          {/* add province btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.provinces.addProvinceLoading") : t("dashboard.provinces.addProvince")}
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

export default AddProvince;
