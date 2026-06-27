import { useState } from 'react';

/**
 * StarRating — display-only by default.
 * Pass `interactive` + `onChange` to make it a rating picker.
 * Fully controlled: selected value comes from parent via `rating` prop.
 */
export default function StarRating({
  rating = 0,
  size = 13,
  showValue = false,
  interactive = false,
  onChange,
}) {
  const [hovered, setHovered] = useState(0);

  // Display whichever is active: hover preview > confirmed rating
  const effective = hovered || Math.round(rating);

  const StarSVG = ({ n }) => {
    const filled = n <= effective;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ flexShrink: 0, cursor: interactive ? 'pointer' : 'default' }}
        onClick={() => interactive && onChange?.(n)}
        onMouseEnter={() => interactive && setHovered(n)}
      >
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={filled ? '#f59e0b' : '#fce7f3'}
          stroke={filled ? '#d97706' : '#fbcfe8'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div
      className={`flex items-center gap-0.5 ${interactive ? 'select-none' : ''}`}
      aria-label={interactive ? 'Select a rating' : `Rated ${rating} out of 5`}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => <StarSVG key={n} n={n} />)}
      {showValue && (
        <span className="text-xs text-inkmuted ml-1">{Number(rating).toFixed(1)}</span>
      )}
    </div>
  );
}
