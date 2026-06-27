import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { ProductCardSkeleton } from '../common/Skeleton.jsx';
import { fetchProducts } from '../../api/products.js';

// Shows other products from the same category as the one being viewed,
// excluding the current product itself. Self-fetches so it can be dropped
// onto the product detail page without extra wiring in the parent.
export default function RecommendedProducts({ categoryId, excludeProductId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProducts({ category: categoryId, pageSize: 9 })
      .then((res) => setItems(res.products.filter((p) => p.id !== excludeProductId)))
      .finally(() => setLoading(false));
  }, [categoryId, excludeProductId]);

  if (!loading && items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-rose-100">
      <SectionHeading eyebrow="MORE TO EXPLORE" title="You May Also" accent="Like" align="left" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {loading
          ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
          : items.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
