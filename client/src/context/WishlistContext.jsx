import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Token localStorage se aa raha hai (login ke baad)
  const TOKEN_KEY = "bride_store_token";
const token = localStorage.getItem(TOKEN_KEY);

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

  // Load wishlist from server
  const fetchWishlist = async () => {
    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
     const res = await axios.get(
  `${API}/wishlist`,
  headers
);


      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    try {
      const exists = wishlist.find(
item => item.id===product.id
);

      if (exists) {
const res = await axios.delete(
`${API}/wishlist/${product.id}`,
headers
);

setWishlist(res.data.wishlist);

        setWishlist(res.data.wishlist);
      } else {
const res = await axios.post(
  `${API}/wishlist/${product.id}`,
  {},
  headers
);

        setWishlist(res.data.wishlist);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isWishlisted = (product) => {
   return wishlist.some(
item=>item.id===product.id
);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
