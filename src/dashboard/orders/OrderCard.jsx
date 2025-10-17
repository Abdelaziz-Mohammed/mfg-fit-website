import { useEffect, useRef, useState } from "react";
import UpdateOrderStatus from "./UpdateOrderStatus";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const OrderCard = ({ order }) => {
  const [isUpdateOrderStatusOpen, setIsUpdateOrderStatusOpen] = useState(false);
  const updatePopUpRef = useRef(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (updatePopUpRef.current && !updatePopUpRef.current.contains(e.target)) {
        setIsUpdateOrderStatusOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="border border-neutral-200 rounded-md p-4 shadow hover:shadow-lg hoverEffect flex flex-wrap gap-4 sm:gap-6 relative">
        <button
          onClick={() => setIsOrderOpen(!isOrderOpen)}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full
        border border-neutral-300 hover:bg-neutral-100 p-1 w-8 h-8"
        >
          {isOrderOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {isOrderOpen ? (
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-primary">Customer Info:</h2>
                <p className="flex items-center gap-1 text-neutral-600 text-sm">
                  <strong className="text-neutral-800">Name:</strong>
                  {order.userFirstName + " " + order.userLastName}
                </p>
                <p className="flex items-center gap-1 text-neutral-600 text-sm">
                  <strong className="text-neutral-800">Phone:</strong>
                  {order.phoneNumber}
                </p>
                {order.secondPhoneNumber && (
                  <p className="flex items-center gap-1 text-neutral-600 text-sm">
                    <strong className="text-neutral-800">Another Phone:</strong>
                    {order.secondPhoneNumber}
                  </p>
                )}
                <p className="flex items-center gap-1 text-neutral-600 text-base">
                  <strong className="text-neutral-800">City:</strong>
                  {order.city}
                </p>
                <p className="flex items-center gap-1 text-neutral-600 text-base">
                  <strong className="text-neutral-800">Address:</strong>
                  {order.address}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-primary">Order Info:</h2>
                <p className="flex items-center gap-1 text-neutral-600 text-base">
                  <strong className="text-neutral-800">ID:</strong>
                  {order.id}
                </p>
                <p className="flex items-center gap-2 text-neutral-600 text-base">
                  <strong className="text-neutral-800 text-lg font-bold">Total price:</strong>
                  {order.totalPrice} <span className="text-gray-900 text-sm font-medium">L.E</span>
                </p>
                <p className="flex items-center gap-2 text-neutral-600 text-base">
                  <strong className="text-neutral-800 text-lg font-bold">Total fee:</strong>
                  {order.totalFee} <span className="text-gray-900 text-sm font-medium">L.E</span>
                </p>
                <div className="flex flex-col gap-1 text-neutral-600 text-base">
                  <p className="text-primary font-semibold mb-2">Items:</p>
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="ms-4 flex flex-col gap-2 not-last:border-b border-neutral-300 py-3">
                      <p className="text-neutral-600 flex gap-2">
                        <strong className="text-neutral-800">Product:</strong>
                        <span className="text-neutral-600">{item.product.name}</span>
                      </p>
                      <p className="text-neutral-600 flex gap-2">
                        <strong className="text-neutral-800">Quantity:</strong>
                        <span className="text-neutral-600">{item.quantity}</span>
                      </p>
                      <p className="text-neutral-600 flex gap-2">
                        <strong className="text-neutral-800">Price:</strong>
                        <span className="text-neutral-600">{item.price}</span>
                      </p>
                      <p className="text-neutral-600 flex gap-2">
                        <strong className="text-neutral-800">Total:</strong>
                        <span className="text-neutral-600">{item.quantity * item.price}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="flex items-center gap-1 text-neutral-600 text-base">
                  <strong className="text-primary">Status:</strong>
                  {order.status}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsUpdateOrderStatusOpen(true)}
              className="flex-1 max-w-40 bg-green-500/90 hover:bg-green-600 text-white rounded-md px-3 py-2 hoverEffect text-sm ms-auto"
            >
              Update Order Status
            </button>
          </div>
        ) : (
          <h2>
            Order - {order.userFirstName + " " + order.userLastName} - {order.city}
          </h2>
        )}
      </div>
      {isUpdateOrderStatusOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={updatePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <UpdateOrderStatus onClose={() => setIsUpdateOrderStatusOpen(false)} order={order} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
