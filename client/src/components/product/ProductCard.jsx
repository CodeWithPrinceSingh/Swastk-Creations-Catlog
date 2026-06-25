import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { Heart, Store } from 'lucide-react';
import { formatPrice, discountPercent } from '../../utils/format.js';
import VisitStoreModal from './VisitStoreModal.jsx';

export default function ProductCard({ product }) {
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const { addToWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className="group min-w-0">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden rounded-lg bg-blush aspect-[3/4]">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-ink text-white text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded">
            NEW
          </span>
        )}
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
         onClick={(e) => {
  e.preventDefault();
  addToWishlist(product);
}}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart size={15} className={wishlisted ? 'text-rose-600 fill-rose-600' : 'text-ink'} />
        </button>
      </Link>

      <div className="mt-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-ink hover:text-rose-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold text-ink whitespace-nowrap">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-inkmuted line-through whitespace-nowrap">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          {discount > 0 && product.compareAtPrice > product.price && (
            <span className="text-xs text-rose-600 font-medium block mt-0.5">{discount}% off</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setStoreModalOpen(true);
          }}
          className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-rose-700 border border-rose-200 rounded-full py-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 transition-colors"
        >
          <Store size={13} /> VISIT STORE
        </button>
      </div>

      <VisitStoreModal
        open={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
