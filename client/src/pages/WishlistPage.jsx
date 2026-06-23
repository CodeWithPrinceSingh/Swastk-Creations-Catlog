import EmptyState from "../components/common/EmptyState.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        message="Tap the heart icon on any product to save it here for later."
        ctaLabel="Browse Products"
        ctaTo="/shop"
      />
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product._id || product.id || product.slug}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
