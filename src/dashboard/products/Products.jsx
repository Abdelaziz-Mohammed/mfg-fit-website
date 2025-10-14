import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddProduct from "./AddProduct";
import { useAdmin } from "../../context/AdminContext";
import Loading from "./../../components/loading/Loading";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

function Products() {
  const { products, loading } = useAdmin();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const popUpRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { t } = useTranslation();

  useEffect(() => setFilteredProducts(products), [products]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setIsAddProductOpen(false);
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
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.name.toLowerCase().includes(value));
      setFilteredProducts(filtered);
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
          placeholder={t("dashboard.products.searchProducts")}
          className="outline-0 border border-neutral-300 focus:border-neutral-500 rounded-md p-2 min-[500px]:flex-1 max-[500px]:w-full"
        />
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="bg-primary/90 hover:bg-primary text-white rounded-md px-3 py-2 hoverEffect text-sm max-[500px]:w-full
          flex rtl:flex-row-reverse gap-2 items-center justify-center"
        >
          <IoIosAddCircleOutline className="inline text-lg" />
          <span>{t("dashboard.products.addProduct")}</span>
        </button>
      </div>
      <div className="h-full">
        {loading ? (
          <Loading fullscreen={false} />
        ) : filteredProducts.length > 0 ? (
          <div className={`flex flex-col gap-6`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="bg-neutral-100 rounded-md h-96 text-center text-neutral-600 flex flex-col items-center justify-center px-4">
            <b className="mb-1">{t("dashboard.products.noProducts")}</b> <br />{" "}
            {t("dashboard.products.noProductsDescription")}
          </p>
        )}
      </div>
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
          <div ref={popUpRef} className="my-10 mx-4 rounded-lg w-full max-w-lg overflow-auto max-h-[90vh] relative">
            <AddProduct onClose={() => setIsAddProductOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
