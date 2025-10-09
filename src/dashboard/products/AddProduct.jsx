import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { toast } from "react-toastify";

function AddProduct({ onClose }) {
  const { addProduct, loading } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    discount: 0,
    color: "",
    manufacturer: "",
    categoryName: "",
    imageUrl: null,
    rank: 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    color: "",
    manufacturer: "",
    categoryName: "",
    imageUrl: "",
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
        name: "Please enter product name",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (!formData.description) {
      setFormErrors((prev) => ({
        ...prev,
        description: "Please enter product description",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, description: "" }));
    }

    if (!formData.price) {
      setFormErrors((prev) => ({
        ...prev,
        price: "Please enter product price",
      }));
      return;
    } else if (isNaN(formData.price) || formData.price <= 0) {
      setFormErrors((prev) => ({
        ...prev,
        price: "Please enter a valid price greater than 0",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, price: "" }));
    }

    if (!formData.stock) {
      setFormErrors((prev) => ({
        ...prev,
        stock: "Please enter product stock",
      }));
      return;
    } else if (isNaN(formData.stock) || formData.stock < 0) {
      setFormErrors((prev) => ({
        ...prev,
        stock: "Please enter a valid stock quantity",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, stock: "" }));
    }

    if (!formData.discount) {
      setFormErrors((prev) => ({
        ...prev,
        discount: "Please enter product discount",
      }));
      return;
    } else if (isNaN(formData.discount) || formData.discount < 0) {
      setFormErrors((prev) => ({
        ...prev,
        discount: "Please enter a valid discount amount",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, discount: "" }));
    }

    if (!formData.color) {
      setFormErrors((prev) => ({
        ...prev,
        color: "Please enter product color",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, color: "" }));
    }

    if (!formData.manufacturer) {
      setFormErrors((prev) => ({
        ...prev,
        manufacturer: "Please enter product manufacturer",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, manufacturer: "" }));
    }

    if (!formData.categoryName) {
      setFormErrors((prev) => ({
        ...prev,
        categoryName: "Please enter product category",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, categoryName: "" }));
    }

    if (!formData.imageUrl) {
      setFormErrors((prev) => ({
        ...prev,
        imageUrl: "Please enter product image URL",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, imageUrl: "" }));
    }

    if (!formData.rank) {
      setFormErrors((prev) => ({
        ...prev,
        rank: "Please enter product rank",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, rank: "" }));
    }

    await addProduct(formData);

    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      discount: 0,
      color: "",
      manufacturer: "",
      categoryName: "",
      imageUrl: null,
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
      categoryName: "",
      imageUrl: "",
      rank: "",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Add Product</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name */}
        <FormField
          label={"Product Name"}
          type={"text"}
          name={"name"}
          placeholder={"New product"}
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
        />
        {/* description */}
        <FormField
          label={"Product Description"}
          type={"text"}
          name={"description"}
          placeholder={"This is a new product"}
          value={formData.description}
          onChange={handleChange}
          error={formErrors.description}
        />
        {/* price */}
        <FormField
          label={"Product Price"}
          type={"number"}
          name={"price"}
          placeholder={"100"}
          value={formData.price}
          onChange={handleChange}
          error={formErrors.price}
        />
        {/* stock */}
        <FormField
          label={"Product Stock"}
          type={"number"}
          name={"stock"}
          placeholder={"50"}
          value={formData.stock}
          onChange={handleChange}
          error={formErrors.stock}
        />
        {/* discount */}
        <FormField
          label={"Product Discount"}
          type={"number"}
          name={"discount"}
          placeholder={"10"}
          value={formData.discount}
          onChange={handleChange}
          error={formErrors.discount}
        />
        {/* color */}
        <FormField
          label={"Product Color"}
          type={"text"}
          name={"color"}
          placeholder={"Red"}
          value={formData.color}
          onChange={handleChange}
          error={formErrors.color}
        />
        {/* manufacturer */}
        <FormField
          label={"Product Manufacturer"}
          type={"text"}
          name={"manufacturer"}
          placeholder={"Gym shark"}
          value={formData.manufacturer}
          onChange={handleChange}
          error={formErrors.manufacturer}
        />
        {/* categoryName */}
        <FormField
          label={"Product Category"}
          type={"text"}
          name={"categoryName"}
          placeholder={"Clothing"}
          value={formData.categoryName}
          onChange={handleChange}
          error={formErrors.categoryName}
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
              hover:text-primary hover:translate-x-0 transition bg-primary/10 py-2 pr-5 pl-7 -translate-x-3"
            >
              <span className="text-sm">Choose Product Image</span>
              <FaArrowRight className="pt-1 text-xl" />
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
        {/* rank */}
        <FormField
          label={"Product Rank"}
          type={"number"}
          name={"rank"}
          placeholder={"1"}
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
            {loading ? "Adding..." : "Add Product"}
          </button>
          {/* cancel btn */}
          <button
            type="button"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hoverEffect"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
