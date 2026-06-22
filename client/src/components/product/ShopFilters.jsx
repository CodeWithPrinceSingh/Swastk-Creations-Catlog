export default function ShopFilters({ categories, activeCategory, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg text-ink mb-4">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onCategoryChange('')}
              className={`text-sm transition-colors ${
                !activeCategory ? 'text-rose-600 font-semibold' : 'text-inkmuted hover:text-ink'
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id)}
                className={`text-sm transition-colors ${
                  activeCategory === cat.id ? 'text-rose-600 font-semibold' : 'text-inkmuted hover:text-ink'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg text-ink mb-4">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-rose-200 rounded-md px-3 py-2.5 text-sm bg-white outline-none focus:border-rose-500"
        >
          <option value="">Featured</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
}
