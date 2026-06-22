import EmptyState from '../components/common/EmptyState.jsx';

export default function WishlistPage() {
  return (
    <EmptyState
      title="Your wishlist is empty"
      message="Tap the heart icon on any product to save it here for later."
      ctaLabel="Browse Products"
      ctaTo="/shop"
    />
  );
}
