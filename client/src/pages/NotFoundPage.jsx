import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto text-center px-4 py-24">
      <p className="font-display text-6xl text-rose-300">404</p>
      <h1 className="font-display text-2xl text-ink mt-4">Page not found</h1>
      <p className="text-sm text-inkmuted mt-2">
        The page you're looking for has wandered off. Let's get you back to something beautiful.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
}
