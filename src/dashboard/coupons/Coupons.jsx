import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCoupon from "./AddCoupon";
import { useAdmin } from "../../context/AdminContext";
import Loading from "./../../components/loading/Loading";
import DeleteCoupon from "./DeleteCoupon";
import ApplyCoupon from "./ApplyCoupon";
import { useTranslation } from "react-i18next";

function Coupons() {
  const { coupons, loading } = useAdmin();
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [isDeleteCouponOpen, setIsDeleteCouponOpen] = useState(false);
  const [isApplyCouponOpen, setIsApplyCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedCouponIdToDelete, setSelectedCouponIdToDelete] = useState(null);

  const addPopUpRef = useRef(null);
  const deletePopUpRef = useRef(null);
  const applyPopUpRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);
  const { t } = useTranslation();

  useEffect(() => setFilteredCoupons(coupons), [coupons]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addPopUpRef.current && !addPopUpRef.current.contains(e.target)) {
        setIsAddCouponOpen(false);
      }
      if (deletePopUpRef.current && !deletePopUpRef.current.contains(e.target)) {
        setIsDeleteCouponOpen(false);
      }
      if (applyPopUpRef.current && !applyPopUpRef.current.contains(e.target)) {
        setIsApplyCouponOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          placeholder={t("dashboard.coupons.searchCoupons")}
          className="outline-0 border border-neutral-300 focus:border-neutral-500 rounded-md p-2 min-[500px]:flex-1 max-[500px]:w-full"
        />
        <button
          onClick={() => setIsAddCouponOpen(true)}
          className="bg-primary/90 hover:bg-primary text-white rounded-md px-3 py-2 hoverEffect text-sm max-[500px]:w-full
          flex rtl:flex-row-reverse gap-2 items-center justify-center"
        >
          <IoIosAddCircleOutline className="inline text-lg" />
          <span>{t("dashboard.coupons.addCoupon")}</span>
        </button>
      </div>
      <div className="h-full">
        {loading ? (
          <Loading fullscreen={false} />
        ) : filteredCoupons.length > 0 ? (
          <div className={`flex flex-col gap-6`}>
            {filteredCoupons.map((coupon) => (
              <div key={coupon.id}>
                <div className="border border-neutral-300 rounded-md p-4 bg-white shadow-sm hover:shadow-lg hoverEffect flex max-[400px]:flex-col gap-4 sm:gap-6 justify-between items-start">
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="text-sm text-neutral-700">
                      <b className="text-neutral-800">{t("dashboard.coupons.forms.code.label")}:</b> {coupon.code}
                    </p>
                    <p className="text-sm text-neutral-700">
                      <b className="text-neutral-800">{t("dashboard.coupons.forms.discount.label")}:</b>{" "}
                      {coupon.discount}% off
                    </p>
                    <p className="text-sm text-neutral-700">
                      <b className="text-neutral-800">{t("dashboard.coupons.forms.validFrom.label")}:</b>{" "}
                      {new Date(coupon.validFrom).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-neutral-700">
                      <b className="text-neutral-800">{t("dashboard.coupons.forms.validTo.label")}:</b>{" "}
                      {new Date(coupon.validTo).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-neutral-700">
                      <b className="text-neutral-800">{t("dashboard.coupons.forms.usedCount.label")}:</b>{" "}
                      {coupon.usedCount}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCouponIdToDelete(coupon.id);
                        setIsDeleteCouponOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 hoverEffect text-sm ms-auto"
                    >
                      {t("dashboard.coupons.delete")}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCoupon(coupon);
                        setIsApplyCouponOpen(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-2 hoverEffect text-sm ms-auto"
                    >
                      {t("dashboard.coupons.apply")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-neutral-100 rounded-md h-96 text-center text-neutral-600 flex flex-col items-center justify-center px-4">
            <b className="mb-1">{t("dashboard.coupons.noCoupons")}</b> <br />{" "}
            {t("dashboard.coupons.noCouponsDescription")}
          </p>
        )}
      </div>
      {/* add coupon modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div ref={addPopUpRef} className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative">
            <AddCoupon onClose={() => setIsAddCouponOpen(false)} />
          </div>
        </div>
      )}
      {/* delete coupon modal */}
      {isDeleteCouponOpen && selectedCouponIdToDelete && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={deletePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <DeleteCoupon onClose={() => setIsDeleteCouponOpen(false)} couponId={selectedCouponIdToDelete} />
          </div>
        </div>
      )}
      {/* apply coupon modal */}
      {isApplyCouponOpen && selectedCoupon && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={applyPopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <ApplyCoupon onClose={() => setIsApplyCouponOpen(false)} couponCode={selectedCoupon.code} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Coupons;
