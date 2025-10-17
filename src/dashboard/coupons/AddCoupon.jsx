import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function AddCoupon({ onClose }) {
  const { createCoupon, loading } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    validTo: "",
  });

  const [formErrors, setFormErrors] = useState({
    code: "",
    discount: "",
    validTo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.code) {
      setFormErrors((prev) => ({
        ...prev,
        code: t("dashboard.coupons.forms.code.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, code: "" }));
    }

    if (!formData.discount) {
      setFormErrors((prev) => ({
        ...prev,
        discount: t("dashboard.coupons.forms.discount.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, discount: "" }));
    }

    if (!formData.validTo) {
      setFormErrors((prev) => ({
        ...prev,
        validTo: t("dashboard.coupons.forms.validTo.errors.required"),
      }));
      return;
    } else if (new Date(formData.validTo) < new Date()) {
      setFormErrors((prev) => ({
        ...prev,
        validTo: t("dashboard.coupons.forms.validTo.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, validTo: "" }));
    }

    await createCoupon({ ...formData, discount: parseFloat(formData.discount), type: "PERCENT" });

    setFormData({
      code: "",
      discount: 0,
      validTo: "",
    });

    setFormErrors({
      code: "",
      discount: "",
      validTo: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.coupons.addCoupon")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* coupon code */}
        <FormField
          label={t("dashboard.coupons.forms.code.label")}
          type={"text"}
          name={"code"}
          placeholder={t("dashboard.coupons.forms.code.placeholder")}
          value={formData.code}
          onChange={handleChange}
          error={formErrors.code}
        />
        {/* coupon discount */}
        <FormField
          label={t("dashboard.coupons.forms.discount.label")}
          type={"number"}
          name={"discount"}
          placeholder={t("dashboard.coupons.forms.discount.placeholder")}
          value={formData.discount}
          onChange={handleChange}
          error={formErrors.discount}
        />
        {/* valid to */}
        <FormField
          label={t("dashboard.coupons.forms.validTo.label")}
          type={"date"}
          name={"validTo"}
          placeholder={t("dashboard.coupons.forms.validTo.placeholder")}
          value={formData.validTo}
          onChange={handleChange}
          error={formErrors.validTo}
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.coupons.createCouponLoading") : t("dashboard.coupons.createCoupon")}
          </button>
          {/* cancel btn */}
          <button
            type="button"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hoverEffect"
            onClick={onClose}
          >
            {t("dashboard.coupons.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
