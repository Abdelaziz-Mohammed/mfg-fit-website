import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addToCart = (product, cartQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, { ...product, cartQuantity }];
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      );
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevItems) => {
      let updatedItems = prevItems.map((item) =>
        item.id === productId
          ? { ...item, cartQuantity: item.cartQuantity > 0 ? item.cartQuantity - 1 : item.cartQuantity }
          : item
      );
      updatedItems = updatedItems.filter((item) => item.cartQuantity > 0);
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
