import { useEffect, useRef, useState } from "react";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";
import { useTranslation } from "react-i18next";

function CategoryCard({ category }) {
  const [isUpdateCategoryOpen, setIsUpdateCategoryOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const updatePopUpRef = useRef(null);
  const deletePopUpRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e) {
      if (updatePopUpRef.current && !updatePopUpRef.current.contains(e.target)) {
        setIsUpdateCategoryOpen(false);
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
        setIsDeleteCategoryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="border border-neutral-200 rounded-md p-4 shadow hover:shadow-lg hoverEffect flex flex-wrap gap-4 sm:gap-6">
        {category.imageUrl ? (
          <img src={category.imageUrl} alt={category.name} className="w-40 border-md object-cover mb-4 rounded" />
        ) : (
          <div className="flex items-center justify-center text-xs border border-neutral-300 rounded-md p-2 bg-neutral-100 text-primary">
            {t("dashboard.categories.noCategoryImage")}
          </div>
        )}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-lg sm:text-xl font-semibold">{category.translations[0].name}</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setIsUpdateCategoryOpen(true)}
              className="flex-1 max-w-40 bg-green-500/90 hover:bg-green-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
            >
              {t("dashboard.categories.update")}
            </button>
            <button
              onClick={() => setIsDeleteCategoryOpen(true)}
              className="flex-1 max-w-40 bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
            >
              {t("dashboard.categories.delete")}
            </button>
          </div>
        </div>
      </div>
      {isUpdateCategoryOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={updatePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <UpdateCategory onClose={() => setIsUpdateCategoryOpen(false)} category={category} />
          </div>
        </div>
      )}
      {isDeleteCategoryOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={deletePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <DeleteCategory onClose={() => setIsDeleteCategoryOpen(false)} categoryId={category.id} />
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryCard;
