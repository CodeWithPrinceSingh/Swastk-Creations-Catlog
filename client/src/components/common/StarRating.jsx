import { useState } from 'react';

// Defined OUTSIDE the parent component so React never unmounts/remounts it
function StarSVG({ n, size, filled, interactive, onClick, onMouseEnter }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ flexShrink: 0, cursor: interactive ? 'pointer' : 'default' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
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
}

export default function StarRating({
  rating = 0,
  size = 13,
  showValue = false,
  interactive = false,
  onChange,
}) {
  const [hovered, setHovered] = useState(0);

  const effective = hovered || Math.round(rating);

  return (
    <div
      className={`flex items-center gap-0.5 ${interactive ? 'select-none' : ''}`}
      aria-label={interactive ? 'Select a rating' : `Rated ${rating} out of 5`}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <StarSVG
          key={n}
          n={n}
          size={size}
          filled={n <= effective}
          interactive={interactive}
          onClick={() => interactive && onChange?.(n)}
          onMouseEnter={() => interactive && setHovered(n)}
        />
      ))}
      {showValue && (
        <span className="text-xs text-inkmuted ml-1">{Number(rating).toFixed(1)}</span>
      )}
    </div>
  );
}
