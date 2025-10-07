import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";
import { toast } from "react-toastify";

function AddCoupon({ onClose }) {
  const { createCouponForProduct, products, loading } = useAdmin();
  const [productId, setProductId] = useState(0);

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
        code: "Please enter coupon code",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, code: "" }));
    }

    if (!formData.discount) {
      setFormErrors((prev) => ({
        ...prev,
        discount: "Please enter coupon discount",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, discount: "" }));
    }

    if (!formData.validTo) {
      setFormErrors((prev) => ({
        ...prev,
        validTo: "Please enter coupon expiration date",
      }));
      return;
    } else if (new Date(formData.validTo) < new Date()) {
      setFormErrors((prev) => ({
        ...prev,
        validTo: "Expiration date must be in the future",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, validTo: "" }));
    }

    await createCouponForProduct(formData, productId);

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

    toast.success("Coupon added successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Add Coupon</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* coupon code */}
        <FormField
          label={"Coupon Code"}
          type={"text"}
          name={"code"}
          placeholder={"New coupon code"}
          value={formData.code}
          onChange={handleChange}
          error={formErrors.code}
        />
        {/* coupon discount */}
        <FormField
          label={"Coupon Discount"}
          type={"number"}
          name={"discount"}
          placeholder={"10 (for 10%)"}
          value={formData.discount}
          onChange={handleChange}
          error={formErrors.discount}
        />
        {/* valid to */}
        <FormField
          label={"Valid To"}
          type={"date"}
          name={"validTo"}
          placeholder={"YYYY-MM-DD"}
          value={formData.validTo}
          onChange={handleChange}
          error={formErrors.validTo}
        />
        {/* select product */}
        <div>
          <label className="block mb-1 font-medium">Select Product</label>
          <div className="flex items-center gap-2">
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border border-neutral-300 rounded-md p-2"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? "Creating..." : "Create Coupon"}
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

export default AddCoupon;
