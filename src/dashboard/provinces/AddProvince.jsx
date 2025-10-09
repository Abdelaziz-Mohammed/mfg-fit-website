import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";
import FormField from "./../../components/formField/FormField";

function AddProvince({ onClose }) {
  const { addProvince, loading } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    deliveryFees: 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    deliveryFees: "",
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
        name: "Please enter province name",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }

    if (!formData.deliveryFees) {
      setFormErrors((prev) => ({
        ...prev,
        deliveryFees: "Please enter delivery fee",
      }));
      return;
    } else if (isNaN(formData.deliveryFees) || formData.deliveryFees < 0) {
      setFormErrors((prev) => ({
        ...prev,
        deliveryFees: "Please enter a valid delivery fee",
      }));
      return;
    } else {
      setFormErrors((prev) => ({ ...prev, deliveryFees: "" }));
    }

    await addProvince(formData);

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
        <h3 className="text-xl font-bold">Add Province</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name */}
        <FormField
          label={"Province Name"}
          type={"text"}
          name={"name"}
          placeholder={"New province"}
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
        />
        {/* delivery fees */}
        <FormField
          label={"Delivery Fees (Egp)"}
          type={"number"}
          name={"deliveryFees"}
          placeholder={"Delivery fees"}
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
            {loading ? "Adding..." : "Add Province"}
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

export default AddProvince;
