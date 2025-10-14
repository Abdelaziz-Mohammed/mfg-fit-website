import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function UpdateProduct({ onClose, product }) {
  const { updateProduct, loading } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || 0,
    stock: product.stock || 0,
    discount: product.discount || 0,
    color: product.color || "",
    manufacturer: product.manufacturer || "",
    weight: product.weight || 0,
    images: product.images || [],
    rank: product.rank || 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    color: "",
    manufacturer: "",
    weight: "",
    images: "",
    rank: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.name) {
      setFormErrors((prev) => ({
        ...prev,
        name: t("dashboard.products.forms.productName.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (!formData.description) {
      setFormErrors((prev) => ({
        ...prev,
        description: t("dashboard.products.forms.productDescription.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, description: "" }));
    }

    if (!formData.price) {
      setFormErrors((prev) => ({
        ...prev,
        price: t("dashboard.products.forms.productPrice.errors.required"),
      }));
      return;
    } else if (isNaN(formData.price) || formData.price <= 0) {
      setFormErrors((prev) => ({
        ...prev,
        price: t("dashboard.products.forms.productPrice.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, price: "" }));
    }

    if (!formData.stock) {
      setFormErrors((prev) => ({
        ...prev,
        stock: t("dashboard.products.forms.productStock.errors.required"),
      }));
      return;
    } else if (isNaN(formData.stock) || formData.stock < 0) {
      setFormErrors((prev) => ({
        ...prev,
        stock: t("dashboard.products.forms.productStock.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, stock: "" }));
    }

    if (!formData.discount) {
      setFormErrors((prev) => ({
        ...prev,
        discount: t("dashboard.products.forms.productDiscount.errors.required"),
      }));
      return;
    } else if (isNaN(formData.discount) || formData.discount < 0) {
      setFormErrors((prev) => ({
        ...prev,
        discount: t("dashboard.products.forms.productDiscount.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, discount: "" }));
    }

    if (!formData.color) {
      setFormErrors((prev) => ({
        ...prev,
        color: t("dashboard.products.forms.productColor.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, color: "" }));
    }

    if (!formData.manufacturer) {
      setFormErrors((prev) => ({
        ...prev,
        manufacturer: t("dashboard.products.forms.productManufacturer.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, manufacturer: "" }));
    }

    if (!formData.weight) {
      setFormErrors((prev) => ({
        ...prev,
        weight: t("dashboard.products.forms.productWeight.errors.required"),
      }));
      return;
    } else if (isNaN(formData.weight) || formData.weight <= 0) {
      setFormErrors((prev) => ({
        ...prev,
        weight: t("dashboard.products.forms.productWeight.errors.invalid"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, weight: "" }));
    }

    if (!formData.images || formData.images.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        images: t("dashboard.products.forms.productImages.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, images: "" }));
    }

    if (!formData.rank) {
      setFormErrors((prev) => ({
        ...prev,
        rank: t("dashboard.products.forms.productRank.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, rank: "" }));
    }

    await updateProduct(formData);

    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      discount: 0,
      color: "",
      manufacturer: "",
      weight: "",
      images: [],
      rank: 0,
    });

    setFormErrors({
      name: "",
      description: "",
      price: "",
      stock: "",
      discount: "",
      color: "",
      manufacturer: "",
      weight: "",
      images: [],
      rank: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.products.updateProduct")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name */}
        <FormField
          label={t("dashboard.products.forms.productName.label")}
          type={"text"}
          name={"name"}
          placeholder={t("dashboard.products.forms.productName.placeholder")}
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
        />
        {/* description */}
        <FormField
          label={t("dashboard.products.forms.productDescription.label")}
          type={"text"}
          name={"description"}
          placeholder={t("dashboard.products.forms.productDescription.placeholder")}
          value={formData.description}
          onChange={handleChange}
          error={formErrors.description}
        />
        {/* price */}
        <FormField
          label={t("dashboard.products.forms.productPrice.label")}
          type={"number"}
          name={"price"}
          placeholder={t("dashboard.products.forms.productPrice.placeholder")}
          value={formData.price}
          onChange={handleChange}
          error={formErrors.price}
        />
        {/* stock */}
        <FormField
          label={t("dashboard.products.forms.productStock.label")}
          type={"number"}
          name={"stock"}
          placeholder={t("dashboard.products.forms.productStock.placeholder")}
          value={formData.stock}
          onChange={handleChange}
          error={formErrors.stock}
        />
        {/* discount */}
        <FormField
          label={t("dashboard.products.forms.productDiscount.label")}
          type={"number"}
          name={"discount"}
          placeholder={t("dashboard.products.forms.productDiscount.placeholder")}
          value={formData.discount}
          onChange={handleChange}
          error={formErrors.discount}
        />
        {/* color */}
        <FormField
          label={t("dashboard.products.forms.productColor.label")}
          type={"text"}
          name={"color"}
          placeholder={t("dashboard.products.forms.productColor.placeholder")}
          value={formData.color}
          onChange={handleChange}
          error={formErrors.color}
        />
        {/* manufacturer */}
        <FormField
          label={t("dashboard.products.forms.productManufacturer.label")}
          type={"text"}
          name={"manufacturer"}
          placeholder={t("dashboard.products.forms.productManufacturer.placeholder")}
          value={formData.manufacturer}
          onChange={handleChange}
          error={formErrors.manufacturer}
        />
        {/* weight */}
        <FormField
          label={t("dashboard.products.forms.productWeight.label")}
          type={"number"}
          name={"weight"}
          placeholder={t("dashboard.products.forms.productWeight.placeholder")}
          value={formData.weight}
          onChange={handleChange}
          error={formErrors.weight}
        />
        {/* images */}
        <div className="flex flex-col gap-1">
          <div
            className={`h-10 flex items-center border border-neutral-200 ${
              formData.images?.length ? "bg-neutral-100" : ""
            } shadow rounded overflow-hidden`}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary/90 font-semibold flex items-center gap-1 h-full
            hover:text-primary hover:translate-x-0 transition bg-primary/10 py-2 pr-5 pl-7 -translate-x-3 rtl:translate-x-3"
            >
              <span className="text-sm">{t("dashboard.products.forms.productImages.label")}</span>
              <FaArrowRight className="pt-1 text-xl rtl:rotate-180" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
              className="hidden"
            />
            {formData.images?.length > 0 && (
              <span className="text-sm text-neutral-700 truncate bg-neutral-100 text-center py-3 font-medium flex-1">
                {formData.images.map((file) => file.name).join(", ")}
              </span>
            )}
          </div>
          {formErrors.images?.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formErrors.images}
            </p>
          )}
        </div>
        {/* rank */}
        <FormField
          label={t("dashboard.products.forms.productRank.label")}
          type={"number"}
          name={"rank"}
          placeholder={t("dashboard.products.forms.productRank.placeholder")}
          value={formData.rank}
          onChange={handleChange}
          error={formErrors.rank}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* update product btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.products.updateProductLoading") : t("dashboard.products.updateProduct")}
          </button>
          {/* cancel btn */}
          <button
            type="button"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hoverEffect"
            onClick={onClose}
          >
            {t("dashboard.products.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
