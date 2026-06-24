import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const TOKEN_KEY = "bride_store_token";

  // Reads the token fresh each time, rather than capturing it once at
  // provider-mount (which would stay null if login happens afterward).
  const getAuthHeaders = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Load wishlist from server
  const fetchWishlist = async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API}/wishlist`, headers);
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // Re-fetch whenever the logged-in user changes — covers login,
    // logout, and switching accounts without needing a page reload.
  }, [user]);

  const addToWishlist = async (product) => {
    const headers = getAuthHeaders();
    if (!headers) {
      console.warn('You need to sign in to use the wishlist.');
      return;
    }

    try {
      const exists = wishlist.find((item) => item.id === product.id);

      if (exists) {
        const res = await axios.delete(`${API}/wishlist/${product.id}`, headers);
        setWishlist(res.data.wishlist);
      } else {
        const res = await axios.post(`${API}/wishlist/${product.id}`, {}, headers);
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
