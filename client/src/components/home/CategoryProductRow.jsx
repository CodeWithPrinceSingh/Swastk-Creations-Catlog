import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Loader from '../common/Loader.jsx';
import { fetchProducts } from '../../api/products.js';

// Splits a category name into a "title" + "accent" pair for SectionHeading,
// using the last word as the accent (matches the style used by
// FeaturedProducts "Our Best Sellers" and WeddingSarees "Wedding Sarees").
const splitName = (name) => {
  const words = name.trim().split(' ');
  if (words.length === 1) return { title: '', accent: words[0] };
  const accent = words.pop();
  return { title: words.join(' '), accent };
};

export default function CategoryProductRow({ category, eyebrow, tinted = false }) {
  const scrollerRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category: category.id, pageSize: 10 })
      .then((res) => setItems(res.products))
      .finally(() => setLoading(false));
  }, [category.id]);

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  if (loading) return <Loader label={`Loading ${category.name}...`} />;
  // No point showing an empty section for a category with no products yet.
  if (items.length === 0) return null;

  const { title, accent } = splitName(category.name);

  return (
    <section className={`${tinted ? 'bg-blush/40' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-2">
          <div className="flex-1">
            <SectionHeading eyebrow={eyebrow} title={title} accent={accent} align="left" />
          </div>
          <Link
            to={`/shop?category=${category.id}`}
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
          to={`/shop?category=${category.id}`}
          className="sm:hidden mt-6 inline-block w-full text-center text-xs font-semibold tracking-wide border border-rose-300 text-rose-600 rounded-full px-5 py-2.5"
        >
          VIEW ALL
        </Link>
      </div>
    </section>
  );
}
