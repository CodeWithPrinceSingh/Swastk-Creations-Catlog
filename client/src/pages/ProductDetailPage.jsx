import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Store, MessageCircle, Sparkles, Hand, Clock, ZoomIn } from 'lucide-react';
import { fetchProductBySlug } from '../api/products.js';
import StarRating from '../components/common/StarRating.jsx';
import Loader from '../components/common/Loader.jsx';
import VisitStoreModal from '../components/product/VisitStoreModal.jsx';
import ImageLightbox from '../components/common/ImageLightbox.jsx';
import RecentlyViewed from '../components/home/RecentlyViewed.jsx';
import RecommendedProducts from '../components/home/RecommendedProducts.jsx';
import ReviewSection from '../components/product/ReviewSection.jsx';
import { ProductDetailSkeleton } from '../components/common/Skeleton.jsx';
import { formatPrice, discountPercent } from '../utils/format.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useRecentlyViewed } from '../context/RecentlyViewedContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToWishlist, isWishlisted } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductBySlug(slug)
      .then((res) => {
        setProduct(res.product);
        setSize(res.product.sizes?.[0] || null);
        setColor(res.product.colors?.[0] || null);
        setActiveImage(0);
        addRecentlyViewed(res.product);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Re-fetch the product after a review is added/updated/deleted so the
  // average rating + review count shown above stays in sync.
  const refreshRating = () => {
    fetchProductBySlug(slug)
      .then((res) => setProduct(res.product))
      .catch(() => {});
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-rose-600 text-sm mb-4">{error || 'Product not found.'}</p>
        <Link to="/shop" className="text-sm font-medium text-rose-600 underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = discountPercent(product.price, product.compareAtPrice);
  const wishlisted = isWishlisted(product);

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in "${product.name}" — is it available?`);

  const handleWishlist = () => {
    addToWishlist(product);
    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      type: wishlisted ? 'info' : 'success',
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-xs text-inkmuted mb-6">
          <Link to="/" className="hover:text-rose-600">Home</Link> /{' '}
          <Link to="/shop" className="hover:text-rose-600">Shop</Link> /{' '}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="block relative w-full bg-blush rounded-xl overflow-hidden aspect-[3/4] group"
              aria-label="View full size image"
            >
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} className="text-ink" />
              </span>
            </button>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-rose-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.isNew && (
              <span className="inline-block bg-ink text-white text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded mb-3">
                NEW
              </span>
            )}
            <h1 className="font-display text-3xl sm:text-4xl text-ink">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={product.rating} />
              <span className="text-xs text-inkmuted">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <span className="text-2xl font-semibold text-ink">{formatPrice(product.price)}</span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-base text-inkmuted line-through">{formatPrice(product.compareAtPrice)}</span>
                  {discount > 0 && (
                    <span className="text-sm text-rose-600 font-semibold">{discount}% off</span>
                  )}
                </>
              )}
            </div>
            <p className="text-xs text-inkmuted mt-1">Price shown is indicative. Available in-store.</p>

            <p className="text-sm text-inkmuted leading-relaxed mt-5">{product.description}</p>

            {product.colors?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-ink mb-2">Available Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                        color === c ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-rose-200 text-inkmuted hover:border-rose-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-medium text-ink mb-2">Available Sizes</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[44px] text-sm px-3 py-2 rounded-full border transition-colors ${
                        size === s ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-rose-200 text-inkmuted hover:border-rose-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-inkmuted mt-2">Visit the store to try these on and find your perfect fit.</p>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStoreModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3.5 rounded-md"
              >
                <Store size={16} /> VISIT OUR STORE
              </button>
              <a
                href={`https://wa.me/919311097920?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-rose-300 text-rose-600 font-semibold text-sm tracking-wide py-3.5 rounded-md hover:bg-rose-50 transition-colors"
              >
                <MessageCircle size={16} /> ENQUIRE
              </a>
              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="border border-rose-200 rounded-md p-3.5 hover:bg-blush transition-colors"
              >
                <Heart size={18} className={wishlisted ? 'text-rose-600 fill-rose-600' : 'text-rose-600'} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-rose-100">
              <TrustBadge icon={Hand} label="Handcrafted with care" />
              <TrustBadge icon={Sparkles} label="See & try in-store" />
              <TrustBadge icon={Clock} label="Open Mon–Sun, 10AM–10PM" />
            </div>
          </div>
        </div>

        <VisitStoreModal
          open={storeModalOpen}
          onClose={() => setStoreModalOpen(false)}
          productName={product.name}
        />

        <ReviewSection productId={product.id} onRatingUpdate={refreshRating} />
      </div>

      <RecentlyViewed excludeProductId={product.id} />

      <RecommendedProducts categoryId={product.category} excludeProductId={product.id} />

      <ImageLightbox
        images={product.images}
        startIndex={activeImage}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <Icon size={18} className="text-rose-500" />
      <p className="text-xs text-inkmuted">{label}</p>
    </div>
  );
}
