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
      const exist = prev.find(
        (item) =>
          item._id === product._id ||
          item.id === product.id ||
          item.slug === product.slug
      );

      if (exist) {
        return prev.filter(
          (item) =>
            item._id !== product._id &&
            item.id !== product.id &&
            item.slug !== product.slug
        );
      }

      return [...prev, product];
    });
  };

  const isWishlisted = (product) => {
    return wishlist.some(
      (item) =>
        item._id === product._id ||
        item.id === product.id ||
        item.slug === product.slug
    );
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
