import { useRecentlyViewed } from '../../context/RecentlyViewedContext.jsx';
import ProductCard from '../product/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

// Shows recently viewed products, excluding the one currently being viewed.
export default function RecentlyViewed({ excludeProductId }) {
  const { items } = useRecentlyViewed();

  const visible = items.filter((p) => p.id !== excludeProductId);

  if (visible.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-rose-100">
      <SectionHeading eyebrow="YOUR BROWSING HISTORY" title="Recently" accent="Viewed" align="left" />
      <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {visible.map((p) => (
          <div key={p.id} className="min-w-[180px] sm:min-w-[200px] flex-1">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
