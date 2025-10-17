import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddProvince from "./AddProvince";
import { useAdmin } from "../../context/AdminContext";
import Loading from "./../../components/loading/Loading";
import UpdateProvince from "./UpdateProvince";
import DeleteProvince from "./DeleteProvince";
import { useTranslation } from "react-i18next";

function Provinces() {
  const { provinces, loading } = useAdmin();
  const [isAddProvinceOpen, setIsAddProvinceOpen] = useState(false);
  const [isUpdateProvinceOpen, setIsUpdateProvinceOpen] = useState(false);
  const [isDeleteProvinceOpen, setIsDeleteProvinceOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedProvinceIdToDelete, setSelectedProvinceIdToDelete] = useState(null);
  const popUpRef = useRef(null);
  const updatePopUpRef = useRef(null);
  const deletePopUpRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState(provinces);
  const { t } = useTranslation();

  useEffect(() => setFilteredProvinces(provinces), [provinces]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setIsAddProvinceOpen(false);
      }
      if (updatePopUpRef.current && !updatePopUpRef.current.contains(e.target)) {
        setIsUpdateProvinceOpen(false);
      }
      if (deletePopUpRef.current && !deletePopUpRef.current.contains(e.target)) {
        setIsDeleteProvinceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProvinces(provinces);
    } else {
      const filtered = provinces.filter((province) => province.name.toLowerCase().includes(value));
      setFilteredProvinces(filtered);
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
          placeholder={t("dashboard.provinces.searchProvinces")}
          className="outline-0 border border-neutral-300 focus:border-neutral-500 rounded-md p-2 min-[500px]:flex-1 max-[500px]:w-full"
        />
        <button
          onClick={() => setIsAddProvinceOpen(true)}
          className="bg-primary/90 hover:bg-primary text-white rounded-md px-3 py-2 hoverEffect text-sm max-[500px]:w-full
          flex rtl:flex-row-reverse gap-2 items-center justify-center"
        >
          <IoIosAddCircleOutline className="inline text-lg" />
          <span>{t("dashboard.provinces.addProvince")}</span>
        </button>
      </div>
      <div className="h-full">
        {loading ? (
          <Loading fullscreen={false} />
        ) : filteredProvinces.length > 0 ? (
          <div className={`flex flex-col gap-6`}>
            {filteredProvinces.map((province) => (
              <div key={province.id}>
                <div className="p-4 border border-neutral-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{province.translations[0].name}</h2>
                    <p className="text-sm text-neutral-600 font-normal">
                      <b>{t("dashboard.provinces.forms.deliveryFees.label")}: </b>{" "}
                      {(Number(province.deliveryFees) || 0).toFixed(2)}{" "}
                      {t("dashboard.provinces.forms.deliveryFees.currency")}
                    </p>
                  </div>
                  <div className="flex gap-4 ms-auto">
                    <button
                      onClick={() => {
                        setSelectedProvince(province);
                        setIsUpdateProvinceOpen(true);
                      }}
                      className="flex-1 max-w-40 bg-green-500/90 hover:bg-green-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
                    >
                      {t("dashboard.provinces.update")}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProvinceIdToDelete(province.id);
                        setIsDeleteProvinceOpen(true);
                      }}
                      className="flex-1 max-w-40 bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
                    >
                      {t("dashboard.provinces.delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-neutral-100 rounded-md h-96 text-center text-neutral-600 flex flex-col items-center justify-center px-4">
            <b className="mb-1">{t("dashboard.provinces.noProvinces")}</b> <br />{" "}
            {t("dashboard.provinces.noProvincesDescription")}
          </p>
        )}
      </div>
      {/* add province modal */}
      {isAddProvinceOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div ref={popUpRef} className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative">
            <AddProvince onClose={() => setIsAddProvinceOpen(false)} />
          </div>
        </div>
      )}
      {/* update province modal */}
      {isUpdateProvinceOpen && selectedProvince && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={updatePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <UpdateProvince onClose={() => setIsUpdateProvinceOpen(false)} province={selectedProvince} />
          </div>
        </div>
      )}
      {/* delete province modal */}
      {isDeleteProvinceOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={deletePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <DeleteProvince onClose={() => setIsDeleteProvinceOpen(false)} provinceId={selectedProvinceIdToDelete} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Provinces;
