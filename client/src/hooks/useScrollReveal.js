import { useEffect, useRef, useState } from 'react';

// Lightweight scroll-reveal using IntersectionObserver — no extra library.
// Returns a ref to attach to the element, and whether it's currently visible.
// Once revealed, stays revealed (doesn't re-hide on scroll back up), which
// feels calmer than re-triggering animations every time you scroll past.
export default function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who've asked for reduced motion — show immediately.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
