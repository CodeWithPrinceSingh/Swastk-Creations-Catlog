import { createContext, useContext, useEffect, useState } from 'react';

const RecentlyViewedContext = createContext(null);
const STORAGE_KEY = 'bride_store_recently_viewed';
const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Records a product as viewed. Moves it to the front if already present,
  // and caps the list at MAX_ITEMS (drops the oldest).
  const addRecentlyViewed = (product) => {
    setItems((prev) => {
      const withoutCurrent = prev.filter((p) => p.id !== product.id);
      const slim = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        images: product.images,
        isNew: product.isNew,
        rating: product.rating,
      };
      return [slim, ...withoutCurrent].slice(0, MAX_ITEMS);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ items, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
};
