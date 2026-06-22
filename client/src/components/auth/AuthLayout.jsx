import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <Link to="/" className="font-display text-3xl text-rose-700 inline-flex items-center gap-1.5">
          <span className="text-gold text-lg">♛</span>BRIDE
        </Link>
        <h1 className="font-display text-2xl text-ink mt-6">{title}</h1>
        {subtitle && <p className="text-sm text-inkmuted mt-2">{subtitle}</p>}
      </div>

      <div className="bg-white border border-rose-100 rounded-xl p-7 shadow-card">{children}</div>

      {footer && <p className="text-center text-sm text-inkmuted mt-6">{footer}</p>}
    </div>
  );
}
