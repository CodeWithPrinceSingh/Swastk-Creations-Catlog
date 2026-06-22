import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function FeaturedProducts({ products = [] }) {
  const scrollerRef = useRef(null);

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-2">
        <div className="flex-1">
          <SectionHeading eyebrow="FEATURED PRODUCTS" title="Our Best" accent="Sellers" align="left" />
        </div>
        <Link
          to="/shop?tag=bestseller"
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
          {products.map((p) => (
            <div key={p.id} className="min-w-[220px] sm:min-w-[240px] flex-1">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {products.length > 4 && (
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
        to="/shop?tag=bestseller"
        className="sm:hidden mt-6 inline-block w-full text-center text-xs font-semibold tracking-wide border border-rose-300 text-rose-600 rounded-full px-5 py-2.5"
      >
        VIEW ALL
      </Link>
    </section>
  );
}
