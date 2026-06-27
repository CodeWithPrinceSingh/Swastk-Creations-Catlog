import { useState } from 'react';

/**
 * StarRating — display-only by default.
 * Pass `interactive` + `onChange` to make it a rating picker.
 */
export default function StarRating({
  rating = 0,
  size = 13,
  showValue = false,
  interactive = false,
  onChange,
}) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  // For interactive: show hovered > selected > incoming rating
  // For display: just show rating
  const effective = interactive
    ? (hovered || selected || Math.round(rating))
    : Math.round(rating);

  const handleClick = (n) => {
    if (!interactive) return;
    setSelected(n);
    onChange?.(n);
  };

  return (
    <div
      className={`flex items-center gap-0.5 ${interactive ? 'cursor-pointer select-none' : ''}`}
      aria-label={interactive ? 'Select a rating' : `Rated ${rating} out of 5`}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          onClick={() => handleClick(n)}
          onMouseEnter={() => interactive && setHovered(n)}
          style={{ cursor: interactive ? 'pointer' : 'default', flexShrink: 0 }}
        >
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={n <= effective ? '#f59e0b' : '#fce7f3'}
            stroke={n <= effective ? '#f59e0b' : '#fbcfe8'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
      {showValue && (
        <span className="text-xs text-inkmuted ml-1">{Number(rating).toFixed(1)}</span>
      )}
    </div>
  );
}
