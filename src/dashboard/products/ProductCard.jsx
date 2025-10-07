import { useEffect, useRef, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

const ProductCard = ({ product }) => {
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const updatePopUpRef = useRef(null);
  const deletePopUpRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (updatePopUpRef.current && !updatePopUpRef.current.contains(e.target)) {
        setIsUpdateProductOpen(false);
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
        setIsDeleteProductOpen(false);
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
        <img src={product.imageUrl} alt={product.name} className="w-40 border-md object-cover mb-4 rounded" />
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-neutral-600">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-800">
              <p>
                <b className="text-neutral-800">Price:</b> {product.price.toFixed(2)}
              </p>
              <p>
                <b className="text-neutral-800">Discount:</b> {product.discount}
              </p>
              <p>
                <b className="text-neutral-800">Color:</b> {product.color}
              </p>
              <p>
                <b className="text-neutral-800">Stock:</b> {product.stock}
              </p>
              <p>
                <b className="text-neutral-800">Category:</b> {product.category}
              </p>
              <p>
                <b className="text-neutral-800">Manufacturer:</b> {product.manufacturer}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsUpdateProductOpen(true)}
              className="flex-1 max-w-40 bg-green-500/90 hover:bg-green-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
            >
              Update
            </button>
            <button
              onClick={() => setIsDeleteProductOpen(true)}
              className="flex-1 max-w-40 bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 hoverEffect text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {isUpdateProductOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={updatePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <UpdateProduct onClose={() => setIsUpdateProductOpen(false)} product={product} />
          </div>
        </div>
      )}
      {isDeleteProductOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div
            ref={deletePopUpRef}
            className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative"
          >
            <DeleteProduct onClose={() => setIsDeleteProductOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
