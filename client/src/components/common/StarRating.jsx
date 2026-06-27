import { useState } from 'react';

export default function StarRating({
  rating = 0,
  size = 13,
  showValue = false,
  interactive = false,
  onChange,
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '2px', userSelect: 'none' }}
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (interactive ? (hovered || Math.round(rating)) : Math.round(rating));
        return (
          <span
            key={n}
            onMouseEnter={() => interactive && setHovered(n)}
            onClick={() => interactive && onChange && onChange(n)}
            style={{
              fontSize: size + 4,
              lineHeight: 1,
              cursor: interactive ? 'pointer' : 'default',
              color: filled ? '#f59e0b' : '#fbcfe8',
              display: 'inline-block',
              transition: 'color 0.1s',
            }}
          >
            ★
          </span>
        );
      })}
      {showValue && (
        <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4 }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}
