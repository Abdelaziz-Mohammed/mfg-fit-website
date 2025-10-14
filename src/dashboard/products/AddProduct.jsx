import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { useTranslation } from "react-i18next";

function AddProduct({ onClose }) {
  const { addProduct, loading, categories } = useAdmin();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    price: 0,
    stock: 0,
    discount: 0,
    colorEn: "",
    colorAr: "",
    manufacturerEn: "",
    manufacturerAr: "",
    categoryName: "",
    images: [],
    rank: 0,
  });

  const [formErrors, setFormErrors] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    price: "",
    stock: "",
    discount: "",
    colorEn: "",
    colorAr: "",
    manufacturerEn: "",
    manufacturerAr: "",
    categoryName: "",
    images: "",
    rank: "",
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
        nameEn: t("dashboard.products.forms.productNameEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, nameEn: "" }));
    }

    if (!formData.nameAr) {
      setFormErrors((prev) => ({
        ...prev,
        nameAr: t("dashboard.products.forms.productNameAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, nameAr: "" }));
    }

    if (!formData.descriptionEn) {
      setFormErrors((prev) => ({
        ...prev,
        descriptionEn: t("dashboard.products.forms.productDescriptionEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, descriptionEn: "" }));
    }

    if (!formData.descriptionAr) {
      setFormErrors((prev) => ({
        ...prev,
        descriptionAr: t("dashboard.products.forms.productDescriptionAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, descriptionAr: "" }));
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

    if (!formData.colorEn) {
      setFormErrors((prev) => ({
        ...prev,
        colorEn: t("dashboard.products.forms.productColorEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, colorEn: "" }));
    }

    if (!formData.colorAr) {
      setFormErrors((prev) => ({
        ...prev,
        colorAr: t("dashboard.products.forms.productColorAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, colorAr: "" }));
    }

    if (!formData.manufacturerEn) {
      setFormErrors((prev) => ({
        ...prev,
        manufacturerEn: t("dashboard.products.forms.productManufacturerEn.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, manufacturerEn: "" }));
    }

    if (!formData.manufacturerAr) {
      setFormErrors((prev) => ({
        ...prev,
        manufacturerAr: t("dashboard.products.forms.productManufacturerAr.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, manufacturerAr: "" }));
    }

    if (!formData.categoryName) {
      setFormErrors((prev) => ({
        ...prev,
        categoryName: t("dashboard.products.forms.productCategoryName.errors.required"),
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, categoryName: "" }));
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

    await addProduct(
      {
        name: formData.nameEn,
        description: formData.descriptionEn,
        price: formData.price,
        stock: formData.stock,
        discount: formData.discount,
        color: formData.colorEn,
        categoryName: formData.categoryName,
        images: formData.images,
        rank: formData.rank,
      },
      "en"
    ); // For En

    await addProduct(
      {
        name: formData.nameAr,
        description: formData.descriptionAr,
        price: formData.price,
        stock: formData.stock,
        discount: formData.discount,
        color: formData.colorAr,
        manufacturer: formData.manufacturerAr,
        categoryName: formData.categoryNameAr,
        images: formData.images,
        rank: formData.rank,
      },
      "ar"
    ); // For Ar

    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      price: 0,
      stock: 0,
      discount: 0,
      colorEn: "",
      colorAr: "",
      manufacturerEn: "",
      manufacturerAr: "",
      categoryName: "",
      images: [],
      rank: 0,
    });

    setFormErrors({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      price: "",
      stock: "",
      discount: "",
      colorEn: "",
      colorAr: "",
      manufacturerEn: "",
      manufacturerAr: "",
      categoryName: "",
      images: [],
      rank: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t("dashboard.products.addProduct")}</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name (En) */}
        <FormField
          label={t("dashboard.products.forms.productNameEn.label")}
          type={"text"}
          name={"name"}
          placeholder={t("dashboard.products.forms.productNameEn.placeholder")}
          value={formData.nameEn}
          onChange={handleChange}
          error={formErrors.nameEn}
        />
        {/* name (Ar) */}
        <FormField
          label={t("dashboard.products.forms.productNameAr.label")}
          type={"text"}
          name={"name"}
          placeholder={t("dashboard.products.forms.productNameAr.placeholder")}
          value={formData.nameAr}
          onChange={handleChange}
          error={formErrors.nameAr}
        />
        {/* description (En) */}
        <FormField
          label={t("dashboard.products.forms.productDescriptionEn.label")}
          type={"text"}
          name={"description"}
          placeholder={t("dashboard.products.forms.productDescriptionEn.placeholder")}
          value={formData.descriptionEn}
          onChange={handleChange}
          error={formErrors.descriptionEn}
        />
        {/* description (Ar) */}
        <FormField
          label={t("dashboard.products.forms.productDescriptionAr.label")}
          type={"text"}
          name={"description"}
          placeholder={t("dashboard.products.forms.productDescriptionAr.placeholder")}
          value={formData.descriptionAr}
          onChange={handleChange}
          error={formErrors.descriptionAr}
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
        {/* color (En) */}
        <FormField
          label={t("dashboard.products.forms.productColorEn.label")}
          type={"text"}
          name={"color"}
          placeholder={t("dashboard.products.forms.productColorEn.placeholder")}
          value={formData.colorEn}
          onChange={handleChange}
          error={formErrors.colorEn}
        />
        {/* color (Ar) */}
        <FormField
          label={t("dashboard.products.forms.productColorAr.label")}
          type={"text"}
          name={"color"}
          placeholder={t("dashboard.products.forms.productColorAr.placeholder")}
          value={formData.colorAr}
          onChange={handleChange}
          error={formErrors.colorAr}
        />
        {/* manufacturer (En) */}
        <FormField
          label={t("dashboard.products.forms.productManufacturerEn.label")}
          type={"text"}
          name={"manufacturer"}
          placeholder={t("dashboard.products.forms.productManufacturerEn.placeholder")}
          value={formData.manufacturerEn}
          onChange={handleChange}
          error={formErrors.manufacturerEn}
        />
        {/* manufacturer (Ar) */}
        <FormField
          label={t("dashboard.products.forms.productManufacturerAr.label")}
          type={"text"}
          name={"manufacturer"}
          placeholder={t("dashboard.products.forms.productManufacturerAr.placeholder")}
          value={formData.manufacturerAr}
          onChange={handleChange}
          error={formErrors.manufacturerAr}
        />
        {/* categoryName */}
        <div className="flex flex-col gap-1">
          <label htmlFor="categoryName" className="text-sm font-medium">
            {t("dashboard.products.forms.productCategory.label")}
          </label>
          <select
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className={`border border-gray-300 focus:border-gray-500 rounded-md p-2 placeholder:text-sm outline-0`}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          {formErrors.categoryName && <p className="text-red-500 text-xs">* {formErrors.categoryName}</p>}
        </div>
        {/* images */}
        <div className="flex flex-col gap-1">
          <div
            className={`h-10 flex items-center border border-neutral-200 ${
              formData.images?.length ? "bg-neutral-100" : ""
            } shadow rounded overflow-hidden`}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary/90 font-semibold flex items-center gap-1 h-full hover:text-primary
              hover:translate-x-0 transition bg-primary/10 py-2 pr-5 pl-7 -translate-x-3 rtl:translate-x-3"
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
          {/* add product btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? t("dashboard.products.addProductLoading") : t("dashboard.products.addProduct")}
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

export default AddProduct;
