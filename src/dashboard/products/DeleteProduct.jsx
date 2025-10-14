import { AiOutlineClose } from "react-icons/ai";
import { useAdmin } from "../../context/AdminContext";
import { useTranslation } from "react-i18next";

function DeleteProduct({ onClose, productId }) {
  const { deleteProduct, loading } = useAdmin();
  const { t } = useTranslation();

  const handleDelete = async (productId) => {
    console.log(productId);

    await deleteProduct(productId);

    onClose();
  };

  return (
    <div className="relative bg-white pt-20 pb-10 px-6 rounded-md shadow-lg w-96 max-w-full">
      <div className="flex flex-col gap-12">
        <h2 className="text-lg font-semibold text-center">{t("dashboard.products.deleteMessage")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleDelete(productId)}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-4"
          >
            {loading ? t("dashboard.products.deleteLoading") : t("dashboard.products.delete")}
          </button>
          <button onClick={onClose} disabled={loading} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            {t("dashboard.products.cancel")}
          </button>
        </div>
      </div>
      <button onClick={onClose} className="p-2 absolute top-4 right-4">
        <AiOutlineClose className="text-gray-500 hover:text-gray-700 text-xl" />
      </button>
    </div>
  );
}

export default DeleteProduct;
