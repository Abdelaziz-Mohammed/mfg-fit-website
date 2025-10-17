import { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import Loading from "./../../components/loading/Loading";
import OrderCard from "./OrderCard";

function Orders() {
  const { orders, loading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => setFilteredOrders(orders), [orders]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          (order.userFirstName + " " + order.userLastName).toLowerCase().includes(value) ||
          order.id.toString().includes(value) ||
          `Order - ${order.userFirstName + " " + order.userLastName} - ${order.city}`.toLowerCase().includes(value)
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-[500px]:flex-row items-center gap-4 mb-4">
        <input
          type="search"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search orders by ID or customer name..."
          className="outline-0 border border-neutral-300 focus:border-neutral-500 rounded-md p-2 min-[500px]:flex-1 max-[500px]:w-full
          placeholder:text-xs sm:placeholder:text-sm placeholder:text-ellipsis overflow-ellipsis"
        />
      </div>
      <div className="h-full">
        {loading ? (
          <Loading fullscreen={false} />
        ) : filteredOrders.length > 0 ? (
          <div className={`flex flex-col gap-6`}>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="bg-neutral-100 rounded-md h-96 text-center text-neutral-600 flex flex-col items-center justify-center px-4">
            <b className="mb-1">No orders available.</b> <br /> Go Wait util your customer places an order.
          </p>
        )}
      </div>
    </div>
  );
}

export default Orders;
