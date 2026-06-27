// Skeleton placeholders shaped like real content, shown while data loads.
// Using the actual layout shape (instead of a generic spinner) reduces
// perceived loading time and avoids layout shift when content arrives.

export function ProductCardSkeleton() {
  return (
    <div className="min-w-0">
      <div className="skeleton-shimmer rounded-lg aspect-[3/4]" />
      <div className="mt-3 space-y-2">
        <div className="skeleton-shimmer h-4 rounded w-3/4" />
        <div className="skeleton-shimmer h-4 rounded w-1/2" />
        <div className="skeleton-shimmer h-8 rounded-full w-full mt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6, columns = 'grid-cols-2 sm:grid-cols-3' }) {
  return (
    <div className={`grid ${columns} gap-x-5 gap-y-8`}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="skeleton-shimmer rounded-xl aspect-[3/4]" />
      <div className="space-y-4">
        <div className="skeleton-shimmer h-8 rounded w-3/4" />
        <div className="skeleton-shimmer h-5 rounded w-1/3" />
        <div className="skeleton-shimmer h-7 rounded w-1/4" />
        <div className="skeleton-shimmer h-20 rounded w-full" />
        <div className="skeleton-shimmer h-12 rounded w-full" />
      </div>
    </div>
  );
}
