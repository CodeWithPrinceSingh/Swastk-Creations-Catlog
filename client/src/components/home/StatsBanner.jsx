import useCountUp from '../../hooks/useCountUp.js';

const stats = [
  { end: 50, suffix: '+', label: 'Happy Brides' },
  { end: 1200, suffix: '+', label: 'Outfits Crafted' },
  { end: 1, suffix: '', label: 'Years of Trust' },
  { end: 1, suffix: '+', label: 'Cities Served' },
];

export default function StatsBanner() {
  return (
    <section className="bg-rose-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ end, suffix, label }) {
  const [ref, count] = useCountUp(end);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl sm:text-4xl text-white">
        {count}
        {suffix}
      </p>
      <p className="text-rose-200 text-xs sm:text-sm mt-1 tracking-wide">{label}</p>
    </div>
  );
}
