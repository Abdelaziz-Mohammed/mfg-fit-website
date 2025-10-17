import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

function CartProduct({ product }) {
  console.log(product);

  const { cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(() => {
    return cartItems.some((item) => item.id === product.id);
  });

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsInCart(true);
  };

  const handleIncrement = () => {
    incrementQuantity(product.id);
  };

  const handleDecrement = () => {
    decrementQuantity(product.id);
    const item = cartItems.find((item) => item.id === product.id);
    if (item && item.cartQuantity <= 1) {
      setIsInCart(false);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setIsInCart(false);
  };

  return (
    <div className="flex gap-4 not-last:pb-6 not-last:border-b border-b-neutral-200">
      <div className="rounded-lg h-64 flex items-center justify-center bg-gray-100">
        {!product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <p className="w-full h-full flex items-center justify-center text-sm text-primary p-4 text-center">
            No image available
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{product.translations[0]?.name}</h2>
        <p className="text-base text-neutral-700">{product.translations?.[0].description}</p>
        <p className="text-base text-neutral-700 flex items-center gap-2">
          <b>Color:</b>
          <span className="">{product.translations?.[0].color}</span>
        </p>
        <p className="text-base text-neutral-700 flex items-center gap-2">
          <b>Weight:</b>
          <span className="">{product.weight}</span>
        </p>
        <p className="text-base text-neutral-700 flex items-center gap-2">
          <b>Manufacturer:</b>
          <span className="">{product.translations?.[0].manufacturer}</span>
        </p>
        <p className="text-base text-neutral-700 flex items-center gap-2">
          <b>Category:</b>
          <span className="">{product.translations?.[0].category}</span>
        </p>
        <p className="text-base text-neutral-700 flex items-center gap-2">
          <b>Stock:</b>
          <span className="">{product.stock}</span>
        </p>
        <div className="flex items-center gap-4 text-base">
          <b className="font-semibold text-primary">Price:</b>{" "}
          <div className="flex items-center gap-2">
            <span className="text-base text-neutral-700 line-through">{product.price}</span>
            <span className="text-2xl ml-2 -mr-1 text-primary font-bold">
              {product.price - product.price * (product.discount / 100)}
            </span>
          </div>{" "}
          L.E
        </div>
        <p className="text-base text-primary font-bold">
          <b className="font-semibold text-gray-600">Sub Total:</b>{" "}
          <span className="text-2xl">
            {(product.price - product.price * (product.discount / 100)) * product.cartQuantity}
          </span>{" "}
          L.E
        </p>
        {isInCart && (
          <div className="flex items-center justify-between gap-8 rtl:flex-row-reverse">
            <div className="flex items-center border border-neutral-300 rounded-4xl overflow-hidden">
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-l rtl:rounded-r hover:bg-gray-300 hoverEffect"
              >
                <FaPlus />
              </button>
              <b className="text-lg px-8 text-center text-primary font-bold">
                {cartItems.find((item) => item.id === product.id)?.cartQuantity}
              </b>
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-r rtl:rounded-l hover:bg-gray-300 hoverEffect"
              >
                <FaMinus />
              </button>
            </div>
            <button
              onClick={handleRemoveFromCart}
              className="flex items-center justify-center text-red-600 border border-neutral-300 py-2 px-4 rounded-lg hover:bg-gray-300 hoverEffect"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartProduct;
