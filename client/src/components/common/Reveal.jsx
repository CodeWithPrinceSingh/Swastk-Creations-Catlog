import useScrollReveal from '../../hooks/useScrollReveal.js';

// Wrap any section in <Reveal> to make it fade + slide up into view as the
// user scrolls to it. direction controls which way it slides in from.
export default function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal();

  const hiddenTransform =
    direction === 'up'
      ? 'translate-y-8'
      : direction === 'left'
      ? '-translate-x-8'
      : direction === 'right'
      ? 'translate-x-8'
      : '';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${hiddenTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
