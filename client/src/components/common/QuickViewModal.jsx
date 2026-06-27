import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Store, MessageCircle, ArrowRight } from 'lucide-react';
import Modal from './Modal.jsx';
import StarRating from './StarRating.jsx';
import { formatPrice, discountPercent } from '../../utils/format.js';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function QuickViewModal({ product, open, onClose, onVisitStore }) {
  const [activeImage, setActiveImage] = useState(0);
  const { addToWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const wishlisted = isWishlisted(product);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in "${product.name}" — is it available?`);

  const handleWishlist = () => {
    addToWishlist(product);
    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      type: wishlisted ? 'info' : 'success',
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Quick View">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <div className="bg-blush rounded-lg overflow-hidden aspect-[3/4]">
            <img
              src={product.images?.[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                    i === activeImage ? 'border-rose-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.isNew && (
            <span className="inline-block bg-ink text-white text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded mb-2">
              NEW
            </span>
          )}
          <h3 className="font-display text-xl text-ink">{product.name}</h3>

          {product.rating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} />
              {product.reviewCount > 0 && (
                <span className="text-xs text-inkmuted">({product.reviewCount})</span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-2 flex-wrap mt-3">
            <span className="text-xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-sm text-inkmuted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          {discount > 0 && product.compareAtPrice > product.price && (
            <span className="text-xs text-rose-600 font-medium block mt-0.5">{discount}% off</span>
          )}

          {product.description && (
            <p className="text-sm text-inkmuted leading-relaxed mt-4 line-clamp-3">{product.description}</p>
          )}

          {product.colors?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-inkmuted mb-1.5">Available Colors</p>
              <p className="text-sm text-ink">{product.colors.join(', ')}</p>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-inkmuted mb-1.5">Available Sizes</p>
              <p className="text-sm text-ink">{product.sizes.join(', ')}</p>
            </div>
          )}

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => {
                onClose();
                onVisitStore?.();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-xs font-semibold tracking-wide py-2.5 rounded-md"
            >
              <Store size={13} /> VISIT STORE
            </button>
            <a
              href={`https://wa.me/919311097920?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 border border-rose-300 text-rose-600 text-xs font-semibold tracking-wide py-2.5 rounded-md hover:bg-rose-50 transition-colors"
            >
              <MessageCircle size={13} /> ENQUIRE
            </a>
            <button
              onClick={handleWishlist}
              aria-label="Toggle wishlist"
              className="border border-rose-200 rounded-md p-2.5 hover:bg-blush transition-colors"
            >
              <Heart size={16} className={wishlisted ? 'text-rose-600 fill-rose-600' : 'text-rose-600'} />
            </button>
          </div>

          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="flex items-center gap-1 text-xs font-medium text-rose-600 mt-4 hover:underline"
          >
            View full details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
