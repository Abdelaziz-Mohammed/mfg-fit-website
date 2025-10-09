import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";

function UpdateOrderStatus({ onClose, order }) {
  const { updateOrderStatus, loading } = useAdmin();
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [orderStatusError, setOrderStatusError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!orderStatus) {
      setOrderStatusError("Order status is required");
      return;
    } else {
      setOrderStatusError("");
    }

    await updateOrderStatus(order.id, orderStatus);

    setOrderStatus("");
    setOrderStatusError("");

    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Update Order {order.id} Status</h3>
        <button onClick={onClose} className="p-2">
          <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* order status */}
        <div className="flex flex-col gap-1">
          <select
            name="orderStatus"
            id="orderStatus"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className={`border border-gray-300 outline-0 focus:border-neutral-400 hoverEffect rounded-md p-2 w-full ${
              orderStatusError ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Order Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
          </select>
          {orderStatusError && <p className="text-red-500 text-sm mt-1">{orderStatusError}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* update order status btn */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-md hover:bg-primary/80 hoverEffect"
          >
            {loading ? "Updating..." : "Update Order Status"}
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

export default UpdateOrderStatus;
