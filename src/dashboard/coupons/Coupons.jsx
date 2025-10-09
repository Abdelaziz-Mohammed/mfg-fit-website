import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCoupon from "./AddCoupon";
import { useAdmin } from "../../context/AdminContext";
import Loading from "./../../components/loading/Loading";
import DeleteCoupon from "./DeleteCoupon";

function Coupons() {
  const { coupons, loading } = useAdmin();
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
  const addPopUpRef = useRef(null);
  const deletePopUpRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);

  useEffect(() => setFilteredCoupons(coupons), [coupons]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (addPopUpRef.current && !addPopUpRef.current.contains(e.target)) {
        setIsAddCouponOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (deletePopUpRef.current && !deletePopUpRef.current.contains(e.target)) {
        setIsDeleteCouponOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter((coupon) => coupon.code.toLowerCase().includes(value));
      setFilteredCoupons(filtered);
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
          placeholder="Search coupons..."
          className="outline-0 border border-neutral-300 focus:border-neutral-500 rounded-md p-2 min-[500px]:flex-1 max-[500px]:w-full"
        />
        <button
          onClick={() => setIsAddCouponOpen(true)}
          className="bg-primary/90 hover:bg-primary text-white rounded-md px-3 py-2 hoverEffect text-sm max-[500px]:w-full"
        >
          <IoIosAddCircleOutline className="inline text-lg" />
          <span> Add Coupon</span>
        </button>
      </div>
      <div className="h-full">
        {loading ? (
          <Loading fullscreen={false} />
        ) : filteredCoupons.length > 0 ? (
          <div className={`flex flex-col gap-6`}>
            {filteredCoupons.map((coupon) => {
              // console.log(coupon);

              return (
                <div key={coupon.id}>
                  <div className="border border-neutral-300 rounded-md p-4 bg-white shadow-sm hover:shadow-lg hoverEffect flex max-[400px]:flex-col gap-4 sm:gap-6 justify-between items-start">
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-sm text-neutral-700">
                        <b className="text-neutral-800">Code:</b> {coupon.code}
                      </p>
                      <p className="text-sm text-neutral-700">
                        <b className="text-neutral-800">Discount:</b> {coupon.discount}% off
                      </p>
                      <p className="text-sm text-neutral-700">
                        <b className="text-neutral-800">Valid till:</b> {new Date(coupon.validTo).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-neutral-700">
                        <b className="text-neutral-800">Product:</b> {coupon.product.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsDeleteCouponOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 hoverEffect text-sm ms-auto"
                    >
                      Delete
                    </button>
                  </div>
                  {isDeleteCouponOpen && (
                    <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
                      <div
                        ref={deletePopUpRef}
                        className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
                      >
                        <DeleteCoupon onClose={() => setIsDeleteCouponOpen(false)} couponId={coupon.id} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="bg-neutral-100 rounded-md h-96 text-center text-neutral-600 flex flex-col items-center justify-center px-4">
            <b className="mb-1">No coupons available.</b> <br /> Go ahead and hit the add coupon button to add new
            coupons.
          </p>
        )}
      </div>
      {isAddCouponOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div ref={addPopUpRef} className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative">
            <AddCoupon onClose={() => setIsAddCouponOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Coupons;
