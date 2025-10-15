import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function AddCategory({ onClose }) {
  const { addCategory, loading } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    imageUrl: null,
  });

  const [formErrors, setFormErrors] = useState({
    nameEn: "",
    nameAr: "",
    imageUrl: "",
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
        nameEn: t("dashboard.categories.forms.nameEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, nameEn: "" }));
    }

    if (!formData.nameAr) {
      setFormErrors((prev) => ({
        ...prev,
        nameAr: t("dashboard.categories.forms.nameAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, nameAr: "" }));
    }

    if (!formData.imageUrl) {
      setFormErrors((prev) => ({
        ...prev,
        imageUrl: t("dashboard.categories.forms.imageUrl.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, imageUrl: "" }));
    }

    await addCategory({ name: formData.nameEn, imageUrl: formData.imageUrl }, "en");
    await addCategory({ name: formData.nameAr, imageUrl: formData.imageUrl }, "ar");

    setFormData({
      nameEn: "",
      nameAr: "",
      imageUrl: null,
    });

    setFormErrors({
      nameEn: "",
      nameAr: "",
      imageUrl: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.categories.addCategory")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* nameEn */}
        <FormField
          label={t("dashboard.categories.forms.nameEn.label")}
          type={"text"}
          name={"nameEn"}
          placeholder={t("dashboard.categories.forms.nameEn.placeholder")}
          value={formData.nameEn}
          onChange={handleChange}
          error={formErrors.nameEn}
        />
        {/* nameAr */}
        <FormField
          label={t("dashboard.categories.forms.nameAr.label")}
          type={"text"}
          name={"nameAr"}
          placeholder={t("dashboard.categories.forms.nameAr.placeholder")}
          value={formData.nameAr}
          onChange={handleChange}
          error={formErrors.nameAr}
        />
        {/* imageUrl */}
        <div className="flex flex-col gap-1">
          <div
            className={`h-10 flex items-center border border-neutral-200 ${
              formData.imageUrl ? "bg-neutral-100" : ""
            } shadow rounded overflow-hidden`}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary/90 font-semibold flex items-center gap-1 h-full
              hover:text-primary hover:translate-x-0 transition bg-primary/10 py-2 pr-5 pl-7 -translate-x-3 rtl:translate-x-3"
            >
              <span className="text-sm">{t("dashboard.categories.forms.imageUrl.label")}</span>
              <FaArrowRight className="pt-1 text-xl rtl:rotate-180" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.files[0] })}
              className="hidden"
            />
            {formData.imageUrl && (
              <span
                className="text-sm text-neutral-700 truncate bg-neutral-100
              text-center py-3 font-medium flex-1"
              >
                {formData.imageUrl.name}
              </span>
            )}
          </div>
          {formErrors.imageUrl.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formErrors.imageUrl}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* add category btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.categories.addCategoryLoading") : t("dashboard.categories.addCategory")}
          </button>
          {/* cancel btn */}
          <button
            type="button"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hoverEffect"
            onClick={onClose}
          >
            {t("dashboard.categories.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
