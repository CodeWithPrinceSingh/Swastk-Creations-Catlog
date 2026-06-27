import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Heart, Store, Eye } from 'lucide-react';
import { formatPrice, discountPercent } from '../../utils/format.js';
import VisitStoreModal from './VisitStoreModal.jsx';
import SparkleBurst from '../common/SparkleBurst.jsx';
import QuickViewModal from '../common/QuickViewModal.jsx';
import StarRating from '../common/StarRating.jsx';

export default function ProductCard({ product }) {
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const { addToWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product);
  const discount = discountPercent(product.price, product.compareAtPrice);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!wishlisted) setSparkleTrigger((t) => t + 1);
    addToWishlist(product);
    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      type: wishlisted ? 'info' : 'success',
    });
  };

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
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart
            size={15}
            className={`transition-transform ${wishlisted ? 'text-rose-600 fill-rose-600 scale-110' : 'text-ink'}`}
          />
          <SparkleBurst trigger={sparkleTrigger} />
        </button>

        {/* Quick View — appears on hover (desktop) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewOpen(true);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white/95 text-ink text-xs font-semibold px-4 py-2 rounded-full opacity-0 sm:group-hover:opacity-100 translate-y-2 sm:group-hover:translate-y-0 transition-all"
        >
          <Eye size={13} /> Quick View
        </button>
      </Link>

      <div className="mt-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-ink hover:text-rose-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Star rating below product name */}
        {(product.reviewCount > 0) && (
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={product.rating} size={11} />
            <span className="text-[11px] text-inkmuted">({product.reviewCount})</span>
          </div>
        )}

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

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onVisitStore={() => setStoreModalOpen(true)}
      />
    </div>
  );
}
