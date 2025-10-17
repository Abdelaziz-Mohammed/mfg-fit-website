import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartProduct from "./CartProduct";

function Cart() {
  const { cartItems } = useCart();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          <div className="flex flex-col gap-10 items-center justify-center h-[80vh] bg-neutral-100 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to={"/shop"}
              className="mt-4 bg-primary/90 hover:bg-primary hover:shadow-2xl hoverEffect text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 mb-6 border border-neutral-300 rounded-lg p-4 overflow-x-auto">
              {cartItems.map((item) => (
                <CartProduct key={item.id} product={item} />
              ))}
            </div>
            <div className="flex flex-col gap-4 p-4 border border-neutral-300 rounded-lg">
              <h2 className="text-lg font-semibold">Cart Summary</h2>
              <p className="text-base">
                <b className="text-primary font-semibold text-base">Total Items:</b>{" "}
                <span className="font-bold text-lg">{cartItems.length}</span>
              </p>
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Total Price</h2>
                <p className="text-lg text-primary font-bold">
                  {cartItems.length > 0
                    ? `L.E ${cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0)}`
                    : "L.E 0"}
                </p>
              </div>
              <Link
                to={"/checkout"}
                className="bg-primary/90 hover:bg-primary hover:shadow-2xl hoverEffect text-white px-4 py-2 rounded w-full max-w-sm text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
