import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

function ProductCard({ product }) {
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
    <div className="border border-neutral-300 shadow-md hover:shadow-xl hoverEffect rounded-lg overflow-hidden relative">
      <div className="rounded-t-lg border-b border-b-neutral-300 h-64 flex items-center justify-center bg-gray-100">
        {!product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <p className="w-full h-full flex items-center justify-center text-sm text-primary p-4 text-center">
            No image available
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 py-4 px-3">
        <h2 className="text-lg font-semibold">{product.translations[0]?.name}</h2>
        <p className="text-gray-600">L.E {product.price}</p>
        {product.stock > 0 ? (
          <span className="text-green-600 font-medium text-sm">In Stock ({product.stock})</span>
        ) : (
          <span className="text-red-600 font-medium text-sm">Out of Stock</span>
        )}
        {isInCart ? (
          <div className="flex items-center justify-between gap-8 rtl:flex-row-reverse">
            <div className="flex items-center border border-neutral-300 rounded-4xl overflow-hidden">
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-r hover:bg-gray-300 hoverEffect"
              >
                <FaPlus />
              </button>
              <b className="text-lg px-8 text-center text-primary font-bold">
                {cartItems.find((item) => item.id === product.id)?.cartQuantity}
              </b>
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-l hover:bg-gray-300 hoverEffect"
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
        ) : (
          <button onClick={handleAddToCart} className="bg-primary/80 hover:bg-primary/100 text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
