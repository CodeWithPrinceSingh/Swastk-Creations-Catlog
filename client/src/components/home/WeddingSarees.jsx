import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Loader from '../common/Loader.jsx';
import { fetchProducts } from '../../api/products.js';

const SAREE_CATEGORY_ID = 'cat-sarees';

export default function WeddingSarees({ products }) {
  const scrollerRef = useRef(null);
  const [items, setItems] = useState(products || []);
  const [loading, setLoading] = useState(!products);

  // Self-fetches sarees if no products are passed in, so this component
  // can be dropped onto any page on its own (same pattern as FeaturedProducts,
  // which expects products as a prop from a parent that already fetched them).
  useEffect(() => {
    if (products) return;
    fetchProducts({ category: SAREE_CATEGORY_ID, pageSize: 10 })
      .then((res) => setItems(res.products))
      .finally(() => setLoading(false));
  }, [products]);

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  if (loading) return <Loader label="Loading wedding sarees..." />;
  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-2">
        <div className="flex-1">
          <SectionHeading eyebrow="WOVEN WITH TRADITION" title="Wedding" accent="Sarees" align="left" />
        </div>
        <Link
          to={`/shop?category=${SAREE_CATEGORY_ID}`}
          className="hidden sm:inline-block text-xs font-semibold tracking-wide border border-rose-300 text-rose-600 rounded-full px-5 py-2.5 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors -mt-10 whitespace-nowrap"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1"
        >
          {items.map((p) => (
            <div key={p.id} className="min-w-[220px] sm:min-w-[240px] flex-1">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {items.length > 4 && (
          <>
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="hidden sm:flex absolute -left-4 top-1/3 -translate-y-1/2 bg-white shadow-card rounded-full p-2 hover:bg-blush transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="hidden sm:flex absolute -right-4 top-1/3 -translate-y-1/2 bg-white shadow-card rounded-full p-2 hover:bg-blush transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <Link
        to={`/shop?category=${SAREE_CATEGORY_ID}`}
        className="sm:hidden mt-6 inline-block w-full text-center text-xs font-semibold tracking-wide border border-rose-300 text-rose-600 rounded-full px-5 py-2.5"
      >
        VIEW ALL
      </Link>
    </section>
  );
}
