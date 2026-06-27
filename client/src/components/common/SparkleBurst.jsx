import { useEffect, useState } from 'react';

// A small burst of rose/gold sparkle particles, triggered by `trigger` changing.
// Pure CSS animation, no canvas/confetti library — keeps the bundle light and
// fits the bridal/elegant aesthetic better than generic colorful confetti.
const PARTICLE_COUNT = 8;
const COLORS = ['#E11D48', '#F472B6', '#C9A86A', '#FDA4AF'];

export default function SparkleBurst({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: `${trigger}-${i}`,
      angle: (360 / PARTICLE_COUNT) * i + Math.random() * 20,
      distance: 28 + Math.random() * 18,
      size: 4 + Math.random() * 4,
      color: COLORS[i % COLORS.length],
      duration: 500 + Math.random() * 200,
    }));

    setParticles(newParticles);
    const timeout = setTimeout(() => setParticles([]), 800);
    return () => clearTimeout(timeout);
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <span className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.distance;
        const y = Math.sin(rad) * p.distance;
        return (
          <span
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full sparkle-particle"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--tx': `${x}px`,
              '--ty': `${y}px`,
              animationDuration: `${p.duration}ms`,
            }}
          />
        );
      })}
    </span>
  );
}
