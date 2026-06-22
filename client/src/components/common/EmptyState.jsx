import { Link } from 'react-router-dom';

export default function EmptyState({ title, message, ctaLabel, ctaTo }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <h3 className="font-display text-2xl text-ink mb-2">{title}</h3>
      <p className="text-sm text-inkmuted max-w-sm mb-6">{message}</p>
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-md"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
