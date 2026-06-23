import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
  setWishlist((prev) => {
    const exist = prev.find((item) => item.id === product.id);

    if (exist) {
      return prev.filter((item) => item.id !== product.id);
    }

    return [...prev, product];
  });
};

const isWishlisted = (product) => {
  return wishlist.some((item) => item.id === product.id);
};

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
