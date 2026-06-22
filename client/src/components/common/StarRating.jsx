import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, size = 13, showValue = false }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(rating) ? 'text-gold fill-gold' : 'text-rose-100 fill-rose-100'}
        />
      ))}
      {showValue && <span className="text-xs text-inkmuted ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
}
