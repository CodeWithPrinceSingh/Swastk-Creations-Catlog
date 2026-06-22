import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';
import ShopFilters from '../components/product/ShopFilters.jsx';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { fetchProducts } from '../api/products.js';
import { fetchCategories } from '../api/categories.js';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category, search, tag, sort, page, pageSize: 12 })
      .then((res) => {
        setProducts(res.products);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  }, [category, search, tag, sort, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };

  const activeCategoryName = categories.find((c) => c.id === category)?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="eyebrow text-rose-600 mb-2">
          {search ? `SEARCH RESULTS FOR "${search.toUpperCase()}"` : 'SHOP THE COLLECTION'}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          {activeCategoryName || (tag === 'bestseller' ? 'Our Best Sellers' : 'All Products')}
        </h1>
      </div>

      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden flex items-center gap-2 text-sm font-medium border border-rose-200 rounded-full px-4 py-2 mb-6"
      >
        <SlidersHorizontal size={15} /> Filters & Sort
      </button>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">
          <ShopFilters
            categories={categories}
            activeCategory={category}
            onCategoryChange={(val) => updateParam('category', val)}
            sort={sort}
            onSortChange={(val) => updateParam('sort', val)}
          />
        </aside>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-cream p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl">Filters & Sort</h2>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              <ShopFilters
                categories={categories}
                activeCategory={category}
                onCategoryChange={(val) => {
                  updateParam('category', val);
                  setMobileFiltersOpen(false);
                }}
                sort={sort}
                onSortChange={(val) => {
                  updateParam('sort', val);
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <Loader label="Finding beautiful things..." />
          ) : products.length === 0 ? (
            <EmptyState
              title="No products found"
              message="Try a different category, or clear your search to see everything we have."
              ctaLabel="Clear Filters"
              ctaTo="/shop"
            />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateParam('page', String(p))}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                        p === page ? 'bg-rose-600 text-white' : 'border border-rose-200 text-ink hover:bg-blush'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
