export default function StaticPage({ title, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-6">{title}</h1>
      <div className="text-sm text-inkmuted leading-relaxed space-y-4">{children}</div>
    </div>
  );
}
